"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, Gauge, Map, Menu, Siren } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Inicio", icon: Gauge },
  { href: "/mapa", label: "Mapa", icon: Map },
  { href: "/incidentes", label: "Incidentes", icon: Siren },
  { href: "/alertas", label: "Alertas", icon: AlertTriangle },
  { href: "/ia", label: "Más", icon: Menu }
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 rounded-[1.4rem] border border-white/10 bg-[#061522]/92 p-2 shadow-[0_20px_80px_rgba(0,0,0,.45)] backdrop-blur-2xl lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-black uppercase tracking-[0.08em] text-arena/55 transition",
                active ? "bg-techno/12 text-techno" : "hover:bg-white/[0.06] hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
