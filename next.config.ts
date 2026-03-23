import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverActions: {
    bodySizeLimit: '10mb', // Allows up to 10MB headshots
  },
};

export default nextConfig;