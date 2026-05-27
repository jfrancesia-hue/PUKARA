"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, AlertTriangle, BarChart3, Bell, Bot, Car, FileText, Gauge, Map, RadioTower, Satellite, Shield, Siren } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { cn } from "@/lib/utils";

const toneStyles = {
  verde: {
    text: "text-[#6ee7a8]",
    icon: "text-[#35d889]",
    hover: "hover:border-[#35d889]/30 hover:bg-[#35d889]/8",
    active: "border-[#35d889]/30 bg-[#35d889]/8",
    line: "bg-[#35d889]"
  },
  amarillo: {
    text: "text-emergency",
    icon: "text-emergency",
    hover: "hover:border-emergency/35 hover:bg-emergency/8",
    active: "border-emergency/35 bg-emergency/8",
    line: "bg-emergency"
  },
  rojo: {
    text: "text-alert",
    icon: "text-alert",
    hover: "hover:border-alert/35 hover:bg-alert/8",
    active: "border-alert/35 bg-alert/8",
    line: "bg-alert"
  }
} as const;

const items = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge, tone: "verde" },
  { href: "/mapa", label: "Mapa operativo", icon: Map, tone: "verde" },
  { href: "/incidentes", label: "Incidentes", icon: Siren, tone: "amarillo" },
  { href: "/despacho", label: "Despacho", icon: RadioTower, tone: "amarillo" },
  { href: "/unidades", label: "Unidades", icon: Shield, tone: "verde" },
  { href: "/territorio", label: "Riesgo territorial", icon: Satellite, tone: "rojo" },
  { href: "/ia", label: "IA operativa", icon: Bot, tone: "verde" },
  { href: "/notificaciones", label: "Notificaciones", icon: Bell, tone: "amarillo" },
  { href: "/transito", label: "Transito", icon: Car, tone: "amarillo" },
  { href: "/alertas", label: "Alertas", icon: AlertTriangle, tone: "rojo" },
  { href: "/reportes", label: "Reportes", icon: BarChart3, tone: "verde" },
  { href: "/auditoria", label: "Auditoria", icon: FileText, tone: "verde" }
] as const;

export function AppSidebar({ role }: { role?: string }) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 overflow-y-auto border-r border-techno/15 bg-[#061522]/92 p-3 backdrop-blur-xl lg:block xl:w-68">
      <div className="flex min-h-full flex-col">
        <div className="px-2 pt-2"><BrandMark /></div>
        <div className="mt-4 rounded-2xl border border-copper/20 bg-copper/10 p-3">
          <p className="text-xs uppercase tracking-[0.25em] text-arena/70">Rol operativo</p>
          <p className="mt-1 text-sm font-bold text-copper">{role ?? "sin perfil"}</p>
        </div>
        <nav className="mt-4 flex-1 space-y-1 pb-4">
          {items.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));
            const tone = toneStyles[item.tone];
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-2.5 overflow-hidden rounded-xl border px-3 py-2.5 text-[13px] font-bold transition",
                  "border-transparent bg-transparent hover:text-white",
                  tone.text,
                  tone.hover,
                  active && tone.active
                )}
              >
                <span className={cn("absolute bottom-2 left-0 top-2 w-0.5 rounded-r-full bg-transparent opacity-0 transition group-hover:opacity-100", active && `opacity-100 ${tone.line}`)} />
                <item.icon className={cn("h-4 w-4 shrink-0 opacity-85 transition group-hover:scale-110 group-hover:opacity-100", tone.icon)} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-2xl border border-techno/15 bg-techno/[0.06] p-3">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-techno"><Activity className="h-3.5 w-3.5" /> Realtime listo</div>
        <p className="mt-2 text-[11px] leading-relaxed text-arena/60">Preparado para sincronizacion Supabase cuando se active producción.</p>
        </div>
      </div>
    </aside>
  );
}
