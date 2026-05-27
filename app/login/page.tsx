import { signInAction } from "@/app/actions";
import { BrandMark } from "@/components/brand-mark";

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string; next?: string }> }) {
  const params = await searchParams;
  return (
    <main className="relative z-10 grid min-h-screen place-items-center px-4 py-10">
      <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-glow backdrop-blur-xl">
        <BrandMark />
        <h1 className="mt-8 text-3xl font-black text-white">Ingreso operativo</h1>
        <p className="mt-2 text-sm leading-relaxed text-arena/65">Acceso seguro para centro de control, ministerio, fuerzas, transito y municipios.</p>
        {params.error && <div className="mt-5 rounded-2xl border border-alert/30 bg-alert/10 p-3 text-sm text-red-100">{params.error}</div>}
        <form action={signInAction} className="mt-6 space-y-4">
          <input type="hidden" name="next" value={params.next ?? "/dashboard"} />
          <div><label className="text-xs font-bold uppercase tracking-[0.2em] text-arena/60">Email</label><input className="field mt-2" type="email" name="email" required /></div>
          <div><label className="text-xs font-bold uppercase tracking-[0.2em] text-arena/60">Clave</label><input className="field mt-2" type="password" name="password" required /></div>
          <button className="btn-primary w-full" type="submit">Entrar al comando</button>
        </form>
        <div className="mt-5 rounded-2xl border border-copper/25 bg-copper/10 p-4 text-sm text-arena/80">
          <p className="font-black uppercase tracking-[0.18em] text-copper">Acceso demo</p>
          <p className="mt-2"><b>Usuario:</b> demo@pukara360.demo</p>
          <p><b>Clave:</b> PukaraDemo360!</p>
          <p className="mt-2 text-xs text-arena/55">Redirige a una demo ficticia, sin modificar Supabase real.</p>
        </div>
      </section>
    </main>
  );
}
