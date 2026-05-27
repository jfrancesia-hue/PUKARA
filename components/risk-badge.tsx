import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  bajo: "border-white/15 bg-white/10 text-arena",
  medio: "border-techno/30 bg-techno/10 text-techno",
  alto: "border-emergency/30 bg-emergency/10 text-emergency",
  critico: "border-alert/30 bg-alert/10 text-alert"
};

export function RiskBadge({ value }: { value: string }) {
  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-black uppercase tracking-[0.14em]", styles[value] ?? styles.medio)}>
      {value}
    </span>
  );
}
