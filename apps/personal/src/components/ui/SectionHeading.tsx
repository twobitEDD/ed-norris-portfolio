import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">{eyebrow}</p>
      )}
      <h2 className="section-title mt-3 font-display font-bold text-text-primary">{title}</h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-text-secondary sm:text-xl">{description}</p>
      )}
    </div>
  );
}
