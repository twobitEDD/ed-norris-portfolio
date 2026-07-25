export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  href?: string;
  gradient: string;
  caption: string;
};

export const projects: Project[] = [
  {
    id: "co2true",
    title: "CO2True Platform",
    category: "Technology",
    description:
      "End-to-end environmental platform — software architecture, e-commerce, carbon credit infrastructure, and brand identity.",
    href: "https://co2true.com",
    gradient: "linear-gradient(160deg, #1f4d2e, #3d9b6a)",
    caption: "CO2True — field to customer",
  },
  {
    id: "ergo",
    title: "ERGO.games",
    category: "Interactive",
    description:
      "Accessible browser-based game console with entitlements, catalog systems, and human-centered UX.",
    href: "https://ergo.games",
    gradient: "linear-gradient(160deg, #2a1f4d, #7c5cc7)",
    caption: "ERGO — indie game console",
  },
  {
    id: "agency",
    title: "Agency Client Work",
    category: "Marketing",
    description:
      "Contract production through Nice Touch, Uncorked, and other agencies — interactive experiences for Google, adidas, and Dell.",
    gradient: "linear-gradient(160deg, #1a3a5c, #4da4c9)",
    caption: "Google · adidas · Dell",
  },
  {
    id: "fish-fight",
    title: "Fish Fight",
    category: "Interactive",
    description:
      "Ocean conservation web game — players navigate currents, protect habitats, and rally around marine stewardship.",
    href: "https://fishfight.app",
    gradient: "linear-gradient(160deg, #0a3d5c, #2a8fc9)",
    caption: "Fish Fight — ocean stewardship",
  },
  {
    id: "co2t-brand",
    title: "CO2T Brand Identity",
    category: "Branding",
    description:
      "Bigfoot mascot, visual identity, and product UX designed from scratch for CO2T's soil additive business.",
    href: "https://co2t.earth",
    gradient: "linear-gradient(160deg, #3d2a14, #8a6548)",
    caption: "CO2T — Bigfoot from scratch",
  },
  {
    id: "pokepocket",
    title: "PokePocket",
    category: "Interactive",
    description:
      "Pocket-format collectible card experiences with tight feedback loops, social drops, and production-grade merchandising.",
    gradient: "linear-gradient(160deg, #5c1a2a, #c94d6a)",
    caption: "PokePocket — collectibles",
  },
];
