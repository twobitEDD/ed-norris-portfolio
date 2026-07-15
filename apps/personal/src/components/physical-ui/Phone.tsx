import { cn } from "@/lib/cn";
import { ObjectShadow } from "./ObjectShadow";

type PhoneGlow = "none" | "green" | "cyan" | "purple" | "amber";
type PhoneOrientation = "portrait" | "landscape";
type PhoneScreenTheme = "device" | "warm";
type PhoneSize = "default" | "large";

type PhoneProps = {
  children: React.ReactNode;
  className?: string;
  glow?: PhoneGlow;
  /** `card` — padded content (résumé preview). `launcher` — full-bleed app screen. */
  mode?: "card" | "launcher";
  /** `landscape` — phone held sideways (contact card). */
  orientation?: PhoneOrientation;
  /** `warm` — paper-toned screen for studio contact content. */
  screenTheme?: PhoneScreenTheme;
  /** `large` — full bento-width studio device (~920px). */
  size?: PhoneSize;
};

const glowClass: Record<Exclude<PhoneGlow, "none">, string> = {
  green: "device-glow-green",
  cyan: "device-glow-cyan",
  purple: "device-glow-purple",
  amber: "device-glow-amber",
};

export function Phone({
  children,
  className,
  glow = "none",
  mode = "card",
  orientation = "portrait",
  screenTheme = "device",
  size = "default",
}: PhoneProps) {
  const isLauncher = mode === "launcher";
  const isLandscape = orientation === "landscape";
  const isLarge = size === "large";
  const showChrome = isLauncher || isLandscape;

  return (
    <div
      className={cn(
        "relative",
        isLandscape
          ? "mx-auto w-full max-w-[min(100%,520px)]"
          : isLarge
            ? "mx-auto w-full max-w-[min(100%,920px)]"
            : isLauncher
              ? "mx-auto w-[min(100%,210px)] sm:w-[220px]"
              : "w-[220px] sm:w-[248px]",
        className,
      )}
    >
      <ObjectShadow depth={isLandscape ? 3 : 4} />
      <div
        className={cn(
          "device-frame device-bezel device-frame--phone",
          isLandscape && "device-frame--phone-landscape",
          glow !== "none" && glowClass[glow],
        )}
      >
        <div
          className={cn(
            "screen-surface relative flex flex-col overflow-hidden",
            screenTheme === "warm" && "screen-surface--warm",
            isLandscape && "aspect-[19/9] min-h-0",
            isLarge && isLauncher && !isLandscape && "aspect-[3/4] min-h-[520px] sm:min-h-[580px]",
            !isLarge && isLauncher && !isLandscape && "aspect-[9/19] min-h-[400px]",
            !isLauncher && !isLandscape && "max-h-[440px] overflow-y-auto",
          )}
        >
          {showChrome && (
            <div
              className={cn(
                "phone-dynamic-island",
                isLandscape && "phone-dynamic-island--landscape",
              )}
              aria-hidden
            />
          )}
          {isLauncher && !isLandscape ? (
            children
          ) : (
            <div
              className={cn(
                "flex flex-1 flex-col justify-center",
                isLandscape ? "px-5 py-4 sm:px-7 sm:py-5" : "p-5",
              )}
            >
              {children}
            </div>
          )}
          {showChrome && (
            <div
              className={cn(
                "phone-home-indicator",
                isLandscape && "phone-home-indicator--landscape",
              )}
              aria-hidden
            />
          )}
        </div>
      </div>
    </div>
  );
}
