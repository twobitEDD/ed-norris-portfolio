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
      "Gameplay programming and production across licensed Wii titles, casino gambling games, and team leadership — from volunteer QA at EA Tiburon through Black Lantern Studios, Seamless Entertainment, and Rocket Gaming Systems.",
    disciplines: ["games", "software"],
    caption: "#GameDev Career",
    polaroidGradient: "linear-gradient(160deg, #4a3f6e, #1a1528)",
    detailBody: [
      "This era started with volunteer QA at EA Tiburon while finishing a software degree at Full Sail — a deliberate choice to learn how professional game studios actually ship product, not just how to write code.",
      "From Black Lantern's Iron Chef America: Supreme Cuisine (Nintendo Wii) to Seamless Entertainment's Family Fun Football (Wii) and Rocket Gaming's casino slot-machine titles, the work spanned gameplay programming, team leadership, SCRUM product management, and production under hard deadlines.",
      "The through-line: ship playable systems, document clearly, and earn trust on small teams before taking lead roles.",
    ],
    highlights: [
      "Volunteer QA at EA Tiburon — first exposure to professional game development",
      "Iron Chef America: Supreme Cuisine (Nintendo Wii) — gameplay lead at Black Lantern Studios",
      "Family Fun Football (Nintendo Wii) — credited release at Seamless Entertainment",
      "Several casino gambling games — slot titles at Rocket Gaming Systems",
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
    title: "2bit Entertainment",
    organization: "Founder · Indie games · Software production",
    summary:
      "Operational indie studio 2012–2014 that released Planet's Core as its shipped studio title, plus military simulation software at Hatalom Systems (2014), then later catalog releases — Fish Fight, ERGnomes, and PokePocket — alongside agency contracts after re-establishing in 2018. Studio on hold 2014–2018 during teaching jobs and public-service work. Re-established in 2018 as a software production business — contracting through Nice Touch, Uncorked, and other agencies for Google, Dell, Washington University, and additional clients.",
    disciplines: ["games", "marketing", "operations"],
    caption: "2bit studio",
    polaroidGradient: "linear-gradient(160deg, #6b5a8a, #2a2038)",
    detailBody: [
      "Founded 2bit Entertainment in 2012 after Rocket Gaming and released Planet's Core as the studio's shipped indie game (2012–2014) — technical design, art integration, team leadership, and business strategy on a founder's timeline.",
      "A six-month engineering engagement at Hatalom Systems (2014) applied the same game-industry craft to proprietary military simulation and game-based training software — part of 2bit's software production work after Planet's Core shipped and before the studio pause.",
      "The studio catalog grew across both phases: Planet's Core as the founder-era release; Fish Fight (fishFight.app) for ocean-conservation web play; ERGnomes.io for NFT ecosystem technical design on the Ergo Platform; and PokePocket as accessible pocket-format game experiments — shipped alongside agency-backed client work, not instead of it.",
      "Studio operations paused 2014–2018 while working teaching and mentoring jobs in Portland. The brand stayed alive; the honest gap is part of the story, not a footnote.",
      "Re-established in April 2018 as a software production business, delivering contract work through agency partnerships — Nice Touch, Uncorked, Fresh, Opus — for clients including Google, Dell, Washington University, and continued adidas support after the full-time Future Team role concluded.",
    ],
    highlights: [
      "Planet's Core — released as 2bit Entertainment's shipped studio game (2012–2014)",
      "Hatalom Systems — military simulation software under 2bit software production (2014)",
      "Fish Fight — ocean conservation web game at fishFight.app",
      "ERGnomes.io — NFT ecosystem technical design on Ergo Platform",
      "PokePocket — pocket-format casual game experiments",
      "2018 re-launch as agency-backed software production studio",
      "Unity, AR/VR, and rapid prototyping for major brand clients",
    ],
    employers: [
      "2bit Entertainment",
      "Hatalom Systems",
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
      { label: "Fish Fight", href: "https://fishfight.app", external: true },
      { label: "ERGnomes", href: "/projects/ergnomes" },
      { label: "PokePocket", href: "https://pokepocket.cards", external: true },
      { label: "2bit Entertainment", href: "/projects/2bit-entertainment" },
      { label: "Creative work", href: "/work#creative" },
    ],
  },
  {
    id: "era-education",
    period: "2014–2018",
    title: "Teaching years — public service",
    organization: "Portland Public Schools · Innovation Academy PDX · iD Tech Camps",
    summary:
      "Teaching and mentoring jobs — special education educator at Portland Public Schools, afterschool club mentor at Innovation Academy PDX, and summer instructor at iD Tech Camps — while 2bit studio operations were on hold (2014–2018).",
    disciplines: ["operations"],
    caption: "Teaching years",
    polaroidGradient: "linear-gradient(160deg, #6a5a4a, #2a2218)",
    detailBody: [
      "While 2bit studio operations were on hold, this period was deliberate employment — not a career gap. A special education educator role at Portland Public Schools shaped a lasting interest in accessible technology and inclusive design.",
      "Volunteer mentoring at Innovation Academy PDX ran an afterschool game-development club, teaching software development and design principles to high school students alongside classroom support.",
      "Summer employment at iD Tech Camps (Lewis & Clark College) combined paid game-development instruction with the same ethos: meet learners where they are, build confidence through making, and show that creative technology is for everyone.",
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
      "As VP of Operations at CO2T.earth (founded 2024), personally led comprehensive software architecture, product design, and brand design for the Soil Additive Business — including Bigfoot character designs and overall visual identity from scratch.",
      "Built industry-leading e-commerce and product sales software from the ground up, integrating biochar and carbon capture product sales into CO2T's environmental impact tracking system — infrastructure used for carbon credit issuance and traceability at CO2T.earth and CO2True.com.",
    ],
    highlights: [
      "Software engineer at Oregon Institute for a Better Way (2022–2024)",
      "VP Operations at CO2T.earth — architecture, product, brand, and ops (2024–Present)",
      "Bigfoot mascot and brand design — built from scratch",
      "E-commerce and impact tracking integrated for carbon credit issuance",
      "CO2True.com accreditation and greenhouse-gas reduction action planning",
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
      { label: "CO2True.com", href: "https://co2true.com", external: true },
    ],
  },
  {
    id: "era-advisory",
    period: "2024–Present",
    title: "Technology advisory",
    organization: "Independent consulting",
    summary:
      "Cross-disciplinary advisory on modern and ancient technologies — connecting environmental systems, creative software, legacy infrastructure, and human-centered product practice into practical guidance for teams and founders.",
    disciplines: ["software", "operations"],
    caption: "Advisory work",
    polaroidGradient: "linear-gradient(160deg, #5c4a8a, #1e1830)",
    detailBody: [
      "Advisory work sits at the intersection of disciplines built over two decades — game-industry shipping discipline, enterprise interactive development, environmental technology operations, and indie product storytelling.",
      "Engagements focus on modern stacks (web platforms, data systems, interactive product) and ancient technologies alike — legacy codebases, archival systems, and long-lived infrastructure that still needs thoughtful stewardship.",
      "The goal is practical: help teams understand what they have, what to build next, and how to make complex systems learnable for the people who depend on them — active alongside CO2T operations leadership and 2bit studio work.",
    ],
    highlights: [
      "Cross-disciplinary technology advisory — modern and legacy systems",
      "Environmental, creative, and software practice in one consulting lens",
      "Human-centered product and operations guidance for founders and teams",
      "Bridging game-industry UX discipline with enterprise and field operations",
      "Active alongside CO2T VP Operations and 2bit studio engagements",
    ],
    employers: ["Independent consulting", "2bit Entertainment"],
    technologies: [
      "Product strategy",
      "Legacy systems",
      "Web platforms",
      "Interactive design",
      "Operations",
    ],
    relatedLinks: [
      { label: "Creative work", href: "/work#creative" },
      { label: "Environmental work", href: "/work#environmental" },
    ],
  },
];
