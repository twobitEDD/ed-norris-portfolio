import type { Profile } from "./types";

export const profile: Profile = {
  name: "Edd Norris",
  tagline: {
    primary: "Software Production Specialist",
    secondary: "UX & Software & Production",
  },
  headline: "I love building solutions, for fun and function.",
  summary:
    "Twenty years experience from Nintendo Wii credits to software leadership. I connect product vision, engineering craft, and creative production to ship tools people actually use — from climate accountability to human-centric design.",
  summaryExtended: "Twenty years",
  proofStrip: ["Iron Chef Wii", "Family Fun Football", "CO2True"],
  location: "Cottage Grove, Oregon",
  availability:
    "Seeking Opportunities — Software Leadership, Sustainable Environment Technologies, Creative Technology Solutions",
  links: [
    { label: "Email", url: "mailto:EddNorris@2bitdev.com" },
    { label: "LinkedIn", url: "https://linkedin.com/in/eddnorris" },
    { label: "GitHub", url: "https://github.com/twobitEDD" },
    { label: "2bit Entertainment", url: "https://github.com/twobitENT" },
    { label: "CO2T.earth", url: "https://co2t.earth" },
    { label: "CO2True", url: "https://co2true.com" },
    { label: "ERGO.games", url: "https://ergo.games" },
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
