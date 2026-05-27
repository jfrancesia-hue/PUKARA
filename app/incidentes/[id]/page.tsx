import Image from "next/image";
import { notFound } from "next/navigation";
import { assignUnitAction, updateIncidentStatusAction, uploadEvidenceAction } from "@/app/actions";
import { AppShell } from "@/components/app-shell";
import { PageHeading } from "@/components/page-heading";
import { StatusBadge } from "@/components/status-badge";
import { getAttachments, getIncident, getIncidentEvents, getUnits } from "@/lib/supabase/queries";
import { formatDateTime, responseMinutes } from "@/lib/utils";

export const dynamic = "force-dynamic";

type EventRow = { id: string; title: string; type: string; body: string | null; created_at: string };
type AttachmentRow = { id: string; file_name: string; file_type: string | null; public_url: string };

export default async function IncidentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [incidentResult, events, attachments, units] = await Promise.all([getIncident(id), getIncidentEvents(id), getAttachments(id), getUnits()]);
  const incident = incidentResult.data;
  if (!incident) notFound();
  return <AppShell><PageHeading eyebrow={incident.code} title={incident.title} description={incident.description ?? "Sin descripcion ampliada."} action={<div className="flex gap-2"><StatusBadge value={incident.priority} kind="priority" /><StatusBadge value={incident.status} /></div>} />
    <section className="grid gap-6 xl:grid-cols-[1fr_.8fr]"><div className="space-y-5"><article className="glass-panel rounded-3xl p-5"><h2 className="section-title">Datos operativos</h2><dl className="mt-4 grid gap-4 md:grid-cols-2"><div><dt className="text-xs uppercase tracking-[.2em] text-arena/50">Ubicacion</dt><dd className="mt-1 text-white">{incident.address ?? incident.jurisdictions?.name ?? "-"}</dd></div><div><dt className="text-xs uppercase tracking-[.2em] text-arena/50">Unidad</dt><dd className="mt-1 text-white">{incident.units?.code ?? "Sin asignar"}</dd></div><div><dt className="text-xs uppercase tracking-[.2em] text-arena/50">Creado</dt><dd className="mt-1 text-white">{formatDateTime(incident.created_at)}</dd></div><div><dt className="text-xs uppercase tracking-[.2em] text-arena/50">Tiempo respuesta</dt><dd className="mt-1 text-white">{responseMinutes(incident) ?? "-"} min</dd></div></dl></article>
      <article className="glass-panel rounded-3xl p-5"><h2 className="section-title">Timeline</h2><div className="mt-4 space-y-3">{(events.data as EventRow[]).map((event) => <div key={event.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="font-bold text-techno">{event.title}</p><p className="text-xs text-arena/55">{formatDateTime(event.created_at)} · {event.type}</p>{event.body && <p className="mt-2 text-sm text-arena/70">{event.body}</p>}</div>)}{!events.data.length && <p className="text-arena/55">Sin eventos registrados.</p>}</div></article>
      <article className="glass-panel rounded-3xl p-5"><h2 className="section-title">Evidencias</h2><form action={uploadEvidenceAction} className="mt-4 flex flex-col gap-3 md:flex-row"><input type="hidden" name="incident_id" value={incident.id} /><input className="field" name="file" type="file" accept="image/*,.pdf" /><button className="btn-primary" type="submit">Subir evidencia</button></form><div className="mt-4 grid gap-3 md:grid-cols-3">{(attachments.data as AttachmentRow[]).map((file) => <a href={file.public_url} target="_blank" className="rounded-2xl border border-white/10 bg-white/[0.04] p-3" key={file.id}>{file.file_type?.startsWith("image/") ? <Image src={file.public_url} alt={file.file_name} width={320} height={180} className="h-32 w-full rounded-xl object-cover" /> : null}<p className="mt-2 truncate text-sm text-arena/75">{file.file_name}</p></a>)}</div></article></div>
      <aside className="space-y-5"><article className="glass-panel rounded-3xl p-5"><h2 className="section-title">Despacho</h2><form action={assignUnitAction} className="mt-4 space-y-3"><input type="hidden" name="incident_id" value={incident.id} /><select className="field" name="unit_id" defaultValue={incident.assigned_unit_id ?? ""}><option value="">Seleccionar unidad</option>{units.data.map((unit) => <option key={unit.id} value={unit.id}>{unit.code} · {unit.name}</option>)}</select><button className="btn-primary w-full" type="submit">Asignar unidad</button></form></article><article className="glass-panel rounded-3xl p-5"><h2 className="section-title">Estado</h2><form action={updateIncidentStatusAction} className="mt-4 space-y-3"><input type="hidden" name="id" value={incident.id} /><select className="field" name="status" defaultValue={incident.status}><option value="nuevo">Nuevo</option><option value="validado">Validado</option><option value="asignado">Asignado</option><option value="en_camino">En camino</option><option value="en_sitio">En sitio</option><option value="resuelto">Resuelto</option><option value="cancelado">Cancelado</option></select><button className="btn-secondary w-full" type="submit">Actualizar estado</button></form></article></aside></section>
  </AppShell>;
}
