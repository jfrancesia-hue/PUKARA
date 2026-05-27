import { AppShell } from "@/components/app-shell";
import { PageHeading } from "@/components/page-heading";
import { ErrorPanel } from "@/components/error-panel";
import { getUnits } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function UnidadesPage() {
  const units = await getUnits();
  return <AppShell><PageHeading eyebrow="Recursos" title="Unidades operativas" description="Patrulleros, motos, ambulancias y defensa civil con estado y posicion." /><ErrorPanel errors={[units.error].filter(Boolean) as string[]} /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{units.data.map((unit) => <article key={unit.id} className="glass-panel rounded-3xl p-5"><p className="text-xs font-black uppercase tracking-[.22em] text-techno">{unit.code}</p><h3 className="mt-2 text-xl font-black text-white">{unit.name}</h3><p className="mt-2 text-sm text-arena/65">{unit.type}</p><div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-bold text-copper">{unit.status}</div></article>)}{!units.data.length && <p className="text-arena/60">Sin unidades cargadas.</p>}</div></AppShell>;
}
