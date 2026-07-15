import { cn } from "@/lib/cn";

type WorkVennDiagramProps = {
  className?: string;
};

const RADIUS = 44;
const INTERSECTION_CENTER_X = 135;
const OVERLAP_HALF_WIDTH = Math.sqrt(RADIUS ** 2 - (74 / 2) ** 2);
const LEFT_LOBE_CENTER_X = (98 - RADIUS + INTERSECTION_CENTER_X - OVERLAP_HALF_WIDTH) / 2;
const RIGHT_LOBE_CENTER_X =
  (INTERSECTION_CENTER_X + OVERLAP_HALF_WIDTH + 172 + RADIUS) / 2;

const circles = [
  {
    id: "humanity",
    cx: 98,
    cy: 58,
    label: "Humanity",
    labelX: LEFT_LOBE_CENTER_X,
    labelY: 58,
    stroke: "var(--marketing)",
    fill: "var(--marketing)",
  },
  {
    id: "technology",
    cx: 172,
    cy: 58,
    label: "Technology",
    labelX: RIGHT_LOBE_CENTER_X,
    labelY: 58,
    stroke: "var(--technology)",
    fill: "var(--technology)",
  },
] as const;

export function WorkVennDiagram({ className }: WorkVennDiagramProps) {
  return (
    <figure
      className={cn("relative mt-4 motion-reduce:transition-none", className)}
      aria-label="Where I work — Humanity and Technology"
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
            r={RADIUS}
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
            x={circle.labelX}
            y={circle.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-ink-soft font-mono text-[7.5px] font-semibold uppercase tracking-[0.14em] sm:text-[8px]"
          >
            {circle.label}
          </text>
        ))}
        <text
          x={INTERSECTION_CENTER_X}
          y={58}
          textAnchor="middle"
          dominantBaseline="middle"
          className="handwritten fill-ink text-[11px] font-medium sm:text-[12px]"
        >
          <tspan x={INTERSECTION_CENTER_X} dy="-0.55em">
            Edd Lives Here
          </tspan>
          <tspan x={INTERSECTION_CENTER_X} dy="1.1em">
            ⬇️
          </tspan>
        </text>
      </svg>
      <figcaption className="sr-only">
        Humanity and Technology — where Edd lives at the intersection
      </figcaption>
    </figure>
  );
}
