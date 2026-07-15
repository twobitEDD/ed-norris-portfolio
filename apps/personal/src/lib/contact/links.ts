import type { Profile } from "@/data/types";

export type ProfileLink = Profile["links"][number];

export type CategorizedContactLinks = {
  email: ProfileLink | null;
  github: ProfileLink[];
  social: ProfileLink[];
  projects: ProfileLink[];
};

export function categorizeContactLinks(links: ProfileLink[]): CategorizedContactLinks {
  const result: CategorizedContactLinks = {
    email: null,
    github: [],
    social: [],
    projects: [],
  };

  for (const link of links) {
    const url = link.url.toLowerCase();

    if (url.startsWith("mailto:")) {
      result.email = link;
      continue;
    }

    if (url.includes("github.com")) {
      result.github.push(link);
      continue;
    }

    if (url.includes("linkedin.com") || url.includes("twitter.com") || url.includes("x.com")) {
      result.social.push(link);
      continue;
    }

    result.projects.push(link);
  }

  return result;
}

export function linkIconKind(link: ProfileLink): "email" | "github" | "linkedin" | "globe" | "calendar" {
  const url = link.url.toLowerCase();

  if (url.startsWith("mailto:")) return "email";
  if (url.includes("github.com")) return "github";
  if (url.includes("linkedin.com")) return "linkedin";
  return "globe";
}
