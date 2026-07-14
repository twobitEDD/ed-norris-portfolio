import { cn } from "@/lib/cn";

const depthClass: Record<number, string> = {
  1: "object-shadow object-shadow--1",
  2: "object-shadow object-shadow--2",
  3: "object-shadow object-shadow--3",
  4: "object-shadow object-shadow--4",
  5: "object-shadow object-shadow--5",
};

/** Single light source (top-left) — contact + ambient layers. */
export function ObjectShadow({ depth = 2 }: { depth?: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 rounded-[inherit]", depthClass[depth])}
    />
  );
}
