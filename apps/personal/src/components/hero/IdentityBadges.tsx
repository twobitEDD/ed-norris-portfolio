import type { Profile } from "@/data/types";
import { disciplineColors } from "@/data/types";
import { cn } from "@/lib/cn";

export function IdentityBadges({ badges }: { badges: Profile["badges"] }) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {badges.map((badge) => (
        <span
          key={badge.label}
          className={cn(
            "rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] sm:text-xs",
          )}
          style={{
            borderColor: `${disciplineColors[badge.discipline]}44`,
            color: disciplineColors[badge.discipline],
            background: `${disciplineColors[badge.discipline]}10`,
          }}
        >
          {badge.label}
        </span>
      ))}
    </div>
  );
}
