export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "PUKARA 360";
export const APP_ORG = process.env.NEXT_PUBLIC_APP_ORG ?? "Nativos Consultora Digital";

export const incidentStatuses = ["nuevo", "validado", "asignado", "en_camino", "en_sitio", "resuelto", "cancelado"] as const;
export const incidentPriorities = ["baja", "media", "alta", "critica"] as const;
export const roles = ["superadmin", "ministerio", "centro_control", "policia", "transito", "municipio", "ciudadano"] as const;

export const statusLabels: Record<string, string> = {
  nuevo: "Nuevo",
  validado: "Validado",
  asignado: "Asignado",
  en_camino: "En camino",
  en_sitio: "En sitio",
  resuelto: "Resuelto",
  cancelado: "Cancelado"
};

export const priorityLabels: Record<string, string> = {
  baja: "Baja",
  media: "Media",
  alta: "Alta",
  critica: "Critica"
};
