import { cn } from "@/lib/cn";

export function GlassPanel({
  children,
  className,
  strong,
}: {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border backdrop-blur-xl",
        strong ? "bg-panel-strong" : "bg-panel",
        className,
      )}
    >
      {children}
    </div>
  );
}
