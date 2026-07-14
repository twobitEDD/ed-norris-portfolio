import { cn } from "@/lib/cn";

type StudioObjectProps = {
  children: React.ReactNode;
  className?: string;
  /** @deprecated Parallax removed for performance — ignored. */
  parallax?: number;
  rotate?: number;
};

export function StudioObject({ children, className, rotate }: StudioObjectProps) {
  return (
    <div
      className={cn("studio-object relative", className)}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
    >
      {children}
    </div>
  );
}
