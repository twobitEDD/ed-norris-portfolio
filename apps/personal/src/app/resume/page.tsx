import { PortfolioStudio, StudioContent } from "@/components/studio/PortfolioStudio";
import { FixedStudioNavigation } from "@/components/studio/FixedStudioNavigation";
import { ResumeScene } from "@/components/resume/ResumeScene";

export default function ResumePage() {
  return (
    <PortfolioStudio>
      <FixedStudioNavigation />
      <StudioContent>
        <ResumeScene />
      </StudioContent>
    </PortfolioStudio>
  );
}
