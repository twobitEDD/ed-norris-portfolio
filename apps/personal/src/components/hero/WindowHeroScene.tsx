import { StudioScene } from "@/components/studio/StudioScene";
import { StudioLighting } from "@/components/studio/StudioLighting";
import { StudioObject } from "@/components/studio/StudioObject";
import { StickyNote } from "@/components/physical-ui/StickyNote";
import { DeskPatch, DeskPenCup, DeskPlant } from "@/components/studio/DeskProps";
import { CountryWindow } from "./CountryWindow";
import { IntroPaper } from "./IntroPaper";
import { PracticeTablet } from "./PracticeTablet";
import { IdentityBadgeRow } from "./IdentityBadgeRow";

export function WindowHeroScene() {
  return (
    <>
      <StudioScene
        id="hero"
        tone="window"
        minHeight="min-h-[115svh]"
        bleed
        className="!pb-2 !pt-20"
      >
        <StudioLighting />
        <CountryWindow />

        <div className="relative mx-auto mt-4 min-h-[440px] max-w-[1600px] sm:min-h-[500px]">
          <DeskPlant className="absolute left-[5%] top-0 z-30 hidden lg:block" />

          <StudioObject parallax={0.04} rotate={-1.5} className="relative z-20 lg:absolute lg:left-[3%] lg:top-2 lg:w-[42%]">
            <IntroPaper />
          </StudioObject>

          <StudioObject
            parallax={0.06}
            rotate={1.2}
            className="relative z-10 mt-8 lg:absolute lg:right-[2%] lg:top-6 lg:mt-0 lg:w-[54%]"
          >
            <PracticeTablet />
          </StudioObject>

          <DeskPenCup className="absolute bottom-4 right-[8%] z-0 hidden xl:block" />
          <DeskPatch className="absolute bottom-10 left-[38%] z-30 hidden md:flex" />

          <StickyNote color="green" className="absolute bottom-2 right-[1%] z-20 max-w-[200px] lg:bottom-4">
            <p className="handwritten text-base leading-snug text-ink">Open to collaboration.</p>
            <p className="handwritten text-sm text-ink-soft">Building what&apos;s next.</p>
          </StickyNote>
        </div>
      </StudioScene>

      <IdentityBadgeRow />
    </>
  );
}
