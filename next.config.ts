import type { NextConfig } from "next";

// Umbrella ships as a fully static export served from GitHub Pages on a
// custom domain (umbrella.us via public/CNAME) — see README for the
// basePath assumption. No server runtime, no API routes, no ISR.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
