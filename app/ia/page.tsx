import { Bot, BrainCircuit, FileText, Lightbulb, RadioTower } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { KpiCard } from "@/components/kpi-card";
import { PageHeading } from "@/components/page-heading";
import { RiskBadge } from "@/components/risk-badge";
import { aiClassifications, aiRecommendations, aiSituation } from "@/lib/ai-demo-data";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function IAPage() {
  return (
    <AppShell>
      <PageHeading
        eyebrow="IA operativa"
        title="Asistente inteligente para centro de comando"
        description="Módulo listo para integrar IA real: clasifica reportes, resume situación, recomienda despacho y genera partes ejecutivos. Actualmente funciona como demo sin conexión externa."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Confianza demo" value={`${aiSituation.confidence}%`} hint="Score simulado de análisis" icon={BrainCircuit} />
        <KpiCard title="Recomendaciones" value={aiRecommendations.length} hint="Acciones sugeridas al operador" icon={Lightbulb} tone="copper" />
        <KpiCard title="Clasificaciones" value={aiClassifications.length} hint="Reportes ciudadanos analizados" icon={Bot} tone="emergency" />
        <KpiCard title="Partes listos" value="1" hint="Resumen ejecutivo generado" icon={FileText} />
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
        <article className="glass-panel rounded-3xl p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-techno/20 bg-techno/10 p-3 text-techno">
              <RadioTower className="h-6 w-6" />
            </div>
            <div>
              <h2 className="section-title">{aiSituation.title}</h2>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-arena/50">{formatDateTime(aiSituation.generatedAt)}</p>
            </div>
          </div>
          <p className="mt-5 rounded-3xl border border-white/10 bg-white/[0.045] p-5 text-lg leading-relaxed text-arena/80">
            {aiSituation.summary}
          </p>
          <div className="mt-5 rounded-3xl border border-copper/20 bg-copper/10 p-4">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-copper">Producción</p>
            <p className="mt-2 text-sm leading-relaxed text-arena/75">
              Cuando se conecte IA real, este panel podrá consultar incidentes, unidades, clima, riesgo territorial y auditoría para generar recomendaciones verificables.
            </p>
          </div>
        </article>

        <div className="space-y-4">
          {aiRecommendations.map((item) => (
            <article key={item.id} className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-techno">Recomendación IA</p>
                  <h3 className="mt-2 text-xl font-black text-white">{item.title}</h3>
                </div>
                <RiskBadge value={item.priority} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-arena/65">{item.reason}</p>
              <p className="mt-3 rounded-2xl border border-techno/15 bg-techno/10 p-3 text-sm text-arena/80">
                <b className="text-techno">Acción sugerida:</b> {item.action}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 glass-panel rounded-3xl p-5">
        <h2 className="section-title">Clasificación automática de reportes</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {aiClassifications.map((item) => (
            <article key={item.input} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
              <p className="text-sm italic text-arena/70">“{item.input}”</p>
              <div className="mt-4 space-y-2 text-sm">
                <p><b className="text-techno">Categoría:</b> {item.category}</p>
                <p><b className="text-copper">Prioridad:</b> {item.priority}</p>
                <p><b className="text-techno">Extrae:</b> {item.extracted}</p>
                <p><b className="text-copper">Unidad:</b> {item.suggestedUnit}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
