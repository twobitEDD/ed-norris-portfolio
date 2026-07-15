import type { Practice, ResumePreset } from "./types";

/** Default résumé builder preset. */
export const DEFAULT_RESUME_PRESET_ID = "softwareLeadership";

export const practices: Practice[] = [
  {
    id: "environmental",
    number: "01",
    label: "Environmental Practice",
    title: "Environmental Systems & Technology",
    summary:
      "CO2T.earth biochar, soil stewardship, carbon reporting, and field operations — software and data infrastructure for sustainability programs.",
    tagline: "Built from Nature. Backed by Science.",
    tags: ["Biochar", "Soil Stewardship", "Carbon", "CO2T.earth"],
    disciplines: ["environment", "data", "operations"],
    href: "/#game?app=environmental",
  },
  {
    id: "creative",
    number: "02",
    label: "Creative Practice",
    title: "Games, Interactive Media & Product Storytelling",
    summary:
      "Game platforms, web experiences, identity systems, and marketing tools built to earn attention and create participation.",
    tags: ["Game Platforms", "Interactive UX", "Brand Systems", "Web Products"],
    disciplines: ["games", "marketing", "software"],
    href: "/#game?app=creative",
    offset: true,
  },
];

export const resumePresets: ResumePreset[] = [
  {
    id: "educationCentric",
    label: "Education Centric",
    description: "Teaching, mentoring, and inclusive learning — formal degree plus public education and STEM instruction.",
    targetRole: "Education & Technology Specialist",
    tone: "executive",
    pages: 2,
    disciplines: ["operations", "games"],
    emphasizeLeadership: true,
    emphasizeTechnical: false,
    maxExperiences: 6,
  },
  {
    id: "softwareLeadership",
    label: "Software Leadership",
    description: "Technical depth with product and team leadership — consumer experience software, platforms, and delivery.",
    targetRole: "VP Engineering / Head of Product",
    tone: "executive",
    pages: 2,
    disciplines: ["software", "operations", "marketing", "games"],
    emphasizeLeadership: true,
    emphasizeTechnical: true,
    maxExperiences: 12,
  },
  {
    id: "sustainabilityTechnology",
    label: "Sustainability Technology",
    description: "Environmental systems, CO2True carbon credit platform, and product leadership.",
    targetRole: "Sustainability Technology Lead",
    tone: "executive",
    pages: 2,
    disciplines: ["environment", "software", "operations", "data"],
    emphasizeLeadership: true,
    emphasizeTechnical: true,
    maxExperiences: 8,
  },
  {
    id: "fullExperience",
    label: "Full Experience",
    description: "Complete career history — game development, casino titles, military simulation, consumer software, and sustainability.",
    targetRole: "Software & Product Innovator",
    tone: "executive",
    pages: 3,
    disciplines: ["environment", "software", "games", "marketing", "operations", "data"],
    emphasizeLeadership: true,
    emphasizeTechnical: true,
    maxExperiences: "all",
  },
];
