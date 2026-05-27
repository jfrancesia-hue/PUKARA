import { AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { IncidentTable } from "@/components/incident-table";
import { PageHeading } from "@/components/page-heading";
import { getIncidents } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function AlertasPage() {
  const incidents = await getIncidents();
  const alerts = incidents.data.filter((i) => i.priority === "critica" || (!i.assigned_unit_id && !["resuelto", "cancelado"].includes(i.status)));
  return <AppShell><PageHeading eyebrow="Alertas" title="Criticos y sin asignar" description="Bandeja priorizada para evitar incidentes fuera de SLA operativo." action={<div className="rounded-2xl border border-alert/30 bg-alert/10 px-4 py-3 font-black text-alert"><AlertTriangle className="mr-2 inline h-4 w-4" />{alerts.length}</div>} /><IncidentTable incidents={alerts} /></AppShell>;
}
