"use client";

import { useCallback, useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { timelineEras } from "@/data";
import { getExperiencesForEra } from "@/data/timeline-era-helpers";
import { throughLineThesis } from "@/data/through-line";
import { disciplineColors } from "@/data/types";
import { Paper } from "@/components/physical-ui/Paper";
import { Polaroid } from "@/components/physical-ui/Polaroid";
import { TimelineEraDetail } from "@/components/timeline/TimelineEraDetail";
import { cn } from "@/lib/cn";

function initialExpandedState(): Record<string, boolean> {
  return Object.fromEntries(timelineEras.map((era) => [era.id, true]));
}

export function TimelineFullView() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(initialExpandedState);

  const rolesByEra = useMemo(
    () => Object.fromEntries(timelineEras.map((era) => [era.id, getExperiencesForEra(era)])),
    [],
  );

  const toggleEra = useCallback((eraId: string) => {
    setExpanded((prev) => ({ ...prev, [eraId]: !prev[eraId] }));
  }, []);

  const expandAll = useCallback(() => {
    setExpanded(initialExpandedState());
  }, []);

  const collapseAll = useCallback(() => {
    setExpanded(Object.fromEntries(timelineEras.map((era) => [era.id, false])));
  }, []);

  const expandedCount = timelineEras.filter((era) => expanded[era.id]).length;

  return (
    <Paper className="w-full max-w-none" pinned>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">Full career arc</p>
          <h1 className="mt-2 font-editorial text-2xl font-semibold text-ink sm:text-3xl">
            A career told as connected decisions.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{throughLineThesis}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={expandAll}
            disabled={expandedCount === timelineEras.length}
            className="rounded-full border border-ink/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-ink-soft transition hover:border-ink/30 hover:text-ink disabled:opacity-40"
          >
            Expand all
          </button>
          <button
            type="button"
            onClick={collapseAll}
            disabled={expandedCount === 0}
            className="rounded-full border border-ink/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-ink-soft transition hover:border-ink/30 hover:text-ink disabled:opacity-40"
          >
            Collapse all
          </button>
        </div>
      </div>

      <div className="relative mt-8 space-y-0">
        <div className="absolute bottom-2 left-3 top-2 w-px bg-ink/20" aria-hidden="true" />

        {timelineEras.map((era) => {
          const accent = disciplineColors[era.disciplines[0]];
          const isOpen = expanded[era.id] ?? true;
          const panelId = `era-panel-${era.id}`;

          return (
            <section
              key={era.id}
              className="relative border-b border-ink/10 last:border-b-0"
              aria-labelledby={`era-heading-${era.id}`}
            >
              <div className="flex gap-3 py-4 sm:py-5">
                <div
                  className="relative z-10 mt-2 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-paper-cream"
                  style={{
                    background: accent,
                    boxShadow: isOpen ? `0 0 10px ${accent}` : undefined,
                  }}
                  aria-hidden="true"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start">
                      <Polaroid
                        caption={era.caption}
                        eraId={era.id}
                        gradient={era.polaroidGradient}
                        className="shrink-0 scale-90"
                      />
                      <div className="min-w-0">
                        <p
                          id={`era-heading-${era.id}`}
                          className="font-mono text-[10px] uppercase tracking-wider text-ink-soft"
                        >
                          {era.period}
                        </p>
                        <h2 className="font-editorial text-lg font-semibold text-ink sm:text-xl">{era.title}</h2>
                        <p className="text-xs font-medium text-ink-soft">{era.organization}</p>
                        {!isOpen && (
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-soft">{era.summary}</p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleEra(era.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-ink/15 px-3 py-1.5",
                        "font-mono text-[9px] uppercase tracking-wider text-ink-soft transition",
                        "hover:border-ink/30 hover:text-ink",
                      )}
                    >
                      {isOpen ? (
                        <>
                          <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                          Minimize
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                          Expand
                        </>
                      )}
                    </button>
                  </div>

                  {isOpen && (
                    <div id={panelId} className="mt-5 border-t border-ink/10 pt-5 sm:pl-[calc(7.5rem+0.75rem)]">
                      <p className="mb-4 text-sm leading-relaxed text-ink-soft">{era.summary}</p>
                      <TimelineEraDetail era={era} roles={rolesByEra[era.id]} />
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </Paper>
  );
}
