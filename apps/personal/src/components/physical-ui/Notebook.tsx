import { STUDIO_SURFACES, STUDIO_TYPOGRAPHY } from "@/design/studio-language";
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
    <div className={cn("relative w-full min-w-0 max-w-full", className)}>
      <ObjectShadow depth={3} />
      <div className={STUDIO_SURFACES.notebook}>
        <div className={STUDIO_SURFACES.notebookPage}>
          {title && (
            <p className={cn(STUDIO_TYPOGRAPHY.label, "font-bold text-ink-soft")}>{title}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
