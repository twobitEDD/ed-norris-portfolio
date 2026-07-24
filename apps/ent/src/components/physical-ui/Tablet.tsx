import { ENT_DEVICE } from "@/design/ent-language";
import { cn } from "@/lib/cn";
import { ObjectShadow } from "./ObjectShadow";

type TabletProps = {
  children: React.ReactNode;
  className?: string;
  glow?: "none" | "cyan" | "amber";
  size?: "default" | "large";
};

const glowClass = {
  cyan: "device-glow-cyan",
  amber: "device-glow-amber",
};

export function Tablet({ children, className, glow = "cyan", size = "large" }: TabletProps) {
  const isLarge = size === "large";

  return (
    <div
      className={cn(
        "relative w-full max-w-full min-w-0",
        isLarge && "mx-auto max-w-[min(100%,var(--ent-device-max,920px))]",
        className,
      )}
    >
      <ObjectShadow depth={4} />
      <div
        className={cn(
          ENT_DEVICE.classes.frameTabletLauncher,
          isLarge && ENT_DEVICE.classes.tabletLarge,
          "w-full max-w-full min-w-0",
          glow !== "none" && glowClass[glow],
        )}
      >
        <div className={cn(ENT_DEVICE.classes.screen, "aspect-[3/4] w-full min-h-0")}>
          <div className="tablet-camera-dot" aria-hidden />
          {children}
          <div className="tablet-home-indicator" aria-hidden />
        </div>
      </div>
    </div>
  );
}
