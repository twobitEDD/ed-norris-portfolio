import type { Person } from "@ed-norris/career-data";

export function ContactSection({ person }: { person: Person }) {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line py-16 sm:py-24">
      <h2 className="text-3xl font-bold sm:text-5xl">Let&apos;s build something useful.</h2>
      <p className="mt-5 max-w-[760px] text-lg text-muted sm:text-xl">
        Open to software leadership, product strategy, environmental technology, and
        creative technology roles. Reach out for consulting, collaboration, or full-time
        opportunities.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {person.links?.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target={link.url.startsWith("http") ? "_blank" : undefined}
            rel={link.url.startsWith("http") ? "noreferrer" : undefined}
            className="rounded-full border border-ink px-5 py-3 text-sm font-semibold transition hover:bg-ink hover:text-paper"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#resume"
          className="rounded-full border border-ink bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:opacity-90"
        >
          Download résumé
        </a>
      </div>

      <p className="mt-8 text-sm text-muted">
        Based in {person.location}. Available for remote and hybrid roles.
      </p>
    </section>
  );
}
