import { cn } from "@/lib/cn";

type WorkVennDiagramProps = {
  className?: string;
};

const circles = [
  { id: "people", cx: 92, cy: 66, label: "People", x: 54, y: 72, stroke: "var(--marketing)", fill: "var(--marketing)" },
  {
    id: "technology",
    cx: 178,
    cy: 66,
    label: "Technology",
    x: 138,
    y: 72,
    stroke: "var(--technology)",
    fill: "var(--technology)",
  },
  {
    id: "planet",
    cx: 135,
    cy: 40,
    label: "Planet",
    x: 112,
    y: 28,
    stroke: "var(--environment)",
    fill: "var(--environment)",
  },
] as const;

export function WorkVennDiagram({ className }: WorkVennDiagramProps) {
  return (
    <figure
      className={cn("relative mt-4 motion-reduce:transition-none", className)}
      aria-label="Where I work"
    >
      <svg
        viewBox="0 0 270 108"
        className="h-[84px] w-full max-w-[240px] sm:h-[96px] sm:max-w-[270px]"
        role="img"
        aria-hidden="true"
      >
        {circles.map((circle) => (
          <circle
            key={circle.id}
            cx={circle.cx}
            cy={circle.cy}
            r={40}
            fill={circle.fill}
            fillOpacity={0.07}
            stroke={circle.stroke}
            strokeWidth={1.5}
            strokeOpacity={0.72}
          />
        ))}
        {circles.map((circle) => (
          <text
            key={`${circle.id}-label`}
            x={circle.x}
            y={circle.y}
            className="fill-ink-soft font-mono text-[7.5px] font-semibold uppercase tracking-[0.14em] sm:text-[8px]"
          >
            {circle.label}
          </text>
        ))}
        <text
          x={135}
          y={58}
          textAnchor="middle"
          className="fill-ink font-mono text-[6.5px] font-medium uppercase tracking-[0.12em] opacity-70 sm:text-[7px]"
        >
          {"Edd's work"}
        </text>
      </svg>
      <figcaption className="sr-only">People, Technology, and Planet — the three areas where Edd works</figcaption>
    </figure>
  );
}
