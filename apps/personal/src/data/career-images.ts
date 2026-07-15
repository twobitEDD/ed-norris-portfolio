/**
 * Career era, experience, graph node, and project image paths — single source for
 * timeline polaroids, project cards, practice panels, and map detail panels.
 */

export type CareerImageEntry = {
  /** Public URL path (under /career/ or /brands/) */
  src: string;
  alt: string;
  status: "confirmed" | "needs_review" | "placeholder";
  objectPosition?: string;
};

/** CO2T.earth brand assets (confirmed). */
export const co2tBrand = {
  mascot: {
    src: "/brands/co2t/co2t-mascot-welcome.png",
    alt: 'CO2T.earth mascot — "Welcome to Sustainability" local biochar farmer character',
  },
  biocharGuide: {
    src: "/brands/co2t/co2t-biochar-guide.png",
    alt: 'CO2T.earth biochar guide — "Built from Nature. Backed by Science."',
  },
} as const;

/** Timeline era polaroid images (keys match timeline-eras.ts ids). */
export const eraImages: Record<string, CareerImageEntry> = {
  "era-games": {
    src: "/career/era-games.jpg",
    alt: "Game industry foundation — arcade glow and controllers",
    status: "placeholder",
  },
  "era-2bit": {
    src: "/career/era-2bit.jpg",
    alt: "2bit Entertainment studio — indie game development desk",
    status: "placeholder",
  },
  "era-education": {
    src: "/career/era-education.jpg",
    alt: "Education and public service — mentoring students in a colorful STEM classroom computer lab",
    status: "placeholder",
    objectPosition: "center 35%",
  },
  "era-software": {
    src: "/career/era-software.jpg",
    alt: "Software and brand prototyping — innovation lab workspace",
    status: "placeholder",
  },
  "era-environment": {
    src: co2tBrand.mascot.src,
    alt: co2tBrand.mascot.alt,
    status: "confirmed",
    objectPosition: "center 20%",
  },
  "era-advisory": {
    src: "/career/era-ergo.jpg",
    alt: "Technology advisory — cross-disciplinary consulting on modern and legacy systems",
    status: "placeholder",
  },
};

/** Experience-level images (keys match experiences.ts ids). */
export const experienceImages: Record<string, CareerImageEntry> = {
  "exp-ea": {
    src: "/career/era-games.jpg",
    alt: "EA Tiburon volunteer QA",
    status: "needs_review",
  },
  "exp-seamless": {
    src: "/career/era-games.jpg",
    alt: "Seamless Entertainment — Family Fun Football",
    status: "needs_review",
  },
  "exp-rocket": {
    src: "/career/era-games.jpg",
    alt: "Rocket Gaming Systems — slot titles",
    status: "needs_review",
  },
  "exp-2bit-founder": {
    src: "/career/era-2bit.jpg",
    alt: "2bit Entertainment founder era",
    status: "needs_review",
  },
  "exp-2bit-senior": {
    src: "/career/era-2bit.jpg",
    alt: "2bit Entertainment senior interactive developer",
    status: "needs_review",
  },
  "exp-adidas": {
    src: "/career/era-software.jpg",
    alt: "adidas Future Team",
    status: "needs_review",
  },
  "exp-oibw": {
    src: co2tBrand.biocharGuide.src,
    alt: "Oregon Institute for a Better Way — environmental systems",
    status: "confirmed",
    objectPosition: "left top",
  },
  "exp-co2t-vp": {
    src: co2tBrand.mascot.src,
    alt: "CO2T.earth VP Operations",
    status: "confirmed",
    objectPosition: "center 20%",
  },
};

/** Work-map graph node images (keys match relationships.ts node ids). */
export const nodeImages: Record<string, CareerImageEntry> = {
  "practice-environment": {
    src: co2tBrand.mascot.src,
    alt: co2tBrand.mascot.alt,
    status: "confirmed",
    objectPosition: "center 20%",
  },
  "exp-node-oibw": {
    src: co2tBrand.biocharGuide.src,
    alt: "Oregon Institute — biochar & soil stewardship",
    status: "confirmed",
    objectPosition: "left top",
  },
  "exp-node-co2t": {
    src: co2tBrand.mascot.src,
    alt: "CO2T.earth VP Operations",
    status: "confirmed",
    objectPosition: "center 20%",
  },
  "company-co2t": {
    src: co2tBrand.mascot.src,
    alt: "CO2T — carbon infrastructure and biochar programs",
    status: "confirmed",
    objectPosition: "center 20%",
  },
  "project-carbon": {
    src: co2tBrand.biocharGuide.src,
    alt: "Carbon tracking — CO2T.earth biochar programs",
    status: "confirmed",
    objectPosition: "left top",
  },
};

/** Featured project card images (keys match projects.ts ids). */
export const projectImages: Record<string, CareerImageEntry> = {
  "proj-co2t-platform": {
    src: co2tBrand.mascot.src,
    alt: "CO2T Environmental Platform",
    status: "confirmed",
    objectPosition: "center 20%",
  },
  "proj-carbon-tracking": {
    src: co2tBrand.biocharGuide.src,
    alt: "Carbon tracking infrastructure — CO2T.earth",
    status: "confirmed",
    objectPosition: "left top",
  },
};

export function getEraImage(eraId: string): CareerImageEntry | undefined {
  return eraImages[eraId];
}

export function getExperienceImage(experienceId: string): CareerImageEntry | undefined {
  return experienceImages[experienceId];
}

export function getNodeImage(nodeId: string): CareerImageEntry | undefined {
  return nodeImages[nodeId];
}

export function getProjectImage(projectId: string): CareerImageEntry | undefined {
  return projectImages[projectId];
}

/** Oregon photos for the contact desk polaroid stack — click to cycle. */
export const contactPolaroidImages: CareerImageEntry[] = [
  {
    src: "/career/contact-oregon-fog-road.jpg",
    alt: "Foggy road through snowy evergreen forest near Cottage Grove, Oregon",
    status: "confirmed",
    objectPosition: "center center",
  },
  {
    src: "/career/contact-oregon-forest-floor.jpg",
    alt: "Lush forest floor with ferns and moss in Oregon",
    status: "confirmed",
    objectPosition: "center center",
  },
  {
    src: "/career/contact-oregon.jpg",
    alt: "Sunlit evergreen forest in the Oregon Cascades",
    status: "confirmed",
    objectPosition: "center center",
  },
  {
    src: "/career/contact-oregon-original.jpg",
    alt: "Dense Oregon forest canopy with filtered light",
    status: "confirmed",
    objectPosition: "center center",
  },
];

/** Primary contact polaroid — first in the stack cycle. */
export const contactPolaroidImage: CareerImageEntry = contactPolaroidImages[0]!;

/** Secondary contact polaroid — second in the stack cycle. */
export const contactPolaroidImageSecondary: CareerImageEntry = contactPolaroidImages[1]!;
