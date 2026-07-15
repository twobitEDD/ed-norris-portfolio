import { PortfolioStudio } from "@/components/studio/PortfolioStudio";
import { FixedStudioNavigation } from "@/components/studio/FixedStudioNavigation";
import { WorkMapScene } from "@/components/map/WorkMapScene";
import { resolveFocusSlug } from "@/data";

type MapPageProps = {
  searchParams: Promise<{ focus?: string }>;
};

export default async function MapPage({ searchParams }: MapPageProps) {
  const params = await searchParams;
  const initialFocus = resolveFocusSlug(params.focus);

  return (
    <PortfolioStudio>
      <FixedStudioNavigation />
      <WorkMapScene initialFocus={initialFocus} />
    </PortfolioStudio>
  );
}
