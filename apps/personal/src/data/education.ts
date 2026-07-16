import type { Education } from "./types";

/** Formal degrees and credentials. */
export const education: Education[] = [
  {
    id: "edu-full-sail",
    credential: "Bachelor's Degree — Software",
    institution: "Full Sail University",
    period: { start: "2005", end: "2008" },
    summary:
      "Software development and interactive media — foundation for game engineering and production work.",
  },
];

/**
 * Experience IDs surfaced on the résumé education section alongside formal degrees.
 * Teaching and employment roles belong in the experience section — only degrees/credentials here.
 */
export const resumeEducationExperienceIds = [] as const;
