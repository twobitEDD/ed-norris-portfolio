"use client";

import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { IntroPaper } from "@/components/hero/IntroPaper";
import { PracticeTablet } from "@/components/hero/PracticeTablet";
import { StudioObject } from "@/components/studio/StudioObject";
import { useStudioTheme } from "@/components/studio/StudioThemeProvider";
import { useHydratedScroll } from "@/lib/motion";

export function CinematicNorthStarHero() {
  const { mode } = useStudioTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useHydratedScroll(containerRef, {
    offset: ["start start", "end start"],
  });

  const imageOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.35, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.3, 0.6, 0.85]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <div ref={containerRef} id="hero" className="relative h-[118svh] scroll-mt-20 sm:h-[125svh]">
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        style={{ opacity: imageOpacity }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-0 h-full w-full will-change-transform"
          style={{ scale: imageScale, y: imageY }}
        >
          <Image
            src="/northstar-day.jpg"
            alt=""
            fill
            priority
            className="northstar-hero-image object-cover object-[center_30%] transition-opacity duration-700 ease-studio"
            style={{ opacity: mode === "day" ? 1 : 0 }}
            sizes="100vw"
          />
          <Image
            src="/northstar-night.jpg"
            alt=""
            fill
            priority
            className="northstar-hero-image object-cover object-[center_30%] transition-opacity duration-700 ease-studio"
            style={{ opacity: mode === "night" ? 1 : 0 }}
            sizes="100vw"
          />
        </motion.div>

        <motion.div className="northstar-vignette absolute inset-0" style={{ opacity: vignetteOpacity }} />

        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-studio-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[42vh] bg-gradient-to-b from-transparent via-wood-dark/30 to-wood-dark/88" />
      </motion.div>

      <motion.div
        className="relative z-[1] mx-auto flex min-h-[100svh] max-w-[920px] flex-col px-4 pb-20 pt-[4.75rem] sm:px-8 sm:pb-24 sm:pt-28"
        style={{ y: contentY }}
      >
        <div className="grid flex-1 items-start gap-5 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-7 lg:items-end lg:gap-8">
          <div id="intro" className="min-w-0">
            <StudioObject rotate={-1.2}>
              <IntroPaper />
            </StudioObject>
          </div>

          <div id="work" className="min-w-0 md:-mt-2 lg:-mt-10">
            <StudioObject rotate={1}>
              <div className="mx-auto max-w-[420px] md:max-w-none md:ml-auto">
                <PracticeTablet />
              </div>
            </StudioObject>
          </div>
        </div>

        <motion.div
          className="mt-8 flex justify-center md:mt-10"
          style={{ opacity: cueOpacity }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-paper-cream/80 sm:text-[11px]">
            Scroll the studio ↓
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
