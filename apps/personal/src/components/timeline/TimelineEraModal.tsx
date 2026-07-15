"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { ExternalLink, X } from "lucide-react";
import type { TimelineEra } from "@/data/timeline-eras";
import { disciplineColors, disciplineLabels } from "@/data/types";
import { Paper } from "@/components/physical-ui/Paper";
import { Polaroid } from "@/components/physical-ui/Polaroid";

export function TimelineEraModal({
  era,
  open,
  onOpenChange,
}: {
  era: TimelineEra | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!era) return null;

  const accent = disciplineColors[era.disciplines[0]];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed inset-x-4 top-[50%] z-[70] max-h-[min(90vh,820px)] w-auto max-w-lg translate-y-[-50%] overflow-y-auto outline-none animate-[arcade-slide-in_0.28s_ease-out] sm:inset-x-auto sm:left-[50%] sm:w-full sm:translate-x-[-50%]"
          aria-describedby={`era-modal-desc-${era.id}`}
        >
          <Paper elevated className="relative">
            <Dialog.Close
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-paper-cream/80 text-ink-soft transition hover:border-ink/30 hover:text-ink"
              aria-label="Close era details"
            >
              <X className="h-4 w-4" />
            </Dialog.Close>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <Polaroid
                eraId={era.id}
                caption={era.caption}
                gradient={era.polaroidGradient}
                rotation={-2}
                size="lg"
                className="mx-auto shrink-0 sm:mx-0 sm:w-36"
              />

              <div className="min-w-0 flex-1 pr-8">
                <div
                  className="mb-2 h-1 w-10 rounded-full"
                  style={{ background: accent }}
                  aria-hidden="true"
                />
                <Dialog.Title className="font-editorial text-xl font-semibold text-ink sm:text-2xl">
                  {era.title}
                </Dialog.Title>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                  {era.period}
                </p>
                <p className="mt-2 text-sm font-medium text-ink-soft">{era.organization}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
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
              </div>
            </div>

            <div id={`era-modal-desc-${era.id}`} className="mt-6 space-y-4">
              {era.detailBody.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>

            {era.highlights.length > 0 && (
              <div className="mt-6">
                <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
                  Highlights
                </h4>
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

            {era.employers.length > 0 && (
              <div className="mt-6">
                <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
                  Employers & clients
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {era.employers.join(" · ")}
                </p>
              </div>
            )}

            {era.technologies.length > 0 && (
              <div className="mt-6">
                <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
                  Technologies
                </h4>
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
                      onClick={() => onOpenChange(false)}
                    >
                      {link.label} →
                    </Link>
                  ),
                )}
              </div>
            )}
          </Paper>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
