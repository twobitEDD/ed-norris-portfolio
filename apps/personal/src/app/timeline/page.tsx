import { PortfolioStudio } from "@/components/studio/PortfolioStudio";
import { FixedStudioNavigation } from "@/components/studio/FixedStudioNavigation";
import { CareerScene } from "@/components/timeline/CareerScene";

export default function TimelinePage() {
  return (
    <PortfolioStudio>
      <FixedStudioNavigation />
      <CareerScene />
    </PortfolioStudio>
  );
}
