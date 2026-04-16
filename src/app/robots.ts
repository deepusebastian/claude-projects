import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aiblueprint.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
