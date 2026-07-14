import type { Discipline, Practice, Project } from "@/data/types";

export type WorkHash = "environmental" | "creative" | "games";

export const WORK_HASHES: WorkHash[] = ["environmental", "creative", "games"];

export const WORK_HASH_LABELS: Record<WorkHash, string> = {
  environmental: "Environmental",
  creative: "Creative",
  games: "Games",
};

export function parseWorkHash(hash: string): WorkHash | null {
  const value = hash.replace(/^#/, "").toLowerCase();
  return WORK_HASHES.includes(value as WorkHash) ? (value as WorkHash) : null;
}

export function projectsForPractice(practice: Practice, allProjects: Project[]): Project[] {
  return allProjects
    .filter((project) => project.disciplines.some((d) => practice.disciplines.includes(d)))
    .sort((a, b) => (a.resumePriority ?? 99) - (b.resumePriority ?? 99));
}

export function projectsForDiscipline(
  discipline: Discipline,
  allProjects: Project[],
): Project[] {
  return allProjects
    .filter((project) => project.disciplines.includes(discipline))
    .sort((a, b) => (a.resumePriority ?? 99) - (b.resumePriority ?? 99));
}

export function practiceForHash(hash: WorkHash, practices: Practice[]): Practice | undefined {
  if (hash === "games") return undefined;
  return practices.find((practice) => practice.id === hash);
}

export function scrollToWorkSection(hash: WorkHash | null, behavior: ScrollBehavior = "smooth") {
  if (!hash) return;
  requestAnimationFrame(() => {
    document.getElementById(hash)?.scrollIntoView({ behavior, block: "start" });
  });
}
