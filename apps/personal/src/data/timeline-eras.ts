import type { Discipline } from "./types";

export type EraRelatedLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type TimelineEra = {
  id: string;
  period: string;
  title: string;
  organization: string;
  summary: string;
  disciplines: Discipline[];
  /** Handwritten polaroid caption — short label on the white strip. */
  caption: string;
  polaroidGradient?: string;
  /** Expanded narrative — 2–4 paragraphs for the era modal. */
  detailBody: string[];
  /** Key accomplishments or themes for bullet list. */
  highlights: string[];
  /** Employers, clients, or institutions during this era. */
  employers: string[];
  /** Notable technologies, tools, or platforms. */
  technologies: string[];
  /** Optional links to work sections, case studies, or live products. */
  relatedLinks: EraRelatedLink[];
};

/** Narrative eras for the physical timeline paper (matches reference art structure). */
export const timelineEras: TimelineEra[] = [
  {
    id: "era-games",
    period: "2005–2012",
    title: "Game industry foundation",
    organization: "EA · Black Lantern · Seamless · Rocket Gaming",
    summary:
      "Gameplay programming and production across licensed titles, slot systems, and team leadership — from volunteer QA at EA Tiburon through independent transition work (2006–2007) to lead programmer roles.",
    disciplines: ["games", "software"],
    caption: "EA & indie days",
    polaroidGradient: "linear-gradient(160deg, #4a3f6e, #1a1528)",
    detailBody: [
      "This era started with volunteer QA at EA Tiburon while finishing a software degree at Full Sail — a deliberate choice to learn how professional game studios actually ship product, not just how to write code.",
      "From Black Lantern's licensed-title crunch to Seamless Entertainment's Family Fun Football (Wii) reboot and Rocket Gaming's slot-machine math pipelines, the work spanned gameplay programming, team leadership, SCRUM product management, and production under hard deadlines.",
      "Brief independent stretches (2006–2007 and late 2009) bridged employer transitions and kept portfolio work moving. The through-line: ship playable systems, document clearly, and earn trust on small teams before taking lead roles.",
    ],
    highlights: [
      "Volunteer QA at EA Tiburon — first exposure to professional game development",
      "Gameplay lead at Black Lantern Studios on licensed titles with strict publisher deadlines",
      "Family Fun Football (Wii) gameplay programming and art integration at Seamless",
      "Intermediate engineer at Rocket Gaming — slot titles, SCRUM, and game-math database work",
      "Independent transition projects while completing Full Sail coursework",
    ],
    employers: [
      "EA Tiburon",
      "Black Lantern Studios",
      "Seamless Entertainment",
      "Rocket Gaming Systems",
    ],
    technologies: ["C#", "Wii SDK", "Gameplay programming", "SCRUM", "Game math", "QA pipelines"],
    relatedLinks: [{ label: "Games work", href: "/work#games" }],
  },
  {
    id: "era-2bit",
    period: "2012–2014 · 2018–Present",
    title: "2Bit Entertainment",
    organization: "Founder · Software production business",
    summary:
      "Operational studio 2012–2014 building indie game Planet's Core. Studio on hold 2014–2018 during education and public-service work. Re-established in 2018 as a software production business — contracting through Nice Touch, Uncorked, and other agencies for Google, Dell, Washington University, and additional clients.",
    disciplines: ["games", "marketing", "operations"],
    caption: "2bit studio",
    polaroidGradient: "linear-gradient(160deg, #6b5a8a, #2a2038)",
    detailBody: [
      "Founded 2bit Entertainment in 2012 after Rocket Gaming, shipping Planet's Core as an indie studio — technical design, art integration, team leadership, and business strategy on a founder's timeline.",
      "Studio operations paused 2014–2018 while focusing on public education and community mentoring. The brand stayed alive; the honest gap is part of the story, not a footnote.",
      "Re-established in April 2018 as a software production business, delivering contract work through agency partnerships — Nice Touch, Uncorked, Fresh, Opus — for clients including Google, Dell, Washington University, and continued adidas support after the full-time Future Team role concluded.",
    ],
    highlights: [
      "Founded indie studio and shipped Planet's Core (2012–2014)",
      "Transparent studio pause during education and public-service years",
      "2018 re-launch as agency-backed software production studio",
      "Unity, AR/VR, and rapid prototyping for major brand clients",
      "Continued adidas contract engagement after full-time role ended",
    ],
    employers: [
      "2bit Entertainment",
      "Nice Touch",
      "Uncorked Studios",
      "Fresh Consulting",
      "Opus Creative Group",
      "Google",
      "Dell",
      "Washington University",
    ],
    technologies: ["Unity", "AR/VR", "Rapid prototyping", "Interactive design", "C#", "WebGL"],
    relatedLinks: [
      { label: "Planet's Core", href: "/projects/planets-core" },
      { label: "2bit Entertainment", href: "/projects/2bit-entertainment" },
      { label: "Creative work", href: "/work#creative" },
    ],
  },
  {
    id: "era-education",
    period: "2014–2018",
    title: "Education & public service",
    organization: "Portland Public Schools · Innovation Academy · iD Tech",
    summary:
      "Special education support, afterschool mentoring, and summer STEM instruction while 2bit studio operations were on hold — deliberate community and inclusive-learning work before the 2018 studio re-launch and adidas Future Team role.",
    disciplines: ["operations"],
    caption: "Teaching years",
    polaroidGradient: "linear-gradient(160deg, #6a5a4a, #2a2218)",
    detailBody: [
      "While 2bit studio operations were on hold, this period was deliberate community work — not a career gap. Special education support at Portland Public Schools shaped a lasting interest in accessible technology and inclusive design.",
      "Volunteer mentoring at Innovation Academy PDX ran an afterschool game-development club, teaching software development and design principles to high school students alongside classroom support.",
      "Summer instruction at iD Tech Camps (Lewis & Clark College) combined paid STEM education with the same ethos: meet learners where they are, build confidence through making, and show that creative technology is for everyone.",
    ],
    highlights: [
      "Special education educator at Portland Public Schools (2014–2017)",
      "Afterschool game-development club mentor at Innovation Academy PDX",
      "Summer game-development instructor at iD Tech Camps",
      "Inclusive learning and accessible technology practice",
      "Parallel to adidas Future Team role (2017–2018)",
    ],
    employers: [
      "Portland Public Schools",
      "Innovation Academy PDX",
      "iD Tech Camps",
    ],
    technologies: [
      "Game development instruction",
      "STEM curriculum",
      "Mentoring",
      "Inclusive design",
    ],
    relatedLinks: [],
  },
  {
    id: "era-software",
    period: "2017–2023",
    title: "Software + marketing systems",
    organization:
      "adidas · Google · Dell · Uncorked · Fresh · Opus · Nice Touch · TrustlessTeam · ERGnomes",
    summary:
      "Full-time adidas Future Team work plus agency-backed 2bit contracts — AR/VR, Unity, rapid prototyping, blockchain gaming, and product storytelling for public clients including Google, Dell, and Washington University.",
    disciplines: ["software", "marketing", "games"],
    caption: "Adidas days",
    polaroidGradient: "linear-gradient(160deg, #3d6a8a, #152535)",
    detailBody: [
      "Full-time work on adidas's Future Team (Basketball Business Unit) centered on consumer experiences, rapid prototyping, hardware research, and product-release event support — then transitioned to a contract engagement via 2bit when new leadership requested continued support.",
      "Agency-backed 2bit contracts through Nice Touch, Uncorked, Fresh, and Opus delivered interactive development, brand campaigns, and product storytelling for enterprise clients including Google, Dell, and Washington University.",
      "Frontier experiments in blockchain gaming — TrustlessTeam DAO co-founder and ERGnomes.io technical design — explored decentralized entertainment at the intersection of art production, front-end, back-end, and trustworthy community interactions on the Ergo Platform.",
    ],
    highlights: [
      "adidas Future Team — consumer experiences and rapid prototyping (2017–2018)",
      "Continued adidas contract via 2bit after full-time role",
      "Senior interactive developer contracts via Nice Touch, Uncorked, Fresh, Opus",
      "TrustlessTeam DAO — frontier blockchain gaming (2021–2023)",
      "ERGnomes.io — NFT ecosystem technical design on Ergo Platform",
    ],
    employers: [
      "adidas — Future Team",
      "Google",
      "Dell",
      "Washington University",
      "Nice Touch",
      "Uncorked Studios",
      "Fresh Consulting",
      "Opus Creative Group",
      "TrustlessTeam DAO",
      "ERGnomes.io",
    ],
    technologies: [
      "Unity",
      "AR/VR",
      "Rapid prototyping",
      "UX research",
      "Blockchain",
      "Interactive marketing",
      "Hardware research",
    ],
    relatedLinks: [
      { label: "Creative work", href: "/work#creative" },
      { label: "Brand systems", href: "/projects/brand-systems" },
      { label: "Web platforms", href: "/projects/web-platforms" },
    ],
  },
  {
    id: "era-environment",
    period: "2022–Present",
    title: "CO2T / biochar / carbon infrastructure",
    organization: "Oregon Institute for a Better Way · CO2T.earth",
    summary:
      "Oregon Institute for a Better Way (2022–2024), then VP Operations at CO2T.earth (founded 2024) — software, operations, and product leadership for agriculture, carbon traceability, field operations, and sustainability communication.",
    disciplines: ["environment", "software", "operations", "data"],
    caption: "CO2T era",
    polaroidGradient: "linear-gradient(160deg, #4a6b42, #1a2e18)",
    detailBody: [
      "At Oregon Institute for a Better Way (2022–2024), built software and automation tools to streamline operations and support data-informed decision-making for environmental programs — the bridge between field work and digital infrastructure.",
      "As VP of Operations at CO2T.earth (founded 2024), lead strategic operations across carbon, biochar, and marketplace platforms — connecting software, blockchain traceability, field operations, and business management for agriculture clients.",
      "The work spans accreditation and action planning (CO2True), biochar programs, soil stewardship communication, and the operational systems that keep sustainability work actually happening in the field.",
    ],
    highlights: [
      "Software engineer at Oregon Institute for a Better Way (2022–2024)",
      "VP Operations at CO2T.earth — carbon and biochar platforms (2024–Present)",
      "CO2True accreditation and greenhouse-gas reduction action planning",
      "Field operations, traceability, and sustainability communication",
      "Built from Nature. Backed by Science. — product storytelling",
    ],
    employers: [
      "Oregon Institute for a Better Way",
      "CO2T.earth",
      "CO2True",
    ],
    technologies: [
      "TypeScript",
      "React",
      "BigQuery",
      "Traceability",
      "Blockchain",
      "Field operations",
      "Automation",
    ],
    relatedLinks: [
      { label: "Environmental work", href: "/work#environmental" },
      { label: "CO2T platform", href: "/projects/co2t-platform" },
      { label: "Carbon tracking", href: "/projects/carbon-tracking" },
      { label: "CO2T.earth", href: "https://co2t.earth", external: true },
    ],
  },
  {
    id: "era-ergo",
    period: "2024–Present",
    title: "ERGO.games & advisory work",
    organization: "ERGO.games platform",
    summary:
      "Human-centered game platforms and cross-disciplinary advisory — packaging environmental, software, and creative experience into employment-ready proof.",
    disciplines: ["games", "software"],
    caption: "ERGO era",
    polaroidGradient: "linear-gradient(160deg, #5c4a8a, #1e1830)",
    detailBody: [
      "ERGO.games is an online gaming hub built around a simple promise: games for everyone, always easy to play, never easy to win. Ergonomic gaming — accessible entry, meaningful depth.",
      "The platform packages indie catalog work, web-game delivery, and human-centered design principles into a coherent product story that connects game-industry roots with current software practice.",
      "Advisory work alongside ERGO ties together environmental systems, creative technology, and product storytelling — cross-disciplinary proof that the career arc is one through-line, not six separate careers.",
    ],
    highlights: [
      "ERGO.games platform — indie catalog and web-game hub",
      "Human-centered game design — accessible entry, meaningful depth",
      "Cross-disciplinary advisory across environmental and creative technology",
      "Packaging career proof for employment-ready storytelling",
      "Active development alongside CO2T operations leadership",
    ],
    employers: ["ERGO.games", "2bit Entertainment"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Web games", "Platform design"],
    relatedLinks: [
      { label: "ERGO.games", href: "https://ergo.games", external: true },
      { label: "ERGO project", href: "/projects/ergo-games" },
      { label: "Games work", href: "/work#games" },
    ],
  },
];
