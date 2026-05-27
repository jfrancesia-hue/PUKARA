import Link from "next/link";
import { Activity, AlertTriangle, BarChart3, Bell, Bot, Car, FileText, Gauge, Map, RadioTower, Satellite, Shield, Siren, Users } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/mapa", label: "Mapa operativo", icon: Map },
  { href: "/incidentes", label: "Incidentes", icon: Siren },
  { href: "/despacho", label: "Despacho", icon: RadioTower },
  { href: "/unidades", label: "Unidades", icon: Shield },
  { href: "/territorio", label: "Riesgo territorial", icon: Satellite },
  { href: "/ia", label: "IA operativa", icon: Bot },
  { href: "/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/transito", label: "Transito", icon: Car },
  { href: "/alertas", label: "Alertas", icon: AlertTriangle },
  { href: "/reportes", label: "Reportes", icon: BarChart3 },
  { href: "/auditoria", label: "Auditoria", icon: FileText },
  { href: "/reportar", label: "Portal ciudadano", icon: Users }
];

export function AppSidebar({ role }: { role?: string }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 overflow-y-auto border-r border-techno/15 bg-[#061522]/92 p-3 backdrop-blur-xl lg:block xl:w-68">
      <div className="flex min-h-full flex-col">
        <div className="px-2 pt-2"><BrandMark /></div>
        <div className="mt-4 rounded-2xl border border-copper/20 bg-copper/10 p-3">
          <p className="text-xs uppercase tracking-[0.25em] text-arena/70">Rol operativo</p>
          <p className="mt-1 text-sm font-bold text-copper">{role ?? "sin perfil"}</p>
        </div>
        <nav className="mt-4 flex-1 space-y-1 pb-4">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="group flex items-center gap-2.5 rounded-xl border border-transparent px-3 py-2.5 text-[13px] font-bold text-techno/90 transition hover:border-techno/30 hover:bg-techno/10 hover:text-white">
              <item.icon className="h-4 w-4 shrink-0 text-techno transition group-hover:scale-110" />
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl border border-techno/15 bg-techno/[0.06] p-3">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-techno"><Activity className="h-3.5 w-3.5" /> Realtime listo</div>
        <p className="mt-2 text-[11px] leading-relaxed text-arena/60">Preparado para sincronizacion Supabase cuando se active producción.</p>
        </div>
      </div>
    </aside>
  );
}
