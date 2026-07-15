import { Suspense } from "react";
import { PortfolioStudio, StudioContent } from "@/components/studio/PortfolioStudio";
import { FixedStudioNavigation } from "@/components/studio/FixedStudioNavigation";
import { ScheduleAdminScene } from "@/components/schedule/ScheduleAdminScene";

export const metadata = {
  title: "Schedule admin — Edd Norris",
  robots: { index: false, follow: false },
};

export default function ScheduleAdminPage() {
  return (
    <PortfolioStudio>
      <FixedStudioNavigation />
      <StudioContent>
        <Suspense fallback={<p className="px-4 py-16 text-sm text-paper-cream/70">Loading admin view…</p>}>
          <ScheduleAdminScene />
        </Suspense>
      </StudioContent>
    </PortfolioStudio>
  );
}
