import { StickyNote } from "@/components/physical-ui/StickyNote";
import { StudioScene } from "@/components/studio/StudioScene";
import { StudioObject } from "@/components/studio/StudioObject";
import { MapTablet } from "./MapTablet";

export function WorkMapScene() {
  return (
    <StudioScene id="map" minHeight="min-h-[95vh]">
      <div className="mx-auto max-w-5xl">
        <StudioObject rotate={0.6}>
          <div className="relative pt-4 sm:pt-5">
            <StickyNote
              color="pink"
              className="pointer-events-none absolute -right-2 -top-3 z-10 hidden max-w-[160px] sm:block"
            >
              <p className="handwritten text-sm leading-snug text-ink">One arc, not six careers.</p>
            </StickyNote>
            <MapTablet className="w-full" eagerLoad fullPage />
          </div>
        </StudioObject>
      </div>
    </StudioScene>
  );
}
