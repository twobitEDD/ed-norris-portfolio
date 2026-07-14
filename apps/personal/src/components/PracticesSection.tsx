import type { Practice } from "@ed-norris/career-data";

const toneStyles = {
  env: "bg-[#dce6dc]",
  creative: "bg-[#e7d7ca]",
};

export function PracticesSection({ practices }: { practices: Practice[] }) {
  return (
    <section id="work" className="scroll-mt-24 border-t border-line py-16 sm:py-24">
      <h2 className="text-3xl font-bold sm:text-5xl">One person. Two focused practices.</h2>
      <p className="mt-5 max-w-[820px] text-lg text-muted sm:text-xl">
        The personal site explains the through-line. Dedicated sites make each offer
        easy to understand, evaluate, and hire.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {practices.map((practice) => (
          <article
            key={practice.id}
            className={`flex min-h-[280px] flex-col justify-between border border-ink p-6 sm:min-h-[310px] sm:p-8 ${toneStyles[practice.tone]}`}
          >
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-forest">
                {practice.kicker}
              </p>
              <h3 className="mt-2 text-2xl font-bold sm:text-[34px]">{practice.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-[#38413e]">{practice.summary}</p>
            </div>
            <a
              href={practice.href}
              className="mt-6 inline-block font-bold transition-opacity hover:opacity-70"
            >
              {practice.cta} →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
