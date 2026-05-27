import { createClient } from "@/lib/supabase/server";
import type { AuditLog, Incident, Jurisdiction, TrafficEvent, Unit } from "@/lib/types";

export type QueryResult<T> = { data: T; error?: string };

function errMessage(error: unknown) {
  if (!error) return undefined;
  if (typeof error === "object" && error !== null && "message" in error) return String((error as { message: unknown }).message);
  return String(error);
}

export async function getProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, profile: null };
  const { data } = await supabase.from("profiles").select("*, jurisdictions(*)").eq("id", user.id).maybeSingle();
  return { user, profile: data };
}

export async function getJurisdictions(): Promise<QueryResult<Jurisdiction[]>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("jurisdicciones").select("*").order("name");
  return { data: (data ?? []) as Jurisdiction[], error: errMessage(error) };
}

export async function getUnits(): Promise<QueryResult<Unit[]>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("units").select("*").order("code");
  return { data: (data ?? []) as Unit[], error: errMessage(error) };
}

export async function getIncidents(limit = 80): Promise<QueryResult<Incident[]>> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("incidents")
    .select("*, jurisdictions(*), units(*)")
    .order("created_at", { ascending: false })
    .limit(limit);
  return { data: (data ?? []) as Incident[], error: errMessage(error) };
}

export async function getIncident(id: string): Promise<QueryResult<Incident | null>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("incidents").select("*, jurisdictions(*), units(*)").eq("id", id).maybeSingle();
  return { data: data as Incident | null, error: errMessage(error) };
}

export async function getIncidentEvents(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("incident_events").select("*").eq("incident_id", id).order("created_at", { ascending: true });
  return { data: data ?? [], error: errMessage(error) };
}

export async function getAttachments(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("attachments").select("*").eq("incident_id", id).order("created_at", { ascending: false });
  return { data: data ?? [], error: errMessage(error) };
}

export async function getTrafficEvents(): Promise<QueryResult<TrafficEvent[]>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("traffic_events").select("*, jurisdictions(*)").order("created_at", { ascending: false });
  return { data: (data ?? []) as TrafficEvent[], error: errMessage(error) };
}

export async function getAuditLogs(): Promise<QueryResult<AuditLog[]>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("audit_logs").select("*").order("created_at", { ascending: false }).limit(200);
  return { data: (data ?? []) as AuditLog[], error: errMessage(error) };
}

export async function getDashboardData() {
  const [incidentsResult, unitsResult, trafficResult] = await Promise.all([getIncidents(300), getUnits(), getTrafficEvents()]);
  const incidents = incidentsResult.data;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todays = incidents.filter((incident) => new Date(incident.created_at) >= today);
  const active = incidents.filter((incident) => !["resuelto", "cancelado"].includes(incident.status));
  const critical = active.filter((incident) => incident.priority === "critica");
  const responseValues = incidents
    .map((incident) => {
      const end = incident.arrived_at ?? incident.resolved_at;
      if (!end) return null;
      return Math.max(0, Math.round((new Date(end).getTime() - new Date(incident.created_at).getTime()) / 60000));
    })
    .filter((value): value is number => value !== null);
  const avgResponse = responseValues.length ? Math.round(responseValues.reduce((a, b) => a + b, 0) / responseValues.length) : null;
  const availableUnits = unitsResult.data.filter((unit) => unit.status === "disponible").length;
  return {
    incidents,
    units: unitsResult.data,
    traffic: trafficResult.data,
    kpis: {
      todays: todays.length,
      active: active.length,
      critical: critical.length,
      avgResponse,
      availableUnits
    },
    errors: [incidentsResult.error, unitsResult.error, trafficResult.error].filter(Boolean) as string[]
  };
}
