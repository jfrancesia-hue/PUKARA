"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { asNumber } from "@/lib/utils";
import { createClient, createServiceClient } from "@/lib/supabase/server";

const incidentSchema = z.object({
  title: z.string().min(4),
  description: z.string().optional().nullable(),
  category: z.string().min(2),
  priority: z.enum(["baja", "media", "alta", "critica"]),
  status: z.enum(["nuevo", "validado", "asignado", "en_camino", "en_sitio", "resuelto", "cancelado"]).default("nuevo"),
  jurisdiction_id: z.string().uuid().optional().nullable(),
  address: z.string().optional().nullable(),
  lat: z.number().optional().nullable(),
  lng: z.number().optional().nullable(),
  reporter_name: z.string().optional().nullable(),
  reporter_phone: z.string().optional().nullable()
});

function emptyToNull(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return null;
  return value.trim() === "" ? null : value.trim();
}

async function actor() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

async function demoMode() {
  const cookieStore = await cookies();
  return cookieStore.get("pukara_demo_session")?.value === "1";
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard");

  if (email.trim().toLowerCase() === "demo@pukara360.demo" && password === "PukaraDemo360!") {
    const cookieStore = await cookies();
    cookieStore.set("pukara_demo_session", "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 8
    });
    redirect(next.startsWith("/") && next !== "/login" ? next : "/dashboard");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect(next.startsWith("/") ? next : "/dashboard");
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("pukara_demo_session");
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function createIncidentAction(formData: FormData) {
  if (await demoMode()) redirect("/incidentes/demo-inc-1");
  const user = await actor();
  const parsed = incidentSchema.parse({
    title: emptyToNull(formData.get("title")) ?? "",
    description: emptyToNull(formData.get("description")),
    category: emptyToNull(formData.get("category")) ?? "seguridad",
    priority: emptyToNull(formData.get("priority")) ?? "media",
    status: emptyToNull(formData.get("status")) ?? "nuevo",
    jurisdiction_id: emptyToNull(formData.get("jurisdiction_id")),
    address: emptyToNull(formData.get("address")),
    lat: asNumber(formData.get("lat")),
    lng: asNumber(formData.get("lng")),
    reporter_name: emptyToNull(formData.get("reporter_name")),
    reporter_phone: emptyToNull(formData.get("reporter_phone"))
  });
  const supabase = await createClient();
  const { data, error } = await supabase.from("incidents").insert({ ...parsed, source: user ? "operador" : "ciudadano", created_by: user?.id ?? null }).select("id").single();
  if (error) throw new Error(error.message);
  await supabase.from("audit_logs").insert({ actor_id: user?.id ?? null, action: "create", entity_type: "incident", entity_id: data.id, metadata: parsed });
  revalidatePath("/incidentes");
  revalidatePath("/dashboard");
  if (user) redirect(`/incidentes/${data.id}`);
  redirect("/reportar?ok=1");
}

export async function updateIncidentStatusAction(formData: FormData) {
  if (await demoMode()) {
    revalidatePath("/dashboard");
    revalidatePath("/incidentes");
    return;
  }
  const user = await actor();
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  const now = new Date().toISOString();
  const patch: Record<string, string> = { status };
  if (status === "validado") patch.validated_at = now;
  if (status === "en_sitio") patch.arrived_at = now;
  if (status === "resuelto") patch.resolved_at = now;
  const supabase = await createClient();
  const { error } = await supabase.from("incidents").update(patch).eq("id", id);
  if (error) throw new Error(error.message);
  await supabase.from("incident_events").insert({ incident_id: id, actor_id: user?.id ?? null, type: "status", title: `Estado: ${status}`, body: null });
  await supabase.from("audit_logs").insert({ actor_id: user?.id ?? null, action: "status_update", entity_type: "incident", entity_id: id, metadata: patch });
  revalidatePath(`/incidentes/${id}`);
  revalidatePath("/incidentes");
}

export async function assignUnitAction(formData: FormData) {
  if (await demoMode()) {
    revalidatePath("/despacho");
    return;
  }
  const user = await actor();
  const id = String(formData.get("incident_id"));
  const unitId = emptyToNull(formData.get("unit_id"));
  const now = new Date().toISOString();
  const supabase = await createClient();
  const { error } = await supabase.from("incidents").update({ assigned_unit_id: unitId, status: "asignado", assigned_at: now }).eq("id", id);
  if (error) throw new Error(error.message);
  if (unitId) await supabase.from("units").update({ status: "asignada" }).eq("id", unitId);
  await supabase.from("incident_events").insert({ incident_id: id, actor_id: user?.id ?? null, type: "dispatch", title: "Unidad asignada", body: unitId });
  await supabase.from("audit_logs").insert({ actor_id: user?.id ?? null, action: "assign_unit", entity_type: "incident", entity_id: id, metadata: { unit_id: unitId } });
  revalidatePath("/despacho");
  revalidatePath(`/incidentes/${id}`);
}

export async function uploadEvidenceAction(formData: FormData) {
  if (await demoMode()) return;
  const user = await actor();
  const incidentId = String(formData.get("incident_id"));
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) throw new Error("Archivo invalido");
  const service = createServiceClient();
  const path = `${incidentId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const { error: uploadError } = await service.storage.from("evidencias").upload(path, file, { upsert: false, contentType: file.type });
  if (uploadError) throw new Error(uploadError.message);
  const { data: publicUrl } = service.storage.from("evidencias").getPublicUrl(path);
  const { error } = await service.from("attachments").insert({ incident_id: incidentId, uploaded_by: user?.id ?? null, file_name: file.name, file_path: path, file_type: file.type, public_url: publicUrl.publicUrl });
  if (error) throw new Error(error.message);
  revalidatePath(`/incidentes/${incidentId}`);
}

export async function createTrafficEventAction(formData: FormData) {
  if (await demoMode()) {
    revalidatePath("/transito");
    return;
  }
  const supabase = await createClient();
  const payload = {
    title: emptyToNull(formData.get("title")),
    description: emptyToNull(formData.get("description")),
    type: emptyToNull(formData.get("type")) ?? "corte",
    severity: emptyToNull(formData.get("severity")) ?? "media",
    status: emptyToNull(formData.get("status")) ?? "activo",
    jurisdiction_id: emptyToNull(formData.get("jurisdiction_id")),
    lat: asNumber(formData.get("lat")),
    lng: asNumber(formData.get("lng"))
  };
  const { error } = await supabase.from("traffic_events").insert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/transito");
  revalidatePath("/mapa");
}
