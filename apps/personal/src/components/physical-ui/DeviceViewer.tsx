import {
  DEVICE_SIZE_MATRIX,
  STUDIO_DEVICE,
  type DeviceKind,
  type DeviceSize,
} from "@/design/studio-language";
import { cn } from "@/lib/cn";
import { Phone } from "./Phone";
import { Tablet } from "./Tablet";

type DeviceGlow = "none" | "green" | "cyan" | "purple" | "amber";
type PhoneOrientation = "portrait" | "landscape";
type PhoneScreenTheme = "device" | "warm";
type PhoneScreenLayout = "centered" | "app";
type TabletMode = "default" | "fork" | "launcher";

type DeviceViewerProps = {
  children: React.ReactNode;
  className?: string;
  device?: DeviceKind;
  size?: DeviceSize;
  glow?: DeviceGlow;
  /** Phone: card (padded) or launcher (full-bleed). Tablet/iPad: launcher for springboard. */
  mode?: "card" | "launcher" | "default" | "fork";
  orientation?: PhoneOrientation;
  screenTheme?: PhoneScreenTheme;
  screenLayout?: PhoneScreenLayout;
};

function resolvePhoneSize(size: DeviceSize): "default" | "large" {
  return size === "lg" ? "large" : "default";
}

function resolveTabletSize(size: DeviceSize): "default" | "large" {
  return size === "lg" ? "large" : "default";
}

function wrapperMaxWidth(device: DeviceKind, size: DeviceSize, orientation?: PhoneOrientation): string {
  const matrix = DEVICE_SIZE_MATRIX[device][size];
  if (device === "phone" && orientation === "landscape" && size === "md") {
    return STUDIO_DEVICE.phoneLandscapeMaxWidth;
  }
  return matrix.maxWidth;
}

export function DeviceViewer({
  children,
  className,
  device = "ipad",
  size = "lg",
  glow = "none",
  mode = "launcher",
  orientation,
  screenTheme = "device",
  screenLayout = "centered",
}: DeviceViewerProps) {
  const matrix = DEVICE_SIZE_MATRIX[device][size];
  const maxWidth = wrapperMaxWidth(device, size, orientation);

  if (device === "phone") {
    const phoneOrientation = orientation ?? (size === "md" ? "landscape" : "portrait");
    const phoneMode = mode === "launcher" || mode === "card" ? mode : "card";

    return (
      <div
        className={cn("relative mx-auto w-full min-w-0 max-w-full", className)}
        style={{ maxWidth: `min(100%, ${maxWidth})` }}
        data-device="phone"
        data-size={size}
      >
        <Phone
          glow={glow}
          mode={phoneMode}
          orientation={phoneOrientation}
          screenTheme={screenTheme}
          screenLayout={screenLayout}
          size={resolvePhoneSize(size)}
          className="w-full"
        >
          {children}
        </Phone>
      </div>
    );
  }

  const isIpad = device === "ipad";
  const tabletMode: TabletMode =
    mode === "fork" ? "fork" : mode === "launcher" || isIpad ? "launcher" : "default";
  const tabletOrientation =
    orientation ?? (tabletMode === "launcher" || isIpad ? "portrait" : "landscape");

  return (
    <div
      className={cn("relative mx-auto w-full", className)}
      style={{
        maxWidth: `min(100%, ${maxWidth})`,
        ...(matrix.aspectRatio && size !== "lg" ? { aspectRatio: matrix.aspectRatio } : undefined),
      }}
      data-device={device}
      data-size={size}
    >
      <Tablet
        glow={glow}
        mode={tabletMode}
        orientation={tabletOrientation}
        size={resolveTabletSize(size)}
        screenTheme={screenTheme}
        className="w-full"
      >
        {children}
      </Tablet>
    </div>
  );
}
