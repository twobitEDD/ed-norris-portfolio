"use client";

import Image from "next/image";
import { useStudioTheme } from "@/components/studio/StudioThemeProvider";
import { cn } from "@/lib/cn";

export function CountryWindow() {
  const { mode } = useStudioTheme();

  return (
    <div className="country-window-frame relative mx-auto w-full max-w-[1600px] px-4 sm:px-8">
      {/* Wood frame with mullions */}
      <div className="country-window relative h-[32vh] min-h-[260px] w-full overflow-hidden rounded-sm border-[6px] border-[#2a2218] shadow-[inset_0_0_50px_rgba(0,0,0,0.4),0_8px_32px_rgba(0,0,0,0.35)]">
        <Image
          src="/window-day.webp"
          alt=""
          fill
          priority
          className={cn(
            "country-window__photo object-cover object-center transition-opacity duration-700 ease-studio",
            mode === "day" ? "opacity-100" : "opacity-0",
          )}
          sizes="100vw"
        />
        <Image
          src="/window-night.webp"
          alt=""
          fill
          className={cn(
            "country-window__photo object-cover object-center transition-opacity duration-700 ease-studio",
            mode === "night" ? "opacity-100" : "opacity-0",
          )}
          sizes="100vw"
        />
        {/* Window mullions */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-y-0 left-1/2 w-[5px] -translate-x-1/2 bg-[#2a2218]/90 shadow-[inset_0_0_4px_rgba(0,0,0,0.5)]" />
          <div className="absolute inset-x-0 top-1/2 h-[5px] -translate-y-1/2 bg-[#2a2218]/90 shadow-[inset_0_0_4px_rgba(0,0,0,0.5)]" />
        </div>
        <div className="country-window__glass absolute inset-0" aria-hidden="true" />
      </div>
      {/* Counter ledge / sill */}
      <div className="studio-counter relative -mt-[2px] h-6 rounded-b-sm border-x-[6px] border-b-[6px] border-[#2a2218] bg-gradient-to-b from-[#8a6548] via-wood-light to-wood-mid shadow-[0_10px_28px_rgba(0,0,0,0.4)]">
        <div
          className="absolute inset-x-0 top-0 h-px bg-white/10"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
