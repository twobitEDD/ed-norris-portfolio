"use client";

import { profile } from "@/data";
import type { ResumePreset } from "@/data/types";
import { getResumeAccentColor } from "@/lib/resume";
import { ObjectShadow } from "@/components/physical-ui/ObjectShadow";
import { cn } from "@/lib/cn";

export type ResumeBusinessCardProps = {
  name: string;
  preset: ResumePreset;
  targetRole: string;
  summary: string;
  email?: string;
  onDownload?: () => void;
  className?: string;
};

function getPresetAccentColor(preset: ResumePreset): string {
  return getResumeAccentColor(preset.disciplines);
}

function getEmailFromProfile(): string {
  const emailLink = profile.links.find((l) => l.url.startsWith("mailto:"));
  return emailLink?.url.replace("mailto:", "") ?? "EddNorris@2bitdev.com";
}

export function ResumeBusinessCard({
  name,
  preset,
  targetRole,
  summary,
  email = getEmailFromProfile(),
  onDownload,
  className,
}: ResumeBusinessCardProps) {
  const accent = getPresetAccentColor(preset);

  return (
    <div className={cn("relative w-full max-w-[320px]", className)}>
      <ObjectShadow depth={3} />
      <article
        className="business-card relative flex aspect-[3.5/2] w-full flex-col overflow-hidden rounded-[3px]"
        style={{ "--card-accent": accent } as React.CSSProperties}
      >
        <div className="business-card__accent" aria-hidden="true" />
        <div className="business-card__body flex min-h-0 flex-1 flex-col justify-between px-5 py-4 sm:px-6 sm:py-[18px]">
          <div>
            <p className="font-mono text-[7px] uppercase tracking-[0.22em] text-ink-soft/70">
              Résumé generator
            </p>
            <h3 className="mt-1.5 font-editorial text-[1.35rem] font-semibold leading-tight tracking-tight text-ink">
              {name}
            </h3>
            <p className="mt-0.5 text-[11px] font-medium leading-snug text-ink-soft">{targetRole}</p>
            <p className="mt-2 line-clamp-3 text-[9px] leading-relaxed text-ink-soft/90">{summary}</p>
          </div>

          <div className="mt-2 flex items-end justify-between gap-3">
            <p className="font-mono text-[8px] tracking-wide text-ink-soft">{email}</p>
            {onDownload ? (
              <button
                type="button"
                onClick={onDownload}
                className="shrink-0 text-[8px] font-semibold text-ink/80 transition hover:text-ink"
              >
                Download →
              </button>
            ) : (
              <span className="shrink-0 font-mono text-[7px] uppercase tracking-wider text-ink-soft/60">
                {preset.label}
              </span>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
