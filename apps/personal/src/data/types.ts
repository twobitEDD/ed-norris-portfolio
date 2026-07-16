export type Discipline =
  | "environment"
  | "software"
  | "games"
  | "marketing"
  | "operations"
  | "data";

export type ProfileTagline = {
  primary: string;
  secondary: string;
};

export type Profile = {
  name: string;
  tagline: ProfileTagline;
  headline: string;
  summary: string;
  /** Longer intro copy for xl+ viewports where space allows. */
  summaryExtended?: string;
  proofStrip: string[];
  location: string;
  availability: string;
  links: { label: string; url: string }[];
  badges: { label: string; discipline: Discipline }[];
};

export type Experience = {
  id: string;
  title: string;
  organization: string;
  period: { start: string; end?: string };
  summary: string;
  details: string[];
  disciplines: Discipline[];
  skills: string[];
  projects: string[];
  image?: string;
  featured?: boolean;
};

export type Education = {
  id: string;
  credential: string;
  institution: string;
  period?: { start: string; end?: string };
  summary?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  organization?: string;
  startDate?: string;
  endDate?: string;
  status: "active" | "completed" | "archived" | "concept";
  disciplines: Discipline[];
  industries: string[];
  roles: string[];
  skills: string[];
  technologies: string[];
  summary: string;
  challenge?: string;
  approach?: string;
  outcomes?: string[];
  metrics?: { label: string; value: string }[];
  images?: { src: string; alt: string; caption?: string }[];
  links?: { label: string; url: string }[];
  featured?: boolean;
  resumePriority?: number;
};

export type Skill = {
  id: string;
  label: string;
  disciplines: Discipline[];
  category: string;
};

export type GraphNode = {
  id: string;
  type:
    | "person"
    | "theme"
    | "practice"
    | "experience"
    | "project"
    | "skill"
    | "company"
    | "industry"
    | "outcome";
  label: string;
  subtitle?: string;
  disciplines: Discipline[];
  period?: string;
  description?: string;
  /** Richer narrative for theme hubs and story stops. */
  connectionNarrative?: string;
  projectId?: string;
  experienceId?: string;
  /** Brand or era image for map detail panels (path under /public). */
  image?: string;
  imageAlt?: string;
};

export type GraphEdge = {
  id: string;
  source: string;
  target: string;
  relationship:
    | "created"
    | "managed"
    | "designed"
    | "marketed"
    | "built-with"
    | "supports"
    | "led-to"
    | "taught"
    | "shaped"
    | "evolved-into";
  /** Short phrase shown on the map edge — how two nodes connect. */
  connectionNote?: string;
  /** Part of the guided through-line story path. */
  throughLine?: boolean;
  weight?: number;
};

export type ResumePreset = {
  id: string;
  label: string;
  description: string;
  targetRole: string;
  tone: "executive" | "technical" | "creative";
  pages: 1 | 2 | 3;
  disciplines: Discipline[];
  emphasizeLeadership: boolean;
  emphasizeTechnical: boolean;
  /** Cap experience rows; `"all"` includes every matching entry (Full Experience). */
  maxExperiences?: number | "all";
};

export type Practice = {
  id: string;
  number: string;
  label: string;
  title: string;
  summary: string;
  tags: string[];
  disciplines: Discipline[];
  href: string;
  offset?: boolean;
  /** Optional brand tagline shown on practice cards. */
  tagline?: string;
};

export const disciplineColors: Record<Discipline, string> = {
  environment: "#67d58a",
  software: "#46c7d7",
  games: "#985cff",
  marketing: "#f2ad3d",
  operations: "#e8cb55",
  data: "#ed628f",
};

export const disciplineLabels: Record<Discipline, string> = {
  environment: "Environmental",
  software: "Software",
  games: "Games",
  marketing: "Marketing",
  operations: "Operations",
  data: "Data",
};
