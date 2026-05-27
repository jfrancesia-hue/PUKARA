import { createTrafficEventAction } from "@/app/actions";
import { AppShell } from "@/components/app-shell";
import { ErrorPanel } from "@/components/error-panel";
import { PageHeading } from "@/components/page-heading";
import { StatusBadge } from "@/components/status-badge";
import { getJurisdictions, getTrafficEvents } from "@/lib/supabase/queries";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function TransitoPage() {
  const [traffic, jurisdictions] = await Promise.all([getTrafficEvents(), getJurisdictions()]);
  return <AppShell><PageHeading eyebrow="Transito" title="Cortes, accidentes y eventos" description="Administracion vial para coordinacion con seguridad, municipios y centros de monitoreo." /><ErrorPanel errors={[traffic.error, jurisdictions.error].filter(Boolean) as string[]} /><section className="grid gap-6 xl:grid-cols-[.7fr_1.3fr]"><form action={createTrafficEventAction} className="glass-panel grid gap-3 rounded-3xl p-5"><h2 className="section-title">Nuevo evento vial</h2><input className="field" name="title" placeholder="Titulo" required /><textarea className="field" name="description" placeholder="Descripcion" /><select className="field" name="type"><option value="corte">Corte</option><option value="accidente">Accidente</option><option value="evento">Evento</option><option value="obra">Obra</option></select><select className="field" name="severity"><option value="media">Media</option><option value="alta">Alta</option><option value="critica">Critica</option><option value="baja">Baja</option></select><select className="field" name="jurisdiction_id"><option value="">Jurisdiccion</option>{jurisdictions.data.map((j) => <option key={j.id} value={j.id}>{j.name}</option>)}</select><input className="field" name="lat" placeholder="Lat" /><input className="field" name="lng" placeholder="Lng" /><button className="btn-primary" type="submit">Crear evento</button></form><div className="space-y-3">{traffic.data.map((event) => <article key={event.id} className="rounded-3xl border border-white/10 bg-white/[0.05] p-5"><div className="flex justify-between gap-3"><div><h3 className="text-xl font-black text-white">{event.title}</h3><p className="mt-1 text-sm text-arena/60">{event.jurisdictions?.name ?? "-"} · {formatDateTime(event.created_at)}</p></div><StatusBadge value={event.severity} kind="priority" /></div><p className="mt-3 text-sm text-arena/70">{event.description}</p></article>)}</div></section></AppShell>;
}
