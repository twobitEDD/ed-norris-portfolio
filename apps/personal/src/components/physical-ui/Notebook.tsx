import { cn } from "@/lib/cn";
import { ObjectShadow } from "./ObjectShadow";

export function Notebook({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <ObjectShadow depth={3} />
      <div className="rounded-sm border border-black/15 bg-[#d9cdb0] p-1 shadow-paper">
        <div className="relative border-l-4 border-rose-400/70 bg-[#efe6d2] px-5 py-4 pl-6">
          {title && (
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink-soft">{title}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
