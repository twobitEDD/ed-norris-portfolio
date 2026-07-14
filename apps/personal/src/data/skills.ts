import type { Skill } from "./types";

export const skills: Skill[] = [
  { id: "skill-ts", label: "TypeScript", disciplines: ["software"], category: "Technology" },
  { id: "skill-react", label: "React / Next.js", disciplines: ["software"], category: "Technology" },
  { id: "skill-arch", label: "Software Architecture", disciplines: ["software"], category: "Technology" },
  { id: "skill-product", label: "Product Strategy", disciplines: ["software", "operations"], category: "Leadership" },
  { id: "skill-carbon", label: "Carbon Systems", disciplines: ["environment"], category: "Domain" },
  { id: "skill-ops", label: "Operations", disciplines: ["operations"], category: "Leadership" },
  { id: "skill-gamedesign", label: "Game Design", disciplines: ["games"], category: "Creative" },
  { id: "skill-brand", label: "Brand Strategy", disciplines: ["marketing"], category: "Creative" },
  { id: "skill-data", label: "Data & Analytics", disciplines: ["data"], category: "Technology" },
  { id: "skill-trace", label: "Traceability", disciplines: ["environment", "data"], category: "Domain" },
];
