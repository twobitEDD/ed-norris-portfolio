"use client";

import { cn } from "@/lib/cn";

type SpringboardClockfaceWidgetProps = {
  now: Date;
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

function handAngle(date: Date, unit: "hour" | "minute"): number {
  if (unit === "hour") {
    const h = date.getHours() % 12;
    const m = date.getMinutes();
    return (h + m / 60) * 30;
  }
  const s = date.getSeconds();
  return (date.getMinutes() + s / 60) * 6;
}

export function SpringboardClockfaceWidget({
  now,
  compact = false,
  className,
  style,
}: SpringboardClockfaceWidgetProps) {
  const hourDeg = handAngle(now, "hour");
  const minuteDeg = handAngle(now, "minute");

  return (
    <div
      className={cn(
        "springboard-widget springboard-widget--clockface flex items-center justify-center",
        compact && "springboard-widget--compact",
        className,
      )}
      style={style}
      aria-label={now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
      role="img"
    >
      <svg
        className="springboard-clockface-svg"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <defs>
          <radialGradient id="springboard-clockface-bg" cx="35%" cy="28%" r="75%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="url(#springboard-clockface-bg)" />
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const inner = i % 3 === 0 ? 38 : 41;
          const outer = 44;
          const x1 = 50 + inner * Math.cos(angle);
          const y1 = 50 + inner * Math.sin(angle);
          const x2 = 50 + outer * Math.cos(angle);
          const y2 = 50 + outer * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="springboard-clockface-tick"
              strokeWidth={i % 3 === 0 ? 1.6 : 1}
            />
          );
        })}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="28"
          className="springboard-clockface-hand springboard-clockface-hand--hour"
          strokeWidth="3.2"
          strokeLinecap="round"
          transform={`rotate(${hourDeg} 50 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="18"
          className="springboard-clockface-hand springboard-clockface-hand--minute"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${minuteDeg} 50 50)`}
        />
        <circle cx="50" cy="50" r="2.8" className="springboard-clockface-center" />
      </svg>
    </div>
  );
}
