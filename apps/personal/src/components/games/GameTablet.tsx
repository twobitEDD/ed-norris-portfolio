"use client";

import dynamic from "next/dynamic";
import { Tablet } from "@/components/physical-ui/Tablet";

const InfinitePacExplorer = dynamic(
  () => import("./InfinitePacExplorer").then((m) => m.InfinitePacExplorer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[280px] items-center justify-center bg-[#050812]">
        <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">Loading maze…</p>
      </div>
    ),
  },
);

type GameTabletProps = {
  className?: string;
  /** When true, hides redundant header copy (used in overlay panel). */
  overlay?: boolean;
};

export function GameTablet({ className, overlay = false }: GameTabletProps) {
  return (
    <Tablet glow="purple" orientation="landscape" className={className}>
      <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
        {!overlay && (
          <div className="shrink-0 border-b border-screen-border px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-screen-muted">Game dev</p>
            <h2 className="mt-1 font-editorial text-base font-medium text-screen-text sm:text-lg">
              Dot Explorer
            </h2>
            <p className="mt-0.5 text-[10px] text-screen-muted">
              Play while you browse — infinite maze, no ghosts.
            </p>
          </div>
        )}
        {overlay && (
          <div className="shrink-0 border-b border-screen-border px-4 py-2 sm:px-5">
            <h2 className="font-editorial text-sm font-medium text-screen-text sm:text-base">Dot Explorer</h2>
          </div>
        )}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <InfinitePacExplorer className="absolute inset-0" />
        </div>
      </div>
    </Tablet>
  );
}
