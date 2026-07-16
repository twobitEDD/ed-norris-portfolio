import { STUDIO_TYPOGRAPHY } from "@/design/studio-language";
import type { ProfileTagline as ProfileTaglineData } from "@/data/types";
import { cn } from "@/lib/cn";

type ProfileTaglineVariant = "hero" | "paper" | "nav";

const textClasses: Record<ProfileTaglineVariant, string> = {
  hero: "font-mono text-xs uppercase tracking-[0.2em] text-text-muted",
  paper: "font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft lg:text-[11px] xl:text-xs",
  nav: STUDIO_TYPOGRAPHY.navTagline,
};

const dividerClasses: Record<ProfileTaglineVariant, string> = {
  hero: "border-text-muted/30",
  paper: "border-ink/20",
  nav: "border-paper-cream/20",
};

export function ProfileTagline({
  tagline,
  variant = "paper",
  align = "start",
  className,
}: {
  tagline: ProfileTaglineData;
  variant?: ProfileTaglineVariant;
  align?: "start" | "end";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex w-max max-w-full flex-col gap-1",
        align === "end" && "items-end text-right",
        className,
      )}
    >
      <p className={textClasses[variant]}>{tagline.primary}</p>
      <hr
        aria-hidden
        className={cn("m-0 w-full border-0 border-t", dividerClasses[variant])}
      />
      <p className={textClasses[variant]}>{tagline.secondary}</p>
    </div>
  );
}
