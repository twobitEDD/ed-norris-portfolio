import { careerGraphNodes } from "./career/career-graph";
import { getTimelineEmployerIndex } from "./career/derive";
import { experiences } from "./experiences";
import type { Experience } from "./types";
import type { TimelineEra } from "./timeline-eras";

function normalizeOrg(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function experienceMatchesEmployer(exp: Experience, employer: string, index: Map<string, string>): boolean {
  const expOrg = normalizeOrg(exp.organization);
  const target = normalizeOrg(employer);

  if (expOrg === target || expOrg.includes(target) || target.includes(expOrg)) {
    return true;
  }

  const graphNodeId = index.get(target);
  if (!graphNodeId) return false;

  const node = careerGraphNodes.find((n) => n.id === graphNodeId);
  if (!node) return false;

  if (normalizeOrg(node.label) === expOrg) return true;

  return (node.timelineEmployerAliases ?? []).some((alias) => {
    const normalized = normalizeOrg(alias);
    return expOrg === normalized || expOrg.includes(normalized) || normalized.includes(expOrg);
  });
}

/** LinkedIn-style roles that fall within a narrative timeline era. */
export function getExperiencesForEra(era: TimelineEra): Experience[] {
  const index = getTimelineEmployerIndex();

  return experiences
    .filter((exp) => era.employers.some((employer) => experienceMatchesEmployer(exp, employer, index)))
    .sort((a, b) => {
      const aStart = Date.parse(a.period.start) || 0;
      const bStart = Date.parse(b.period.start) || 0;
      return aStart - bStart;
    });
}
