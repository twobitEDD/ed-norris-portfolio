import { cn } from "@/lib/cn";

export function SurfaceTexture({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("wood-grain pointer-events-none absolute inset-0", className)} />;
}
