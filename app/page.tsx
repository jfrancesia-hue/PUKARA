import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, Map, RadioTower, Siren } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { MapSection } from "@/components/map-section";
import { StatusBadge } from "@/components/status-badge";
import { demoIncidents, demoTraffic, demoUnits } from "@/lib/demo-data";

export default function Home() {
  const modules = [
    "Dashboard ejecutivo",
    "Mapa operativo",
    "Gestion de incidentes",
    "Despacho de unidades",
    "Transito y cortes",
    "Portal ciudadano",
    "Reportes y auditoria"
  ];

  return (
    <main className="relative z-10 min-h-screen overflow-hidden">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 md:px-8">
        <BrandMark />
        <nav className="flex items-center gap-2">
          <Link href="/demo" className="btn-secondary hidden sm:inline-flex">Ver demo</Link>
          <Link href="/login" className="btn-primary">Ingreso operativo</Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-6 md:px-8 lg:grid-cols-[1fr_.9fr] lg:pb-20">
        <div>
          <div className="inline-flex rounded-full border border-copper/25 bg-copper/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-copper">
            Govtech territorial · NOA argentino
          </div>
          <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
            Seguridad, transito y respuesta territorial en una sola plataforma.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-arena/72">
            PUKARA 360 es un centro de comando digital para gobiernos provinciales: registra incidentes, visualiza emergencias,
            despacha unidades, coordina transito, recibe reportes ciudadanos y audita cada accion.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/demo" className="btn-primary text-base">
              Abrir demo ficticia <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/reportar" className="btn-secondary text-base">Probar portal ciudadano</Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Realtime", "Supabase"],
              ["RLS", "multi-rol"],
              ["Vercel", "produccion"]
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.055] p-4">
                <p className="text-xl font-black text-techno">{title}</p>
                <p className="text-sm text-arena/62">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-3">
          <div className="mb-3 flex items-center justify-between px-2">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-techno">Mapa demo Catamarca</p>
            <StatusBadge value="critica" kind="priority" />
          </div>
          <MapSection incidents={demoIncidents} units={demoUnits} traffic={demoTraffic} height={460} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Siren, title: "Incidentes", text: "CRUD, timeline, criticidad, evidencias y asignacion." },
            { icon: RadioTower, title: "Despacho", text: "Control de tiempos y estados operativos por unidad." },
            { icon: Map, title: "Mapa vivo", text: "Emergencias, unidades y transito en territorio." },
            { icon: BarChart3, title: "Reportes", text: "Graficos, CSV y auditoria institucional." }
          ].map((item) => (
            <article key={item.title} className="glass-panel rounded-3xl p-5">
              <item.icon className="h-7 w-7 text-techno" />
              <h2 className="mt-4 text-xl font-black text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-arena/62">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-copper/20 bg-copper/10 p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-copper">Listo para demo comercial</p>
              <h2 className="mt-2 text-3xl font-black text-white">Datos ficticios ahora, Supabase real al pasar a operacion.</h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {modules.map((module) => (
                <div key={module} className="flex items-center gap-2 text-sm font-semibold text-arena/75">
                  <CheckCircle2 className="h-4 w-4 text-techno" /> {module}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-6 text-center text-sm text-arena/55">
        Desarrollado por Nativos Consultora Digital · PUKARA 360
      </footer>
    </main>
  );
}
