import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: false,

  allowedDevOrigins: [
    "3000-cs-624385661693-default.cs-us-east1-yeah.cloudshell.dev",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/PokeAPI/sprites/**",
      },
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        pathname: "/api/character/avatar/**",
      },
    ],
  },
};

export default nextConfig;
