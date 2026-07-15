"use client";

import dynamic from "next/dynamic";
import { Tablet } from "@/components/physical-ui/Tablet";
import { ArcadeCabinet } from "@/components/games/ArcadeCabinet";

const MicrobeExplorer = dynamic(
  () => import("./MicrobeExplorer").then((m) => m.MicrobeExplorer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[280px] items-center justify-center bg-[#040a14]">
        <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">Loading maze…</p>
      </div>
    ),
  },
);

type GameTabletProps = {
  className?: string;
  /** When true, hides redundant header copy (used in overlay panel). */
  overlay?: boolean;
  /** Fullscreen arcade cabinet shell with marquee and fixed viewport. */
  arcade?: boolean;
  onClose?: () => void;
  closing?: boolean;
  reducedMotion?: boolean;
};

export function GameTablet({
  className,
  overlay = false,
  arcade = false,
  onClose,
  closing = false,
  reducedMotion = false,
}: GameTabletProps) {
  const game = (
    <MicrobeExplorer
      className="h-full w-full"
      arcadeMode={arcade}
      autoLock={arcade}
    />
  );

  if (arcade && onClose) {
    return (
      <ArcadeCabinet
        onClose={onClose}
        closing={closing}
        reducedMotion={reducedMotion}
        className={className}
      >
        {game}
      </ArcadeCabinet>
    );
  }

  return (
    <Tablet glow="purple" orientation="landscape" className={className}>
      <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
        {!overlay && (
          <div className="shrink-0 border-b border-screen-border px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-screen-muted">Studio game</p>
            <h2 className="mt-1 font-editorial text-base font-medium text-screen-text sm:text-lg">
              Microbe Explorer
            </h2>
            <p className="mt-0.5 text-[10px] text-screen-muted">
              Swim an infinite maze — collect water droplets and colorful microbes.
            </p>
          </div>
        )}
        {overlay && (
          <div className="shrink-0 border-b border-screen-border px-4 py-2 sm:px-5">
            <h2 className="font-editorial text-sm font-medium text-screen-text sm:text-base">Microbe Explorer</h2>
          </div>
        )}
        <div className="relative min-h-[240px] flex-1 overflow-hidden">
          <MicrobeExplorer className="absolute inset-0" />
        </div>
      </div>
    </Tablet>
  );
}
