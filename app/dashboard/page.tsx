import { AlertTriangle, Clock, RadioTower, ShieldCheck, Siren } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ErrorPanel } from "@/components/error-panel";
import { IncidentTable } from "@/components/incident-table";
import { KpiCard } from "@/components/kpi-card";
import { MapSection } from "@/components/map-section";
import { PageHeading } from "@/components/page-heading";
import { RealtimeIndicator } from "@/components/realtime-indicator";
import { ReportCharts } from "@/components/report-charts";
import { getDashboardData } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const data = await getDashboardData();
  return <AppShell><PageHeading eyebrow="Centro de comando" title="Situacion territorial en tiempo real" description="KPIs ejecutivos, mapa operativo, incidentes activos y lectura integral para toma de decision provincial." action={<RealtimeIndicator />} /><ErrorPanel errors={data.errors} />
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <KpiCard title="Incidentes del dia" value={data.kpis.todays} hint="Registros ingresados desde las 00:00" icon={Siren} />
      <KpiCard title="Activos" value={data.kpis.active} hint="No resueltos ni cancelados" icon={RadioTower} tone="copper" />
      <KpiCard title="Criticos" value={data.kpis.critical} hint="Semaforo rojo operativo" icon={AlertTriangle} tone="alert" />
      <KpiCard title="Respuesta prom." value={data.kpis.avgResponse === null ? "-" : `${data.kpis.avgResponse}m`} hint="Creacion hasta arribo/resolucion" icon={Clock} tone="emergency" />
      <KpiCard title="Unidades disp." value={data.kpis.availableUnits} hint="Recursos listos para despacho" icon={ShieldCheck} />
    </section>
    <section className="mt-6 grid gap-5 xl:grid-cols-[1.2fr_.8fr]"><div className="command-surface p-3"><MapSection incidents={data.incidents} units={data.units} traffic={data.traffic} /></div><div className="command-surface rounded-3xl p-5"><h2 className="section-title mb-4">Panel situacion actual</h2><IncidentTable incidents={data.incidents.slice(0, 6)} /></div></section>
    <section className="mt-6"><ReportCharts incidents={data.incidents} /></section>
  </AppShell>;
}
