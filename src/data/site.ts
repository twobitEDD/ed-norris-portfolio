export const site = {
  name: "2bitENT",
  fullName: "2bit Entertainment",
  domain: "https://2bitent.com",
  email: "hello@2bitent.com",
  tagline: "More effective hours. Same team.",
  description:
    "Software and production specialists using AI to give your team more hours of effective work — without adding headcount.",
  github: "https://github.com/twobitENT",
} as const;

export const heroStats = [
  { label: "Team hours saved", value: "+34%", detail: "avg. across client engagements" },
  { label: "AI workflows active", value: "12+", detail: "pipelines in production" },
  { label: "Effective output", value: "2.4×", detail: "same staff, more shipped" },
] as const;

export const clients = ["Google", "adidas", "Dell", "Washington University"] as const;
