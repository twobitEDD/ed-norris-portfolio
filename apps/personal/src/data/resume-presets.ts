import type { Practice, ResumePreset } from "./types";

/** Default résumé builder preset (Prompt 17). */
export const DEFAULT_RESUME_PRESET_ID = "softwareProductLeadership";

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
    href: "/work#environmental",
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
    href: "/work#creative",
    offset: true,
  },
];

export const resumePresets: ResumePreset[] = [
  {
    id: "softwareProductLeadership",
    label: "Software Product Leadership",
    description: "Technical depth with product and team leadership emphasis.",
    targetRole: "VP Engineering / Head of Product",
    tone: "executive",
    pages: 2,
    disciplines: ["software", "operations"],
    emphasizeLeadership: true,
    emphasizeTechnical: true,
  },
  {
    id: "sustainabilityTechnology",
    label: "Sustainability Technology",
    description: "Environmental systems, carbon infrastructure, and product leadership.",
    targetRole: "Sustainability Technology Lead",
    tone: "executive",
    pages: 1,
    disciplines: ["environment", "software", "operations", "data"],
    emphasizeLeadership: true,
    emphasizeTechnical: true,
  },
  {
    id: "creativeTechnology",
    label: "Creative Technology",
    description: "Games, interactive media, and creative product systems.",
    targetRole: "Creative Technologist",
    tone: "creative",
    pages: 2,
    disciplines: ["games", "marketing", "software"],
    emphasizeLeadership: false,
    emphasizeTechnical: true,
  },
  {
    id: "fractionalCTO",
    label: "Fractional CTO",
    description: "Architecture, delivery, and cross-functional systems leadership.",
    targetRole: "Fractional CTO",
    tone: "technical",
    pages: 1,
    disciplines: ["software", "operations"],
    emphasizeLeadership: true,
    emphasizeTechnical: true,
  },
  {
    id: "fullCareer",
    label: "Full Career",
    description: "Complete cross-disciplinary history and selected projects.",
    targetRole: "Software & Product Innovator",
    tone: "executive",
    pages: 3,
    disciplines: ["environment", "software", "games", "marketing", "operations", "data"],
    emphasizeLeadership: true,
    emphasizeTechnical: true,
  },
];
