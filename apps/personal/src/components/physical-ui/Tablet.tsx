import { STUDIO_DEVICE } from "@/design/studio-language";
import { cn } from "@/lib/cn";
import { ObjectShadow } from "./ObjectShadow";

type TabletProps = {
  children: React.ReactNode;
  className?: string;
  orientation?: "portrait" | "landscape";
  /** `fork` — landscape iPad with side camera dot for practice-path UI. */
  /** `launcher` — portrait iPad springboard, full-bleed screen. */
  mode?: "default" | "fork" | "launcher";
  /** `large` — full bento-width studio device (~920px). */
  size?: "default" | "large";
  /** `warm` — paper-toned screen for studio contact content. */
  screenTheme?: "device" | "warm";
  glow?: "none" | "green" | "cyan" | "purple" | "amber";
};

const glowClass = {
  none: "",
  green: "device-glow-green",
  cyan: "device-glow-cyan",
  purple: "device-glow-purple",
  amber: "device-glow-amber",
};

export function Tablet({
  children,
  className,
  orientation = "landscape",
  mode = "default",
  size = "default",
  screenTheme = "device",
  glow = "none",
}: TabletProps) {
  const isFork = mode === "fork";
  const isLauncher = mode === "launcher";
  const isLarge = size === "large";
  const resolvedOrientation = isFork ? "landscape" : isLauncher ? "portrait" : orientation;
  const showCamera = isFork || isLauncher;

  return (
    <div
      className={cn(
        "relative w-full max-w-full min-w-0",
        isLarge && isLauncher && "mx-auto max-w-[min(100%,var(--studio-device-max,920px))]",
        className,
      )}
    >
      <ObjectShadow depth={4} />
      <div
        className={cn(
          isFork
            ? STUDIO_DEVICE.classes.frameTabletFork
            : isLauncher
              ? STUDIO_DEVICE.classes.frameTabletLauncher
              : STUDIO_DEVICE.classes.frame,
          isLarge && isLauncher && STUDIO_DEVICE.classes.tabletLarge,
          "w-full max-w-full min-w-0",
          glow !== "none" && glowClass[glow],
        )}
      >
        <div
          className={cn(
            STUDIO_DEVICE.classes.screen,
            screenTheme === "warm" && STUDIO_DEVICE.classes.screenWarm,
            "w-full max-w-full min-w-0",
            resolvedOrientation === "landscape"
              ? isFork
                ? "aspect-[4/3] min-h-[200px]"
                : "aspect-[4/3] min-h-0 max-lg:min-h-0"
              : isLauncher
                ? "aspect-[3/4] w-full min-h-0"
                : "aspect-[3/4] min-h-[280px] max-lg:min-h-0",
          )}
        >
          {showCamera && <div className="tablet-camera-dot" aria-hidden="true" />}
          {children}
          {isLauncher && <div className="tablet-home-indicator" aria-hidden="true" />}
        </div>
      </div>
    </div>
  );
}
