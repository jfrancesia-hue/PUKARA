import { priorityLabels, statusLabels } from "@/lib/constants";
import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  nuevo: "border-techno/30 bg-techno/10 text-techno",
  validado: "border-monte/30 bg-monte/20 text-[#62d093]",
  asignado: "border-copper/30 bg-copper/10 text-copper",
  en_camino: "border-emergency/30 bg-emergency/10 text-emergency",
  en_sitio: "border-techno/30 bg-techno/10 text-techno",
  resuelto: "border-white/15 bg-white/10 text-arena",
  cancelado: "border-alert/25 bg-alert/10 text-alert",
  baja: "border-white/15 bg-white/10 text-arena",
  media: "border-techno/30 bg-techno/10 text-techno",
  alta: "border-emergency/30 bg-emergency/10 text-emergency",
  critica: "border-alert/30 bg-alert/10 text-alert"
};

export function StatusBadge({ value, kind = "status" }: { value: string; kind?: "status" | "priority" }) {
  const label = kind === "priority" ? priorityLabels[value] ?? value : statusLabels[value] ?? value;
  return <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em]", styles[value] ?? styles.nuevo)}>{label}</span>;
}
