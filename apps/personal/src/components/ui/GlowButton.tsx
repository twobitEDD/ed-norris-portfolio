import { cn } from "@/lib/cn";
import { ArrowRight } from "lucide-react";

export function GlowButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const classes = cn(
    "group relative inline-flex min-h-[44px] items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-technology",
    variant === "primary"
      ? "bg-panel-strong text-text-primary shadow-[0_0_0_1px_rgba(148,163,184,0.2),0_8px_32px_rgba(70,199,215,0.15)] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(70,199,215,0.4),0_12px_40px_rgba(70,199,215,0.2)]"
      : "border border-border bg-transparent text-text-secondary hover:border-border-active hover:text-text-primary",
    className,
  );

  const content = (
    <>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
      {children}
      {variant === "primary" && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
