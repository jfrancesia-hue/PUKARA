import { AppShell } from "@/components/app-shell";
import { CsvExport } from "@/components/csv-export";
import { PageHeading } from "@/components/page-heading";
import { ReportCharts } from "@/components/report-charts";
import { IncidentTable } from "@/components/incident-table";
import { getIncidents } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function ReportesPage() {
  const incidents = await getIncidents(500);
  return <AppShell><PageHeading eyebrow="Reportes" title="Analitica territorial" description="Graficos, indicadores y exportacion CSV para gestion ejecutiva." action={<CsvExport incidents={incidents.data} />} /><ReportCharts incidents={incidents.data} /><div className="mt-6"><IncidentTable incidents={incidents.data} /></div></AppShell>;
}
