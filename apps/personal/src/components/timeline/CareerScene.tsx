"use client";

import { TimelineFullView } from "@/components/timeline/TimelineFullView";
import { StudioScene } from "@/components/studio/StudioScene";

export function CareerScene() {
  return (
    <StudioScene id="timeline-full" minHeight="min-h-[90vh]">
      <TimelineFullView />
    </StudioScene>
  );
}
