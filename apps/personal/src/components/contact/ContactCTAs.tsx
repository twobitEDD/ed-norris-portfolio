import Link from "next/link";
import { CONTACT_MAILTO, getSchedulingHref, isExternalScheduling } from "@/lib/contact";
import { cn } from "@/lib/cn";

type ContactCTAsProps = {
  variant?: "hero" | "desk" | "compact";
  className?: string;
};

const variantStyles = {
  hero: {
    wrap: "flex flex-wrap items-center justify-center gap-2 sm:gap-3",
    primary:
      "rounded-full border border-paper-cream/40 bg-paper-cream/95 px-5 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-wood-dark transition hover:bg-white sm:text-[11px]",
    secondary:
      "rounded-full border border-paper-cream/35 bg-wood-dark/70 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-cream transition hover:border-environment/50 hover:bg-environment/20 sm:text-[11px]",
  },
  desk: {
    wrap: "flex flex-wrap gap-3",
    primary:
      "inline-flex min-h-[44px] items-center rounded border border-ink/30 bg-ink px-5 py-2.5 text-sm font-semibold text-paper-cream transition hover:bg-ink/90",
    secondary:
      "inline-flex min-h-[44px] items-center rounded border border-ink/25 bg-white/60 px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-white",
  },
  compact: {
    wrap: "flex flex-wrap items-center gap-2",
    primary:
      "rounded-full border border-paper-cream/40 bg-environment/90 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-paper-cream transition hover:bg-environment",
    secondary:
      "rounded-full border border-paper-cream/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-paper-cream transition hover:border-paper-cream/60 hover:bg-paper-cream/10",
  },
} as const;

export function ContactCTAs({ variant = "desk", className }: ContactCTAsProps) {
  const styles = variantStyles[variant];
  const scheduleHref = getSchedulingHref();
  const scheduleExternal = isExternalScheduling();

  return (
    <div className={cn(styles.wrap, className)}>
      <a href={CONTACT_MAILTO} className={styles.primary}>
        Email Edd
      </a>
      {scheduleExternal ? (
        <a
          href={scheduleHref}
          className={styles.secondary}
          target="_blank"
          rel="noopener noreferrer"
        >
          Schedule a chat
        </a>
      ) : (
        <Link href={scheduleHref} className={styles.secondary}>
          Schedule a chat
        </Link>
      )}
    </div>
  );
}
