import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

// All crawlers are welcome, including AI assistants: being read and cited is the goal.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
