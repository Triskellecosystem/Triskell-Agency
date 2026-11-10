import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  // L'anteprima in cloud accede al dev server da un host diverso da localhost.
  allowedDevOrigins: ["*.claude.ai", "*.claude.com", "*.anthropic.com", "*.claudeusercontent.com"],
  async redirects() {
    // vecchi percorsi della sezione Agency del sito Triskell Ecosystem
    return [
      { source: "/agency", destination: "/", permanent: true },
      { source: "/agency/portfolio", destination: "/risultati", permanent: true },
      { source: "/agency/siti-web", destination: "/siti-web", permanent: true },
      { source: "/portfolio", destination: "/risultati", permanent: true },
      { source: "/siti-web/portfolio", destination: "/siti-web", permanent: true },
    ];
  },
  experimental: { optimizePackageImports: ["lucide-react", "motion"] },
};

export default nextConfig;
