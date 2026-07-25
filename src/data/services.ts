import type { LucideIcon } from "lucide-react";
import { Bot, Code2, Megaphone, Palette } from "lucide-react";

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
    id: "software",
    title: "Software Production",
    shortTitle: "Software",
    description:
      "Platform architecture, integrations, and production software — from e-commerce and data pipelines to operational tooling.",
    icon: Code2,
    gradient: "linear-gradient(145deg, #2a6f8f, #4da4c9)",
  },
  {
    id: "ai",
    title: "AI Integration",
    shortTitle: "AI Studio",
    description:
      "Practical AI workflows that multiply output — automated pipelines, intelligent tooling, and systems that actually ship.",
    icon: Bot,
    gradient: "linear-gradient(145deg, #1a4a5c, #33ccff)",
  },
  {
    id: "branding",
    title: "Brand Systems",
    shortTitle: "Branding",
    description:
      "Visual identity, mascots, and design systems — from CO2T's Bigfoot to campaign-ready brand kits.",
    icon: Palette,
    gradient: "linear-gradient(145deg, #8a5a20, #e8a838)",
  },
  {
    id: "campaigns",
    title: "Campaign Delivery",
    shortTitle: "Campaigns",
    description:
      "Go-to-market assets, interactive storytelling, and launch programs for Google, adidas, Dell, and more.",
    icon: Megaphone,
    gradient: "linear-gradient(145deg, #6b3a8a, #9b6fd4)",
  },
];
