"use client";

import { useState } from "react";
import { TimelinePaper } from "@/components/timeline/TimelinePaper";
import { Phone } from "@/components/physical-ui/Phone";
import { StudioScene } from "@/components/studio/StudioScene";
import { StudioObject } from "@/components/studio/StudioObject";
import { timelineEras, type TimelineEra } from "@/data";
import { disciplineColors, disciplineLabels } from "@/data/types";

export function CareerScene() {
  const [selectedEra, setSelectedEra] = useState<TimelineEra>(timelineEras[0]);

  return (
    <StudioScene id="timeline-full" minHeight="min-h-[90vh]">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <TimelinePaper onEraSelect={setSelectedEra} />
        <StudioObject parallax={0.03} className="lg:mt-16">
          <Phone>
            <p className="font-mono text-[9px] uppercase tracking-wider text-screen-muted">Selected era</p>
            <h3 className="mt-2 font-display text-base font-bold text-screen-text">{selectedEra.title}</h3>
            <p className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-screen-muted">
              {selectedEra.period}
            </p>
            <p className="mt-1 text-xs text-screen-muted">{selectedEra.organization}</p>
            <p className="mt-3 text-xs leading-relaxed text-screen-muted">{selectedEra.summary}</p>
            <div className="mt-4 flex flex-wrap gap-1">
              {selectedEra.disciplines.map((d) => (
                <span
                  key={d}
                  className="rounded px-1.5 py-0.5 font-mono text-[8px] uppercase"
                  style={{ color: disciplineColors[d], background: `${disciplineColors[d]}22` }}
                >
                  {disciplineLabels[d]}
                </span>
              ))}
            </div>
            <p className="mt-4 font-mono text-[8px] uppercase tracking-wider text-screen-muted/70">
              Tap an era for full detail →
            </p>
          </Phone>
        </StudioObject>
      </div>
    </StudioScene>
  );
}
