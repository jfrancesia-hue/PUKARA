import { AppSidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { getProfile } from "@/lib/supabase/queries";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const { profile, user } = await getProfile();
  return (
    <div className="relative z-10 flex min-h-screen overflow-hidden bg-[#04111d] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(24,183,164,.18),transparent_34%),radial-gradient(circle_at_85%_12%,rgba(200,120,58,.14),transparent_30%),linear-gradient(135deg,rgba(7,26,44,.96),rgba(3,11,19,.98))]" />
        <div className="topo-lines absolute inset-0 opacity-35" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-techno/10 to-transparent" />
      </div>
      <AppSidebar role={profile?.role} />
      <div className="min-w-0 flex-1">
        <Topbar profile={profile} email={user?.email ?? null} />
        <main className="mx-auto w-full max-w-[1900px] px-4 py-5 md:px-6 lg:px-7 xl:px-9">{children}</main>
      </div>
    </div>
  );
}
