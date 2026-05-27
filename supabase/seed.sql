-- Datos demo reales Catamarca. Aplicar solo luego de confirmar entorno.

insert into public.jurisdicciones (name, province, lat, lng) values
('Capital', 'Catamarca', -28.4696, -65.7795),
('Valle Viejo', 'Catamarca', -28.5186, -65.7094),
('Belen', 'Catamarca', -27.6513, -67.0266),
('Andalgala', 'Catamarca', -27.5819, -66.3162)
on conflict (name) do update set lat = excluded.lat, lng = excluded.lng;

insert into public.units (code, type, name, status, jurisdiction_id, current_lat, current_lng)
select 'MOV-101', 'patrullero', 'Patrulla Capital Norte', 'disponible', id, -28.4631, -65.7809 from public.jurisdicciones where name = 'Capital'
on conflict (code) do nothing;
insert into public.units (code, type, name, status, jurisdiction_id, current_lat, current_lng)
select 'MOT-221', 'moto', 'Moto transito Centro', 'disponible', id, -28.4711, -65.7762 from public.jurisdicciones where name = 'Capital'
on conflict (code) do nothing;
insert into public.units (code, type, name, status, jurisdiction_id, current_lat, current_lng)
select 'AMB-031', 'ambulancia', 'Ambulancia Valle Viejo', 'disponible', id, -28.5197, -65.7079 from public.jurisdicciones where name = 'Valle Viejo'
on conflict (code) do nothing;
insert into public.units (code, type, name, status, jurisdiction_id, current_lat, current_lng)
select 'DC-404', 'defensa civil', 'Respuesta Belen', 'mantenimiento', id, -27.6502, -67.0285 from public.jurisdicciones where name = 'Belen'
on conflict (code) do nothing;

insert into public.incidents (title, description, category, priority, status, source, jurisdiction_id, address, lat, lng, occurred_at)
select 'Robo denunciado en zona centrica', 'Comercio reporta sustraccion y requiere presencia policial.', 'seguridad', 'alta', 'validado', 'operador', id, 'Centro, San Fernando del Valle', -28.4684, -65.7811, now() - interval '45 minutes' from public.jurisdicciones where name = 'Capital';
insert into public.incidents (title, description, category, priority, status, source, jurisdiction_id, address, lat, lng, occurred_at)
select 'Accidente con lesionados leves', 'Colision entre auto y moto. Solicitan ambulancia.', 'transito', 'critica', 'asignado', 'operador', id, 'Ruta provincial 33', -28.5124, -65.7165, now() - interval '25 minutes' from public.jurisdicciones where name = 'Valle Viejo';
insert into public.incidents (title, description, category, priority, status, source, jurisdiction_id, address, lat, lng, occurred_at)
select 'Corte preventivo por manifestacion', 'Grupo de vecinos bloquea parcialmente arteria principal.', 'disturbios', 'media', 'nuevo', 'ciudadano', id, 'Ingreso a Andalgala', -27.5822, -66.3175, now() - interval '15 minutes' from public.jurisdicciones where name = 'Andalgala';
insert into public.incidents (title, description, category, priority, status, source, jurisdiction_id, address, lat, lng, occurred_at)
select 'Emergencia medica domiciliaria', 'Adulto mayor con descompensacion, se pide derivacion.', 'salud', 'alta', 'en_camino', 'operador', id, 'Barrio San Antonio', -27.6534, -67.0243, now() - interval '10 minutes' from public.jurisdicciones where name = 'Belen';

insert into public.traffic_events (title, description, type, status, severity, jurisdiction_id, lat, lng)
select 'Corte por obra pluvial', 'Desvio temporal con media calzada habilitada.', 'obra', 'activo', 'media', id, -28.4744, -65.787 from public.jurisdicciones where name = 'Capital';
insert into public.traffic_events (title, description, type, status, severity, jurisdiction_id, lat, lng)
select 'Evento patronal con desvio', 'Operacion preventiva de transito y seguridad.', 'evento', 'activo', 'baja', id, -27.6508, -67.0269 from public.jurisdicciones where name = 'Belen';
