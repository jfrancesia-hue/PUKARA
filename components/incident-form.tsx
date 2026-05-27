import { createIncidentAction } from "@/app/actions";
import type { Jurisdiction } from "@/lib/types";

export function IncidentForm({ jurisdictions, citizen = false }: { jurisdictions: Jurisdiction[]; citizen?: boolean }) {
  return (
    <form action={createIncidentAction} className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-glow md:grid-cols-2">
      <div className="md:col-span-2"><label className="text-xs font-bold uppercase tracking-[0.2em] text-arena/60">Titulo</label><input className="field mt-2" name="title" placeholder="Ej: Accidente en avenida principal" required /></div>
      <div><label className="text-xs font-bold uppercase tracking-[0.2em] text-arena/60">Categoria</label><select className="field mt-2" name="category"><option value="seguridad">Seguridad</option><option value="transito">Transito</option><option value="salud">Emergencia medica</option><option value="defensa_civil">Defensa civil</option><option value="disturbios">Disturbios</option></select></div>
      <div><label className="text-xs font-bold uppercase tracking-[0.2em] text-arena/60">Criticidad</label><select className="field mt-2" name="priority"><option value="media">Media</option><option value="alta">Alta</option><option value="critica">Critica</option><option value="baja">Baja</option></select></div>
      {!citizen && <div><label className="text-xs font-bold uppercase tracking-[0.2em] text-arena/60">Estado inicial</label><select className="field mt-2" name="status"><option value="nuevo">Nuevo</option><option value="validado">Validado</option></select></div>}
      <div><label className="text-xs font-bold uppercase tracking-[0.2em] text-arena/60">Jurisdiccion</label><select className="field mt-2" name="jurisdiction_id"><option value="">Sin definir</option>{jurisdictions.map((j) => <option key={j.id} value={j.id}>{j.name}</option>)}</select></div>
      <div><label className="text-xs font-bold uppercase tracking-[0.2em] text-arena/60">Direccion</label><input className="field mt-2" name="address" placeholder="Calle, localidad" /></div>
      <div><label className="text-xs font-bold uppercase tracking-[0.2em] text-arena/60">Latitud</label><input className="field mt-2" name="lat" inputMode="decimal" placeholder="-28.4696" /></div>
      <div><label className="text-xs font-bold uppercase tracking-[0.2em] text-arena/60">Longitud</label><input className="field mt-2" name="lng" inputMode="decimal" placeholder="-65.7795" /></div>
      <div><label className="text-xs font-bold uppercase tracking-[0.2em] text-arena/60">Reportante</label><input className="field mt-2" name="reporter_name" /></div>
      <div><label className="text-xs font-bold uppercase tracking-[0.2em] text-arena/60">Telefono</label><input className="field mt-2" name="reporter_phone" /></div>
      <div className="md:col-span-2"><label className="text-xs font-bold uppercase tracking-[0.2em] text-arena/60">Descripcion</label><textarea className="field mt-2 min-h-32" name="description" placeholder="Detalle operativo, lesionados, riesgos, referencias territoriales..." /></div>
      <div className="md:col-span-2"><button className="btn-primary w-full" type="submit">{citizen ? "Enviar reporte ciudadano" : "Registrar incidente"}</button></div>
    </form>
  );
}
