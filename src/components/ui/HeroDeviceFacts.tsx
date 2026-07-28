import { heroHighlights } from "@/data/site";

export function HeroDashboardPaperFacts() {
  return (
    <div>
      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft">Impact command</p>
      <ul className="mt-3 space-y-2.5">
        {heroHighlights.map((item) => (
          <li key={item.label} className="border-b border-ink/8 pb-2 last:border-0 last:pb-0">
            <p className="font-mono text-[8px] uppercase tracking-wider text-ink-soft">{item.label}</p>
            <p className="font-display text-lg font-bold text-ink">{item.value}</p>
            <p className="text-[10px] text-ink-soft">{item.detail}</p>
          </li>
        ))}
      </ul>
      <p className="handwritten mt-4 text-base text-technology">Field → sale → credit</p>
    </div>
  );
}

export function HeroPhonePaperFacts() {
  return (
    <div>
      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft">Traceability sync</p>
      <p className="mt-2 font-display text-base font-semibold text-ink">Field batch verified</p>
      <p className="mt-1 text-xs text-ink-soft">Ready for credit issuance</p>
      <div className="mt-4 rounded-lg border border-technology/25 bg-technology/10 px-3 py-2">
        <p className="font-mono text-[7px] uppercase text-technology/80">CO2True pipeline</p>
        <p className="mt-1 text-[11px] text-ink">Automated field-to-credit workflow</p>
      </div>
    </div>
  );
}
