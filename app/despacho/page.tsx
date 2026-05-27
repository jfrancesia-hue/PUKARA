import { AppShell } from "@/components/app-shell";
import { DispatchPanel } from "@/components/dispatch-panel";
import { ErrorPanel } from "@/components/error-panel";
import { PageHeading } from "@/components/page-heading";
import { getIncidents, getUnits } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function DespachoPage() {
  const [incidents, units] = await Promise.all([getIncidents(), getUnits()]);
  return <AppShell><PageHeading eyebrow="Despacho" title="Asignacion y control de tiempos" description="Gestion de recursos, estados operativos y seguimiento de respuesta." /><ErrorPanel errors={[incidents.error, units.error].filter(Boolean) as string[]} /><DispatchPanel incidents={incidents.data} units={units.data} /></AppShell>;
}
