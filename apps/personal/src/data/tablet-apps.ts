import { projects } from "./projects";

export type TabletAppId = "ergo" | "co2t" | "fishfight" | "microbe";

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
};

const ergo = projects.find((p) => p.slug === "ergo-games");
const co2t = projects.find((p) => p.slug === "co2t-platform");

export const tabletApps: TabletApp[] = [
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
  },
  {
    id: "co2t",
    name: "CO2T",
    domain: "co2true.earth",
    tagline: "Environmental platform",
    description:
      co2t?.summary ??
      "Integrated software for biochar, agriculture, carbon tracking, and field operations — traceability from soil to customer at CO2T.earth.",
    href: "https://co2t.earth",
    iconBg: "linear-gradient(145deg, #0d2818 0%, #1a5c3a 50%, #3d9b6a 100%)",
    iconAccent: "#7ee8a8",
    imageSrc: "/brands/co2t/co2t-mascot-welcome.png",
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
  },
];
