import { profile } from "@/data";
import { disciplineColors } from "@/data/types";
import { cn } from "@/lib/cn";

type IdentityBadgeRowProps = {
  className?: string;
  variant?: "default" | "paper";
};

export function IdentityBadgeRow({ className, variant = "default" }: IdentityBadgeRowProps) {
  const isPaper = variant === "paper";

  return (
    <div
      className={cn("relative z-[2] px-0", isPaper ? "py-0" : "py-2", className)}
      aria-label="Identity"
    >
      <div
        className={cn(
          "flex flex-wrap items-center gap-1.5 sm:gap-2",
          isPaper ? "justify-start" : "justify-center gap-2 sm:gap-2.5",
        )}
      >
        {profile.badges.map((badge, index) => (
          <span
            key={badge.label}
            className={cn(
              "rounded-full border font-mono font-semibold uppercase tracking-[0.12em]",
              isPaper
                ? "px-2 py-0.5 text-[8px] sm:px-2.5 sm:py-1 sm:text-[9px] sm:tracking-[0.14em]"
                : "px-3 py-1.5 text-[9px] tracking-[0.14em] sm:text-[10px]",
              isPaper && index >= 3 && "hidden sm:inline-flex",
            )}
            style={{
              color: disciplineColors[badge.discipline],
              borderColor: `${disciplineColors[badge.discipline]}${isPaper ? "40" : "55"}`,
              backgroundColor: `${disciplineColors[badge.discipline]}${isPaper ? "0c" : "14"}`,
            }}
          >
            {badge.label}
          </span>
        ))}
      </div>
    </div>
  );
}
