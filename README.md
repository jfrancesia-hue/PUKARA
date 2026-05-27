# PUKARA 360

Plataforma Unificada de Seguridad, Transito y Respuesta Territorial para gobierno provincial. Desarrollado por **Nativos Consultora Digital**.

## Stack

- Next.js 16 + React + TypeScript
- Tailwind CSS
- Supabase Auth, Database, Storage y Realtime
- Recharts
- Leaflet

## Modulos

- `/` home publica de presentacion
- `/demo` demo comercial con datos ficticios, sin tocar Supabase
- `/dashboard` KPIs ejecutivos, mapa y situacion actual
- `/mapa` mapa operativo fullscreen
- `/incidentes` CRUD, timeline, despacho y evidencias
- `/despacho` asignacion de unidades y estados
- `/unidades` recursos operativos
- `/territorio` monitoreo satelital, prevención de incendios y riesgo territorial
- `/ia` IA operativa demo, recomendaciones y clasificación sin conexión externa
- `/notificaciones` reglas de alerta y bandeja demo sin envíos externos
- `/transito` cortes, accidentes y eventos
- `/reportar` portal ciudadano público externo
- `/portal-ciudadano` alias público del portal ciudadano
- `/alertas` incidentes criticos y sin asignar
- `/reportes` graficos y CSV
- `/auditoria` trazabilidad de acciones

## Supabase

Incluye migracion y seed:

- `supabase/migrations/202605270001_init_pukara360.sql`
- `supabase/seed.sql`
- `supabase/promote-admin.sql`

Antes de aplicar migraciones en Supabase real:

1. Revisar tablas existentes.
2. Confirmar proyecto destino.
3. Aplicar migracion.
4. Aplicar seeds demo solo si corresponde.
5. Crear un usuario en Supabase Auth y promoverlo con `supabase/promote-admin.sql`.

> No ejecutar `supabase db push` ni SQL destructivo sin confirmacion explicita.

## Desarrollo

```bash
npm install
npm run dev
```

## Validacion

```bash
npm run typecheck
npm run lint
npm run build
```

## Deploy Vercel

1. Crear variables en Vercel desde `.env.example` usando credenciales reales.
2. Mantener flags demo apagados.
3. Ejecutar `vercel` y luego `vercel --prod`.

La `service_role` se usa solo del lado servidor y nunca debe exponerse como `NEXT_PUBLIC_*`.
