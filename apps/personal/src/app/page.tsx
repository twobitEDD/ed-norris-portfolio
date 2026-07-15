import { PortfolioStudio, StudioContent } from "@/components/studio/PortfolioStudio";
import { FixedStudioNavigation } from "@/components/studio/FixedStudioNavigation";
import { CinematicNorthStarHero } from "@/components/hero/CinematicNorthStarHero";
import { VerticalBento } from "@/components/studio/VerticalBento";

export default function HomePage() {
  return (
    <PortfolioStudio>
      <FixedStudioNavigation />
      <StudioContent>
        <CinematicNorthStarHero />
        <div className="studio-desk-flow">
          <VerticalBento />
        </div>
      </StudioContent>
    </PortfolioStudio>
  );
}
