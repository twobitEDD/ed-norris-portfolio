import type { ReactNode } from "react";
import { Paper } from "@/components/physical-ui/Paper";
import { DeviceViewer } from "@/components/physical-ui/DeviceViewer";
import { cn } from "@/lib/cn";

type DeviceSpec = {
  device: "ipad" | "phone";
  size?: "sm" | "md" | "lg";
  glow?: "none" | "cyan" | "amber";
  className?: string;
  children: ReactNode;
};

type ResponsiveDevicePaperProps = {
  className?: string;
  /** Tablet or phone — shown at lg+ */
  desktop: DeviceSpec;
  /** Alternate device — shown below lg */
  mobile: DeviceSpec;
  /** Paper content when desktop device is active (alt facts for smaller screens) */
  mobilePaper: ReactNode;
  /** Paper content when mobile device is active (alt facts for larger screens) */
  desktopPaper: ReactNode;
  paperClassName?: string;
};

export function ResponsiveDevicePaper({
  className,
  desktop,
  mobile,
  mobilePaper,
  desktopPaper,
  paperClassName,
}: ResponsiveDevicePaperProps) {
  return (
    <div className={cn("grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,200px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,220px)]", className)}>
      <div className="relative min-w-0">
        <div className="hidden lg:block">
          <DeviceViewer
            device={desktop.device}
            size={desktop.size ?? "md"}
            glow={desktop.glow ?? "cyan"}
            className={desktop.className}
          >
            {desktop.children}
          </DeviceViewer>
        </div>
        <div className="lg:hidden">
          <DeviceViewer
            device={mobile.device}
            size={mobile.size ?? "md"}
            glow={mobile.glow ?? "cyan"}
            className={mobile.className}
          >
            {mobile.children}
          </DeviceViewer>
        </div>
      </div>

      <div className="hidden min-w-0 lg:block">
        <Paper compact variant="desk" torn className={cn("rotate-[2deg]", paperClassName)}>
          {desktopPaper}
        </Paper>
      </div>
      <div className="min-w-0 lg:hidden">
        <Paper compact variant="desk" torn className={cn("-rotate-1", paperClassName)}>
          {mobilePaper}
        </Paper>
      </div>
    </div>
  );
}
