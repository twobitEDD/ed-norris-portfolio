"use client";

import Image from "next/image";
import { forwardRef, useCallback, useEffect, useState, type KeyboardEvent, type MouseEvent } from "react";
import QRCode from "react-qr-code";
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

const CARD_SITES = [
  { label: "2bitDEV.com", href: "https://2bitdev.com" },
  { label: "2bitENT.com", href: "https://2bitent.com" },
  { label: "co2t.earth", href: "https://co2t.earth" },
] as const;

const QR_URL = "https://2bitdev.com";

function getPresetAccentColor(preset: ResumePreset): string {
  return getResumeAccentColor(preset.disciplines);
}

function getEmailFromProfile(): string {
  const emailLink = profile.links.find((l) => l.url.startsWith("mailto:"));
  return emailLink?.url.replace("mailto:", "") ?? "EddNorris@2bitdev.com";
}

function isInteractiveFlipTarget(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && Boolean(target.closest("a, button, [data-capture-exclude]"));
}

export const ResumeBusinessCard = forwardRef<HTMLDivElement, ResumeBusinessCardProps>(function ResumeBusinessCard(
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
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setValueProp(getNextResumeValueProp());
  }, []);

  const toggleFlip = useCallback(() => {
    setFlipped((current) => !current);
  }, []);

  const handleFlipClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (isInteractiveFlipTarget(event.target)) return;
      toggleFlip();
    },
    [toggleFlip],
  );

  const handleFlipKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (isInteractiveFlipTarget(event.target)) return;
      event.preventDefault();
      toggleFlip();
    },
    [toggleFlip],
  );

  return (
    <div className={cn("relative mx-auto w-full min-w-0 max-w-[min(320px,100%)]", className)}>
      <ObjectShadow depth={3} />
      <div
        ref={ref}
        className="business-card-flip"
        data-flipped={flipped || undefined}
        tabIndex={0}
        role="group"
        aria-label={flipped ? "Business card, back side. Press Enter to flip." : "Business card, front side. Press Enter to flip."}
        onClick={handleFlipClick}
        onKeyDown={handleFlipKeyDown}
      >
        <div className="business-card-flip__inner">
          <article
            className="business-card business-card__face business-card__front relative flex aspect-[3.5/2] w-full flex-col overflow-hidden rounded-[3px]"
            data-business-card-face="front"
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
                    width={208}
                    height={208}
                    quality={100}
                    sizes="52px"
                    className="business-card__avatar-image"
                    style={{ objectPosition: profilePhoto.objectPosition ?? "center" }}
                  />
                </div>
              </div>

              <div className="mt-2 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="business-card__email font-mono text-[8px] tracking-wide">{email}</p>
                  <p className="business-card__links mt-0.5 font-mono text-[7px] tracking-wide">
                    {CARD_SITES.map((site, index) => (
                      <span key={site.href}>
                        {index > 0 ? (
                          <span className="business-card__links-sep" aria-hidden="true">
                            {" "}
                            |{" "}
                          </span>
                        ) : null}
                        <a
                          href={site.href}
                          className="business-card__link"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => event.stopPropagation()}
                        >
                          {site.label}
                        </a>
                      </span>
                    ))}
                  </p>
                </div>
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

          <article
            className="business-card business-card__face business-card__back relative flex aspect-[3.5/2] w-full flex-col overflow-hidden rounded-[3px]"
            data-business-card-face="back"
            aria-hidden={!flipped}
            style={{ "--card-accent": accent } as React.CSSProperties}
          >
            <div className="business-card__accent" aria-hidden="true" />
            <div className="business-card__back-body flex min-h-0 flex-1 flex-col items-center justify-center px-5 py-4">
              <div className="business-card__qr-wrap">
                <QRCode value={QR_URL} size={76} bgColor="transparent" fgColor="#1b211e" level="M" />
              </div>
              <p className="business-card__qr-label mt-2 font-mono text-[7px] uppercase tracking-[0.14em]">
                2bitDEV.com
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
});
