import { AppShell } from "@/components/app-shell";
import { ErrorPanel } from "@/components/error-panel";
import { MapSection } from "@/components/map-section";
import { PageHeading } from "@/components/page-heading";
import { getDashboardData } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function MapaPage({ searchParams }: { searchParams: Promise<{ fullscreen?: string }> }) {
  const params = await searchParams;
  const data = await getDashboardData();
  const height = params.fullscreen ? 820 : 640;
  return <AppShell><PageHeading eyebrow="Mapa operativo" title="Emergencias, unidades y transito" description="Vista territorial con filtros visuales por criticidad, recursos y eventos viales." /><ErrorPanel errors={data.errors} /><div className={params.fullscreen ? "fixed inset-0 z-50 bg-night p-4" : ""}><MapSection incidents={data.incidents} units={data.units} traffic={data.traffic} height={height} /></div></AppShell>;
}
