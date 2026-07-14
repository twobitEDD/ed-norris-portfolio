"use client";

/**
 * WIP scaffold — hybrid desk proof-of-concept.
 *
 * Demonstrates Layer 0 (wood) + Layer 1 (window band) + Layer 2 (children slot).
 * NOT wired into page.tsx yet. See docs/hybrid-desk-architecture.md.
 */

import Image from "next/image";
import { useStudioTheme } from "./StudioThemeProvider";

type HybridDeskSurfaceProps = {
  children?: React.ReactNode;
  className?: string;
};

export function HybridDeskSurface({ children, className = "" }: HybridDeskSurfaceProps) {
  const { mode } = useStudioTheme();

  return (
    <section
      className={`relative min-h-[70vh] overflow-hidden ${className}`}
      aria-label="Studio desk surface"
    >
      {/* Layer 0: wood desk surface */}
      <Image
        src="/assets/desk-wood-surface.webp"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        loading="lazy"
      />

      {/* Layer 1: window atmosphere band */}
      <div className="absolute inset-x-0 top-0 z-[1] h-[28vh] overflow-hidden">
        <Image
          src="/assets/window-band-day.webp"
          alt=""
          fill
          className="object-cover object-center transition-opacity duration-700 ease-studio"
          style={{ opacity: mode === "day" ? 1 : 0 }}
          sizes="100vw"
          loading="lazy"
        />
        <Image
          src="/assets/window-band-night.webp"
          alt=""
          fill
          className="object-cover object-center transition-opacity duration-700 ease-studio"
          style={{ opacity: mode === "night" ? 1 : 0 }}
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-wood-dark/80" />
      </div>

      {/* Layer 2: HTML module slot */}
      <div className="relative z-[2] mx-auto max-w-6xl px-4 pb-12 pt-[32vh]">
        {children}
      </div>
    </section>
  );
}
