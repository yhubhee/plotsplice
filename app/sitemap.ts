import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { siteConfig } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/services", "/stories", "/about", "/contact", "/privacy", ...services.map((service) => `/services/${service.slug}`)];
  return paths.map((path) => ({ url: `${siteConfig.url}${path}` }));
}
