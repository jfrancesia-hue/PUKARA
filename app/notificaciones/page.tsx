import { Bell, CheckCircle2, Mail, MessageCircle, Smartphone } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { KpiCard } from "@/components/kpi-card";
import { PageHeading } from "@/components/page-heading";
import { notificationInbox, notificationRules } from "@/lib/notifications-demo-data";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function NotificacionesPage() {
  const unread = notificationInbox.filter((item) => !item.read).length;

  return (
    <AppShell>
      <PageHeading
        eyebrow="Comunicaciones"
        title="Notificaciones y reglas de alerta"
        description="Módulo preparado para canales reales: panel interno, email, WhatsApp, push y escalamiento por SLA. Actualmente en modo demo sin envíos externos."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="No leídas" value={unread} hint="Alertas pendientes de atención" icon={Bell} tone="alert" />
        <KpiCard title="Reglas listas" value={notificationRules.filter((rule) => rule.status === "lista").length} hint="Automatizaciones configuradas" icon={CheckCircle2} />
        <KpiCard title="Canales" value="4" hint="Panel, email, WhatsApp y push" icon={MessageCircle} tone="copper" />
        <KpiCard title="SLA" value="3m" hint="Escalamiento crítico sugerido" icon={Smartphone} tone="emergency" />
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
        <article className="glass-panel rounded-3xl p-5">
          <h2 className="section-title">Bandeja demo</h2>
          <div className="mt-4 space-y-3">
            {notificationInbox.map((item) => (
              <div key={item.id} className="rounded-3xl border border-white/10 bg-white/[0.045] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-techno">{item.channel}</p>
                    <h3 className="mt-1 text-lg font-black text-white">{item.title}</h3>
                  </div>
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${item.read ? "border-white/10 bg-white/10 text-arena" : "border-alert/30 bg-alert/10 text-alert"}`}>
                    {item.read ? "leída" : "nueva"}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-arena/68">{item.body}</p>
                <p className="mt-3 text-xs text-arena/45">{formatDateTime(item.createdAt)}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="glass-panel rounded-3xl p-5">
          <h2 className="section-title">Reglas de alerta</h2>
          <div className="mt-4 grid gap-3">
            {notificationRules.map((rule) => (
              <div key={rule.id} className="rounded-3xl border border-white/10 bg-white/[0.045] p-4">
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                  <div>
                    <p className="font-black text-white">{rule.name}</p>
                    <p className="mt-1 text-sm text-arena/60">{rule.target}</p>
                  </div>
                  <span className="rounded-full border border-techno/25 bg-techno/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-techno">{rule.status}</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-copper">
                  <Mail className="h-4 w-4" /> {rule.channel}
                </div>
                <p className="mt-3 rounded-2xl border border-white/10 bg-night/45 p-3 text-xs text-arena/65">{rule.condition}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  );
}
