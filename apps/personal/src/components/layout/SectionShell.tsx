import { cn } from "@/lib/cn";

export function SectionShell({
  id,
  children,
  className,
  grid,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  grid?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-20 sm:py-28",
        grid && "overflow-hidden",
        className,
      )}
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8">{children}</div>
    </section>
  );
}
