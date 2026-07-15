"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ContactCTAs } from "@/components/contact/ContactCTAs";
import { IntroPaper } from "@/components/hero/IntroPaper";
import { PracticeTablet } from "@/components/hero/PracticeTablet";
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

      <div className="relative mx-auto flex min-h-[78svh] max-w-[920px] flex-col px-4 pb-8 pt-[4.75rem] sm:min-h-[84svh] sm:px-8 sm:pb-10 sm:pt-28">
        <div className="grid flex-1 items-start gap-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-8 lg:items-end lg:gap-10">
          <div id="intro" className="min-w-0" style={{ transform: "rotate(-1.2deg)" }}>
            <IntroPaper />
          </div>

          <div id="practices" className="min-w-0 md:mt-1 lg:mt-2" style={{ transform: "rotate(1deg)" }}>
            <div className="mx-auto max-w-[420px] md:max-w-none md:ml-auto">
              <PracticeTablet />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-5 sm:mt-10">
          <ContactCTAs variant="hero" />
          <Link
            href="/#game"
            className="rounded-full border border-paper-cream/35 bg-wood-dark/70 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-paper-cream transition hover:border-games/60 hover:bg-games/20 sm:text-[11px]"
          >
            Open studio apps ↓
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper-cream/70 motion-safe:animate-pulse sm:text-[11px]">
            Scroll the studio
          </p>
        </div>
      </div>
    </section>
  );
}
