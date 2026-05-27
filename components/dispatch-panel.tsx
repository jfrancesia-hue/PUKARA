import { assignUnitAction, updateIncidentStatusAction } from "@/app/actions";
import { StatusBadge } from "@/components/status-badge";
import type { Incident, Unit } from "@/lib/types";

export function DispatchPanel({ incidents, units }: { incidents: Incident[]; units: Unit[] }) {
  const pending = incidents.filter((incident) => !["resuelto", "cancelado"].includes(incident.status));
  return (
    <div className="grid gap-4">
      {pending.map((incident) => (
        <article key={incident.id} className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
            <div><p className="text-sm font-black text-techno">{incident.code}</p><h3 className="mt-1 text-xl font-black text-white">{incident.title}</h3><p className="mt-2 text-sm text-arena/60">{incident.address ?? incident.jurisdictions?.name ?? "Ubicacion no informada"}</p></div>
            <div className="flex gap-2"><StatusBadge value={incident.priority} kind="priority" /><StatusBadge value={incident.status} /></div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
            <form action={assignUnitAction} className="flex flex-col gap-2 md:flex-row">
              <input type="hidden" name="incident_id" value={incident.id} />
              <select className="field" name="unit_id" defaultValue={incident.assigned_unit_id ?? ""}><option value="">Seleccionar unidad</option>{units.map((unit) => <option key={unit.id} value={unit.id}>{unit.code} · {unit.name} · {unit.status}</option>)}</select>
              <button className="btn-primary" type="submit">Asignar</button>
            </form>
            <form action={updateIncidentStatusAction} className="flex gap-2">
              <input type="hidden" name="id" value={incident.id} />
              <select className="field" name="status" defaultValue={incident.status}><option value="validado">Validado</option><option value="en_camino">En camino</option><option value="en_sitio">En sitio</option><option value="resuelto">Resuelto</option><option value="cancelado">Cancelado</option></select>
              <button className="btn-secondary" type="submit">Actualizar</button>
            </form>
          </div>
        </article>
      ))}
      {!pending.length && <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-10 text-center text-arena/60">No hay incidentes activos.</div>}
    </div>
  );
}
