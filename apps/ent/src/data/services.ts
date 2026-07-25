import type { LucideIcon } from "lucide-react";
import { Bot, Code2, Megaphone, Palette, Sparkles } from "lucide-react";

export type Service = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  gradient: string;
};

export const services: Service[] = [
  {
    id: "software",
    title: "Software Production",
    shortTitle: "Software",
    description:
      "Platform architecture, integrations, and production software — from e-commerce and data pipelines to AI workflows and operational tooling.",
    icon: Code2,
    accent: "software",
    gradient: "linear-gradient(145deg, #2a6f8f, #4da4c9)",
  },
  {
    id: "ai",
    title: "AI Integration",
    shortTitle: "AI Studio",
    description:
      "Practical AI workflows that multiply your team's output — automated pipelines, intelligent tooling, and production systems that actually ship.",
    icon: Bot,
    accent: "technology",
    gradient: "linear-gradient(145deg, #1a4a5c, #4da4c9)",
  },
  {
    id: "branding",
    title: "Brand Systems",
    shortTitle: "Branding",
    description:
      "Visual identity, mascots, and design systems that give products a distinctive voice — from CO2T's Bigfoot to campaign-ready brand kits.",
    icon: Palette,
    accent: "branding",
    gradient: "linear-gradient(145deg, #8a5a20, #e8a838)",
  },
  {
    id: "campaigns",
    title: "Campaign Delivery",
    shortTitle: "Campaigns",
    description:
      "Go-to-market assets, interactive product storytelling, and launch programs for brands including Google, adidas, and Dell.",
    icon: Megaphone,
    accent: "campaigns",
    gradient: "linear-gradient(145deg, #6b3a8a, #9b6fd4)",
  },
  {
    id: "interactive",
    title: "Interactive & Games",
    shortTitle: "Interactive",
    description:
      "Web games, immersive media, and accessible interactive experiences — one pillar of a broader technology and production practice.",
    icon: Sparkles,
    accent: "interactive",
    gradient: "linear-gradient(145deg, #3d2a6b, #7c5cc7)",
  },
];
