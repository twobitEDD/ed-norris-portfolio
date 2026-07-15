const MONTHS: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

/** Parse "Mar 2024" or "2012" into a sortable month index (year * 12 + month). */
export function parsePeriodDate(value: string): number {
  const match = value.match(/([A-Za-z]{3})?\s*(\d{4})/);
  if (!match) return 0;
  const month = match[1] ? (MONTHS[match[1]] ?? 0) : 0;
  return Number(match[2]) * 12 + month;
}

export function sortExperiencesChronologically<
  T extends { period: { start: string; end?: string } },
>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => parsePeriodDate(b.period.start) - parsePeriodDate(a.period.start),
  );
}
