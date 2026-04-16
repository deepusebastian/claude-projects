import { MetadataRoute } from "next";
import { getAllUseCaseSlugs } from "@/data/use-cases";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aiblueprint.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/builder`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/signup`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const scenarioPages: MetadataRoute.Sitemap = getAllUseCaseSlugs().map(
    (slug) => ({
      url: `${BASE_URL}/use-cases/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  return [...staticPages, ...scenarioPages];
}
