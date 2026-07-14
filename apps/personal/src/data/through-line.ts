/** Through-line thesis and guided story copy for the living work map. */

export const throughLineThesis =
  "I've worked across many areas of software, always anchored in user experience and human-centered design — from special education classrooms to environmental tech, indie game loops to marketing and product work with major brands like adidas and Google. The through-line is simple: use these skills for good, and help humans thrive.";

export type StoryStop = {
  nodeId: string;
  headline: string;
  copy: string;
};

/** Guided narrative: education → games → software → marketing → product → production → present. */
export const storyStops: StoryStop[] = [
  {
    nodeId: "theme-education",
    headline: "Education & special education",
    copy:
      "Full Sail University software degree, Portland Public Schools special education educator role, Innovation Academy afterschool club mentoring, and iD Tech Camps summer instruction — human-centered design started here: patience, clear structure, and feedback loops that help every student thrive.",
  },
  {
    nodeId: "exp-node-ea",
    headline: "Inside the game industry",
    copy:
      "Volunteer QA at EA Tiburon during college — first look at how professional teams ship interactive products people actually want to use.",
  },
  {
    nodeId: "theme-games",
    headline: "Human-centered game design",
    copy:
      "Gameplay programming at Seamless, Black Lantern, and Rocket Gaming — then founding 2bit Entertainment and shipping indie game Planet's Core (2012–2014). Reopened 2018 as a software production business with the same obsession for tight feedback loops, intuitive UX, and shipping under pressure.",
  },
  {
    nodeId: "theme-software",
    headline: "UX & human-centric design",
    copy:
      "From slot math databases and SCRUM at Rocket to Unity prototypes at adidas and agency builds — engineering became how ideas became reliable, usable systems centered on real people.",
  },
  {
    nodeId: "exp-node-adidas",
    headline: "Major brands: adidas",
    copy:
      "adidas Future Team — full-time employee building consumer experiences, hardware research, and rapid prototypes where marketing narrative and working software had to ship together. New management requested 2bit continue as external partner — the restart of the software production business.",
  },
  {
    nodeId: "project-planets-core",
    headline: "Planet's Core — indie game shipped",
    copy:
      "Operational 2bit studio era (2012–2014): founder-led indie game development — technical design, art integration, and shipping Planet's Core before the studio pause and 2018 restart.",
  },
  {
    nodeId: "company-2bit",
    headline: "Studio, pause, restart",
    copy:
      "2bit Entertainment: operational indie studio building Planet's Core (2012–2014), then reopened 2018 as a software production business — contracting through Nice Touch, Uncorked, and other agencies for Google, Dell, Washington University, and smaller brands.",
  },
  {
    nodeId: "theme-marketing",
    headline: "Marketing & product at major brands",
    copy:
      "Uncorked (Google via Uncorked — not direct employment), Fresh, Opus, Nice Touch (Dell, Washington University via Nice Touch), TrustlessTeam, and ERGnomes agency work — studying how major brands connect marketing, product development, and adoption funnels that help people discover and stick with a product.",
  },
  {
    nodeId: "theme-product",
    headline: "Product leadership",
    copy:
      "SCRUM product management at Rocket, studio strategy at 2bit, technical design at ERGnomes and TrustlessTeam — owning what ships, for whom, and why it matters for the humans using it.",
  },
  {
    nodeId: "theme-production",
    headline: "Production & operations",
    copy:
      "Classroom operations, studio management, field logistics at CO2T — the unglamorous systems that keep creative and environmental work actually happening.",
  },
  {
    nodeId: "company-co2t",
    headline: "Environmental tech for humanity",
    copy:
      "Oregon Institute for a Better Way (Sep 2022–Apr 2024), then VP Operations at CO2T.earth (Mar 2024–present). CO2T founded 2024 — environmental tech in any form for making earth the best place for humanity: carbon, biochar, and marketplace platforms where software, field ops, and sustainability programs meet.",
  },
  {
    nodeId: "project-ergo",
    headline: "Human-centered platforms",
    copy:
      "ERGO.games brings the arc full circle: comfortable, human-centered platforms and indie catalog systems — the same obsession with making complex things feel worth people's time.",
  },
  {
    nodeId: "person-ed",
    headline: "Using skills for human thriving",
    copy:
      "Education, games, UX, marketing, product, environmental tech — not separate careers, one through-line. Use these powers for good, and help humans thrive.",
  },
];

export const themeFilterOptions = [
  { id: "all", label: "All", themeId: null as string | null },
  { id: "education", label: "Education & Special Ed", themeId: "theme-education" },
  { id: "games", label: "Games & UX", themeId: "theme-games" },
  { id: "software", label: "UX & Design", themeId: "theme-software" },
  { id: "marketing", label: "Marketing & Brands", themeId: "theme-marketing" },
  { id: "product", label: "Product", themeId: "theme-product" },
  { id: "production", label: "Production", themeId: "theme-production" },
] as const;
