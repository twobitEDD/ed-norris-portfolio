"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useStudioTheme } from "./StudioThemeProvider";

export function NorthStarAtmosphere() {
  const { mode } = useStudioTheme();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = scrollY * 0.28;
  const scale = 1 + Math.min(scrollY * 0.00012, 0.08);
  const deskFade = Math.min(scrollY / 520, 1);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute -inset-[8%] will-change-transform"
        style={{
          transform: `translate3d(0, ${parallax}px, 0) scale(${scale})`,
        }}
      >
        <Image
          src="/northstar-day.webp"
          alt=""
          fill
          priority
          className="object-cover object-[center_35%] transition-opacity duration-700 ease-studio"
          style={{ opacity: mode === "day" ? 1 : 0 }}
          sizes="100vw"
        />
        <Image
          src="/northstar-night.webp"
          alt=""
          fill
          priority
          className="object-cover object-[center_35%] transition-opacity duration-700 ease-studio"
          style={{ opacity: mode === "night" ? 1 : 0 }}
          sizes="100vw"
        />
      </div>

      <div className="northstar-vignette absolute inset-0" />

      <div
        className="absolute inset-x-0 bottom-0 h-[55vh] bg-gradient-to-b from-transparent via-wood-dark/50 to-wood-dark"
        style={{ opacity: deskFade }}
      />
    </div>
  );
}
