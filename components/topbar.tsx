import Link from "next/link";
import { Maximize2, Radio, Search } from "lucide-react";
import { signOutAction } from "@/app/actions";
import { BrandMark } from "@/components/brand-mark";

export function Topbar({ profile, email }: { profile: { full_name?: string | null } | null; email: string | null }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-night/80 px-4 py-3 backdrop-blur-xl md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-3">
        <div className="lg:hidden"><BrandMark compact /></div>
        <div className="hidden flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-arena/55 md:flex">
          <Search className="h-4 w-4" />
          <span className="text-sm">Buscar por codigo SEG, zona, unidad o categoria...</span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/mapa?fullscreen=1" className="btn-secondary hidden md:inline-flex"><Maximize2 className="h-4 w-4" /> Comando</Link>
          <div className="rounded-2xl border border-techno/20 bg-techno/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-techno"><Radio className="mr-2 inline h-3 w-3" /> Vivo</div>
          <div className="hidden text-right md:block">
            <p className="text-sm font-bold text-white">{profile?.full_name ?? email ?? "Operador"}</p>
            <p className="text-xs text-arena/55">Nativos Consultora Digital</p>
          </div>
          <form action={signOutAction}><button className="btn-secondary py-2" type="submit">Salir</button></form>
        </div>
      </div>
    </header>
  );
}
