import Link from "next/link";
import { AlertTriangle, ArrowLeft, Clock, RadioTower, ShieldCheck, Siren } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { IncidentTable } from "@/components/incident-table";
import { KpiCard } from "@/components/kpi-card";
import { MapSection } from "@/components/map-section";
import { PageHeading } from "@/components/page-heading";
import { ReportCharts } from "@/components/report-charts";
import { demoIncidents, demoKpis, demoTraffic, demoUnits } from "@/lib/demo-data";

export const dynamic = "force-static";

export default function DemoPage() {
  return (
    <main className="relative z-10 min-h-screen bg-night/55 text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-night/85 px-4 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-3">
          <BrandMark />
          <div className="flex items-center gap-2">
            <Link href="/" className="btn-secondary hidden sm:inline-flex">
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
            <Link href="/login" className="btn-primary">Activar version real</Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1800px] px-4 py-6 md:px-8">
        <div className="mb-5 rounded-3xl border border-emergency/30 bg-emergency/10 p-4 text-sm font-semibold text-emergency">
          DEMO COMERCIAL: todos los datos son ficticios. No se conecta a Supabase ni modifica informacion real.
        </div>

        <PageHeading
          eyebrow="Demo PUKARA 360"
          title="Centro de comando con datos ficticios"
          description="Vista completa para presentacion: indicadores, mapa territorial, incidentes, unidades, transito y reportes sin depender aun de la base productiva."
        />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <KpiCard title="Incidentes del dia" value={demoKpis.todays} hint="Registros demo de Catamarca" icon={Siren} />
          <KpiCard title="Activos" value={demoKpis.active} hint="No resueltos ni cancelados" icon={RadioTower} tone="copper" />
          <KpiCard title="Criticos" value={demoKpis.critical} hint="Semaforo rojo operativo" icon={AlertTriangle} tone="alert" />
          <KpiCard title="Respuesta prom." value={`${demoKpis.avgResponse}m`} hint="Indicador ficticio para demo" icon={Clock} tone="emergency" />
          <KpiCard title="Unidades disp." value={demoKpis.availableUnits} hint="Recursos ficticios listos" icon={ShieldCheck} />
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
          <MapSection incidents={demoIncidents} units={demoUnits} traffic={demoTraffic} height={600} />
          <div className="glass-panel rounded-3xl p-5">
            <h2 className="section-title mb-4">Incidentes demo</h2>
            <IncidentTable incidents={demoIncidents} />
          </div>
        </section>

        <section className="mt-6">
          <ReportCharts incidents={demoIncidents} />
        </section>
      </div>
    </main>
  );
}
