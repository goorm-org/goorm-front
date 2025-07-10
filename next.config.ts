import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@vapor-ui/core"],
  },
};

export default nextConfig;
