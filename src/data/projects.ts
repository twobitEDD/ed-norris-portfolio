export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  href?: string;
  gradient: string;
  caption: string;
};

/** Featured work — polaroid strip (concept 04) */
export const featuredProjects: Project[] = [
  {
    id: "co2true",
    title: "CO2True Platform",
    category: "Technology",
    description:
      "End-to-end environmental platform — software, e-commerce, carbon infrastructure, and brand identity.",
    href: "https://co2true.com",
    gradient: "linear-gradient(160deg, #1f4d2e, #3d9b6a)",
    caption: "Environmental intelligence platform",
  },
  {
    id: "ergo",
    title: "ERGO.games",
    category: "Interactive",
    description:
      "Accessible browser game console with entitlements, catalog systems, and human-centered UX.",
    href: "https://ergo.games",
    gradient: "linear-gradient(160deg, #2a1f4d, #7c5cc7)",
    caption: "Console experience design",
  },
  {
    id: "co2t-brand",
    title: "CO2T Brand Identity",
    category: "Branding",
    description:
      "Bigfoot mascot, visual identity, and product UX designed from scratch for CO2T's carbon business.",
    href: "https://co2t.earth",
    gradient: "linear-gradient(160deg, #3d2a14, #8a6548)",
    caption: "Brand identity & mascot system",
  },
];

export const projects: Project[] = [
  ...featuredProjects,
  {
    id: "agency",
    title: "Agency Client Work",
    category: "Marketing",
    description:
      "Contract production for Google, adidas, and Dell through Nice Touch, Uncorked, and other agencies.",
    gradient: "linear-gradient(160deg, #1a3a5c, #4da4c9)",
    caption: "Google · adidas · Dell",
  },
  {
    id: "fish-fight",
    title: "Fish Fight",
    category: "Interactive",
    description:
      "Ocean conservation web game — accessible mechanics and marine stewardship storytelling.",
    href: "https://fishfight.app",
    gradient: "linear-gradient(160deg, #0a3d5c, #2a8fc9)",
    caption: "Ocean stewardship game",
  },
];
