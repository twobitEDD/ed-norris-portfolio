import { experiences, profile, projects, resumePresets, skills } from "@/data";
import type { Discipline, ResumePreset } from "@/data/types";

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

export type ResumeContent = {
  name: string;
  targetRole: string;
  location: string;
  summary: string;
  links: { label: string; url: string }[];
  experiences: typeof experiences;
  projects: typeof projects;
  skills: typeof skills;
};

export function getDefaultResumeConfig(): ResumeConfig {
  const preset = resumePresets[0];
  return {
    presetId: preset.id,
    targetRole: preset.targetRole,
    tone: preset.tone,
    pages: preset.pages,
    disciplines: preset.disciplines,
    selectedProjectIds: projects.filter((p) => p.featured).map((p) => p.id),
    includeSkills: true,
    includeEducation: false,
    includeLinks: true,
    emphasizeLeadership: preset.emphasizeLeadership,
    emphasizeTechnical: preset.emphasizeTechnical,
  };
}

export function applyPreset(presetId: string): ResumeConfig {
  const preset = resumePresets.find((p) => p.id === presetId) ?? resumePresets[0];
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
    includeEducation: false,
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
    "SELECTED PROJECTS",
    ...content.projects.flatMap((p) => [p.title, p.summary, ""]),
    "SKILLS",
    content.skills.map((s) => s.label).join(" · "),
  ];
  return lines.join("\n");
}
