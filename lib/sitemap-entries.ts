import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export const sitemapPaths = [
  "/sitemaps/pages/sitemap.xml",
  "/sitemaps/treatments/sitemap.xml",
  "/sitemaps/costs/sitemap.xml",
  "/sitemaps/countries/sitemap.xml",
  "/sitemaps/city-treatments/sitemap.xml",
  "/sitemaps/blog/sitemap.xml",
] as const;

export function latestDate(dates: readonly string[]) {
  let latest = dates[0] ?? site.updated;
  for (const date of dates) if (date > latest) latest = date;
  return latest;
}

export function localizedEntries(
  items: { path: string; lastModified: string }[],
): MetadataRoute.Sitemap {
  return items.map((item) => ({
    url: absoluteUrl("en", item.path),
    lastModified: item.lastModified,
    alternates: {
      languages: Object.fromEntries([
        ...routing.locales.map((locale) => [locale, absoluteUrl(locale, item.path)]),
        ["x-default", absoluteUrl("en", item.path)],
      ]),
    },
  }));
}
