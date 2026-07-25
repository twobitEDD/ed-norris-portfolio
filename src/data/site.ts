export const site = {
  name: "2bitENT",
  fullName: "2bit Entertainment",
  domain: "https://2bitent.com",
  email: "hello@2bitent.com",
  tagline: "More effective hours. Same team.",
  headline: "We scale creative teams with intelligent systems.",
  subheadline:
    "AI-augmented software and production — we help teams ship more, faster, without adding headcount.",
  description:
    "AI-augmented production studio. We multiply what your team can ship — same people, more effective hours.",
  github: "https://github.com/twobitEDD",
} as const;

export const heroStats = [
  { label: "Team hours saved", value: "+34%", detail: "avg. across engagements" },
  { label: "AI workflows active", value: "12", detail: "systems in production" },
  { label: "Effective output", value: "2.4×", detail: "same staff, more shipped" },
] as const;

export const clients = ["Google", "adidas", "Dell", "Washington University"] as const;

export const proofStats = [
  { label: "Teams aligned", value: "98%" },
  { label: "Projects on-time", value: "+41%" },
  { label: "Cycle time reduced", value: "−32%" },
  { label: "Client satisfaction", value: "4.9/5" },
] as const;

export const missionPoints = [
  { title: "Embedded teams", detail: "that scale with you." },
  { title: "AI-augmented", detail: "faster research, ideation, and execution." },
  { title: "Production obsessed", detail: "quality, performance, and impact." },
  { title: "Global by default", detail: "remote-friendly, timezone-flexible." },
] as const;
