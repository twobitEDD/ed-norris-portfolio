import type { Discipline } from "./types";

export type TimelineEra = {
  id: string;
  period: string;
  title: string;
  organization: string;
  summary: string;
  disciplines: Discipline[];
  polaroidGradient?: string;
};

/** Narrative eras for the physical timeline paper (matches reference art structure). */
export const timelineEras: TimelineEra[] = [
  {
    id: "era-games",
    period: "2005–2012",
    title: "Game industry foundation",
    organization: "EA · Black Lantern · Seamless · Rocket Gaming",
    summary:
      "Gameplay programming and production across licensed titles, slot systems, and team leadership — from volunteer QA at EA Tiburon to lead programmer roles.",
    disciplines: ["games", "software"],
    polaroidGradient: "linear-gradient(160deg, #4a3f6e, #1a1528)",
  },
  {
    id: "era-2bit",
    period: "2012–2018",
    title: "2Bit Entertainment",
    organization: "Founder & creative technologist",
    summary:
      "Founded 2bit Entertainment. Built games, interactive products, micro-manufacturing experiments, and community work including Innovation Academy mentoring and special education support.",
    disciplines: ["games", "marketing", "operations"],
    polaroidGradient: "linear-gradient(160deg, #6b5a8a, #2a2038)",
  },
  {
    id: "era-software",
    period: "2017–2023",
    title: "Software + marketing systems",
    organization: "adidas · Fresh · Opus · Nice Touch · TrustlessTeam · ERGnomes",
    summary:
      "Contract and senior interactive development for major brands and agencies — AR/VR, Unity, rapid prototyping, blockchain gaming, and product storytelling.",
    disciplines: ["software", "marketing", "games"],
    polaroidGradient: "linear-gradient(160deg, #3d6a8a, #152535)",
  },
  {
    id: "era-environment",
    period: "2022–Present",
    title: "CO2T / biochar / carbon infrastructure",
    organization: "Oregon Institute for a Better Way · CO2T.earth",
    summary:
      "Software, operations, and product leadership for agriculture, carbon traceability, field operations, and sustainability communication.",
    disciplines: ["environment", "software", "operations", "data"],
    polaroidGradient: "linear-gradient(160deg, #4a6b42, #1a2e18)",
  },
  {
    id: "era-ergo",
    period: "2024–Present",
    title: "ERGO.games & advisory work",
    organization: "ERGO.games platform",
    summary:
      "Human-centered game platforms and cross-disciplinary advisory — packaging environmental, software, and creative experience into employment-ready proof.",
    disciplines: ["games", "software"],
    polaroidGradient: "linear-gradient(160deg, #5c4a8a, #1e1830)",
  },
];
