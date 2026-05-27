import { ShieldCheck } from "lucide-react";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-techno/30 bg-cardon shadow-glow">
        <div className="absolute inset-1 rounded-[1rem] border border-copper/40" />
        <ShieldCheck className="relative h-6 w-6 text-techno" />
        <span className="absolute bottom-1 right-1 text-[9px] font-black text-copper">360</span>
      </div>
      {!compact && (
        <div>
          <p className="text-lg font-black tracking-[0.18em] text-white">PUKARA</p>
          <p className="-mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-techno">Comando territorial</p>
        </div>
      )}
    </div>
  );
}
