import { ENT_DEVICE } from "@/design/ent-language";
import { cn } from "@/lib/cn";
import { ObjectShadow } from "./ObjectShadow";

type PhoneProps = {
  children: React.ReactNode;
  className?: string;
  glow?: "none" | "cyan" | "amber";
  size?: "default" | "large";
};

const glowClass = {
  cyan: "device-glow-cyan",
  amber: "device-glow-amber",
};

export function Phone({ children, className, glow = "none", size = "default" }: PhoneProps) {
  const isLarge = size === "large";

  return (
    <div
      className={cn(
        "relative w-full max-w-full min-w-0",
        isLarge ? "mx-auto max-w-[min(100%,var(--ent-device-max,420px))]" : "mx-auto w-[min(100%,220px)]",
        className,
      )}
    >
      <ObjectShadow depth={4} />
      <div
        className={cn(
          ENT_DEVICE.classes.framePhone,
          isLarge && ENT_DEVICE.classes.phoneLarge,
          "w-full max-w-full min-w-0",
          glow !== "none" && glowClass[glow],
        )}
      >
        <div
          className={cn(
            ENT_DEVICE.classes.screen,
            "w-full max-w-full min-w-0",
            isLarge ? "aspect-[9/19] min-h-0" : "aspect-[9/19] min-h-[380px]",
          )}
        >
          <div className="phone-dynamic-island" aria-hidden />
          {children}
          <div className="phone-home-indicator" aria-hidden />
        </div>
      </div>
    </div>
  );
}
