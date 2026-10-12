import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/adglean", destination: "/how-it-works", permanent: true }];
  },
};

export default nextConfig;
