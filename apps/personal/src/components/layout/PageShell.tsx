import { GradientOrb } from "@/components/ui/GradientOrb";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PageShell({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-panel-strong focus:px-4 focus:py-2 focus:text-text-primary"
      >
        Skip to content
      </a>
      <div className="relative min-h-screen overflow-x-hidden bg-background text-text-primary">
        <NoiseOverlay />
        <GradientOrb className="-left-32 top-0" color="70,199,215" />
        <GradientOrb className="-right-20 top-[30%]" color="103,213,138" size="600px" />
        <GradientOrb className="bottom-0 left-1/3" color="152,92,255" size="480px" />
        <SiteHeader name={name} />
        <main id="main" className="relative z-[2] pt-20">
          {children}
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
