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
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
