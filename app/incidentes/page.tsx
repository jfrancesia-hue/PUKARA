import { AppShell } from "@/components/app-shell";
import { IncidentForm } from "@/components/incident-form";
import { IncidentTable } from "@/components/incident-table";
import { PageHeading } from "@/components/page-heading";
import { ErrorPanel } from "@/components/error-panel";
import { getIncidents, getJurisdictions } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function IncidentesPage() {
  const [incidents, jurisdictions] = await Promise.all([getIncidents(), getJurisdictions()]);
  return <AppShell><PageHeading eyebrow="Gestion integral" title="Incidentes" description="CRUD operativo, trazabilidad, evidencias y asignacion de recursos en una sola consola." /><ErrorPanel errors={[incidents.error, jurisdictions.error].filter(Boolean) as string[]} /><section className="grid gap-6 xl:grid-cols-[.8fr_1.2fr]"><IncidentForm jurisdictions={jurisdictions.data} /><IncidentTable incidents={incidents.data} /></section></AppShell>;
}
