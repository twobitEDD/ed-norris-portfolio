import { cn } from "@/lib/cn";

type WorkVennDiagramProps = {
  className?: string;
};

const circles = [
  {
    id: "humanity",
    cx: 98,
    cy: 58,
    label: "Humanity",
    x: 68,
    y: 62,
    stroke: "var(--marketing)",
    fill: "var(--marketing)",
  },
  {
    id: "technology",
    cx: 172,
    cy: 58,
    label: "Technology",
    x: 188,
    y: 62,
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
            r={44}
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
            textAnchor="middle"
            className="fill-ink-soft font-mono text-[7.5px] font-semibold uppercase tracking-[0.14em] sm:text-[8px]"
          >
            {circle.label}
          </text>
        ))}
        <text
          x={135}
          y={54}
          textAnchor="middle"
          className="handwritten fill-ink text-[11px] font-medium sm:text-[12px]"
        >
          {"Edd Lives Here ⬇️"}
        </text>
      </svg>
      <figcaption className="sr-only">
        Humanity and Technology — where Edd lives at the intersection
      </figcaption>
    </figure>
  );
}
