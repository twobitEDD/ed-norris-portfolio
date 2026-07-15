export type ExpertiseSlideLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ExpertiseSlide = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Client logo ids from client-logos.ts */
  partnerIds: string[];
  /** Text-only partners when no logo asset exists */
  partnerNotes?: string[];
  technologies: string[];
  links: ExpertiseSlideLink[];
  theme: "co2true" | "ergo" | "consulting";
  glow: "green" | "purple" | "cyan";
};

export const expertiseSlides: ExpertiseSlide[] = [
  {
    id: "co2true",
    eyebrow: "Environmental platform",
    title: "CO2True.com",
    body: "Accreditation and action planning for greenhouse gas reductions, carbon credits, and impact products.",
    partnerIds: ["co2t"],
    partnerNotes: ["Agriculture clients", "Biochar programs"],
    technologies: ["TypeScript", "React", "BigQuery", "Traceability"],
    links: [
      { label: "CO2True.earth", href: "https://co2true.earth", external: true },
      { label: "Case study", href: "/projects/co2t-platform" },
    ],
    theme: "co2true",
    glow: "green",
  },
  {
    id: "ergo",
    eyebrow: "Game platform",
    title: "ERGO.games",
    body: "Online gaming hub for ergonomic gaming — games for everyone, always easy to play, never easy to win.",
    partnerIds: [],
    partnerNotes: ["Indie developers", "2Bit Entertainment"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Web games"],
    links: [{ label: "ERGO.games", href: "https://ergo.games", external: true }],
    theme: "ergo",
    glow: "purple",
  },
  {
    id: "consulting",
    eyebrow: "Sustainability technology",
    title: "Sustainability Technology Consulting",
    body: "With nonprofit and for-profit organizations, I build software that makes a sustainable future possible.",
    partnerIds: ["adidas", "google", "dell", "washu", "agencies"],
    technologies: ["TypeScript", "React", "Next.js", "BigQuery", "Unity", "AR/VR"],
    links: [{ label: "View all work", href: "/work" }],
    theme: "consulting",
    glow: "cyan",
  },
];

export const EXPERTISE_AUTO_ADVANCE_MS = 7000;
