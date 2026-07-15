"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArcadeNetworkMotif } from "./ArcadeNetworkMotif";

type ArcadeCabinetProps = {
  children: ReactNode;
  onClose: () => void;
  className?: string;
  closing?: boolean;
  reducedMotion?: boolean;
};

export function ArcadeCabinet({
  children,
  onClose,
  className,
  closing = false,
  reducedMotion = false,
}: ArcadeCabinetProps) {
  return (
    <div
      className={cn(
        "arcade-cabinet relative mx-auto flex w-full max-w-[min(96vw,920px)] flex-col",
        reducedMotion
          ? closing
            ? "opacity-0"
            : "opacity-100"
          : closing
            ? "animate-[arcade-slide-out_0.32s_ease-in_forwards]"
            : "animate-[arcade-slide-in_0.38s_ease-out]",
        className,
      )}
    >
      <div className="arcade-cabinet__marquee relative overflow-hidden rounded-t-xl border border-[#2a1f14] bg-gradient-to-b from-[#1a120c] via-[#120d09] to-[#0a0705] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,220,160,0.12)]">
        <ArcadeNetworkMotif className="opacity-40" />
        <div className="relative flex items-center justify-between gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#78aa74]/80">
            Norris Studio
          </span>
          <h2 className="arcade-cabinet__title font-editorial text-lg font-semibold tracking-wide text-[#f5e6c8] sm:text-xl">
            DOT EXPLORER
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#f5e6c8]/20 bg-black/50 font-mono text-base text-[#f5e6c8]/85 transition hover:border-[#ffde00]/50 hover:bg-black/70 hover:text-[#ffde00]"
            aria-label="Close game"
          >
            ×
          </button>
        </div>
      </div>

      <div className="arcade-cabinet__body relative flex border-x border-[#2a1f14] bg-gradient-to-b from-[#0d0a08] via-[#12100e] to-[#1a1410] px-3 py-3 sm:px-5 sm:py-4">
        <div className="arcade-cabinet__side hidden w-3 shrink-0 rounded-l bg-gradient-to-r from-[#050403] to-[#15100c] sm:block" />
        <div className="arcade-cabinet__screen relative min-h-0 flex-1 overflow-hidden rounded-lg border-4 border-[#1c1510] bg-[#050812] shadow-[inset_0_0_40px_rgba(0,0,0,0.65),0_0_24px_rgba(140,92,199,0.15)]">
          <ArcadeNetworkMotif className="opacity-25 mix-blend-screen" />
          <div className="relative z-[1] h-full min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]">
            {children}
          </div>
        </div>
        <div className="arcade-cabinet__side hidden w-3 shrink-0 rounded-r bg-gradient-to-l from-[#050403] to-[#15100c] sm:block" />
      </div>

      <div className="arcade-cabinet__base rounded-b-xl border border-t-0 border-[#2a1f14] bg-gradient-to-b from-[#0f0c0a] to-[#050403] px-4 py-2">
        <p className="text-center font-mono text-[9px] uppercase tracking-[0.22em] text-[#8c5cc7]/70">
          Arrow keys · WASD · Esc to close
        </p>
      </div>
    </div>
  );
}
