import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/chat/:path*",
        // destination: "http://localhost:3001/:path*",
        destination: "https://snapaura-chat.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
