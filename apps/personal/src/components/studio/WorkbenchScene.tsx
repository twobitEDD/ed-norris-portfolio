"use client";

import { useMemo } from "react";
import { getDefaultResumeConfig, buildResumeContent } from "@/lib/resume";
import { TimelinePaper } from "@/components/timeline/TimelinePaper";
import { MapTablet } from "@/components/map/MapTablet";
import { Notebook } from "@/components/physical-ui/Notebook";
import { Phone } from "@/components/physical-ui/Phone";
import { StickyNote } from "@/components/physical-ui/StickyNote";
import { StudioScene } from "@/components/studio/StudioScene";
import { StudioObject } from "@/components/studio/StudioObject";
import { StudioReveal } from "@/components/studio/StudioReveal";

const focusItems = [
  "ERGO.games platform",
  "Carbon tracking infrastructure",
  "Sustainable agriculture systems",
  "Games that bring people together",
];

export function WorkbenchScene() {
  const resumeSnippet = useMemo(
    () => buildResumeContent(getDefaultResumeConfig()),
    [],
  );

  return (
    <StudioScene id="timeline" className="!py-10 sm:!py-16">
      <StudioReveal>
        <div className="relative grid items-start gap-8 xl:grid-cols-[1.05fr_1.2fr_0.75fr] xl:gap-4">
          <StudioObject rotate={-2} className="xl:-mr-14 xl:mt-6">
            <TimelinePaper />
          </StudioObject>

          <StudioObject parallax={0.02} rotate={0.8} className="xl:-mt-6 xl:translate-x-4 xl:z-[2]">
            <div id="map">
              <MapTablet className="w-full" />
            </div>
          </StudioObject>

          <div className="relative xl:mt-8">
            <StudioObject rotate={2.5}>
              <Notebook title="Current focus">
                <ul className="mt-3 space-y-2">
                  {focusItems.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-ink-soft">
                      <span className="font-mono text-xs text-environment">☑</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Notebook>
            </StudioObject>

            <StudioObject rotate={-2.8} className="xl:absolute xl:-right-4 xl:top-[200px] xl:z-[3]">
              <Phone>
                <p className="font-mono text-[8px] uppercase tracking-wider text-screen-muted">
                  Résumé generator
                </p>
                <h3 className="mt-2 font-display text-sm font-bold text-screen-text">{resumeSnippet.name}</h3>
                <p className="text-[10px] text-screen-muted">{resumeSnippet.targetRole}</p>
                <p className="mt-2 line-clamp-4 text-[9px] leading-relaxed text-screen-muted">
                  {resumeSnippet.summary}
                </p>
                <a href="#resume" className="mt-3 inline-block text-[10px] font-semibold text-technology">
                  Customize & download →
                </a>
              </Phone>
            </StudioObject>

            <StickyNote color="yellow" className="mt-5 hidden xl:ml-4 xl:mt-0 xl:block">
              <p className="handwritten text-base leading-snug text-ink">Systems that scale. Impact that lasts.</p>
              <p className="mt-1 text-[10px] text-ink-soft">soil · water · energy · people</p>
            </StickyNote>
          </div>
        </div>
      </StudioReveal>
    </StudioScene>
  );
}
