import type { NextConfig } from "next";

// Umbrella ships as a fully static export served from GitHub Pages at a
// project subpath — https://richardawe.github.io/umbrella.us/ — not a
// custom domain. basePath/assetPrefix must match that subpath or every
// asset reference (_next/static/...) 404s and the page renders unstyled.
// No server runtime, no API routes, no ISR.
const REPO_SUBPATH = "/umbrella.us";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: REPO_SUBPATH,
  assetPrefix: REPO_SUBPATH,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
