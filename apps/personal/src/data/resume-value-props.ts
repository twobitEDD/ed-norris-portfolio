/** Rotating value statements for the résumé business card eyebrow. */
export const resumeValueProps = [
  "Building products that scale with purpose",
  "Bridging games, software & sustainability",
  "Human-centered design for complex systems",
  "Software leadership that helps teams ship",
  "Environmental technology made approachable",
  "Playable experiences worth people's time",
  "Connecting technology to real-world impact",
  "Applying design skills so people thrive",
] as const;

export type ResumeValueProp = (typeof resumeValueProps)[number];
