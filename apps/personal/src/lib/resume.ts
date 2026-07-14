import {
  education,
  experiences,
  profile,
  projects,
  resumeEducationExperienceIds,
  resumePresets,
  skills,
} from "@/data";
import { DEFAULT_RESUME_PRESET_ID } from "@/data/resume-presets";
import type { Discipline, Education, ResumePreset } from "@/data/types";

export type ResumeConfig = {
  presetId: string;
  targetRole: string;
  tone: ResumePreset["tone"];
  pages: 1 | 2 | 3;
  disciplines: Discipline[];
  selectedProjectIds: string[];
  includeSkills: boolean;
  includeEducation: boolean;
  includeLinks: boolean;
  emphasizeLeadership: boolean;
  emphasizeTechnical: boolean;
};

export type ResumeEducationRow = {
  id: string;
  title: string;
  organization: string;
  period: { start: string; end?: string };
  summary?: string;
};

export type ResumeContent = {
  name: string;
  targetRole: string;
  location: string;
  summary: string;
  links: { label: string; url: string }[];
  experiences: typeof experiences;
  education: ResumeEducationRow[];
  projects: typeof projects;
  skills: typeof skills;
};

function getDefaultPreset() {
  return resumePresets.find((p) => p.id === DEFAULT_RESUME_PRESET_ID) ?? resumePresets[0];
}

function parsePeriodStart(start: string): number {
  const yearMatch = start.match(/\d{4}/);
  return yearMatch ? Number(yearMatch[0]) : 0;
}

function buildEducationRows(includeEducation: boolean): ResumeEducationRow[] {
  if (!includeEducation) return [];

  const degreeRows: ResumeEducationRow[] = education.map((entry: Education) => ({
    id: entry.id,
    title: entry.credential,
    organization: entry.institution,
    period: entry.period ?? { start: "" },
    summary: entry.summary,
  }));

  const experienceRows: ResumeEducationRow[] = experiences
    .filter((exp) =>
      (resumeEducationExperienceIds as readonly string[]).includes(exp.id),
    )
    .map((exp) => ({
      id: exp.id,
      title: exp.title,
      organization: exp.organization,
      period: exp.period,
      summary: exp.summary,
    }));

  return [...degreeRows, ...experienceRows].sort(
    (a, b) => parsePeriodStart(b.period.start) - parsePeriodStart(a.period.start),
  );
}

export function getDefaultResumeConfig(): ResumeConfig {
  const preset = getDefaultPreset();
  return {
    presetId: preset.id,
    targetRole: preset.targetRole,
    tone: preset.tone,
    pages: preset.pages,
    disciplines: preset.disciplines,
    selectedProjectIds: projects.filter((p) => p.featured).map((p) => p.id),
    includeSkills: true,
    includeEducation: true,
    includeLinks: true,
    emphasizeLeadership: preset.emphasizeLeadership,
    emphasizeTechnical: preset.emphasizeTechnical,
  };
}

export function applyPreset(presetId: string): ResumeConfig {
  const preset = resumePresets.find((p) => p.id === presetId) ?? getDefaultPreset();
  return {
    presetId: preset.id,
    targetRole: preset.targetRole,
    tone: preset.tone,
    pages: preset.pages,
    disciplines: preset.disciplines,
    selectedProjectIds: projects
      .filter((p) => p.disciplines.some((d) => preset.disciplines.includes(d)))
      .sort((a, b) => (a.resumePriority ?? 99) - (b.resumePriority ?? 99))
      .slice(0, preset.pages === 1 ? 2 : preset.pages === 2 ? 4 : 6)
      .map((p) => p.id),
    includeSkills: true,
    includeEducation: true,
    includeLinks: true,
    emphasizeLeadership: preset.emphasizeLeadership,
    emphasizeTechnical: preset.emphasizeTechnical,
  };
}

export function buildResumeContent(config: ResumeConfig): ResumeContent {
  const filteredExperiences = experiences.filter((exp) =>
    exp.disciplines.some((d) => config.disciplines.includes(d)),
  );
  const selectedProjects = projects.filter((p) => config.selectedProjectIds.includes(p.id));
  const filteredSkills = config.includeSkills
    ? skills.filter((s) => s.disciplines.some((d) => config.disciplines.includes(d)))
    : [];

  const summary =
    config.tone === "technical"
      ? `${profile.summary} Focused on architecture, delivery, and systems that scale.`
      : config.tone === "creative"
        ? `${profile.summary} Specialized in interactive products, narrative systems, and audience-centered design.`
        : profile.summary;

  return {
    name: profile.name,
    targetRole: config.targetRole,
    location: profile.location,
    summary,
    links: config.includeLinks ? profile.links : [],
    experiences: filteredExperiences.slice(0, config.pages === 1 ? 2 : config.pages === 2 ? 3 : 4),
    education: buildEducationRows(config.includeEducation),
    projects: selectedProjects,
    skills: filteredSkills,
  };
}

export function resumeToPlainText(content: ResumeContent): string {
  const lines = [
    content.name.toUpperCase(),
    content.targetRole,
    content.location,
    "",
    "PROFILE",
    content.summary,
    "",
    "EXPERIENCE",
    ...content.experiences.flatMap((exp) => [
      `${exp.title} — ${exp.organization}`,
      `${exp.period.start} – ${exp.period.end ?? "Present"}`,
      exp.summary,
      ...exp.details.map((d) => `• ${d}`),
      "",
    ]),
  ];

  if (content.education.length > 0) {
    lines.push(
      "EDUCATION",
      ...content.education.flatMap((entry) => [
        `${entry.title} — ${entry.organization}`,
        `${entry.period.start}${entry.period.end ? ` – ${entry.period.end}` : ""}`,
        entry.summary ?? "",
        "",
      ]),
    );
  }

  lines.push(
    "SELECTED PROJECTS",
    ...content.projects.flatMap((p) => [p.title, p.summary, ""]),
    "SKILLS",
    content.skills.map((s) => s.label).join(" · "),
  );

  return lines.join("\n");
}
