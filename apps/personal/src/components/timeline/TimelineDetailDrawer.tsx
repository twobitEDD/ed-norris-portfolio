"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { Experience } from "@/data/types";
import { disciplineColors, disciplineLabels } from "@/data/types";
import { cn } from "@/lib/cn";

export function TimelineDetailDrawer({
  experience,
  open,
  onOpenChange,
}: {
  experience: Experience | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!experience) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl border border-border bg-background-raised p-6 shadow-2xl sm:left-auto sm:right-6 sm:top-1/2 sm:bottom-auto sm:w-[440px] sm:-translate-y-1/2 sm:rounded-3xl">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="font-display text-xl font-bold text-text-primary">
                {experience.title}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-text-secondary">
                {experience.organization}
              </Dialog.Description>
            </div>
            <Dialog.Close
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border text-text-primary"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
            {experience.period.start} – {experience.period.end ?? "Present"}
          </p>
          <p className="mt-4 text-text-secondary">{experience.summary}</p>
          <ul className="mt-4 space-y-2 text-sm text-text-secondary">
            {experience.details.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="text-technology">•</span>
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {experience.disciplines.map((d) => (
              <span
                key={d}
                className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase"
                style={{ background: `${disciplineColors[d]}22`, color: disciplineColors[d] }}
              >
                {disciplineLabels[d]}
              </span>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
