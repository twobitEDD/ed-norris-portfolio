import { STUDIO_SURFACES } from "@/design/studio-language";
import { cn } from "@/lib/cn";
import { ObjectShadow } from "./ObjectShadow";

type PaperVariant = "default" | "desk";

type PaperProps = {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  torn?: boolean;
  pinned?: boolean;
  /** `desk` — lifted sheet with dog-ear fold and subtle edge imperfection. */
  variant?: PaperVariant;
};

export function Paper({
  children,
  className,
  elevated = true,
  torn = false,
  pinned = false,
  variant = "default",
}: PaperProps) {
  const isDesk = variant === "desk";

  return (
    <div className={cn("relative", STUDIO_SURFACES.paperContent, className)}>
      {elevated && <ObjectShadow depth={isDesk ? 3 : 2} />}
      {pinned && (
        <>
          <div
            className="absolute -top-2 left-5 z-10 h-5 w-7 rounded-sm bg-zinc-500/90 shadow-sm"
            aria-hidden="true"
          />
          <div
            className="absolute -top-2 right-8 z-10 h-5 w-7 rounded-sm bg-zinc-500/90 shadow-sm"
            aria-hidden="true"
          />
        </>
      )}
      <div
        className={cn(
          STUDIO_SURFACES.paper,
          "relative px-7 py-8 sm:px-9 sm:py-10",
          isDesk && "paper-surface--desk",
          torn ? "paper-torn" : !isDesk && "rounded-[2px]",
        )}
      >
        {isDesk && <div className="paper-dog-ear" aria-hidden="true" />}
        {children}
      </div>
    </div>
  );
}
