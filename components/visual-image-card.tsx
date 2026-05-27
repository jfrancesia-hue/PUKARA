import Image from "next/image";
import { cn } from "@/lib/utils";

export function VisualImageCard({
  src,
  alt,
  eyebrow,
  title,
  description,
  className
}: {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <article className={cn("group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-glow", className)}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-72 transition duration-700 group-hover:scale-105 group-hover:opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(24,183,164,.25),transparent_30%)]" />
      <div className="relative flex min-h-72 flex-col justify-end p-5">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-copper">{eyebrow}</p>
        <h3 className="mt-2 text-2xl font-black text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-arena/75">{description}</p>
      </div>
    </article>
  );
}
