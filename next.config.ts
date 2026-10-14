import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/leadership", destination: "/company", permanent: true }];
  },
};

export default nextConfig;
