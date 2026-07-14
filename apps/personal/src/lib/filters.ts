import type { Discipline } from "@/data/types";

export function matchesDisciplineFilter(
  disciplines: Discipline[],
  activeFilters: Discipline[],
): boolean {
  if (activeFilters.length === 0) return true;
  return disciplines.some((d) => activeFilters.includes(d));
}

export function dimOpacity(
  disciplines: Discipline[],
  activeFilters: Discipline[],
  selectedId?: string,
  nodeId?: string,
): number {
  if (selectedId && nodeId && selectedId !== nodeId) {
    return 0.35;
  }
  if (activeFilters.length === 0) return 1;
  return matchesDisciplineFilter(disciplines, activeFilters) ? 1 : 0.25;
}
