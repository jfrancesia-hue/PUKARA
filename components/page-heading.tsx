export function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="command-surface topo-lines mb-6 p-5 md:p-7">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-copper/25 bg-copper/10 px-3 py-1.5">
            <span className="status-dot bg-copper shadow-[0_0_18px_rgba(200,120,58,.9)]" />
            <p className="text-xs font-black uppercase tracking-[0.28em] text-copper">{eyebrow}</p>
          </div>
          <h1 className="mt-4 max-w-5xl text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h1>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-arena/72 md:text-base">{description}</p>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="mt-6 grid gap-2 border-t border-white/10 pt-4 text-[11px] font-black uppercase tracking-[0.22em] text-arena/45 md:grid-cols-3">
        <div>Seguridad operacional</div>
        <div>Territorio inteligente</div>
        <div>Auditoría institucional</div>
      </div>
    </div>
  );
}
