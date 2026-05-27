import { AlertTriangle, Flame, RadioTower, Satellite, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { KpiCard } from "@/components/kpi-card";
import { PageHeading } from "@/components/page-heading";
import { RiskBadge } from "@/components/risk-badge";
import { formatDateTime } from "@/lib/utils";
import { riskSummary, riskZones, satelliteLayers } from "@/lib/territorial-risk-data";

export const dynamic = "force-dynamic";

export default function TerritorioPage() {
  return (
    <AppShell>
      <PageHeading
        eyebrow="Monitoreo satelital"
        title="Riesgo territorial y prevención de incendios"
        description="Modulo preventivo para anticipar focos de calor, sequia, tormentas, inundaciones y cambios de cobertura con inteligencia territorial."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Riesgo critico" value={riskSummary.critical} hint="Zonas que requieren verificacion inmediata" icon={Flame} tone="alert" />
        <KpiCard title="Riesgo alto" value={riskSummary.high} hint="Alertas preventivas activas" icon={AlertTriangle} tone="emergency" />
        <KpiCard title="Alertas satelitales" value={riskSummary.satelliteAlerts} hint="Anomalias de fuente satelital" icon={Satellite} />
        <KpiCard title="Confianza prom." value={`${riskSummary.avgConfidence}%`} hint="Score demo de deteccion" icon={ShieldCheck} tone="copper" />
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-[1fr_.8fr]">
        <div className="glass-panel rounded-3xl p-5">
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="section-title">Alertas preventivas</h2>
              <p className="mt-1 text-sm text-arena/60">Datos ficticios para demo comercial. Preparado para integrar fuentes satelitales reales.</p>
            </div>
            <div className="rounded-2xl border border-techno/20 bg-techno/10 px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-techno">
              <RadioTower className="mr-2 inline h-3 w-3" /> vigilancia activa
            </div>
          </div>

          <div className="grid gap-3">
            {riskZones.map((zone) => (
              <article key={zone.id} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-techno">{zone.source} · {zone.type}</p>
                    <h3 className="mt-2 text-xl font-black text-white">{zone.name}</h3>
                    <p className="mt-1 text-sm text-arena/60">{zone.jurisdiction} · {formatDateTime(zone.updatedAt)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <RiskBadge value={zone.risk} />
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs font-bold text-arena/70">{zone.confidence}%</span>
                  </div>
                </div>
                <p className="mt-4 rounded-2xl border border-copper/20 bg-copper/10 p-3 text-sm leading-relaxed text-arena/78">
                  <b className="text-copper">Recomendación:</b> {zone.recommendation}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="glass-panel rounded-3xl p-5">
            <h2 className="section-title">Capas satelitales</h2>
            <div className="mt-4 space-y-3">
              {satelliteLayers.map((layer) => (
                <div key={layer.id} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black text-white">{layer.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-arena/62">{layer.description}</p>
                    </div>
                    <span className="rounded-full border border-techno/25 bg-techno/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-techno">
                      {layer.status}
                    </span>
                  </div>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-copper">{layer.coverage}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emergency/30 bg-emergency/10 p-5">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-emergency">Roadmap productivo</p>
            <h3 className="mt-2 text-2xl font-black text-white">Integrable con satelites y clima real</h3>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-arena/75">
              <li>• focos de calor y anomalias termicas</li>
              <li>• indice vegetal y sequia</li>
              <li>• estaciones meteorologicas</li>
              <li>• alertas automáticas a defensa civil</li>
              <li>• despacho preventivo de brigadas</li>
            </ul>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
