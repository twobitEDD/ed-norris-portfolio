import { technologyAdvisoryImage } from "./career-images";

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
  image?: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
  theme: "co2true" | "ergo" | "consulting";
  glow: "green" | "purple" | "cyan";
};

export const expertiseSlides: ExpertiseSlide[] = [
  {
    id: "co2true",
    eyebrow: "Environmental platform",
    title: "CO2True.com",
    body: "VP Operations leadership at CO2T — software architecture, product design, and brand identity (including the Bigfoot mascot) for soil additive and carbon capture programs. Built e-commerce from the ground up, integrated product sales with environmental impact tracking, and delivered infrastructure for carbon credit issuance.",
    partnerIds: ["co2t"],
    partnerNotes: ["Soil Additive Business", "Biochar & carbon credits"],
    technologies: ["TypeScript", "React", "BigQuery", "E-commerce", "Traceability"],
    links: [
      { label: "CO2True.com", href: "https://co2true.com", external: true },
      { label: "CO2T.earth", href: "https://co2t.earth", external: true },
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
    partnerNotes: ["Indie developers", "2bit Entertainment"],
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
    image: technologyAdvisoryImage,
    theme: "consulting",
    glow: "cyan",
  },
];

export const EXPERTISE_AUTO_ADVANCE_MS = 7000;
