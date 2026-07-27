export function DeskProps() {
  return (
    <>
      <div
        className="desk-prop desk-prop--note pointer-events-none absolute -right-2 top-24 z-0 hidden max-w-[140px] rotate-[6deg] lg:block"
        aria-hidden
      >
        <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
          Systems over chaos
        </p>
        <ul className="mt-2 space-y-1 font-mono text-[8px] leading-snug text-ink">
          <li>Strategy</li>
          <li>Traceability</li>
          <li>Production</li>
          <li>Reporting</li>
        </ul>
      </div>

      <div
        className="desk-prop desk-prop--sticky pointer-events-none absolute -left-4 bottom-32 z-0 hidden rotate-[-4deg] lg:block"
        aria-hidden
      >
        <p className="handwritten text-lg leading-tight text-ink">Same team,</p>
        <p className="handwritten text-lg leading-tight text-ink underline decoration-technology decoration-wavy">
          more output
        </p>
      </div>
    </>
  );
}
