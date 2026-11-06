import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

export const ogImage = { url: "/og.png", width: 1200, height: 630, alt: "PlotSplice" };

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Skip the " | PlotSplice" suffix. */
  absoluteTitle?: boolean;
};

// Next replaces (not merges) openGraph per page, so every page gets the full set here.
export function pageMeta({ title, description, path, absoluteTitle }: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}
