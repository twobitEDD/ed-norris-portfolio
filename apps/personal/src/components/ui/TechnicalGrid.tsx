import { cn } from "@/lib/cn";

export function TechnicalGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        maskImage: "linear-gradient(to bottom, black, transparent)",
      }}
    />
  );
}
