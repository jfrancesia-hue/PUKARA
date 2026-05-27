import Link from "next/link";
import { StatusBadge } from "@/components/status-badge";
import type { Incident } from "@/lib/types";
import { formatDateTime, responseMinutes } from "@/lib/utils";

export function IncidentTable({ incidents }: { incidents: Incident[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045]">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead className="bg-white/[0.06] text-left text-xs uppercase tracking-[0.18em] text-arena/55">
          <tr>
            <th className="px-4 py-4">Codigo</th><th className="px-4 py-4">Incidente</th><th className="px-4 py-4">Zona</th><th className="px-4 py-4">Criticidad</th><th className="px-4 py-4">Estado</th><th className="px-4 py-4">Unidad</th><th className="px-4 py-4">Respuesta</th><th className="px-4 py-4">Creado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {incidents.map((incident) => (
            <tr key={incident.id} className="transition hover:bg-white/[0.04]">
              <td className="px-4 py-4 font-black text-techno"><Link href={`/incidentes/${incident.id}`}>{incident.code}</Link></td>
              <td className="px-4 py-4"><p className="font-bold text-white">{incident.title}</p><p className="text-xs text-arena/55">{incident.category}</p></td>
              <td className="px-4 py-4 text-arena/75">{incident.jurisdictions?.name ?? incident.address ?? "-"}</td>
              <td className="px-4 py-4"><StatusBadge value={incident.priority} kind="priority" /></td>
              <td className="px-4 py-4"><StatusBadge value={incident.status} /></td>
              <td className="px-4 py-4 text-arena/75">{incident.units?.code ?? "sin asignar"}</td>
              <td className="px-4 py-4 text-arena/75">{responseMinutes(incident) ?? "-"} min</td>
              <td className="px-4 py-4 text-arena/65">{formatDateTime(incident.created_at)}</td>
            </tr>
          ))}
          {!incidents.length && <tr><td className="px-4 py-8 text-center text-arena/55" colSpan={8}>Sin registros reales para mostrar.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
