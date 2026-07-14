import { cn } from "@/lib/cn";
import { ObjectShadow } from "./ObjectShadow";

type PaperProps = {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  torn?: boolean;
  pinned?: boolean;
};

export function Paper({ children, className, elevated = true, torn = false, pinned = false }: PaperProps) {
  return (
    <div className={cn("relative text-ink", className)}>
      {elevated && <ObjectShadow depth={2} />}
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
          "paper-surface relative border border-black/[0.08] px-7 py-8 sm:px-9 sm:py-10",
          torn ? "paper-torn" : "rounded-[2px]",
        )}
      >
        {children}
      </div>
    </div>
  );
}
