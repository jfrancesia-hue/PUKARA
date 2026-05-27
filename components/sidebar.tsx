import Link from "next/link";
import { Activity, AlertTriangle, BarChart3, Car, FileText, Gauge, Map, RadioTower, Shield, Siren, Users } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/mapa", label: "Mapa operativo", icon: Map },
  { href: "/incidentes", label: "Incidentes", icon: Siren },
  { href: "/despacho", label: "Despacho", icon: RadioTower },
  { href: "/unidades", label: "Unidades", icon: Shield },
  { href: "/transito", label: "Transito", icon: Car },
  { href: "/alertas", label: "Alertas", icon: AlertTriangle },
  { href: "/reportes", label: "Reportes", icon: BarChart3 },
  { href: "/auditoria", label: "Auditoria", icon: FileText },
  { href: "/reportar", label: "Portal ciudadano", icon: Users }
];

export function AppSidebar({ role }: { role?: string }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-76 shrink-0 overflow-y-auto border-r border-white/10 bg-[#061522]/90 p-5 backdrop-blur-xl lg:block">
      <div className="flex min-h-full flex-col">
        <BrandMark />
        <div className="mt-6 rounded-3xl border border-copper/20 bg-copper/10 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-arena/70">Rol operativo</p>
          <p className="mt-1 text-sm font-bold text-copper">{role ?? "sin perfil"}</p>
        </div>
        <nav className="mt-6 flex-1 space-y-1 pb-5">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-arena/78 transition hover:bg-white/[0.07] hover:text-white">
              <item.icon className="h-4 w-4 text-techno transition group-hover:scale-110" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-3xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-techno"><Activity className="h-4 w-4" /> Realtime activo</div>
        <p className="mt-2 text-xs leading-relaxed text-arena/65">Incidentes, unidades y alertas preparados para sincronizacion Supabase Realtime.</p>
        </div>
      </div>
    </aside>
  );
}
