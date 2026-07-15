"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { TimelineEra } from "@/data/timeline-eras";
import { disciplineColors } from "@/data/types";
import { Paper } from "@/components/physical-ui/Paper";
import { Polaroid } from "@/components/physical-ui/Polaroid";
import { TimelineEraDetail } from "@/components/timeline/TimelineEraDetail";

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
          aria-describedby={`era-detail-${era.id}`}
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
              </div>
            </div>

            <TimelineEraDetail era={era} id={`era-detail-${era.id}`} className="mt-6" />
          </Paper>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
