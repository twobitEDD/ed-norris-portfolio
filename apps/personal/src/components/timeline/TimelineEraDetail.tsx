import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Experience } from "@/data/types";
import type { TimelineEra } from "@/data/timeline-eras";
import { disciplineColors, disciplineLabels } from "@/data/types";

type TimelineEraDetailProps = {
  era: TimelineEra;
  /** Full-page mode — show chronological role cards from experiences.ts. */
  roles?: Experience[];
  className?: string;
  id?: string;
};

export function TimelineEraDetail({ era, roles, className, id }: TimelineEraDetailProps) {
  const accent = disciplineColors[era.disciplines[0]];

  return (
    <div id={id} className={className}>
      <div className="space-y-4">
        {era.detailBody.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed text-ink-soft">
            {paragraph}
          </p>
        ))}
      </div>

      {era.highlights.length > 0 && (
        <div className="mt-6">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">Highlights</h4>
          <ul className="mt-2 space-y-1.5">
            {era.highlights.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-ink-soft">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {roles && roles.length > 0 && (
        <div className="mt-6">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">Roles in this era</h4>
          <ul className="mt-3 space-y-3">
            {roles.map((role) => (
              <li
                key={role.id}
                className="rounded border border-ink/10 bg-black/[0.02] px-4 py-3"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p className="font-editorial text-sm font-semibold text-ink">{role.title}</p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-ink-soft">
                    {role.period.start}
                    {role.period.end ? ` – ${role.period.end}` : " – Present"}
                  </p>
                </div>
                <p className="mt-0.5 text-xs font-medium text-ink-soft">{role.organization}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">{role.summary}</p>
                {role.details.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {role.details.slice(0, 2).map((detail) => (
                      <li key={detail} className="flex gap-2 text-xs text-ink-soft/90">
                        <span className="text-ink-soft/50">·</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {era.employers.length > 0 && (
        <div className="mt-6">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
            Employers & clients
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{era.employers.join(" · ")}</p>
        </div>
      )}

      {era.technologies.length > 0 && (
        <div className="mt-6">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">Technologies</h4>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {era.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded border border-ink/10 bg-black/[0.03] px-2 py-0.5 font-mono text-[10px] text-ink-soft"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-1.5">
        {era.disciplines.map((d) => (
          <span
            key={d}
            className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide"
            style={{ color: disciplineColors[d], background: `${disciplineColors[d]}22` }}
          >
            {disciplineLabels[d]}
          </span>
        ))}
      </div>

      {era.relatedLinks.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2 border-t border-ink/10 pt-5">
          {era.relatedLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-ink/20 px-3.5 text-xs font-semibold text-ink transition hover:border-ink/40 hover:bg-black/[0.03]"
              >
                {link.label}
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-[40px] items-center rounded-full border border-ink/20 px-3.5 text-xs font-semibold text-ink transition hover:border-ink/40 hover:bg-black/[0.03]"
              >
                {link.label} →
              </Link>
            ),
          )}
        </div>
      )}
    </div>
  );
}
