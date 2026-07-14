import { cn } from "@/lib/cn";

type StudioSceneProps = {
  id: string;
  minHeight?: string;
  tone?: "window" | "wood" | "dark-gap" | "drafting";
  bleed?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function StudioScene({
  id,
  minHeight = "min-h-0",
  tone = "wood",
  bleed = false,
  children,
  className,
}: StudioSceneProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-20",
        minHeight,
        tone === "dark-gap" && "studio-dark-gap",
        tone === "drafting" && "studio-drafting-soft",
        className,
      )}
    >
      <div
        className={cn(
          "relative mx-auto py-12 sm:py-16",
          bleed ? "max-w-none px-0" : "max-w-[1600px] px-4 sm:px-8",
        )}
      >
        {children}
      </div>
    </section>
  );
}
