import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/instagram",
        destination: "https://www.instagram.com/nono_magari",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
