"use client";

import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";
import { profile } from "@/data";
import { profilePhoto } from "@/data/career-images";
import { resumeValueProps, type ResumeValueProp } from "@/data/resume-value-props";
import type { ResumePreset } from "@/data/types";
import { getResumeAccentColor } from "@/lib/resume";
import { getNextResumeValueProp } from "@/lib/resume/value-prop-rotation";
import { ObjectShadow } from "@/components/physical-ui/ObjectShadow";
import { cn } from "@/lib/cn";

export type ResumeBusinessCardProps = {
  name: string;
  preset: ResumePreset;
  targetRole: string;
  summary: string;
  accentColor?: string;
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

export const ResumeBusinessCard = forwardRef<HTMLElement, ResumeBusinessCardProps>(function ResumeBusinessCard(
  {
    name,
    preset,
    targetRole,
    summary,
    accentColor,
    email = getEmailFromProfile(),
    onDownload,
    className,
  },
  ref,
) {
  const accent = accentColor ?? getPresetAccentColor(preset);
  const [valueProp, setValueProp] = useState<ResumeValueProp>(resumeValueProps[0]);

  useEffect(() => {
    setValueProp(getNextResumeValueProp());
  }, []);

  return (
    <div className={cn("relative mx-auto w-full min-w-0 max-w-[min(320px,100%)]", className)}>
      <ObjectShadow depth={3} />
      <article
        ref={ref}
        className="business-card relative flex aspect-[3.5/2] w-full flex-col overflow-hidden rounded-[3px]"
        style={{ "--card-accent": accent } as React.CSSProperties}
      >
        <div className="business-card__accent" aria-hidden="true" />
        <div className="business-card__body flex min-h-0 flex-1 flex-col justify-between px-5 py-4 sm:px-6 sm:py-[18px]">
          <div className="business-card__header flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p
                className="business-card__eyebrow min-h-[2.7em] font-mono text-[6px] uppercase leading-[1.35] tracking-[0.16em] line-clamp-2"
                suppressHydrationWarning
              >
                {valueProp}
              </p>
              <h3 className="business-card__name mt-1.5 font-editorial text-[1.35rem] font-semibold leading-tight tracking-tight">
                {name}
              </h3>
              <p className="business-card__role mt-0.5 text-[11px] font-medium leading-snug">{targetRole}</p>
              <p className="business-card__summary mt-2 line-clamp-3 text-[9px] leading-relaxed">{summary}</p>
            </div>
            <div className="business-card__avatar shrink-0" aria-hidden="true">
              <Image
                src={profilePhoto.src}
                alt=""
                width={52}
                height={52}
                className="business-card__avatar-image"
                style={{ objectPosition: profilePhoto.objectPosition ?? "center" }}
              />
            </div>
          </div>

          <div className="mt-2 flex items-end justify-between gap-3">
            <p className="business-card__email font-mono text-[8px] tracking-wide">{email}</p>
            {onDownload ? (
              <button
                type="button"
                onClick={onDownload}
                data-capture-exclude
                className="business-card__action shrink-0 text-[8px] font-semibold"
              >
                Download →
              </button>
            ) : (
              <span className="business-card__preset shrink-0 font-mono text-[7px] uppercase tracking-wider">
                {preset.label}
              </span>
            )}
          </div>
        </div>
      </article>
    </div>
  );
});
