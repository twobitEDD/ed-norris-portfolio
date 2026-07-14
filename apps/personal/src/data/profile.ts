import type { Profile } from "./types";

export const profile: Profile = {
  name: "Edd Norris",
  tagline: "Systems thinker · builder · connector",
  headline: "I build useful systems that connect people, technology, and the living world.",
  summary:
    "Cross-disciplinary product and software leader working at the intersection of code, consequence, and creative systems — from carbon infrastructure to game platforms.",
  location: "Cottage Grove, Oregon",
  availability: "Open to collaboration — software leadership, environmental technology, and creative technology roles.",
  links: [
    { label: "Email", url: "mailto:hello@ednorris.com" },
    { label: "LinkedIn", url: "https://linkedin.com/in/eddnorris" },
    { label: "GitHub", url: "https://github.com/twobitEDD" },
    { label: "2Bit Entertainment", url: "https://github.com/twobitENT" },
    { label: "CO2Trust", url: "https://github.com/co2trust-org" },
  ],
  badges: [
    { label: "Software innovator", discipline: "software" },
    { label: "Systems thinker", discipline: "operations" },
    { label: "Creative technologist", discipline: "games" },
    { label: "Sustainability advocate", discipline: "environment" },
    { label: "Connector & collaborator", discipline: "marketing" },
  ],
};
