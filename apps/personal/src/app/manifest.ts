import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Edd Norris — 2bitDEV",
    short_name: "2bitDEV",
    description:
      "Software Production Specialist | UX & Software & Production — Cottage Grove, Oregon.",
    start_url: "/",
    display: "standalone",
    background_color: "#090b0b",
    theme_color: "#090b0b",
    icons: [
      {
        src: "/brand/2bit-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/brand/apple-touch-icon.svg",
        sizes: "180x180",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
