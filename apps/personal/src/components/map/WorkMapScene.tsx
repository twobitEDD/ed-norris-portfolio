import { Paper } from "@/components/physical-ui/Paper";
import { Tablet } from "@/components/physical-ui/Tablet";
import { Notebook } from "@/components/physical-ui/Notebook";
import { StudioScene } from "@/components/studio/StudioScene";
import { StudioObject } from "@/components/studio/StudioObject";
import { StudioWorkMap } from "./StudioWorkMap";

export function WorkMapScene() {
  return (
    <StudioScene id="map" minHeight="min-h-[95vh]">
      <div className="grid gap-8 lg:grid-cols-[0.35fr_1fr] lg:items-start">
        <StudioObject rotate={-2} className="hidden lg:block">
          <Notebook title="Filter notes">
            <ul className="mt-2 space-y-1 text-sm text-ink-soft">
              <li>Environmental</li>
              <li>Games</li>
              <li>Software</li>
              <li>Operations · Data</li>
            </ul>
          </Notebook>
        </StudioObject>
        <StudioObject parallax={0.02}>
          <Paper className="mb-4 max-w-md lg:hidden">
            <h2 className="font-editorial text-xl font-semibold text-ink">The living work map.</h2>
          </Paper>
          <Tablet glow="purple" className="w-full">
            <div className="p-1">
              <p className="px-3 pt-3 font-display text-sm font-semibold text-screen-text">
                The living work map.
              </p>
              <StudioWorkMap />
            </div>
          </Tablet>
        </StudioObject>
      </div>
    </StudioScene>
  );
}
