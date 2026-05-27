-- Ejecutar luego de crear el usuario operador en Supabase Auth.
-- Reemplazar el email y confirmar antes de correr en Supabase real.

update public.profiles
set role = 'superadmin',
    full_name = coalesce(full_name, 'Administrador PUKARA 360')
where id = (
  select id
  from auth.users
  where email = 'admin@pukara360.gob.ar'
  limit 1
);
