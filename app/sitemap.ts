import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = siteConfig.navigation.map((item) => ({
    url: `${siteConfig.url}${item.href}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }))

  return routes
}
