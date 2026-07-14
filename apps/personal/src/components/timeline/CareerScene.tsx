import { TimelinePaper } from "@/components/timeline/TimelinePaper";
import { Phone } from "@/components/physical-ui/Phone";
import { StudioScene } from "@/components/studio/StudioScene";
import { StudioObject } from "@/components/studio/StudioObject";
import { timelineEras } from "@/data";
import { disciplineColors } from "@/data/types";

export function CareerScene() {
  const active = timelineEras[0];

  return (
    <StudioScene id="timeline-full" minHeight="min-h-[90vh]">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <TimelinePaper />
        <StudioObject parallax={0.03} className="lg:mt-16">
          <Phone>
            <p className="font-mono text-[9px] uppercase tracking-wider text-screen-muted">Selected era</p>
            <h3 className="mt-2 font-display text-base font-bold text-screen-text">{active?.title}</h3>
            <p className="mt-1 text-xs text-screen-muted">{active?.organization}</p>
            <p className="mt-3 text-xs leading-relaxed text-screen-muted">{active?.summary}</p>
            <div className="mt-4 flex flex-wrap gap-1">
              {active?.disciplines.map((d) => (
                <span
                  key={d}
                  className="rounded px-1.5 py-0.5 font-mono text-[8px] uppercase"
                  style={{ color: disciplineColors[d], background: `${disciplineColors[d]}22` }}
                >
                  {d}
                </span>
              ))}
            </div>
          </Phone>
        </StudioObject>
      </div>
    </StudioScene>
  );
}
