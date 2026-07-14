import type { ResumeContent } from "@/lib/resume";
import { cn } from "@/lib/cn";

export function ResumePreview({ content, className }: { content: ResumeContent; className?: string }) {
  return (
    <article
      className={cn(
        "min-h-[640px] rounded-2xl border border-border bg-[#fafbfc] p-8 text-[#0f172a] shadow-paper sm:p-10",
        className,
      )}
    >
      <header className="border-b border-slate-200 pb-5">
        <h2 className="font-display text-3xl font-bold tracking-tight">{content.name}</h2>
        <p className="mt-1 text-lg font-medium text-slate-700">{content.targetRole}</p>
        <p className="mt-1 text-sm text-slate-500">{content.location}</p>
        {content.links.length > 0 && (
          <p className="mt-2 text-xs text-slate-500">
            {content.links.map((l) => l.label).join(" · ")}
          </p>
        )}
      </header>

      <section className="mt-6">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Profile
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{content.summary}</p>
      </section>

      <section className="mt-6">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Experience
        </h3>
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
          <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Education
          </h3>
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
          <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Selected Projects
          </h3>
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
          <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Skills
          </h3>
          <p className="mt-2 text-sm text-slate-700">
            {content.skills.map((s) => s.label).join(" · ")}
          </p>
        </section>
      )}
    </article>
  );
}
