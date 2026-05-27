import type { Incident, TrafficEvent, Unit } from "@/lib/types";

const now = new Date();
const iso = (minutesAgo: number) => new Date(now.getTime() - minutesAgo * 60_000).toISOString();

export const demoUnits: Unit[] = [
  {
    id: "demo-unit-1",
    code: "MOV-101",
    type: "patrullero",
    name: "Patrulla Capital Norte",
    status: "disponible",
    jurisdiction_id: "capital",
    current_lat: -28.4631,
    current_lng: -65.7809
  },
  {
    id: "demo-unit-2",
    code: "MOT-221",
    type: "moto",
    name: "Moto Transito Centro",
    status: "asignada",
    jurisdiction_id: "capital",
    current_lat: -28.4711,
    current_lng: -65.7762
  },
  {
    id: "demo-unit-3",
    code: "AMB-031",
    type: "ambulancia",
    name: "Ambulancia Valle Viejo",
    status: "en_camino",
    jurisdiction_id: "valle-viejo",
    current_lat: -28.5197,
    current_lng: -65.7079
  },
  {
    id: "demo-unit-4",
    code: "DC-404",
    type: "defensa civil",
    name: "Respuesta Belen",
    status: "disponible",
    jurisdiction_id: "belen",
    current_lat: -27.6502,
    current_lng: -67.0285
  }
];

export const demoIncidents: Incident[] = [
  {
    id: "demo-inc-1",
    code: "SEG-0001",
    title: "Robo denunciado en zona centrica",
    description: "Comercio reporta sustraccion y requiere presencia policial.",
    category: "seguridad",
    priority: "alta",
    status: "validado",
    source: "operador",
    jurisdiction_id: "capital",
    assigned_unit_id: "demo-unit-1",
    reporter_name: "Operador demo",
    reporter_phone: null,
    address: "Centro, San Fernando del Valle",
    lat: -28.4684,
    lng: -65.7811,
    occurred_at: iso(45),
    validated_at: iso(42),
    assigned_at: iso(40),
    arrived_at: iso(28),
    resolved_at: null,
    created_at: iso(45),
    updated_at: iso(28),
    jurisdictions: { id: "capital", name: "Capital", province: "Catamarca", lat: -28.4696, lng: -65.7795 },
    units: demoUnits[0]
  },
  {
    id: "demo-inc-2",
    code: "SEG-0002",
    title: "Accidente con lesionados leves",
    description: "Colision entre auto y moto. Solicitan ambulancia.",
    category: "transito",
    priority: "critica",
    status: "asignado",
    source: "operador",
    jurisdiction_id: "valle-viejo",
    assigned_unit_id: "demo-unit-3",
    reporter_name: "911",
    reporter_phone: null,
    address: "Ruta provincial 33",
    lat: -28.5124,
    lng: -65.7165,
    occurred_at: iso(25),
    validated_at: iso(23),
    assigned_at: iso(22),
    arrived_at: null,
    resolved_at: null,
    created_at: iso(25),
    updated_at: iso(22),
    jurisdictions: { id: "valle-viejo", name: "Valle Viejo", province: "Catamarca", lat: -28.5186, lng: -65.7094 },
    units: demoUnits[2]
  },
  {
    id: "demo-inc-3",
    code: "SEG-0003",
    title: "Corte preventivo por manifestacion",
    description: "Grupo de vecinos bloquea parcialmente arteria principal.",
    category: "disturbios",
    priority: "media",
    status: "nuevo",
    source: "ciudadano",
    jurisdiction_id: "andalgala",
    assigned_unit_id: null,
    reporter_name: "Vecino",
    reporter_phone: null,
    address: "Ingreso a Andalgala",
    lat: -27.5822,
    lng: -66.3175,
    occurred_at: iso(15),
    validated_at: null,
    assigned_at: null,
    arrived_at: null,
    resolved_at: null,
    created_at: iso(15),
    updated_at: iso(15),
    jurisdictions: { id: "andalgala", name: "Andalgala", province: "Catamarca", lat: -27.5819, lng: -66.3162 },
    units: null
  },
  {
    id: "demo-inc-4",
    code: "SEG-0004",
    title: "Emergencia medica domiciliaria",
    description: "Adulto mayor con descompensacion, se pide derivacion.",
    category: "salud",
    priority: "alta",
    status: "en_camino",
    source: "operador",
    jurisdiction_id: "belen",
    assigned_unit_id: "demo-unit-4",
    reporter_name: "Centro de salud",
    reporter_phone: null,
    address: "Barrio San Antonio",
    lat: -27.6534,
    lng: -67.0243,
    occurred_at: iso(10),
    validated_at: iso(9),
    assigned_at: iso(8),
    arrived_at: null,
    resolved_at: null,
    created_at: iso(10),
    updated_at: iso(8),
    jurisdictions: { id: "belen", name: "Belen", province: "Catamarca", lat: -27.6513, lng: -67.0266 },
    units: demoUnits[3]
  }
];

export const demoTraffic: TrafficEvent[] = [
  {
    id: "demo-traffic-1",
    title: "Corte por obra pluvial",
    description: "Desvio temporal con media calzada habilitada.",
    type: "obra",
    status: "activo",
    severity: "media",
    jurisdiction_id: "capital",
    lat: -28.4744,
    lng: -65.787,
    starts_at: iso(80),
    ends_at: null,
    created_at: iso(80),
    jurisdictions: { id: "capital", name: "Capital", province: "Catamarca", lat: -28.4696, lng: -65.7795 }
  },
  {
    id: "demo-traffic-2",
    title: "Evento patronal con desvio",
    description: "Operacion preventiva de transito y seguridad.",
    type: "evento",
    status: "activo",
    severity: "baja",
    jurisdiction_id: "belen",
    lat: -27.6508,
    lng: -67.0269,
    starts_at: iso(120),
    ends_at: null,
    created_at: iso(120),
    jurisdictions: { id: "belen", name: "Belen", province: "Catamarca", lat: -27.6513, lng: -67.0266 }
  }
];

export const demoKpis = {
  todays: demoIncidents.length,
  active: demoIncidents.filter((incident) => !["resuelto", "cancelado"].includes(incident.status)).length,
  critical: demoIncidents.filter((incident) => incident.priority === "critica").length,
  avgResponse: 14,
  availableUnits: demoUnits.filter((unit) => unit.status === "disponible").length
};
