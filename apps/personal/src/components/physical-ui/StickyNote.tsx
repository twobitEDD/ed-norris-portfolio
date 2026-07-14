import { cn } from "@/lib/cn";
import { ObjectShadow } from "./ObjectShadow";

export function StickyNote({
  children,
  className,
  color = "yellow",
}: {
  children: React.ReactNode;
  className?: string;
  color?: "yellow" | "pink" | "green";
}) {
  const bg =
    color === "pink" ? "bg-[#f3d4d8]" : color === "green" ? "bg-[#dfe8c8]" : "bg-[#f5e6a8]";
  return (
    <div className={cn("relative", className)} style={{ transform: "rotate(-2deg)" }}>
      <ObjectShadow depth={1} />
      <div className={cn("p-4 text-sm text-ink shadow-paper", bg)}>{children}</div>
    </div>
  );
}
