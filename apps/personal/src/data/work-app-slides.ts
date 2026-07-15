import {
  creativeSlides,
  environmentalSlides,
  type DisciplineSlide,
} from "./discipline-slides";
import { expertiseSlides, type ExpertiseSlide } from "./expertise-slides";

export type WorkAppSlideLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type WorkAppSlide = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  partnerIds: string[];
  partnerNotes?: string[];
  technologies: string[];
  links: WorkAppSlideLink[];
  accent: "green" | "purple" | "cyan" | "amber";
  image?: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
};

export const WORK_APP_AUTO_ADVANCE_MS = 7500;

function fromExpertise(slide: ExpertiseSlide): WorkAppSlide {
  const accentMap: Record<ExpertiseSlide["glow"], WorkAppSlide["accent"]> = {
    green: "green",
    purple: "purple",
    cyan: "cyan",
  };

  return {
    id: slide.id,
    eyebrow: slide.eyebrow,
    title: slide.title,
    body: slide.body,
    partnerIds: slide.partnerIds,
    partnerNotes: slide.partnerNotes,
    technologies: slide.technologies,
    links: slide.links,
    accent: accentMap[slide.glow],
  };
}

function fromDiscipline(slide: DisciplineSlide): WorkAppSlide {
  const accentMap: Record<DisciplineSlide["glow"], WorkAppSlide["accent"]> = {
    green: "green",
    purple: "purple",
    cyan: "cyan",
    amber: "amber",
  };

  return {
    id: slide.id,
    eyebrow: slide.eyebrow,
    title: slide.title,
    body: slide.body,
    partnerIds: slide.partnerIds,
    partnerNotes: slide.partnerNotes,
    technologies: slide.technologies,
    links: slide.links.map(({ label, href, external }) => ({ label, href, external })),
    accent: accentMap[slide.glow],
    image: slide.image,
  };
}

const pickDiscipline = (id: string) => {
  const slide =
    environmentalSlides.find((s) => s.id === id) ?? creativeSlides.find((s) => s.id === id);
  if (!slide) throw new Error(`Missing discipline slide: ${id}`);
  return fromDiscipline(slide);
};

/** Curated highlights for the Norris Studio Work iPad app. */
export const workAppSlides: WorkAppSlide[] = [
  fromExpertise(expertiseSlides.find((s) => s.id === "co2true")!),
  pickDiscipline("carbon-tracking"),
  fromExpertise(expertiseSlides.find((s) => s.id === "ergo")!),
  fromExpertise(expertiseSlides.find((s) => s.id === "consulting")!),
];
