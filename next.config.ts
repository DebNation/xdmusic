import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c.saavncdn.com",
      },
      {
        protocol: "http",
        hostname: "c.saavncdn.com",
      },

      {
        protocol: "https",
        hostname: "www.jiosaavn.com",
      },
      {
        protocol: "https",
        hostname: "jiosaavn-api.debiprasadxd-41e.workers.dev",
      },
    ],
  },
};

export default nextConfig;
