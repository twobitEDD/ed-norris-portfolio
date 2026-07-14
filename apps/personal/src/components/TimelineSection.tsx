import type { TimelineEvent } from "@ed-norris/career-data";

export function TimelineSection({ timeline }: { timeline: TimelineEvent[] }) {
  return (
    <section id="timeline" className="scroll-mt-24 border-t border-line py-16 sm:py-24">
      <h2 className="text-3xl font-bold sm:text-5xl">A career told as connected decisions.</h2>
      <div className="relative mt-10">
        <div
          className="absolute bottom-0 left-2 top-0 w-px bg-ink md:left-1/2"
          aria-hidden="true"
        />
        <div className="space-y-8">
          {timeline.map((event, index) => (
            <article
              key={event.id}
              className={`relative w-full border border-ink bg-[#faf8f1] p-5 sm:p-6 md:w-[46%] ${
                index % 2 === 0
                  ? "md:mr-[54%]"
                  : "md:ml-[54%]"
              }`}
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-rust">
                {event.era}
              </p>
              <h3 className="mt-2 text-xl font-bold sm:text-2xl">{event.title}</h3>
              <p className="mt-2 leading-relaxed text-[#38413e]">{event.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
