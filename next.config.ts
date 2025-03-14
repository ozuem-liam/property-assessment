import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true, // Use true for permanent redirect (301) or false for temporary (302)
      },
    ];
  },
};

export default nextConfig;
