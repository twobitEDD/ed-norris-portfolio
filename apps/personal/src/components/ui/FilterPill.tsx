import { cn } from "@/lib/cn";

export function FilterPill({
  active,
  children,
  onClick,
  className,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-technology",
        active
          ? "border-technology/50 bg-screen-panel text-screen-text shadow-[0_0_24px_rgba(77,164,201,0.15)]"
          : "border-white/10 bg-transparent text-screen-muted hover:border-white/25 hover:text-screen-text",
        className,
      )}
    >
      {children}
    </button>
  );
}
