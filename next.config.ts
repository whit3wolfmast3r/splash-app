import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  } as any, // 'as any' stops TypeScript from blocking the build if types are lagging
};

export default nextConfig;