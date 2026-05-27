import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { IncidentForm } from "@/components/incident-form";
import { getJurisdictions } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function ReportarPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const [params, jurisdictions] = await Promise.all([searchParams, getJurisdictions()]);
  return <main className="relative z-10 mx-auto min-h-screen max-w-5xl px-4 py-8"><div className="mb-8 flex items-center justify-between"><BrandMark /><div className="flex gap-2"><Link className="btn-secondary" href="/"><ArrowLeft className="h-4 w-4" /> Volver</Link><Link className="btn-secondary" href="/login">Ingreso operador</Link></div></div>{params.ok && <div className="mb-5 rounded-3xl border border-techno/30 bg-techno/10 p-4 font-bold text-techno">Reporte recibido. El centro de control lo validara.</div>}<section className="command-surface topo-lines mb-6 p-6 md:p-8"><div className="flex flex-col gap-5 md:flex-row md:items-center"><div className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl border border-alert/25 bg-alert/10 text-alert"><ShieldAlert className="h-8 w-8" /></div><div><p className="text-xs font-black uppercase tracking-[.28em] text-copper">Portal ciudadano externo</p><h1 className="mt-2 text-4xl font-black text-white">Reportar emergencia o situacion territorial</h1><p className="mt-3 max-w-3xl text-arena/72">Canal público separado del sistema operativo interno. Permite enviar denuncias, accidentes, cortes, riesgos ambientales o emergencias para validación del centro de control.</p></div></div></section><IncidentForm jurisdictions={jurisdictions.data} citizen /></main>;
}
