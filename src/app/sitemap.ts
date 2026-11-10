import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: Array<[string, number]> = [
    ["", 1],
    ["/metodo-triskell", 0.9],
    ["/social", 0.9],
    ["/risultati", 0.9],
    ["/siti-web", 0.8],
    ["/chi-siamo", 0.7],
    ["/contatti", 0.9],
    ["/privacy", 0.2],
    ["/cookie", 0.2],
  ];
  return pages.map(([path, priority]) => ({
    url: `${site.brand.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
