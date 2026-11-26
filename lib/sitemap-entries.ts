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
  "/sitemaps/country-treatments/sitemap.xml",
  "/sitemaps/source-cities/sitemap.xml",
  "/sitemaps/answers/sitemap.xml",
  "/sitemaps/city-treatments/sitemap.xml",
  "/sitemaps/blog/sitemap.xml",
  "/sitemaps/assistance/sitemap.xml",
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

function xmlText(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

export function sitemapXml(entries: MetadataRoute.Sitemap) {
  if (entries.length === 0) throw new Error("A sitemap urlset needs at least one url.");

  const blocks = entries.map((item) => {
    const links = Object.entries(item.alternates?.languages ?? {}).flatMap(([language, href]) =>
      href ? [`    <xhtml:link rel="alternate" hreflang="${xmlText(language)}" href="${xmlText(href)}" />`] : [],
    );
    const lastModified = item.lastModified
      ? xmlText(item.lastModified instanceof Date ? item.lastModified.toISOString() : item.lastModified)
      : "";
    return [
      "  <url>",
      `    <loc>${xmlText(item.url)}</loc>`,
      ...links,
      ...(lastModified ? [`    <lastmod>${lastModified}</lastmod>`] : []),
      "  </url>",
    ].join("\n");
  });
  const xhtml = blocks.some((block) => block.includes("xhtml:link"));
  const open = xhtml
    ? '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'
    : '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  return `<?xml version="1.0" encoding="UTF-8"?>\n${open}\n${blocks.join("\n")}\n</urlset>\n`;
}
