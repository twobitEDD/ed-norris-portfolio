export const site = {
  name: "2bitENT",
  fullName: "2bit Entertainment",
  domain: "https://2bitent.com",
  email: "admin@2bitent.com",
  tagline: "Built from Nature. Backed by Science.",
  secondaryTagline: "More effective hours. Same team.",
  headline: "Advance responsibly.",
  headlineAccent: "Prove your impact.",
  subheadline:
    "We advise teams on environmental impact — carbon accountability, traceability, and transparent reporting — so you can grow with evidence stakeholders can trust.",
  description:
    "Environmental technology advisory and production studio. We help businesses understand impact, build auditable systems, and communicate sustainability without greenwashing risk.",
  caseStudyUrl: "https://2bitdev.com/#work",
  github: "https://github.com/twobitEDD",
  linkedIn: "https://www.linkedin.com/in/eddnorris/",
} as const;

export const heroHighlights = [
  { label: "Experience", value: "20 yr", detail: "product & environmental systems" },
  { label: "Traceability", value: "Field→Sale", detail: "auditable carbon pipelines" },
  { label: "Leadership", value: "VP Ops", detail: "CO2T.earth & CO2True" },
] as const;

/** Example custom apps for the hero tablet — pitched to small-business owners. */
export const heroBusinessApps = [
  {
    id: "farmproof",
    name: "FarmProof",
    tagline: "Soil to sale",
    detail: "Track every batch from field to customer",
    gradient: "linear-gradient(145deg, #1a4a2e, #3d9b6a)",
    glyph: "🌱",
  },
  {
    id: "claimready",
    name: "ClaimReady",
    tagline: "Market with proof",
    detail: "Green claims your team can defend",
    gradient: "linear-gradient(145deg, #2a5f4a, #5cb88a)",
    glyph: "✓",
  },
  {
    id: "shoprun",
    name: "ShopRun",
    tagline: "Your storefront",
    detail: "Orders, inventory, and customers in one place",
    gradient: "linear-gradient(145deg, #2a6f8f, #4da4c9)",
    glyph: "🛒",
  },
  {
    id: "brandvault",
    name: "BrandVault",
    tagline: "Always on-brand",
    detail: "Logos, colors, and assets your whole team uses",
    gradient: "linear-gradient(145deg, #8a5a20, #e8a838)",
    glyph: "◆",
  },
  {
    id: "golive",
    name: "GoLive",
    tagline: "Launch day ready",
    detail: "Campaign assets when you're ready to ship",
    gradient: "linear-gradient(145deg, #6b3a8a, #9b6fd4)",
    glyph: "▶",
  },
  {
    id: "oneboard",
    name: "OneBoard",
    tagline: "Ditch the spreadsheet",
    detail: "A dashboard built around how you actually work",
    gradient: "linear-gradient(145deg, #4a4a5a, #7a7a8e)",
    glyph: "▦",
  },
] as const;

export const clientLogos = [
  { name: "Google", src: "/images/brands/clients/google.svg", width: 72 },
  { name: "adidas", src: "/images/brands/clients/adidas.svg", width: 56 },
  { name: "Dell", src: "/images/brands/clients/dell.svg", width: 48 },
] as const;

export const clientNames = ["Washington University", "CO2T"] as const;

export const practiceProof = [
  { label: "CO2True platform", href: "https://co2true.com", detail: "live at co2true.com" },
  { label: "Carbon credit infrastructure", href: "https://co2t.earth", detail: "field-to-customer traceability" },
  { label: "CO2T brand system", href: "https://co2t.earth", detail: "Bigfoot mascot & identity" },
  { label: "OIBW → CO2T programs", href: site.caseStudyUrl, detail: "view case study →" },
] as const;

export const products = [
  {
    name: "ERGO.games",
    tagline: "Play. Compete. Improve.",
    href: "https://ergo.games",
    gradient: "linear-gradient(145deg, #2a1f4d, #7c5cc7)",
    glyph: "▶",
  },
  {
    name: "CO2True",
    tagline: "Track. Reduce. Certify.",
    href: "https://co2true.com",
    gradient: "linear-gradient(145deg, #1f4d2e, #3d9b6a)",
    glyph: "♻",
  },
] as const;

export const missionPoints = [
  { title: "Environmental clarity", detail: "understand impact before you market it." },
  { title: "Auditable systems", detail: "field data, product sales, and credit issuance connected." },
  { title: "Brand you can defend", detail: "identity and messaging grounded in real programs." },
  { title: "Production that ships", detail: "software, campaigns, and tooling — not slide decks." },
] as const;

export const aboutTimeline = [
  {
    period: "2022 – 2024",
    title: "Oregon Institute for a Better Way",
    detail: "Built automation and traceability for biochar and soil stewardship programs.",
  },
  {
    period: "2024 – Present",
    title: "VP Operations, CO2T.earth",
    detail: "Scaled software architecture, brand identity, e-commerce, and carbon credit infrastructure.",
  },
  {
    period: "2018 – Present",
    title: "2bit Entertainment",
    detail: "Contract production for Google, adidas, Dell, and Washington University via agency partners.",
  },
] as const;
