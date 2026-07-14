"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const sections = [
  { id: "hero", num: "01", label: "Home" },
  { id: "timeline", num: "02", label: "Timeline" },
  { id: "map", num: "03", label: "Map" },
  { id: "work", num: "04", label: "Work" },
  { id: "resume", num: "05", label: "Résumé" },
  { id: "contact", num: "06", label: "Contact" },
];

export function ScrollProgressRail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-35% 0px -45% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      aria-label="Section progress"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:right-6"
    >
      <div className="relative flex flex-col gap-4 py-2">
        <div
          className="absolute bottom-1 right-[9px] top-1 w-px bg-paper-cream/20"
          aria-hidden="true"
        />
        {sections.map(({ id, num, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={cn(
              "group relative flex items-center justify-end gap-2 transition-opacity duration-300",
              active === id ? "opacity-100" : "opacity-40 hover:opacity-75",
            )}
          >
            <span
              className={cn(
                "hidden text-[9px] uppercase tracking-[0.14em] transition-colors xl:inline",
                active === id ? "text-paper-cream" : "text-paper-cream/60",
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                "relative z-[1] font-mono text-[10px] tracking-wider",
                active === id ? "text-paper-cream" : "text-paper-cream/55",
              )}
            >
              {num}
            </span>
            {active === id && (
              <span
                className="absolute -right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-paper-cream"
                aria-hidden="true"
              />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}
