import { PortfolioStudio, StudioContent } from "@/components/studio/PortfolioStudio";
import { FixedStudioNavigation } from "@/components/studio/FixedStudioNavigation";
import { WorkScene } from "@/components/work/WorkScene";

export default function WorkPage() {
  return (
    <PortfolioStudio>
      <FixedStudioNavigation />
      <StudioContent>
        <WorkScene />
      </StudioContent>
    </PortfolioStudio>
  );
}
