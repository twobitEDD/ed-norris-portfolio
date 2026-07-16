"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IntroPaper } from "@/components/hero/IntroPaper";
import { IntroPaperOverlay } from "@/components/hero/IntroPaperOverlay";
import { StudioObject } from "@/components/studio/StudioObject";
import { useStudioTheme } from "@/components/studio/StudioThemeProvider";

export function CinematicNorthStarHero() {
  const { mode } = useStudioTheme();
  const [nightLoaded, setNightLoaded] = useState(false);

  useEffect(() => {
    if (mode === "night") setNightLoaded(true);
  }, [mode]);

  return (
    <section id="hero" className="relative mb-6 min-h-[78svh] scroll-mt-20 pb-14 sm:mb-8 sm:min-h-[84svh] sm:pb-20 lg:mb-10 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/northstar-day.webp"
          alt=""
          fill
          priority
          className="northstar-hero-image object-cover object-[center_30%]"
          sizes="100vw"
        />
        {nightLoaded && (
          <Image
            src="/northstar-night.webp"
            alt=""
            fill
            className="northstar-hero-image object-cover object-[center_30%] transition-opacity duration-700 ease-studio"
            style={{ opacity: mode === "night" ? 1 : 0 }}
            sizes="100vw"
          />
        )}

        <div className="northstar-vignette absolute inset-0 opacity-50" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-studio-black/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[38vh] bg-gradient-to-b from-transparent via-wood-dark/25 to-wood-dark/90" />
      </div>

      <div className="relative mx-auto flex min-h-[78svh] max-w-[min(100%,var(--studio-hero-max,920px))] flex-col px-4 pb-8 pt-[4.75rem] sm:min-h-[84svh] sm:px-8 sm:pb-10 sm:pt-28">
        <div className="flex flex-1 items-start justify-center">
          <div
            id="intro"
            className="relative w-full min-w-0 max-w-[min(100%,var(--studio-intro-max,620px))]"
          >
            <StudioObject rotate={-1.2} className="relative z-10">
              <IntroPaper />
            </StudioObject>
            <StudioObject
              rotate={2.4}
              className="relative z-20 mx-auto mt-5 w-full max-w-[260px] sm:absolute sm:right-[-1.25rem] sm:top-[44%] sm:mt-0 sm:w-[min(44%,var(--studio-intro-overlay-max,250px))] sm:max-w-[var(--studio-intro-overlay-max,250px)] sm:-translate-y-1/2 md:right-[-1.75rem] lg:right-[-2rem] xl:right-[-2.5rem] 2xl:right-[-3rem]"
            >
              <IntroPaperOverlay />
            </StudioObject>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center sm:mt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper-cream/70 motion-safe:animate-pulse sm:text-[11px]">
            Scroll the studio
          </p>
        </div>
      </div>
    </section>
  );
}
