"use client";

import { cn } from "@/lib/cn";
import { SpringboardClockfaceFace } from "@/components/studio/SpringboardClockfaceWidget";

type SpringboardCombinedClockWidgetProps = {
  now: Date;
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/** iPad-tier widget: digital time + analog clockface in one column — matches calendar tile width. */
export function SpringboardCombinedClockWidget({
  now,
  compact = false,
  className,
  style,
}: SpringboardCombinedClockWidgetProps) {
  const timeStr = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const dateShortStr = now.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={cn(
        "springboard-widget springboard-widget--combined-clock",
        compact && "springboard-widget--compact",
        className,
      )}
      style={style}
      aria-label={`${timeStr}, ${dateShortStr}`}
    >
      <div className="springboard-combined-clock-digital">
        <p className="springboard-widget-time font-semibold tabular-nums leading-none text-white">
          {timeStr}
        </p>
        <p className="springboard-widget-date mt-0.5 text-white/55">{dateShortStr}</p>
      </div>
      <div className="springboard-combined-clockface" aria-hidden>
        <SpringboardClockfaceFace now={now} gradientId="springboard-combined-clockface-bg" />
      </div>
    </div>
  );
}
