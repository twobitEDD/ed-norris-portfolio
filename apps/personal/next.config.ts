import type { NextConfig } from "next";
import path from "path";

const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.BASE_PATH?.trim() ?? "";

const nextConfig: NextConfig = {
  ...(isStaticExport && {
    output: "export",
    ...(basePath ? { basePath, trailingSlash: true } : {}),
  }),
  transpilePackages: ["@ed-norris/career-data"],
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
