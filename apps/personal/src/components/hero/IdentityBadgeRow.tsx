import { profile } from "@/data";
import { disciplineColors } from "@/data/types";
import { cn } from "@/lib/cn";

export function IdentityBadgeRow({ className }: { className?: string }) {
  return (
    <div className={cn("relative z-[2] px-0 py-2", className)}>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {profile.badges.map((badge) => (
          <span
            key={badge.label}
            className="rounded-full border px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] sm:text-[10px]"
            style={{
              color: disciplineColors[badge.discipline],
              borderColor: `${disciplineColors[badge.discipline]}55`,
              backgroundColor: `${disciplineColors[badge.discipline]}14`,
            }}
          >
            {badge.label}
          </span>
        ))}
      </div>
    </div>
  );
}
