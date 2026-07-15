/** Through-line thesis and guided story copy for the living work map. */

export const throughLineThesis =
  "I've worked across many areas of software, always anchored in user experience and human-centered design — from public education classrooms to environmental technology, indie game development to marketing and product work with major brands like adidas and Google. The through-line is consistent: apply these skills thoughtfully, and help people thrive.";

export type StoryStop = {
  nodeId: string;
  headline: string;
  copy: string;
};

/** Guided narrative: education → games → software → marketing → product → production → present. */
export const storyStops: StoryStop[] = [
  {
    nodeId: "theme-education",
    headline: "Education & inclusive learning",
    copy:
      "Full Sail University software degree, Portland Public Schools classroom support for students with diverse learning needs, Innovation Academy afterschool mentoring, and iD Tech Camps summer instruction — human-centered design started here: patience, clear structure, and feedback loops that help every student succeed.",
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
      "Credited Wii releases — Iron Chef America: Supreme Cuisine at Black Lantern Studios and Family Fun Football at Seamless Entertainment — plus several casino gambling titles at Rocket Gaming Systems. Founded 2bit Entertainment and shipped Planet's Core (2012–2014), Fish Fight, ERGnomes, and PokePocket. Re-established the studio in 2018 as a software production business with the same focus on tight feedback loops, intuitive UX, and shipping under pressure.",
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
      "adidas Future Team — full-time role building consumer experiences, hardware research, and rapid prototypes where marketing narrative and working software had to ship together. When new leadership requested continued support, the relationship continued through a contract engagement via 2bit.",
  },
  {
    nodeId: "project-planets-core",
    headline: "Planet's Core — indie game shipped",
    copy:
      "Founder-era 2bit studio (2012–2014): technical design, art integration, and shipping Planet's Core before the studio paused and re-emerged in 2018.",
  },
  {
    nodeId: "company-2bit",
    headline: "Two phases, one studio",
    copy:
      "2bit Entertainment: operational indie studio shipping Planet's Core, Fish Fight, ERGnomes, and PokePocket (2012–2014 founder era and 2018–present catalog), then re-established in 2018 as a software production business — contracting through Nice Touch, Uncorked, and other agencies for Google, Dell, Washington University, and smaller brands.",
  },
  {
    nodeId: "theme-marketing",
    headline: "Marketing & product at major brands",
    copy:
      "Uncorked (Google via agency partnership — not direct employment), Fresh, Opus, Nice Touch (Dell and Washington University via Nice Touch), TrustlessTeam, and ERGnomes — studying how major brands connect marketing, product development, and adoption funnels that help people discover and stay with a product.",
  },
  {
    nodeId: "theme-product",
    headline: "Product leadership",
    copy:
      "SCRUM product management at Rocket, studio strategy at 2bit, technical design at ERGnomes and TrustlessTeam — owning what ships, for whom, and why it matters for the people using it.",
  },
  {
    nodeId: "theme-production",
    headline: "Production & operations",
    copy:
      "Classroom operations, studio management, field logistics at CO2T — the operational systems that keep creative and environmental work moving forward.",
  },
  {
    nodeId: "company-co2t",
    headline: "Environmental technology",
    copy:
      "Oregon Institute for a Better Way (Sep 2022–Apr 2024), then VP Operations at CO2T.earth (Mar 2024–present). CO2T founded 2024 — carbon, biochar, and marketplace platforms where software, field operations, and sustainability programs meet.",
  },
  {
    nodeId: "project-ergo",
    headline: "Human-centered platforms",
    copy:
      "ERGO.games brings the arc full circle: accessible, human-centered platforms and indie catalog systems — the same commitment to making complex things feel worth people's time.",
  },
  {
    nodeId: "person-ed",
    headline: "Skills in service of meaningful work",
    copy:
      "Education, games, UX, marketing, product, environmental technology — not separate careers, one through-line. Apply these skills thoughtfully, and help people thrive.",
  },
];

export const themeFilterOptions = [
  { id: "all", label: "All", themeId: null as string | null },
  { id: "education", label: "Education & Inclusive Learning", themeId: "theme-education" },
  { id: "games", label: "Games & UX", themeId: "theme-games" },
  { id: "software", label: "UX & Design", themeId: "theme-software" },
  { id: "marketing", label: "Marketing & Brands", themeId: "theme-marketing" },
  { id: "product", label: "Product", themeId: "theme-product" },
  { id: "production", label: "Production", themeId: "theme-production" },
] as const;
