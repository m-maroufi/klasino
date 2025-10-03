import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      new URL("https://codeyad.com/_ipx/**"),
      new URL("https://i.ibb.co/**"),
    ],
  },
};

export default nextConfig;
