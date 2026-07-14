import { profile } from "@/data";
import { disciplineColors } from "@/data/types";
import { cn } from "@/lib/cn";

const iconPaths: Record<string, string> = {
  software: "M12 2l2 4 4 .5-3 3 1 4-4-2-4 2 1-4-3-3 4-.5z",
  operations: "M4 6h16v2H4zm0 5h10v2H4zm0 5h16v2H4z",
  games: "M6 9h2v2H6zm8 0h2v2h-2zm-4 4h2v2h-2zM4 4h16v12H4z",
  environment: "M12 3c-3 4-7 6-7 10a7 7 0 1014 0c0-4-4-6-7-10z",
  marketing: "M4 18l8-14 8 14H4z",
};

export function IdentityBadgeRow({ className }: { className?: string }) {
  return (
    <div className={cn("relative z-[2] -mt-2 px-4 py-8 sm:px-8", className)}>
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center gap-5 sm:gap-8">
        {profile.badges.map((badge) => (
          <div key={badge.label} className="flex flex-col items-center gap-2.5 text-center">
            <div
              className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full border border-paper-cream/25 bg-wood-dark/50 shadow-paper backdrop-blur-md sm:h-16 sm:w-16"
              style={{ boxShadow: `0 0 28px ${disciplineColors[badge.discipline]}40, var(--shadow-paper)` }}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="currentColor"
                style={{ color: disciplineColors[badge.discipline] }}
                aria-hidden="true"
              >
                <path d={iconPaths[badge.discipline] ?? iconPaths.software} />
              </svg>
            </div>
            <span className="max-w-[100px] font-mono text-[7px] uppercase leading-tight tracking-[0.12em] text-paper-cream/90 sm:text-[8px]">
              {badge.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
