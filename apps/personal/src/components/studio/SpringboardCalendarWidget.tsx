"use client";

import { cn } from "@/lib/cn";

type SpringboardCalendarWidgetProps = {
  now: Date;
  /** `compact` — 1×1 tile; `large` — full month grid (legacy / unused on springboard). */
  size?: "compact" | "large";
  /** Phone-tier widget chrome (tighter corner radius). */
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"] as const;

function buildMonthCells(year: number, month: number): (number | null)[] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array.from({ length: firstWeekday }, () => null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  return cells;
}

export function SpringboardCalendarWidget({
  now,
  size = "large",
  compact = false,
  className,
  style,
}: SpringboardCalendarWidgetProps) {
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const monthLabel = now.toLocaleDateString([], { month: "long" });
  const cells = buildMonthCells(year, month);
  const isCompact = size === "compact";

  return (
    <div
      className={cn(
        "springboard-widget springboard-widget--calendar flex min-h-0 flex-col",
        isCompact && "springboard-widget--calendar-compact",
        compact && "springboard-widget--compact",
        className,
      )}
      style={style}
      aria-label={now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
    >
      <div className="springboard-calendar-header">
        <p className="springboard-calendar-month font-semibold text-white">{monthLabel}</p>
        {!isCompact ? (
          <p className="springboard-calendar-weekday font-medium text-white/55">
            {now.toLocaleDateString([], { weekday: "long" })}
          </p>
        ) : null}
      </div>
      <div className="springboard-calendar-grid" aria-hidden>
        {WEEKDAY_LABELS.map((label, i) => (
          <span key={`${label}-${i}`} className="springboard-calendar-weekday-label text-white/40">
            {label}
          </span>
        ))}
        {cells.map((day, i) => (
          <span
            key={i}
            className={cn(
              "springboard-calendar-day tabular-nums",
              day === today && "springboard-calendar-day--today",
              day === null && "springboard-calendar-day--empty",
            )}
          >
            {day ?? ""}
          </span>
        ))}
      </div>
    </div>
  );
}
