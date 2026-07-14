import { PortfolioStudio } from "@/components/studio/PortfolioStudio";
import { FixedStudioNavigation } from "@/components/studio/FixedStudioNavigation";
import { ScheduleScene } from "@/components/schedule/ScheduleScene";

export const metadata = {
  title: "Schedule a chat — Edd Norris",
  description: "Request a time to chat with Edd Norris about projects, roles, or collaboration.",
};

export default function SchedulePage() {
  return (
    <PortfolioStudio>
      <FixedStudioNavigation />
      <ScheduleScene />
    </PortfolioStudio>
  );
}
