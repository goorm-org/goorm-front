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
  webpack: (config, { isServer }) => {
    // Next.js 15 webpack 오류 해결
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // minify 플러그인 비활성화
    config.optimization.minimize = false;

    return config;
  },
};

export default nextConfig;
