import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    nodeMiddleware: true, // فعال‌سازی پشتیبانی از Node.js Runtime برای میدلور
  },
  images: {
    remotePatterns: [
      new URL("https://codeyad.com/_ipx/**"),
      new URL("https://i.ibb.co/**"),
    ],
  },
};

export default nextConfig;
