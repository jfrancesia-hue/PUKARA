-- PUKARA 360 - Esquema inicial Supabase real
-- Revisar y confirmar antes de aplicar en una base con datos existentes.

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

do $$ begin create type public.app_role as enum ('superadmin','ministerio','centro_control','policia','transito','municipio','ciudadano'); exception when duplicate_object then null; end $$;
do $$ begin create type public.incident_status as enum ('nuevo','validado','asignado','en_camino','en_sitio','resuelto','cancelado'); exception when duplicate_object then null; end $$;
do $$ begin create type public.priority_level as enum ('baja','media','alta','critica'); exception when duplicate_object then null; end $$;
do $$ begin create type public.unit_status as enum ('disponible','asignada','en_camino','en_sitio','fuera_servicio','mantenimiento'); exception when duplicate_object then null; end $$;

create table if not exists public.jurisdicciones (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  province text not null default 'Catamarca',
  lat double precision,
  lng double precision,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.app_role not null default 'ciudadano',
  jurisdiction_id uuid references public.jurisdicciones(id),
  phone text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.units (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  type text not null,
  name text not null,
  status public.unit_status not null default 'disponible',
  jurisdiction_id uuid references public.jurisdicciones(id),
  current_lat double precision,
  current_lng double precision,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.incidents (
  id uuid primary key default gen_random_uuid(),
  code text unique,
  title text not null,
  description text,
  category text not null,
  priority public.priority_level not null default 'media',
  status public.incident_status not null default 'nuevo',
  source text not null default 'operador',
  jurisdiction_id uuid references public.jurisdicciones(id),
  assigned_unit_id uuid references public.units(id),
  reporter_name text,
  reporter_phone text,
  address text,
  lat double precision,
  lng double precision,
  occurred_at timestamptz default now(),
  validated_at timestamptz,
  assigned_at timestamptz,
  arrived_at timestamptz,
  resolved_at timestamptz,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.incident_events (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid not null references public.incidents(id) on delete cascade,
  actor_id uuid references auth.users(id),
  type text not null,
  title text not null,
  body text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.traffic_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  type text not null,
  status text not null default 'activo',
  severity public.priority_level not null default 'media',
  jurisdiction_id uuid references public.jurisdicciones(id),
  lat double precision,
  lng double precision,
  starts_at timestamptz default now(),
  ends_at timestamptz,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.attachments (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references public.incidents(id) on delete cascade,
  uploaded_by uuid references auth.users(id),
  file_name text not null,
  file_path text not null,
  file_type text,
  public_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb,
  ip inet,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  incident_id uuid references public.incidents(id) on delete cascade,
  title text not null,
  body text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_jurisdicciones_updated on public.jurisdicciones;
create trigger trg_jurisdicciones_updated before update on public.jurisdicciones for each row execute function public.set_updated_at();
drop trigger if exists trg_profiles_updated on public.profiles;
create trigger trg_profiles_updated before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists trg_units_updated on public.units;
create trigger trg_units_updated before update on public.units for each row execute function public.set_updated_at();
drop trigger if exists trg_incidents_updated on public.incidents;
create trigger trg_incidents_updated before update on public.incidents for each row execute function public.set_updated_at();
drop trigger if exists trg_traffic_updated on public.traffic_events;
create trigger trg_traffic_updated before update on public.traffic_events for each row execute function public.set_updated_at();

create sequence if not exists public.incident_code_seq start 1;

create or replace function public.next_incident_code()
returns text language plpgsql as $$
declare seq bigint;
begin
  select nextval('public.incident_code_seq') into seq;
  return 'SEG-' || lpad(seq::text, 4, '0');
end $$;

create or replace function public.assign_incident_code()
returns trigger language plpgsql as $$
begin
  if new.code is null or new.code = '' then
    new.code := public.next_incident_code();
  end if;
  return new;
end $$;

drop trigger if exists trg_incident_code on public.incidents;
create trigger trg_incident_code before insert on public.incidents for each row execute function public.assign_incident_code();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles(id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email), 'ciudadano')
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.current_role()
returns public.app_role language sql stable as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'ciudadano'::public.app_role)
$$;

create or replace function public.is_staff()
returns boolean language sql stable as $$
  select public.current_role() in ('superadmin','ministerio','centro_control','policia','transito','municipio')
$$;

create index if not exists idx_incidents_created_at on public.incidents(created_at desc);
create index if not exists idx_incidents_status_priority on public.incidents(status, priority);
create index if not exists idx_incidents_jurisdiction on public.incidents(jurisdiction_id);
create index if not exists idx_incidents_assigned_unit on public.incidents(assigned_unit_id);
create index if not exists idx_incident_events_incident on public.incident_events(incident_id, created_at);
create index if not exists idx_units_status on public.units(status);
create index if not exists idx_traffic_status on public.traffic_events(status, created_at desc);
create index if not exists idx_audit_entity on public.audit_logs(entity_type, entity_id);
create index if not exists idx_notifications_user_unread on public.notifications(user_id, read_at);

alter table public.profiles enable row level security;
alter table public.jurisdicciones enable row level security;
alter table public.incidents enable row level security;
alter table public.incident_events enable row level security;
alter table public.units enable row level security;
alter table public.traffic_events enable row level security;
alter table public.attachments enable row level security;
alter table public.audit_logs enable row level security;
alter table public.notifications enable row level security;

drop policy if exists "profiles select own or staff" on public.profiles;
create policy "profiles select own or staff" on public.profiles for select using (id = auth.uid() or public.is_staff());
drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "jurisdicciones select anon auth" on public.jurisdicciones;
create policy "jurisdicciones select anon auth" on public.jurisdicciones for select using (true);
drop policy if exists "jurisdicciones manage superadmin" on public.jurisdicciones;
create policy "jurisdicciones manage superadmin" on public.jurisdicciones for all using (public.current_role() = 'superadmin') with check (public.current_role() = 'superadmin');

drop policy if exists "incidents select staff or own citizen" on public.incidents;
create policy "incidents select staff or own citizen" on public.incidents for select using (public.is_staff() or created_by = auth.uid());
drop policy if exists "incidents insert anon auth" on public.incidents;
create policy "incidents insert anon auth" on public.incidents for insert with check (true);
drop policy if exists "incidents update staff" on public.incidents;
create policy "incidents update staff" on public.incidents for update using (public.is_staff()) with check (public.is_staff());
drop policy if exists "incidents delete superadmin" on public.incidents;
create policy "incidents delete superadmin" on public.incidents for delete using (public.current_role() = 'superadmin');

drop policy if exists "events select staff" on public.incident_events;
create policy "events select staff" on public.incident_events for select using (public.is_staff());
drop policy if exists "events insert staff" on public.incident_events;
create policy "events insert staff" on public.incident_events for insert with check (public.is_staff());

drop policy if exists "units select staff" on public.units;
create policy "units select staff" on public.units for select using (public.is_staff());
drop policy if exists "units manage dispatch" on public.units;
create policy "units manage dispatch" on public.units for all using (public.current_role() in ('superadmin','centro_control','ministerio')) with check (public.current_role() in ('superadmin','centro_control','ministerio'));

drop policy if exists "traffic select staff" on public.traffic_events;
create policy "traffic select staff" on public.traffic_events for select using (public.is_staff());
drop policy if exists "traffic manage traffic roles" on public.traffic_events;
create policy "traffic manage traffic roles" on public.traffic_events for all using (public.current_role() in ('superadmin','centro_control','transito','municipio')) with check (public.current_role() in ('superadmin','centro_control','transito','municipio'));

drop policy if exists "attachments select linked" on public.attachments;
create policy "attachments select linked" on public.attachments for select using (public.is_staff() or exists (select 1 from public.incidents i where i.id = incident_id and i.created_by = auth.uid()));
drop policy if exists "attachments insert staff" on public.attachments;
create policy "attachments insert staff" on public.attachments for insert with check (public.is_staff());

drop policy if exists "audit select superadmin ministerio" on public.audit_logs;
create policy "audit select superadmin ministerio" on public.audit_logs for select using (public.current_role() in ('superadmin','ministerio'));
drop policy if exists "audit insert staff" on public.audit_logs;
create policy "audit insert staff" on public.audit_logs for insert with check (public.is_staff());

drop policy if exists "notifications own" on public.notifications;
create policy "notifications own" on public.notifications for select using (user_id = auth.uid());
drop policy if exists "notifications update own" on public.notifications;
create policy "notifications update own" on public.notifications for update using (user_id = auth.uid()) with check (user_id = auth.uid());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('evidencias', 'evidencias', true, 10485760, array['image/jpeg','image/png','image/webp','application/pdf'])
on conflict (id) do update set public = excluded.public;

drop policy if exists "evidencias public read" on storage.objects;
create policy "evidencias public read" on storage.objects for select using (bucket_id = 'evidencias');
drop policy if exists "evidencias staff upload" on storage.objects;
create policy "evidencias staff upload" on storage.objects for insert with check (bucket_id = 'evidencias' and public.is_staff());

do $$ begin alter publication supabase_realtime add table public.incidents; exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table public.units; exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table public.traffic_events; exception when duplicate_object then null; end $$;
