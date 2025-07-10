import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "standalone",
  experimental: {
    optimizePackageImports: ["@vapor-ui/core"],
  },
};

export default nextConfig;
