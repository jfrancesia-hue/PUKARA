import type { LucideIcon } from "lucide-react";

export function KpiCard({ title, value, hint, icon: Icon, tone = "techno" }: { title: string; value: string | number; hint: string; icon: LucideIcon; tone?: "techno" | "copper" | "alert" | "emergency" }) {
  const toneClass = {
    techno: "text-techno bg-techno/10 border-techno/20",
    copper: "text-copper bg-copper/10 border-copper/20",
    alert: "text-alert bg-alert/10 border-alert/20",
    emergency: "text-emergency bg-emergency/10 border-emergency/20"
  }[tone];
  return (
    <article className="command-surface group rounded-3xl p-5 transition duration-300 hover:-translate-y-0.5 hover:border-techno/25">
      <div className={`absolute inset-x-0 top-0 h-1 ${tone === "alert" ? "bg-alert" : tone === "emergency" ? "bg-emergency" : tone === "copper" ? "bg-copper" : "bg-techno"}`} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="micro-label">{title}</p>
          <p className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">{value}</p>
        </div>
        <div className={`rounded-2xl border p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] ${toneClass}`}><Icon className="h-5 w-5" /></div>
      </div>
      <p className="mt-4 text-sm text-arena/62">{hint}</p>
    </article>
  );
}
