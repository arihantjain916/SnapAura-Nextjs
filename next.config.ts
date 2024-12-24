import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/chat",
        destination: "http://localhost:3001",
      },
    ];
  },
};

export default nextConfig;
