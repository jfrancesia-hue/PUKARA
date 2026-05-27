import { AppSidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { getProfile } from "@/lib/supabase/queries";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const { profile, user } = await getProfile();
  return (
    <div className="relative z-10 flex min-h-screen bg-night/55 text-white">
      <AppSidebar role={profile?.role} />
      <div className="min-w-0 flex-1">
        <Topbar profile={profile} email={user?.email ?? null} />
        <main className="mx-auto w-full max-w-[1800px] px-4 py-5 md:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
