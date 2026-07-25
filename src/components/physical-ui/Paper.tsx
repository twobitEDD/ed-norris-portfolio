import { ENT_SURFACES } from "@/design/ent-language";
import { cn } from "@/lib/cn";
import { ObjectShadow } from "./ObjectShadow";

type PaperProps = {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  torn?: boolean;
  pinned?: boolean;
  compact?: boolean;
  variant?: "default" | "desk";
};

export function Paper({
  children,
  className,
  elevated = true,
  torn = false,
  pinned = false,
  compact = false,
  variant = "default",
}: PaperProps) {
  const isDesk = variant === "desk";

  return (
    <div className={cn("relative min-w-0 max-w-full", ENT_SURFACES.paperContent, className)}>
      {elevated && <ObjectShadow depth={isDesk ? 3 : 2} />}
      {pinned && (
        <>
          <div className="absolute -top-2 left-5 z-10 h-5 w-7 rounded-sm bg-zinc-500/90 shadow-sm" aria-hidden />
          <div className="absolute -top-2 right-8 z-10 h-5 w-7 rounded-sm bg-zinc-500/90 shadow-sm" aria-hidden />
        </>
      )}
      <div
        className={cn(
          ENT_SURFACES.paper,
          compact ? "relative px-5 py-5 sm:px-6 sm:py-6" : "relative px-5 py-7 sm:px-8 sm:py-9",
          isDesk && "paper-surface--desk",
          torn ? "paper-torn" : !isDesk && "rounded-[2px]",
        )}
      >
        {isDesk && <div className="paper-dog-ear" aria-hidden />}
        {children}
      </div>
    </div>
  );
}
