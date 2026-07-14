import { cn } from "@/lib/cn";
import { ObjectShadow } from "./ObjectShadow";

type TabletProps = {
  children: React.ReactNode;
  className?: string;
  orientation?: "portrait" | "landscape";
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
  glow = "none",
}: TabletProps) {
  return (
    <div className={cn("relative", className)}>
      <ObjectShadow depth={4} />
      <div className={cn("device-frame device-bezel", glow !== "none" && glowClass[glow])}>
        <div
          className={cn(
            "screen-surface overflow-hidden",
            orientation === "landscape" ? "aspect-[4/3] min-h-[240px]" : "aspect-[3/4] min-h-[280px]",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
