import data from "./career-data.json";

export type PersonLink = {
  label: string;
  url: string;
};

export type Person = {
  name: string;
  headline: string;
  summary: string;
  location?: string;
  links?: PersonLink[];
};

export type MapPosition = {
  x: number;
  y: number;
  tone: "game" | "env" | "tech" | "market";
};

export type CareerEntry = {
  id: string;
  type: string;
  title: string;
  organization?: string;
  start: string;
  end?: string | null;
  summary?: string;
  challenge?: string;
  actions?: string[];
  outcomes?: string[];
  tags: string[];
  skills?: string[];
  industries?: string[];
  visibility?: string;
  featured?: boolean;
  map?: MapPosition;
};

export type TimelineEvent = {
  id: string;
  era: string;
  title: string;
  summary: string;
  start: string;
  tags: string[];
};

export type Practice = {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  cta: string;
  href: string;
  tone: "env" | "creative";
};

export type Relationship = {
  from: string;
  to: string;
  kind: string;
  weight?: number;
};

export type ResumePreset = {
  id: string;
  label: string;
  description: string;
  emphasis: string[];
  includeTags: string[];
  pages: number;
};

export type WorkFilter = {
  id: string;
  label: string;
  tags?: string[];
};

export type CareerData = {
  person: Person;
  practices: Practice[];
  timeline: TimelineEvent[];
  entries: CareerEntry[];
  relationships: Relationship[];
  resumePresets: ResumePreset[];
  filters: WorkFilter[];
};

export const careerData = data as CareerData;

export function getFeaturedEntries(entries = careerData.entries) {
  return entries.filter((entry) => entry.featured);
}

export function filterEntriesByTags(tags: string[], entries = careerData.entries) {
  if (tags.length === 0) return entries;
  return entries.filter((entry) => entry.tags.some((tag) => tags.includes(tag)));
}

export function getMapEntries(tags: string[] = []) {
  return filterEntriesByTags(tags).filter((entry) => entry.map);
}

export function getResumeEntries(presetId: string) {
  const preset = careerData.resumePresets.find((item) => item.id === presetId);
  if (!preset) return getFeaturedEntries();

  const tagged = filterEntriesByTags(preset.includeTags);
  const featured = tagged.filter((entry) => entry.featured);
  return featured.length > 0 ? featured : tagged.slice(0, preset.pages === 1 ? 2 : 4);
}

export function formatYears(start: string, end?: string | null) {
  return `${start} – ${end ?? "Present"}`;
}
