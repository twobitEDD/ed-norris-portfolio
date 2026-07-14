"use client";

import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { useStudioTheme } from "@/components/studio/StudioThemeProvider";
import { useHydratedScroll } from "@/lib/motion";

export function CinematicNorthStarHero() {
  const { mode } = useStudioTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useHydratedScroll(containerRef, {
    offset: ["start start", "end start"],
  });

  const imageOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.35, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.55, 0.85, 1]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <div ref={containerRef} id="hero" className="relative h-[88svh] scroll-mt-20 sm:h-[100svh] lg:h-[115svh]">
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        style={{ opacity: imageOpacity }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute -inset-[6%] will-change-transform"
          style={{ scale: imageScale, y: imageY }}
        >
          <Image
            src="/northstar-day.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[center_38%] transition-opacity duration-700 ease-studio"
            style={{ opacity: mode === "day" ? 1 : 0 }}
            sizes="100vw"
          />
          <Image
            src="/northstar-night.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[center_38%] transition-opacity duration-700 ease-studio"
            style={{ opacity: mode === "night" ? 1 : 0 }}
            sizes="100vw"
          />
        </motion.div>

        <motion.div className="northstar-vignette absolute inset-0" style={{ opacity: vignetteOpacity }} />

        <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-b from-transparent via-wood-dark/40 to-wood-dark/90" />
      </motion.div>

      <div className="relative z-[1] flex h-[78svh] flex-col items-center justify-end pb-10 sm:h-[92svh] sm:pb-16">
        <motion.div
          className="text-center"
          style={{ opacity: cueOpacity }}
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="font-editorial text-xl font-medium tracking-wide text-paper-cream sm:text-2xl">
            Edd Norris
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.32em] text-paper-cream/85 sm:text-[11px]">
            Scroll the studio ↓
          </p>
        </motion.div>
      </div>
    </div>
  );
}
