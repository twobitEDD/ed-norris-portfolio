import { PortfolioStudio } from "@/components/studio/PortfolioStudio";
import { FixedStudioNavigation } from "@/components/studio/FixedStudioNavigation";
import { WorkMapScene } from "@/components/map/WorkMapScene";

export default function MapPage() {
  return (
    <PortfolioStudio>
      <FixedStudioNavigation />
      <WorkMapScene />
    </PortfolioStudio>
  );
}
