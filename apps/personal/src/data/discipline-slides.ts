import { co2tBrand } from "./career-images";

export type DisciplineSlideLink = {
  label: string;
  href: string;
  external?: boolean;
  /** Primary CTA — rendered as "View case study →" style */
  primary?: boolean;
};

export type DisciplineSlide = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Client logo ids from client-logos.ts */
  partnerIds: string[];
  partnerNotes?: string[];
  technologies: string[];
  links: DisciplineSlideLink[];
  glow: "green" | "purple" | "cyan" | "amber";
  image?: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
  decor?: "co2true" | "ergo" | "consulting" | "games" | "data";
};

export const DISCIPLINE_AUTO_ADVANCE_MS = 8000;

export const environmentalSlides: DisciplineSlide[] = [
  {
    id: "co2true",
    eyebrow: "Accreditation & impact",
    title: "CO2True.com",
    body: "Public-facing accreditation and carbon credit programs at CO2True.com — connecting soil additive purchases to verified environmental impact, transparent reporting, and trust-building sustainability communication.",
    partnerIds: ["co2t"],
    partnerNotes: ["Carbon credits", "Impact tracking"],
    technologies: ["React", "TypeScript", "Carbon credits", "Accreditation"],
    links: [
      { label: "View case study", href: "/projects/co2t-platform", primary: true },
      { label: "CO2True.com", href: "https://co2true.com", external: true },
    ],
    glow: "green",
    image: {
      src: co2tBrand.mascot.src,
      alt: co2tBrand.mascot.alt,
      objectPosition: "center 20%",
    },
    decor: "co2true",
  },
  {
    id: "carbon-tracking",
    eyebrow: "Traceability systems",
    title: "Carbon Tracking Infrastructure",
    body: "Biochar traceability from field operations through product sale to carbon credit issuance — auditable pipelines, BigQuery reporting, and infrastructure that keeps environmental claims defensible.",
    partnerIds: ["co2t"],
    technologies: ["BigQuery", "TypeScript", "Traceability", "Reporting"],
    links: [{ label: "View case study", href: "/projects/carbon-tracking", primary: true }],
    glow: "green",
    image: {
      src: co2tBrand.biocharGuide.src,
      alt: co2tBrand.biocharGuide.alt,
      objectPosition: "left top",
    },
    decor: "data",
  },
  {
    id: "soil-additive",
    eyebrow: "Brand & commerce",
    title: "Soil Additive Business",
    body: "Built CO2T's visual identity from scratch — including the Bigfoot mascot — plus e-commerce, field ops tooling, and product UX that connects farmers, customers, and carbon programs.",
    partnerIds: ["co2t"],
    partnerNotes: ["Bigfoot mascot", "E-commerce", "Field ops"],
    technologies: ["Brand design", "E-commerce", "React", "Operations"],
    links: [{ label: "View case study", href: "/projects/co2t-platform", primary: true }],
    glow: "green",
    image: {
      src: co2tBrand.mascot.src,
      alt: "CO2T Bigfoot mascot — brand identity for soil additive programs",
      objectPosition: "center 20%",
    },
    decor: "co2true",
  },
  {
    id: "oibw-co2t",
    eyebrow: "Leadership arc",
    title: "OIBW → CO2T Leadership",
    body: "Started at Oregon Institute for a Better Way building automation and traceability for biochar programs, then scaled the same mission as VP Operations at CO2T — software architecture, product, brand, and operations under one roof.",
    partnerIds: ["co2t"],
    partnerNotes: ["OIBW 2022–2024", "VP Operations 2024–present"],
    technologies: ["Automation", "Traceability", "Platform scale", "Operations"],
    links: [{ label: "View case study", href: "/projects/co2t-platform", primary: true }],
    glow: "green",
    image: {
      src: co2tBrand.biocharGuide.src,
      alt: "Oregon Institute for a Better Way — biochar and soil stewardship",
      objectPosition: "left top",
    },
    decor: "consulting",
  },
];

export const creativeSlides: DisciplineSlide[] = [
  {
    id: "ergo",
    eyebrow: "Game platform",
    title: "ERGO.games",
    body: "Browser-based gaming hub built for ergonomic play — accessible indie catalog, entitlements, and human-centered UX where games are easy to pick up but never easy to win.",
    partnerNotes: ["Indie developers", "2Bit Entertainment"],
    partnerIds: [],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Web games"],
    links: [
      { label: "View case study", href: "/projects/ergo-games", primary: true },
      { label: "ERGO.games", href: "https://ergo.games", external: true },
    ],
    glow: "purple",
    image: {
      src: "/career/era-ergo.jpg",
      alt: "ERGO.games — ergonomic gaming platform",
    },
    decor: "ergo",
  },
  {
    id: "brand-experiences",
    eyebrow: "Interactive brand work",
    title: "adidas & Google Experiences",
    body: "Functional interactive brand experiences and product storytelling — from adidas Future Team full-time work to contract engagements via Uncorked and Nice Touch for Google, Dell, and agency partners.",
    partnerIds: ["adidas", "google", "dell", "agencies"],
    technologies: ["Unity", "AR/VR", "Interactive UX", "React"],
    links: [{ label: "View case study", href: "/projects/brand-systems", primary: true }],
    glow: "cyan",
    image: {
      src: "/career/era-software.jpg",
      alt: "Interactive brand and product experiences",
    },
    decor: "consulting",
  },
  {
    id: "2bit",
    eyebrow: "Indie studio",
    title: "2Bit Entertainment",
    body: "Founder-led indie games across eras — Planet's Core, Fish Fight, ERGnomes, and PokePocket — plus software production for major clients through agency partnerships.",
    partnerIds: [],
    partnerNotes: ["Fish Fight", "Planet's Core", "ERGnomes", "PokePocket"],
    technologies: ["Unity", "HTML5", "WebGL", "Game design"],
    links: [
      { label: "View case study", href: "/projects/2bit-entertainment", primary: true },
      { label: "Fish Fight", href: "https://fishfight.app", external: true },
    ],
    glow: "purple",
    image: {
      src: "/career/era-2bit.jpg",
      alt: "2Bit Entertainment — indie game studio",
    },
    decor: "games",
  },
  {
    id: "games-throughline",
    eyebrow: "Through-line",
    title: "Games + UX Leadership",
    body: "From arcade-era foundations through indie studio shipping and platform products — a through-line of player-centered design, technical software solutions for games, and experiences that earn attention and participation.",
    partnerIds: ["adidas", "google"],
    technologies: ["Game design", "Platform UX", "Creative direction", "Technical delivery"],
    links: [{ label: "View case study", href: "/projects/ergo-games", primary: true }],
    glow: "purple",
    image: {
      src: "/career/era-games.jpg",
      alt: "Games and interactive media career foundation",
    },
    decor: "games",
  },
];
