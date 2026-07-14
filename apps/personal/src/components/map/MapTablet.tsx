"use client";

import dynamic from "next/dynamic";
import { Tablet } from "@/components/physical-ui/Tablet";
import { throughLineThesis } from "@/data/through-line";
import { cn } from "@/lib/cn";

const StudioWorkMap = dynamic(() => import("./StudioWorkMap").then((m) => m.StudioWorkMap), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[300px] flex-1 items-center justify-center sm:min-h-[320px]">
      <p className="font-mono text-[10px] uppercase tracking-wider text-screen-muted">Loading map…</p>
    </div>
  ),
});

type MapTabletProps = {
  className?: string;
  /** Load ReactFlow immediately (dedicated /map page) */
  eagerLoad?: boolean;
  /** Taller layout for full-page /map route */
  fullPage?: boolean;
};

export function MapTablet({ className, eagerLoad = false, fullPage = false }: MapTabletProps) {
  return (
    <Tablet glow="purple" className={className}>
      <div
        className={cn(
          "flex h-full flex-col",
          fullPage ? "min-h-[min(85vh,760px)]" : "min-h-[360px] sm:min-h-[380px]",
        )}
      >
        <div className="border-b border-screen-border px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-screen-muted sm:text-[11px]">
            Work map
          </p>
          <h2 className="mt-1 font-editorial text-base font-medium text-screen-text sm:text-lg">
            The living work map.
          </h2>
          <p className="mt-2 text-[11px] leading-relaxed text-screen-muted sm:text-xs">
            {throughLineThesis}
          </p>
        </div>
        <StudioWorkMap eagerLoad={eagerLoad} fullPage={fullPage} />
      </div>
    </Tablet>
  );
}
