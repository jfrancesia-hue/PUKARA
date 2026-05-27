export type Role = "superadmin" | "ministerio" | "centro_control" | "policia" | "transito" | "municipio" | "ciudadano";
export type IncidentStatus = "nuevo" | "validado" | "asignado" | "en_camino" | "en_sitio" | "resuelto" | "cancelado";
export type Priority = "baja" | "media" | "alta" | "critica";

export type Profile = {
  id: string;
  full_name: string | null;
  role: Role;
  jurisdiction_id: string | null;
};

export type Jurisdiction = {
  id: string;
  name: string;
  province: string;
  lat: number | null;
  lng: number | null;
};

export type Unit = {
  id: string;
  code: string;
  type: string;
  name: string;
  status: string;
  jurisdiction_id: string | null;
  current_lat: number | null;
  current_lng: number | null;
};

export type Incident = {
  id: string;
  code: string;
  title: string;
  description: string | null;
  category: string;
  priority: Priority;
  status: IncidentStatus;
  source: string;
  jurisdiction_id: string | null;
  assigned_unit_id: string | null;
  reporter_name: string | null;
  reporter_phone: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  occurred_at: string | null;
  validated_at: string | null;
  assigned_at: string | null;
  arrived_at: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
  jurisdictions?: Jurisdiction | null;
  units?: Unit | null;
};

export type TrafficEvent = {
  id: string;
  title: string;
  description: string | null;
  type: string;
  status: string;
  severity: Priority;
  lat: number | null;
  lng: number | null;
  starts_at: string | null;
  ends_at: string | null;
  jurisdiction_id: string | null;
  created_at: string;
  jurisdictions?: Jurisdiction | null;
};

export type AuditLog = {
  id: string;
  actor_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};
