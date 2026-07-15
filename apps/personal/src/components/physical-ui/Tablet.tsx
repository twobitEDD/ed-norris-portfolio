import { cn } from "@/lib/cn";
import { ObjectShadow } from "./ObjectShadow";

type TabletProps = {
  children: React.ReactNode;
  className?: string;
  orientation?: "portrait" | "landscape";
  /** `fork` — landscape iPad with side camera dot for practice-path UI. */
  mode?: "default" | "fork";
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
  glow = "none",
}: TabletProps) {
  const isFork = mode === "fork";
  const resolvedOrientation = isFork ? "landscape" : orientation;

  return (
    <div className={cn("relative", className)}>
      <ObjectShadow depth={4} />
      <div
        className={cn(
          "device-frame device-bezel",
          isFork && "device-frame--tablet-fork",
          glow !== "none" && glowClass[glow],
        )}
      >
        <div
          className={cn(
            "screen-surface relative overflow-hidden",
            resolvedOrientation === "landscape"
              ? isFork
                ? "aspect-[4/3] min-h-[200px]"
                : "aspect-[4/3] min-h-[240px]"
              : "aspect-[3/4] min-h-[280px]",
          )}
        >
          {isFork && <div className="tablet-camera-dot" aria-hidden="true" />}
          {children}
        </div>
      </div>
    </div>
  );
}
