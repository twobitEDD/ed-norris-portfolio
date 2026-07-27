import type { LucideIcon } from "lucide-react";
import { Code2, Leaf, Megaphone, Palette } from "lucide-react";

export type Service = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
};

export const services: Service[] = [
  {
    id: "environment",
    title: "Environmental Advisory",
    shortTitle: "Advisory",
    description:
      "Understand carbon and environmental impact before you market it — traceability, reporting, and programs you can defend when stakeholders ask hard questions.",
    icon: Leaf,
    gradient: "linear-gradient(145deg, #1a4a2e, #3d9b6a)",
  },
  {
    id: "software",
    title: "Software Production",
    shortTitle: "Software",
    description:
      "Platform architecture, e-commerce, and data pipelines — from CO2True's carbon infrastructure to operational tooling teams rely on daily.",
    icon: Code2,
    gradient: "linear-gradient(145deg, #2a6f8f, #4da4c9)",
  },
  {
    id: "branding",
    title: "Brand Systems",
    shortTitle: "Branding",
    description:
      "Visual identity, mascots, and design systems — from CO2T's Bigfoot to campaign-ready brand kits grounded in real programs.",
    icon: Palette,
    gradient: "linear-gradient(145deg, #8a5a20, #e8a838)",
  },
  {
    id: "campaigns",
    title: "Campaign Delivery",
    shortTitle: "Campaigns",
    description:
      "Go-to-market assets, interactive storytelling, and launch programs for Google, adidas, Dell, and Washington University.",
    icon: Megaphone,
    gradient: "linear-gradient(145deg, #6b3a8a, #9b6fd4)",
  },
];
