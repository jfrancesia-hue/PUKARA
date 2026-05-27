import type { LucideIcon } from "lucide-react";

export function KpiCard({ title, value, hint, icon: Icon, tone = "techno" }: { title: string; value: string | number; hint: string; icon: LucideIcon; tone?: "techno" | "copper" | "alert" | "emergency" }) {
  const toneClass = {
    techno: "text-techno bg-techno/10 border-techno/20",
    copper: "text-copper bg-copper/10 border-copper/20",
    alert: "text-alert bg-alert/10 border-alert/20",
    emergency: "text-emergency bg-emergency/10 border-emergency/20"
  }[tone];
  return (
    <article className="glass-panel rounded-3xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-arena/55">{title}</p>
          <p className="mt-3 text-4xl font-black tracking-tight text-white">{value}</p>
        </div>
        <div className={`rounded-2xl border p-3 ${toneClass}`}><Icon className="h-5 w-5" /></div>
      </div>
      <p className="mt-4 text-sm text-arena/62">{hint}</p>
    </article>
  );
}
