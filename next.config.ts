import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://192.168.1.153:3000"],
  images: {
    // Every quality value passed to <Image quality={...}>; Next 16 coerces unlisted values to 75.
    qualities: [72, 75, 95],
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
