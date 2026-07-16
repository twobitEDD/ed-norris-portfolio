import { projects } from "./projects";

export type TabletAppId =
  | "environmental"
  | "creative"
  | "ergo"
  | "co2t"
  | "fishfight"
  | "microbe"
  | "work"
  | "work-map"
  | "work-history"
  | "reach";

export type TabletApp = {
  id: TabletAppId;
  name: string;
  domain: string;
  tagline: string;
  description: string;
  href?: string;
  iconBg: string;
  iconAccent: string;
  /** CSS gradient or image path for icon tile */
  iconStyle?: string;
  imageSrc?: string;
  isGame?: boolean;
  /** Opens inside the studio device instead of a modal or external link */
  inDevice?: boolean;
  /** Portfolio project slug for richer in-device showcase content */
  projectSlug?: string;
  /** Springboard grouping label */
  category?: "practice" | "projects" | "studio";
};

const ergo = projects.find((p) => p.slug === "ergo-games");
const co2t = projects.find((p) => p.slug === "co2t-platform");

/** Springboard page order — practice paths first, then shipped projects, then studio tools. */
export const tabletAppCategories = [
  { id: "practice" as const, label: "Practice" },
  { id: "projects" as const, label: "Projects" },
  { id: "studio" as const, label: "Studio" },
];

export const tabletApps: TabletApp[] = [
  {
    id: "environmental",
    name: "Environmental",
    domain: "Practice",
    tagline: "Built from Nature. Backed by Science.",
    description:
      "CO2T.earth biochar, soil stewardship, carbon reporting, and field operations — environmental systems with auditable impact.",
    iconBg: "linear-gradient(145deg, #0a2818 0%, #1a5c3a 45%, #3d9b6a 100%)",
    iconAccent: "#7ee8a8",
    imageSrc: "/brands/co2t/co2t-mascot-welcome.png",
    inDevice: true,
    category: "practice",
  },
  {
    id: "creative",
    name: "Creative",
    domain: "Practice",
    tagline: "Games & interactive media",
    description:
      "Game platforms, web experiences, identity systems, and marketing tools built to earn attention and create participation.",
    iconBg: "linear-gradient(145deg, #1a1035 0%, #4a2d8a 55%, #8c5cc7 100%)",
    iconAccent: "#c9a0ff",
    imageSrc: "/assets/practice-creative-bg.webp",
    inDevice: true,
    category: "practice",
  },
  {
    id: "work",
    name: "Work",
    domain: "Portfolio",
    tagline: "Real problems solved",
    description:
      "Highlights from environmental systems, game platforms, and infrastructure — swipe through selected work or open the full portfolio.",
    iconBg: "linear-gradient(145deg, #1a1f2e 0%, #2d4a6a 50%, #4a90c2 100%)",
    iconAccent: "#9ecfff",
    inDevice: true,
    category: "practice",
  },
  {
    id: "ergo",
    name: "ERGO",
    domain: "ergo.games",
    tagline: "Accessible indie games",
    description:
      ergo?.summary ??
      "An accessible browser-based console for independent web games — entitlements, catalog systems, and human-centered UX for players and creators.",
    href: "https://ergo.games",
    iconBg: "linear-gradient(145deg, #1a1035 0%, #4a2d8a 55%, #8c5cc7 100%)",
    iconAccent: "#c9a0ff",
    inDevice: true,
    projectSlug: "ergo-games",
    category: "projects",
  },
  {
    id: "co2t",
    name: "CO2T",
    domain: "co2true.com",
    tagline: "Environmental platform",
    description:
      co2t?.summary ??
      "Software architecture, Bigfoot brand design, e-commerce, and environmental impact tracking — integrated for carbon credit issuance at CO2T.earth.",
    href: "https://co2t.earth",
    iconBg: "linear-gradient(145deg, #0d2818 0%, #1a5c3a 50%, #3d9b6a 100%)",
    iconAccent: "#7ee8a8",
    imageSrc: "/brands/co2t/co2t-mascot-welcome.png",
    inDevice: true,
    projectSlug: "co2t-platform",
    category: "projects",
  },
  {
    id: "fishfight",
    name: "Fish Fight",
    domain: "fishFight.app",
    tagline: "Ocean conservation game",
    description:
      "A playful ocean conservation experience — navigate currents, protect habitats, and rally players around real-world marine stewardship through accessible web gameplay.",
    href: "https://fishfight.app",
    iconBg: "linear-gradient(145deg, #0a1a2e 0%, #1a4a7a 45%, #2d8fd4 100%)",
    iconAccent: "#7ec8ff",
    inDevice: true,
    projectSlug: "fish-fight",
    category: "projects",
  },
  {
    id: "microbe",
    name: "Microbe Explorer",
    domain: "Studio game",
    tagline: "Water & microbes maze",
    description:
      "Swim an infinite procedural maze as a tiny explorer — collect water droplets and colorful microbes across an endless aquatic world. Built for the studio desk, playable fullscreen.",
    iconBg: "linear-gradient(145deg, #050812 0%, #0d1a3a 50%, #1a3a6c 100%)",
    iconAccent: "#3b9eff",
    isGame: true,
    category: "projects",
  },
  {
    id: "work-map",
    name: "Work Map",
    domain: "Career graph",
    tagline: "Employment overview",
    description:
      "Major employers and roles across one career arc — tap any node to unfold projects, clients, and connections.",
    iconBg: "linear-gradient(145deg, #1a0f2e 0%, #4a2d6a 50%, #8c5cc7 100%)",
    iconAccent: "#d4b0ff",
    inDevice: true,
    category: "studio",
  },
  {
    id: "work-history",
    name: "Work History",
    domain: "Career timeline",
    tagline: "Eras & decisions",
    description:
      "A career told as connected decisions — explore eras, disciplines, and the through-line from early work to present.",
    iconBg: "linear-gradient(145deg, #3d3428 0%, #6b5a42 45%, #c9b896 100%)",
    iconAccent: "#f0e4cc",
    inDevice: true,
    category: "studio",
  },
  {
    id: "reach",
    name: "Contact Me",
    domain: "Contact",
    tagline: "Get in touch",
    description:
      "Email, schedule a chat, connect on LinkedIn, or leave a message — the same contact portal from the studio desk.",
    iconBg: "linear-gradient(145deg, #2a2820 0%, #5c5648 50%, #c9b896 100%)",
    iconAccent: "#f0e4cc",
    inDevice: true,
    category: "studio",
  },
];
