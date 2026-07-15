import { cn } from "@/lib/cn";
import { ObjectShadow } from "./ObjectShadow";

type PhoneGlow = "none" | "green" | "cyan" | "purple" | "amber";

type PhoneProps = {
  children: React.ReactNode;
  className?: string;
  glow?: PhoneGlow;
  /** `card` — padded content (résumé preview). `launcher` — full-bleed app screen. */
  mode?: "card" | "launcher";
};

const glowClass: Record<Exclude<PhoneGlow, "none">, string> = {
  green: "device-glow-green",
  cyan: "device-glow-cyan",
  purple: "device-glow-purple",
  amber: "device-glow-amber",
};

export function Phone({ children, className, glow = "none", mode = "card" }: PhoneProps) {
  const isLauncher = mode === "launcher";

  return (
    <div
      className={cn(
        "relative",
        isLauncher ? "mx-auto w-[min(100%,210px)] sm:w-[220px]" : "w-[220px] sm:w-[248px]",
        className,
      )}
    >
      <ObjectShadow depth={4} />
      <div
        className={cn(
          "device-frame device-bezel device-frame--phone",
          glow !== "none" && glowClass[glow],
        )}
      >
        <div
          className={cn(
            "screen-surface relative flex flex-col overflow-hidden",
            isLauncher ? "aspect-[9/19] min-h-[400px]" : "max-h-[440px] overflow-y-auto",
          )}
        >
          {isLauncher && <div className="phone-dynamic-island" aria-hidden />}
          {isLauncher ? children : <div className="p-5">{children}</div>}
          {isLauncher && <div className="phone-home-indicator" aria-hidden />}
        </div>
      </div>
    </div>
  );
}
