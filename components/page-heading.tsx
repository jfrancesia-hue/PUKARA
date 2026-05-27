export function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.28em] text-copper">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-arena/68 md:text-base">{description}</p>
      </div>
      {action}
    </div>
  );
}
