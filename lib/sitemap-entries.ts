import type { MetadataRoute } from "next";
import type { TranslatedFlags } from "@/data/procedures/types";
import { absoluteUrl, languageAlternates } from "@/lib/seo";
import { site } from "@/lib/site";
import { untranslated } from "@/lib/translation";

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
  items: { path: string; lastModified: string; translated?: TranslatedFlags }[],
): MetadataRoute.Sitemap {
  return items.map((item) => ({
    url: absoluteUrl("en", item.path),
    lastModified: item.lastModified,
    alternates: {
      languages: languageAlternates(item.path, item.translated ?? untranslated),
    },
  }));
}
