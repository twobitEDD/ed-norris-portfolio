import { services } from "@/data/services";

export function ServicesSpringboardPaperFacts() {
  return (
    <div>
      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft">We help businesses</p>
      <p className="mt-2 font-display text-lg font-bold text-ink">Advance with accountable impact.</p>
      <ul className="mt-4 space-y-2">
        {services.map((service) => (
          <li key={service.id} className="flex items-start gap-2 text-[11px] text-ink-soft">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-technology" />
            <span>
              <span className="font-semibold text-ink">{service.shortTitle}</span> — {service.description.split("—")[0].trim()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServicesTabletPaperFacts() {
  return (
    <div>
      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft">Studio note</p>
      <p className="mt-2 font-display text-xl font-bold text-ink">Evidence-led growth.</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        For businesses that need to advance responsibly — with systems you can audit and messaging you can defend.
      </p>
      <p className="handwritten mt-4 text-lg text-technology">Systems over chaos</p>
    </div>
  );
}
