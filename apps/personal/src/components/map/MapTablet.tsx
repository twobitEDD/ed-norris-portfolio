"use client";

import { Tablet } from "@/components/physical-ui/Tablet";
import { mapGraphThesis } from "@/data/through-line";
import { cn } from "@/lib/cn";
import { StudioWorkMap, type MapMode } from "./StudioWorkMap";

type MapTabletProps = {
  className?: string;
  /** Load ReactFlow immediately (dedicated /map page) */
  eagerLoad?: boolean;
  /** Taller layout for full-page /map route */
  fullPage?: boolean;
  /** Tier 1 employment overview for homepage bento */
  mode?: MapMode;
  /** @deprecated Use mode="overview" */
  preview?: boolean;
  /** Detail-tier cluster focus (?focus=co2t) */
  initialFocus?: string | null;
};

export function MapTablet({
  className,
  eagerLoad = false,
  fullPage = false,
  mode,
  preview = false,
  initialFocus = null,
}: MapTabletProps) {
  const tier: MapMode = mode ?? (preview ? "overview" : "detail");
  const isOverview = tier === "overview";

  return (
    <Tablet glow="purple" className={className}>
      <div
        className={cn(
          "flex h-full flex-col",
          fullPage
            ? "min-h-[min(85vh,760px)]"
            : isOverview
              ? "min-h-[460px] sm:min-h-[500px]"
              : "min-h-[360px] sm:min-h-[380px]",
        )}
      >
        <div className="border-b border-screen-border px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-screen-muted sm:text-[11px]">
            Work map
          </p>
          <h2 className="mt-1 font-editorial text-base font-medium text-screen-text sm:text-lg">
            {isOverview ? "Where I've worked." : "The detailed work graph."}
          </h2>
          <p className="mt-2 text-[11px] leading-relaxed text-screen-muted sm:text-xs">
            {isOverview
              ? "Major employers and roles across one career arc — tap any node to unfold projects, clients, and connections."
              : initialFocus
                ? `Focused view — use the employment strip above to switch clusters, or reset to see the full graph.`
                : mapGraphThesis}
          </p>
        </div>
        <StudioWorkMap
          eagerLoad={eagerLoad}
          fullPage={fullPage}
          mode={tier}
          initialFocus={initialFocus}
        />
      </div>
    </Tablet>
  );
}
