import { ENT_DEVICE, DEVICE_SIZE_MATRIX, type DeviceKind, type DeviceSize } from "@/design/ent-language";
import { cn } from "@/lib/cn";
import { Phone } from "./Phone";
import { Tablet } from "./Tablet";

type DeviceViewerProps = {
  children: React.ReactNode;
  className?: string;
  device?: DeviceKind;
  size?: DeviceSize;
  glow?: "none" | "cyan" | "amber";
};

export function DeviceViewer({
  children,
  className,
  device = "ipad",
  size = "lg",
  glow = "cyan",
}: DeviceViewerProps) {
  const matrix = DEVICE_SIZE_MATRIX[device][size];

  if (device === "phone") {
    return (
      <div
        className={cn("relative mx-auto w-full min-w-0", className)}
        style={{ maxWidth: `min(100%, ${matrix.maxWidth})` }}
        data-device="phone"
      >
        <Phone glow={glow} size={size === "lg" ? "large" : "default"}>
          {children}
        </Phone>
      </div>
    );
  }

  return (
    <div
      className={cn("relative mx-auto w-full", className)}
      style={{ maxWidth: `min(100%, ${matrix.maxWidth})` }}
      data-device="ipad"
    >
      <Tablet glow={glow} size={size === "lg" ? "large" : "default"}>
        {children}
      </Tablet>
    </div>
  );
}
