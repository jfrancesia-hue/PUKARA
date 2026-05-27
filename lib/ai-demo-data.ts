export const aiSituation = {
  title: "Situación operativa sugerida",
  summary:
    "Se observa concentración de incidentes activos en Capital y Valle Viejo, con una alerta crítica de tránsito y una anomalía térmica prioritaria en zona serrana. Se recomienda sostener una unidad disponible en Capital y preposicionar defensa civil.",
  confidence: 87,
  generatedAt: new Date().toISOString()
};

export const aiRecommendations = [
  {
    id: "ai-rec-1",
    priority: "critica",
    title: "Preposicionar brigada por anomalía térmica",
    reason: "Riesgo de propagación por estrés hídrico y foco de calor satelital.",
    action: "Enviar verificación preventiva a Sierra de Ambato y notificar Defensa Civil."
  },
  {
    id: "ai-rec-2",
    priority: "alta",
    title: "Reforzar tránsito en Ruta provincial 33",
    reason: "Accidente activo con posible congestión secundaria.",
    action: "Asignar apoyo de tránsito y preparar corte parcial si aumenta demora."
  },
  {
    id: "ai-rec-3",
    priority: "media",
    title: "Validar reporte ciudadano de manifestación",
    reason: "Incidente sin asignación y con impacto territorial potencial.",
    action: "Contactar municipio y enviar unidad liviana para confirmación."
  }
];

export const aiClassifications = [
  {
    input: "Vecinos informan humo en zona de cerros y viento fuerte",
    category: "incendio / defensa civil",
    priority: "critica",
    extracted: "humo, cerros, viento fuerte",
    suggestedUnit: "Defensa Civil + brigada forestal"
  },
  {
    input: "Choque de moto en avenida, una persona en el piso",
    category: "tránsito / salud",
    priority: "alta",
    extracted: "moto, lesionado, avenida",
    suggestedUnit: "Ambulancia + tránsito"
  },
  {
    input: "Corte de calle por reclamo vecinal",
    category: "disturbios / tránsito",
    priority: "media",
    extracted: "corte, reclamo, calle",
    suggestedUnit: "Municipio + policía preventiva"
  }
];
