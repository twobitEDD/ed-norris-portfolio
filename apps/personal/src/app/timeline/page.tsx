import { PortfolioStudio, StudioContent } from "@/components/studio/PortfolioStudio";
import { FixedStudioNavigation } from "@/components/studio/FixedStudioNavigation";
import { CareerScene } from "@/components/timeline/CareerScene";

export default function TimelinePage() {
  return (
    <PortfolioStudio>
      <FixedStudioNavigation />
      <StudioContent>
        <CareerScene />
      </StudioContent>
    </PortfolioStudio>
  );
}
