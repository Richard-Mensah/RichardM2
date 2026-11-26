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
  // Pages merged into the writing library and the blog; keep old links working.
  async redirects() {
    return [
      { source: "/research/research-papers", destination: "/research/publications", permanent: true },
      { source: "/research/articles", destination: "/blog", permanent: true },
      { source: "/systems", destination: "/projects#systems", permanent: true },
      { source: "/identity", destination: "/about/biography", permanent: true },
      { source: "/collaborate", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
