import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/chat/:path*",
        // destination: "http://localhost:3001/:path*",
        destination: `${process.env.NODE_BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
