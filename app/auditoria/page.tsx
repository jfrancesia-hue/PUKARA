import { AppShell } from "@/components/app-shell";
import { PageHeading } from "@/components/page-heading";
import { ErrorPanel } from "@/components/error-panel";
import { getAuditLogs } from "@/lib/supabase/queries";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AuditoriaPage() {
  const logs = await getAuditLogs();
  return <AppShell><PageHeading eyebrow="Auditoria" title="Registro completo de acciones" description="Trazabilidad institucional para control interno, seguridad y rendicion." /><ErrorPanel errors={[logs.error].filter(Boolean) as string[]} /><div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045]"><table className="w-full min-w-[800px] text-sm"><thead className="bg-white/[0.06] text-left text-xs uppercase tracking-[.18em] text-arena/55"><tr><th className="px-4 py-4">Fecha</th><th className="px-4 py-4">Accion</th><th className="px-4 py-4">Entidad</th><th className="px-4 py-4">Actor</th><th className="px-4 py-4">Metadata</th></tr></thead><tbody className="divide-y divide-white/10">{logs.data.map((log) => <tr key={log.id}><td className="px-4 py-4 text-arena/70">{formatDateTime(log.created_at)}</td><td className="px-4 py-4 font-bold text-techno">{log.action}</td><td className="px-4 py-4 text-white">{log.entity_type}</td><td className="px-4 py-4 text-arena/60">{log.actor_id ?? "sistema"}</td><td className="px-4 py-4 text-xs text-arena/60">{JSON.stringify(log.metadata)}</td></tr>)}{!logs.data.length && <tr><td colSpan={5} className="px-4 py-8 text-center text-arena/55">Sin eventos de auditoria.</td></tr>}</tbody></table></div></AppShell>;
}
