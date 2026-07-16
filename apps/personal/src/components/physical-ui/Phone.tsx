import { STUDIO_DEVICE } from "@/design/studio-language";
import { cn } from "@/lib/cn";
import { ObjectShadow } from "./ObjectShadow";

type PhoneGlow = "none" | "green" | "cyan" | "purple" | "amber";
type PhoneOrientation = "portrait" | "landscape";
type PhoneScreenTheme = "device" | "warm";
type PhoneSize = "default" | "large";

type PhoneScreenLayout = "centered" | "app";

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
  /** `app` — full-bleed in-app layout (contact slide flow). */
  screenLayout?: PhoneScreenLayout;
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
  screenLayout = "centered",
  size = "default",
}: PhoneProps) {
  const isLauncher = mode === "launcher";
  const isLandscape = orientation === "landscape";
  const isLarge = size === "large";
  const isAppLayout = screenLayout === "app";
  const showChrome = isLauncher || isLandscape;

  return (
    <div
      className={cn(
        "relative",
        isLandscape
          ? "mx-auto w-full max-w-[min(100%,var(--studio-device-max,920px))]"
          : isLarge
            ? "mx-auto w-full max-w-[min(100%,var(--studio-device-max,920px))]"
            : isLauncher
              ? "mx-auto w-[min(100%,220px)] sm:w-[220px]"
              : "w-[220px] sm:w-[248px]",
        className,
      )}
    >
      <ObjectShadow depth={isLandscape ? 3 : 4} />
      <div
        className={cn(
          STUDIO_DEVICE.classes.framePhone,
          isLandscape && STUDIO_DEVICE.classes.phoneLandscape,
          isLarge && STUDIO_DEVICE.classes.phoneLarge,
          glow !== "none" && glowClass[glow],
        )}
      >
        <div
          className={cn(
            STUDIO_DEVICE.classes.screen,
            screenTheme === "warm" && STUDIO_DEVICE.classes.screenWarm,
            isLandscape && "aspect-[19/9] min-h-0",
            isLarge && isLauncher && !isLandscape && "aspect-[3/4] w-full min-h-0",
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
                STUDIO_DEVICE.classes.phoneScreenContent,
                "flex min-h-0 flex-1 flex-col",
                isAppLayout
                  ? cn(
                      "overflow-hidden py-3.5 sm:py-4",
                      isLandscape
                        ? "pl-[calc(0.875rem+var(--phone-landscape-notch-safe,36px))] pr-3 sm:pl-[calc(1rem+var(--phone-landscape-notch-safe,36px))] sm:pr-4"
                        : "px-3 sm:px-4",
                    )
                  : "justify-center",
                !isAppLayout && (isLandscape ? "px-5 py-4 sm:px-7 sm:py-5" : "p-5"),
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
