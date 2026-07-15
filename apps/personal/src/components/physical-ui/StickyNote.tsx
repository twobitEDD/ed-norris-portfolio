import { STUDIO_SURFACES } from "@/design/studio-language";
import { cn } from "@/lib/cn";
import { ObjectShadow } from "./ObjectShadow";

const stickyColorClass = {
  yellow: "sticky-note--yellow",
  pink: "sticky-note--pink",
  green: "sticky-note--green",
} as const;

export function StickyNote({
  children,
  className,
  color = "yellow",
}: {
  children: React.ReactNode;
  className?: string;
  color?: "yellow" | "pink" | "green";
}) {
  return (
    <div className={cn("relative", className)} style={{ transform: "rotate(-2deg)" }}>
      <ObjectShadow depth={1} />
      <div className={cn(STUDIO_SURFACES.stickyNote, stickyColorClass[color])}>{children}</div>
    </div>
  );
}
