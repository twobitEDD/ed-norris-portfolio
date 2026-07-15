import type { ResumeContent } from "@/lib/resume";
import { cn } from "@/lib/cn";

function ResumeCornerLines({ accent, className }: { accent: string; className?: string }) {
  return (
    <svg
      className={cn("pointer-events-none absolute h-10 w-10", className)}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path d="M40 12V0H28" stroke={accent} strokeWidth="1" strokeOpacity="0.35" />
      <path d="M0 28V40H12" stroke={accent} strokeWidth="1" strokeOpacity="0.35" />
    </svg>
  );
}

function ResumeSectionTitle({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <h3 className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
      <span className="h-px w-3 shrink-0" style={{ backgroundColor: accent }} aria-hidden="true" />
      {children}
    </h3>
  );
}

export function ResumePreview({ content, className }: { content: ResumeContent; className?: string }) {
  const accent = content.accentColor;

  return (
    <article
      className={cn(
        "relative min-h-[640px] overflow-hidden rounded-2xl border border-border bg-[#fafbfc] p-8 text-[#0f172a] shadow-paper sm:p-10",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1"
        style={{
          background: `linear-gradient(180deg, ${accent} 0%, color-mix(in srgb, ${accent} 55%, white) 100%)`,
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-[0.07]"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
        aria-hidden="true"
      />

      <ResumeCornerLines accent={accent} className="right-6 top-6" />
      <ResumeCornerLines accent={accent} className="bottom-6 left-4 rotate-180" />

      <div className="relative">
        <header className="border-b border-slate-200 pb-5">
          <h2 className="font-display text-3xl font-bold tracking-tight">{content.name}</h2>
          <div
            className="mt-2 h-0.5 w-14"
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          />
          <p className="mt-2 text-lg font-medium text-slate-700">{content.targetRole}</p>
          <p className="mt-1 text-sm text-slate-500">{content.location}</p>
          {content.links.length > 0 && (
            <p className="mt-2 text-xs text-slate-500">
              {content.links.map((l) => l.label).join(" · ")}
            </p>
          )}
        </header>

        <section className="mt-6">
          <ResumeSectionTitle accent={accent}>Profile</ResumeSectionTitle>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{content.summary}</p>
        </section>

        <section className="mt-6">
          <ResumeSectionTitle accent={accent}>Experience</ResumeSectionTitle>
          <div className="mt-3 space-y-5">
            {content.experiences.map((exp) => (
              <div key={exp.id}>
                <p className="font-semibold text-slate-900">
                  {exp.title} — {exp.organization}
                </p>
                <p className="text-xs text-slate-500">
                  {exp.period.start} – {exp.period.end ?? "Present"}
                </p>
                <p className="mt-1 text-sm text-slate-700">{exp.summary}</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-600">
                  {exp.details.slice(0, 2).map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {content.education.length > 0 && (
          <section className="mt-6">
            <ResumeSectionTitle accent={accent}>Education</ResumeSectionTitle>
            <div className="mt-3 space-y-4">
              {content.education.map((entry) => (
                <div key={entry.id}>
                  <p className="font-semibold text-slate-900">
                    {entry.title} — {entry.organization}
                  </p>
                  <p className="text-xs text-slate-500">
                    {entry.period.start}
                    {entry.period.end ? ` – ${entry.period.end}` : ""}
                  </p>
                  {entry.summary && <p className="mt-1 text-sm text-slate-700">{entry.summary}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {content.projects.length > 0 && (
          <section className="mt-6">
            <ResumeSectionTitle accent={accent}>Selected Projects</ResumeSectionTitle>
            <div className="mt-3 space-y-3">
              {content.projects.map((p) => (
                <div key={p.id}>
                  <p className="font-semibold text-slate-900">{p.title}</p>
                  <p className="text-sm text-slate-600">{p.summary}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {content.skills.length > 0 && (
          <section className="mt-6">
            <ResumeSectionTitle accent={accent}>Skills</ResumeSectionTitle>
            <p className="mt-2 text-sm text-slate-700">
              {content.skills.map((s) => s.label).join(" · ")}
            </p>
          </section>
        )}
      </div>
    </article>
  );
}
