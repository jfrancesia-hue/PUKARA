import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, CheckCircle2, Flame, Map, RadioTower, Satellite, Siren } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { MapSection } from "@/components/map-section";
import { StatusBadge } from "@/components/status-badge";
import { VisualImageCard } from "@/components/visual-image-card";
import { demoIncidents, demoTraffic, demoUnits } from "@/lib/demo-data";
import { visualAssets } from "@/lib/visual-assets";

export default function Home() {
  const modules = [
    "Dashboard ejecutivo",
    "Mapa operativo",
    "Gestion de incidentes",
    "Despacho de unidades",
    "Prevencion de incendios",
    "Monitoreo satelital",
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
          <div className="mt-4 rounded-3xl border border-techno/20 bg-techno/10 p-4 text-sm text-arena/75">
            <b className="text-techno">Web app móvil:</b> desde Chrome o Safari podés instalar PUKARA 360 en el inicio del celular y usarla en pantalla completa.
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

        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-glow">
            <div className="absolute inset-0">
              <Image src={visualAssets.mountainTerritory.src} alt={visualAssets.mountainTerritory.alt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover opacity-35" priority />
              <div className="absolute inset-0 bg-gradient-to-br from-night via-night/70 to-cardon/70" />
            </div>
            <div className="relative">
              <div className="mb-3 flex items-center justify-between px-2">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-techno">Mapa demo Catamarca</p>
                <StatusBadge value="critica" kind="priority" />
              </div>
              <MapSection incidents={demoIncidents} units={demoUnits} traffic={demoTraffic} height={460} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Focos", "calor"],
              ["Unidades", "vivas"],
              ["SLA", "respuesta"]
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl">
                <p className="text-2xl font-black text-white">{title}</p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-techno">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <div className="mb-8 grid gap-5 lg:grid-cols-3">
          <VisualImageCard
            src={visualAssets.commandCenter.src}
            alt={visualAssets.commandCenter.alt}
            eyebrow="Centro de comando"
            title="Operación moderna"
            description="Interfaz pensada para salas de monitoreo, coordinación interministerial y respuesta 24/7."
          />
          <VisualImageCard
            src={visualAssets.satelliteEarth.src}
            alt={visualAssets.satelliteEarth.alt}
            eyebrow="Inteligencia territorial"
            title="Capa satelital"
            description="Preparado para integrar focos de calor, clima, sequía, vegetación y cambios de cobertura."
          />
          <VisualImageCard
            src={visualAssets.forestRisk.src}
            alt={visualAssets.forestRisk.alt}
            eyebrow="Prevención"
            title="Riesgo ambiental"
            description="Monitoreo preventivo para incendios, crecidas, desmonte y eventos de defensa civil."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {[
            { icon: Siren, title: "Incidentes", text: "CRUD, timeline, criticidad, evidencias y asignacion." },
            { icon: RadioTower, title: "Despacho", text: "Control de tiempos y estados operativos por unidad." },
            { icon: Map, title: "Mapa vivo", text: "Emergencias, unidades y transito en territorio." },
            { icon: Flame, title: "Incendios", text: "Prevencion por focos de calor, sequia y riesgo forestal." },
            { icon: Satellite, title: "Satelital", text: "Capas de anomalias termicas, vegetacion y cobertura." },
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
