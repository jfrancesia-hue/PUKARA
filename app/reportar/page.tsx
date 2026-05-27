import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { IncidentForm } from "@/components/incident-form";
import { getJurisdictions } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function ReportarPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const [params, jurisdictions] = await Promise.all([searchParams, getJurisdictions()]);
  return <main className="relative z-10 mx-auto min-h-screen max-w-5xl px-4 py-8"><div className="mb-8 flex items-center justify-between"><BrandMark /><Link className="btn-secondary" href="/login">Ingreso operador</Link></div>{params.ok && <div className="mb-5 rounded-3xl border border-techno/30 bg-techno/10 p-4 font-bold text-techno">Reporte recibido. El centro de control lo validara.</div>}<section className="mb-6 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-glow"><p className="text-xs font-black uppercase tracking-[.28em] text-copper">Portal ciudadano</p><h1 className="mt-2 text-4xl font-black text-white">Reportar emergencia o situacion territorial</h1><p className="mt-3 max-w-3xl text-arena/68">Canal simple para denuncias, accidentes, cortes o emergencias. Los datos ingresan a Supabase como incidente real con estado nuevo.</p></section><IncidentForm jurisdictions={jurisdictions.data} citizen /></main>;
}
