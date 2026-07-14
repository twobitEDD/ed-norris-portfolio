"use client";

import { useMemo, useState } from "react";
import type { CareerEntry, WorkFilter } from "@ed-norris/career-data";
import { filterEntriesByTags } from "@ed-norris/career-data";

const toneClasses = {
  game: "bg-[#ead7ca]",
  env: "bg-[#d8e4d7]",
  market: "bg-[#eee0ae]",
  tech: "bg-[#d8e1e8]",
};

type Props = {
  personName: string;
  entries: CareerEntry[];
  filters: WorkFilter[];
};

export function WorkMapSection({ personName, entries, filters }: Props) {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleEntries = useMemo(() => {
    const active = filters.find((filter) => filter.id === activeFilter);
    const tags = active?.tags ?? [];
    return filterEntriesByTags(tags).filter((entry) => entry.map);
  }, [activeFilter, entries, filters]);

  return (
    <section id="map" className="scroll-mt-24 border-t border-line py-16 sm:py-24">
      <h2 className="text-3xl font-bold sm:text-5xl">The living work map.</h2>
      <p className="mt-5 max-w-[820px] text-lg text-muted sm:text-xl">
        Filter by discipline, outcome, technology, industry, or period. The same
        underlying records power the portfolio, case studies, bios, and résumés.
      </p>

      <div className="no-print mt-7 flex flex-wrap gap-2.5">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`rounded-full border border-ink px-4 py-2.5 text-sm font-semibold transition ${
              activeFilter === filter.id ? "bg-ink text-paper" : "bg-transparent hover:bg-ink/5"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="relative mt-6 h-[420px] overflow-hidden border border-ink bg-[#efecdf] sm:h-[610px]">
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          {visibleEntries.map((entry) => (
            <line
              key={`line-${entry.id}`}
              x1="50%"
              y1="50%"
              x2={`${entry.map!.x}%`}
              y2={`${entry.map!.y}%`}
              stroke="#18211f"
              strokeWidth="1"
            />
          ))}
        </svg>

        <div
          className="absolute left-[42%] top-[43%] z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink bg-ink px-5 py-4 text-lg font-bold text-paper shadow-node sm:px-6 sm:py-5 sm:text-2xl"
        >
          {personName.toUpperCase()}
        </div>

        {visibleEntries.map((entry) => (
          <button
            key={entry.id}
            type="button"
            title={entry.summary}
            className={`absolute z-10 max-w-[42%] animate-jitter rounded-full border border-ink px-3 py-2 text-left text-xs font-bold shadow-node transition hover:scale-105 sm:max-w-none sm:px-4 sm:text-sm ${
              toneClasses[entry.map!.tone]
            }`}
            style={{ left: `${entry.map!.x}%`, top: `${entry.map!.y}%` }}
          >
            {entry.title}
          </button>
        ))}
      </div>
    </section>
  );
}
