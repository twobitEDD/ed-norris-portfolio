"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { practices } from "@/data";
import { creativeSlides, environmentalSlides } from "@/data/discipline-slides";
import { disciplineColors } from "@/data/types";
import { Paper } from "@/components/physical-ui/Paper";
import { ClientLogoStrip } from "@/components/hero/ClientLogoStrip";
import { PracticeGateway } from "@/components/practices/PracticeGateway";
import { DisciplineWorkSlideshow } from "@/components/work/DisciplineWorkSlideshow";
import { StudioObject } from "@/components/studio/StudioObject";
import { StudioReveal } from "@/components/studio/StudioReveal";
import { StudioScene } from "@/components/studio/StudioScene";
import { cn } from "@/lib/cn";
import {
  parseWorkHash,
  practiceForHash,
  scrollToWorkSection,
  slideshowForHash,
  WORK_HASH_LABELS,
  WORK_HASHES,
  type WorkHash,
  type WorkSlideshowId,
} from "@/lib/work-discipline";

const accentMap: Record<WorkSlideshowId, { primary: string; secondary: string }> = {
  environmental: { primary: disciplineColors.environment, secondary: disciplineColors.data },
  creative: { primary: disciplineColors.games, secondary: disciplineColors.marketing },
};

const slideshowMeta: Record<
  WorkSlideshowId,
  { slides: typeof environmentalSlides; label: string; hash: WorkHash }
> = {
  environmental: {
    slides: environmentalSlides,
    label: "Environmental",
    hash: "environmental",
  },
  creative: {
    slides: creativeSlides,
    label: "Creative & Games",
    hash: "creative",
  },
};

function DisciplineNav({ activeHash }: { activeHash: WorkHash | null }) {
  return (
    <nav className="mt-6 flex flex-wrap gap-2" aria-label="Filter work by discipline">
      <Link
        href="/work"
        className={cn(
          "rounded-full border px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider transition",
          activeHash === null
            ? "border-ink bg-ink text-paper-cream"
            : "border-ink/20 text-ink hover:bg-ink/10",
        )}
      >
        All work
      </Link>
      {WORK_HASHES.map((hash) => (
        <Link
          key={hash}
          href={`/work#${hash}`}
          className={cn(
            "rounded-full border px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider transition",
            activeHash === hash
              ? "border-ink bg-ink text-paper-cream"
              : "border-ink/20 text-ink hover:bg-ink/10",
          )}
        >
          {WORK_HASH_LABELS[hash]}
        </Link>
      ))}
    </nav>
  );
}

function DisciplineSlideshowSection({
  id,
  slideshowId,
  highlighted,
  compact,
}: {
  id: WorkHash;
  slideshowId: WorkSlideshowId;
  highlighted: boolean;
  compact?: boolean;
}) {
  const meta = slideshowMeta[slideshowId];
  const practice = practiceForHash(meta.hash, practices);
  const accent = accentMap[slideshowId];
  const title =
    id === "games"
      ? "Games & Interactive Media"
      : (practice?.title ?? meta.label);
  const summary =
    id === "games"
      ? "Game platforms, indie studio work, and interactive experiences across web and console."
      : (practice?.summary ?? "");
  const tagline = practice?.tagline;
  const tags = practice?.tags ?? [];

  return (
    <StudioScene
      id={id}
      className={cn("!py-10 sm:!py-14", highlighted && "scroll-mt-24")}
    >
      <StudioReveal>
        <StudioObject rotate={0.5}>
          <div
            className={cn(
              "max-w-3xl transition-shadow duration-300",
              highlighted && "rounded-[2px] ring-2 ring-offset-4 ring-offset-transparent",
            )}
            style={
              highlighted
                ? { boxShadow: `0 0 0 2px ${accent.primary}88, 0 18px 48px ${accent.primary}22` }
                : undefined
            }
          >
            <Paper torn>
              <p
                className="font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{ color: accent.primary }}
              >
                {practice?.label ?? meta.label}
              </p>
              {tagline && (
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  {tagline}
                </p>
              )}
              <h2 className="mt-3 font-editorial text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{summary}</p>
              {tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-wider"
                      style={{ borderColor: `${accent.primary}44`, color: accent.primary }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {!highlighted && (
                <Link
                  href={`/work#${id === "games" ? "games" : meta.hash}`}
                  className="mt-4 inline-block text-xs font-semibold text-ink hover:text-ink-soft"
                >
                  View full {meta.label.toLowerCase()} slideshow →
                </Link>
              )}
            </Paper>
          </div>
        </StudioObject>

        <div className={cn("mt-8", compact && "mt-6")}>
          <DisciplineWorkSlideshow
            slides={meta.slides}
            autoAdvance={highlighted}
            ariaLabel={`${title} slideshow`}
          />
        </div>
      </StudioReveal>
    </StudioScene>
  );
}

export function WorkScene() {
  const [activeHash, setActiveHash] = useState<WorkHash | null>(null);

  useEffect(() => {
    const syncHash = () => {
      const next = parseWorkHash(window.location.hash);
      setActiveHash(next);
      scrollToWorkSection(next, "smooth");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const activeSlideshow = useMemo(() => slideshowForHash(activeHash), [activeHash]);
  const focusedPractice = activeHash ? practiceForHash(activeHash, practices) : undefined;

  const pageTitle =
    focusedPractice?.title ??
    (activeHash === "games" ? "Games & Interactive Media" : "Work that solves real problems.");
  const pageDescription =
    focusedPractice?.summary ??
    (activeHash === "games"
      ? "Game platforms, indie studio work, and interactive experiences."
      : "Environmental systems and creative technology — each with proof, case studies, and a clear hiring path.");

  const overviewSections: { id: WorkHash; slideshowId: WorkSlideshowId }[] = [
    { id: "environmental", slideshowId: "environmental" },
    { id: "creative", slideshowId: "creative" },
  ];

  return (
    <>
      <StudioScene id="work" minHeight="min-h-0" className="!pb-6 !pt-24 sm:!pt-28">
        <StudioReveal>
          <StudioObject rotate={0.4}>
            <Paper torn className="max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Selected work</p>
              <h1 className="mt-2 font-editorial text-3xl font-semibold text-ink sm:text-4xl">{pageTitle}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{pageDescription}</p>
              <ClientLogoStrip size="sm" className="mt-5 max-w-xl" />
              <DisciplineNav activeHash={activeHash} />
            </Paper>
          </StudioObject>
        </StudioReveal>
      </StudioScene>

      {!activeHash && (
        <StudioScene id="practices" className="!py-8 sm:!py-10">
          <StudioReveal>
            <PracticeGateway practices={practices} useAnchors />
          </StudioReveal>
        </StudioScene>
      )}

      {activeSlideshow && activeHash ? (
        <DisciplineSlideshowSection
          id={activeHash}
          slideshowId={activeSlideshow}
          highlighted
        />
      ) : (
        overviewSections.map(({ id, slideshowId }) => (
          <DisciplineSlideshowSection
            key={id}
            id={id}
            slideshowId={slideshowId}
            highlighted={false}
            compact
          />
        ))
      )}
    </>
  );
}
