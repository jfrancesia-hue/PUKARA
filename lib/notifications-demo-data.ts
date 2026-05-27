export const notificationRules = [
  {
    id: "rule-1",
    name: "Incidente crítico sin asignar",
    channel: "Panel + WhatsApp",
    target: "Centro de control / Ministerio",
    status: "lista",
    condition: "priority = critica AND assigned_unit_id IS NULL por más de 3 minutos"
  },
  {
    id: "rule-2",
    name: "Foco de calor satelital crítico",
    channel: "Panel + Email",
    target: "Defensa Civil / Municipio",
    status: "lista",
    condition: "risk = critico AND type = incendio"
  },
  {
    id: "rule-3",
    name: "Unidad demora en arribar",
    channel: "Panel",
    target: "Supervisor de despacho",
    status: "lista",
    condition: "status = en_camino AND elapsed > SLA"
  },
  {
    id: "rule-4",
    name: "Reporte ciudadano recibido",
    channel: "Panel + Push",
    target: "Operador jurisdiccional",
    status: "pendiente",
    condition: "source = ciudadano AND status = nuevo"
  }
];

export const notificationInbox = [
  {
    id: "notif-1",
    title: "Alerta crítica: accidente con lesionados",
    body: "SEG-0002 requiere seguimiento de ambulancia y apoyo de tránsito.",
    channel: "Panel",
    createdAt: new Date(Date.now() - 8 * 60_000).toISOString(),
    read: false
  },
  {
    id: "notif-2",
    title: "Anomalía térmica detectada",
    body: "Sierra de Ambato registra foco compatible con riesgo de incendio.",
    channel: "Email",
    createdAt: new Date(Date.now() - 18 * 60_000).toISOString(),
    read: false
  },
  {
    id: "notif-3",
    title: "Nuevo reporte ciudadano",
    body: "Manifestación con corte parcial pendiente de validación municipal.",
    channel: "Push",
    createdAt: new Date(Date.now() - 24 * 60_000).toISOString(),
    read: true
  }
];
