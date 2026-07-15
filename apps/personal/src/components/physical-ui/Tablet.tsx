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
        "relative",
        isLarge && isLauncher && "mx-auto w-full max-w-[min(100%,920px)]",
        className,
      )}
    >
      <ObjectShadow depth={4} />
      <div
        className={cn(
          "device-frame device-bezel",
          isFork && "device-frame--tablet-fork",
          isLauncher && "device-frame--tablet-launcher",
          isLarge && isLauncher && "device-frame--tablet-large w-full",
          glow !== "none" && glowClass[glow],
        )}
      >
        <div
          className={cn(
            "screen-surface relative flex flex-col overflow-hidden",
            resolvedOrientation === "landscape"
              ? isFork
                ? "aspect-[4/3] min-h-[200px]"
                : "aspect-[4/3] min-h-[240px]"
              : isLauncher
                ? "aspect-[3/4] w-full min-h-0"
                : "aspect-[3/4] min-h-[280px]",
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
