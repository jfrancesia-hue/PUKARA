export type RiskZone = {
  id: string;
  name: string;
  jurisdiction: string;
  lat: number;
  lng: number;
  risk: "bajo" | "medio" | "alto" | "critico";
  type: "incendio" | "sequía" | "inundacion" | "desmonte" | "temperatura";
  source: "satelite" | "meteorologia" | "sensor" | "reporte";
  confidence: number;
  updatedAt: string;
  recommendation: string;
};

export type SatelliteLayer = {
  id: string;
  name: string;
  description: string;
  status: "activo" | "pendiente" | "offline";
  coverage: string;
};

const now = new Date();
const iso = (minutesAgo: number) => new Date(now.getTime() - minutesAgo * 60_000).toISOString();

export const riskZones: RiskZone[] = [
  {
    id: "risk-1",
    name: "Anomalia termica - Sierra de Ambato",
    jurisdiction: "Capital / Ambato",
    lat: -28.118,
    lng: -65.879,
    risk: "critico",
    type: "incendio",
    source: "satelite",
    confidence: 91,
    updatedAt: iso(18),
    recommendation: "Activar verificacion con dron o brigada, preposicionar unidad forestal y notificar defensa civil."
  },
  {
    id: "risk-2",
    name: "Estrés hidrico en cobertura vegetal",
    jurisdiction: "Belen",
    lat: -27.592,
    lng: -67.112,
    risk: "alto",
    type: "sequía",
    source: "satelite",
    confidence: 84,
    updatedAt: iso(42),
    recommendation: "Incrementar patrullaje preventivo y restringir quemas rurales por 72 horas."
  },
  {
    id: "risk-3",
    name: "Foco de calor aislado",
    jurisdiction: "Andalgala",
    lat: -27.671,
    lng: -66.443,
    risk: "medio",
    type: "temperatura",
    source: "satelite",
    confidence: 67,
    updatedAt: iso(55),
    recommendation: "Monitorear evolución en próxima pasada satelital y validar con municipio."
  },
  {
    id: "risk-4",
    name: "Riesgo de crecida por tormenta",
    jurisdiction: "Valle Viejo",
    lat: -28.537,
    lng: -65.684,
    risk: "alto",
    type: "inundacion",
    source: "meteorologia",
    confidence: 78,
    updatedAt: iso(25),
    recommendation: "Revisar canales, alertar zonas bajas y preparar cortes preventivos si aumenta precipitación."
  },
  {
    id: "risk-5",
    name: "Cambio de cobertura no autorizado",
    jurisdiction: "Santa Maria",
    lat: -26.695,
    lng: -66.044,
    risk: "medio",
    type: "desmonte",
    source: "satelite",
    confidence: 73,
    updatedAt: iso(130),
    recommendation: "Derivar a inspección ambiental y cruzar con permisos vigentes."
  }
];

export const satelliteLayers: SatelliteLayer[] = [
  {
    id: "thermal",
    name: "Anomalias termicas",
    description: "Focos de calor compatibles con incendios o quemas rurales.",
    status: "activo",
    coverage: "Provincial"
  },
  {
    id: "vegetation",
    name: "Indice vegetal / estrés hidrico",
    description: "Lectura tipo NDVI para detectar vegetación seca y riesgo de propagación.",
    status: "activo",
    coverage: "NOA"
  },
  {
    id: "rain",
    name: "Precipitacion y tormentas",
    description: "Riesgo de crecidas, anegamientos y cortes preventivos.",
    status: "activo",
    coverage: "Departamental"
  },
  {
    id: "coverage",
    name: "Cambio de cobertura",
    description: "Alertas por desmontes, aperturas de caminos o movimientos inusuales.",
    status: "pendiente",
    coverage: "Zonas priorizadas"
  }
];

export const riskSummary = {
  critical: riskZones.filter((zone) => zone.risk === "critico").length,
  high: riskZones.filter((zone) => zone.risk === "alto").length,
  satelliteAlerts: riskZones.filter((zone) => zone.source === "satelite").length,
  avgConfidence: Math.round(riskZones.reduce((sum, zone) => sum + zone.confidence, 0) / riskZones.length)
};
