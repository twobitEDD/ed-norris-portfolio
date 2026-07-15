"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { timelineEras, type TimelineEra } from "@/data";
import { disciplineColors } from "@/data/types";
import { Paper } from "@/components/physical-ui/Paper";
import { Polaroid } from "@/components/physical-ui/Polaroid";
import { TimelineEraModal } from "@/components/timeline/TimelineEraModal";
import { cn } from "@/lib/cn";

type TimelinePaperProps = {
  compact?: boolean;
  /** Called when an era row is opened — e.g. sync a detail panel on /timeline. */
  onEraSelect?: (era: TimelineEra) => void;
};

export function TimelinePaper({ compact, onEraSelect }: TimelinePaperProps) {
  const [activeId, setActiveId] = useState(timelineEras[0]?.id);
  const [modalEra, setModalEra] = useState<TimelineEra | null>(null);

  const openEra = useCallback(
    (era: TimelineEra) => {
      setActiveId(era.id);
      setModalEra(era);
      onEraSelect?.(era);
    },
    [onEraSelect],
  );

  const closeModal = useCallback((open: boolean) => {
    if (!open) setModalEra(null);
  }, []);

  return (
    <>
      <Paper className="w-full max-w-none">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">Career arc</p>
        <h2 className="mt-2 font-editorial text-xl font-semibold text-ink sm:text-2xl">
          A career told as connected decisions.
        </h2>
        <div className={compact ? "mt-4 space-y-0" : "relative mt-6 space-y-0"}>
          {!compact && (
            <div className="absolute bottom-2 left-3 top-2 w-px bg-ink/20" aria-hidden="true" />
          )}
          {timelineEras.map((era) => {
            const accent = disciplineColors[era.disciplines[0]];
            const isActive = activeId === era.id;
            const isExpanded = modalEra?.id === era.id;
            return (
              <button
                key={era.id}
                type="button"
                onClick={() => openEra(era)}
                aria-expanded={isExpanded}
                aria-controls={`era-modal-desc-${era.id}`}
                className={cn(
                  "relative flex w-full gap-3 border-b border-ink/10 py-3 text-left transition hover:bg-black/[0.03] sm:py-4",
                  isActive && "bg-black/[0.02]",
                )}
              >
                <div
                  className="relative z-10 mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-paper-cream"
                  style={{
                    background: accent,
                    boxShadow: isActive ? `0 0 10px ${accent}` : undefined,
                  }}
                />
                <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-start">
                  {!compact && (
                    <Polaroid
                      caption={era.caption}
                      eraId={era.id}
                      gradient={era.polaroidGradient}
                      className="shrink-0 scale-90"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-ink-soft">{era.period}</p>
                    <h3 className="font-editorial text-base font-semibold text-ink">{era.title}</h3>
                    <p className="text-xs font-medium text-ink-soft">{era.organization}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-soft">{era.summary}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <Link
          href="/timeline"
          className="mt-4 inline-block font-mono text-[10px] uppercase tracking-wider text-ink underline-offset-4 hover:underline"
        >
          View full timeline →
        </Link>
      </Paper>

      <TimelineEraModal era={modalEra} open={!!modalEra} onOpenChange={closeModal} />
    </>
  );
}
