"use client";

import { Tablet } from "@/components/physical-ui/Tablet";
import { throughLineThesis } from "@/data/through-line";
import { cn } from "@/lib/cn";
import { StudioWorkMap } from "./StudioWorkMap";

type MapTabletProps = {
  className?: string;
  /** Load ReactFlow immediately (dedicated /map page) */
  eagerLoad?: boolean;
  /** Taller layout for full-page /map route */
  fullPage?: boolean;
  /** Story-path subset for homepage bento */
  preview?: boolean;
};

export function MapTablet({
  className,
  eagerLoad = false,
  fullPage = false,
  preview = false,
}: MapTabletProps) {
  return (
    <Tablet glow="purple" className={className}>
      <div
        className={cn(
          "flex h-full flex-col",
          fullPage
            ? "min-h-[min(85vh,760px)]"
            : preview
              ? "min-h-[460px] sm:min-h-[500px]"
              : "min-h-[360px] sm:min-h-[380px]",
        )}
      >
        <div className="border-b border-screen-border px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-screen-muted sm:text-[11px]">
            Work map
          </p>
          <h2 className="mt-1 font-editorial text-base font-medium text-screen-text sm:text-lg">
            {preview ? "Career through-line." : "The living work map."}
          </h2>
          <p className="mt-2 text-[11px] leading-relaxed text-screen-muted sm:text-xs">
            {preview
              ? "Key stops on one arc — tap nodes or use Tell me a story. Open the full map for every role and connection."
              : throughLineThesis}
          </p>
        </div>
        <StudioWorkMap eagerLoad={eagerLoad} fullPage={fullPage} preview={preview} />
      </div>
    </Tablet>
  );
}
