import type { Person } from "@ed-norris/career-data";

export function HeroSection({ person }: { person: Person }) {
  return (
    <section className="grid min-h-[min(720px,90vh)] items-center gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-forest">
          Software innovator · creative technologist · systems thinker
        </p>
        <h1 className="mt-4 max-w-[900px] text-4xl font-bold leading-[0.98] sm:text-5xl lg:text-7xl">
          {person.summary}
        </h1>
        <p className="mt-5 max-w-[760px] text-lg leading-relaxed text-[#38413e] sm:text-xl lg:text-[23px]">
          My work spans software, interactive entertainment, product storytelling,
          agriculture, carbon systems, and the practical work of turning ambitious
          ideas into things people can actually use.
        </p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <a
            href="#work"
            className="rounded-full border border-ink px-4 py-2.5 text-sm font-semibold transition hover:bg-ink hover:text-paper"
          >
            Explore environmental technology
          </a>
          <a
            href="#map"
            className="rounded-full border border-ink px-4 py-2.5 text-sm font-semibold transition hover:bg-ink hover:text-paper"
          >
            Explore games & interactive work
          </a>
          <a
            href="#resume"
            className="rounded-full border border-ink px-4 py-2.5 text-sm font-semibold transition hover:bg-ink hover:text-paper"
          >
            Generate résumé
          </a>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-md lg:max-w-none">
        <div className="relative h-[360px] overflow-hidden rounded-[40%_40%_18px_18px] border border-ink bg-[radial-gradient(circle_at_50%_25%,#d8c7a5_0_16%,transparent_17%),linear-gradient(135deg,#42695b,#355d77)] shadow-stamp sm:h-[500px]">
          <span className="absolute -left-8 bottom-6 rotate-[-5deg] bg-ink px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.09em] text-paper sm:text-[13px]">
            Creative technologist / systems builder
          </span>
        </div>
      </div>
    </section>
  );
}
