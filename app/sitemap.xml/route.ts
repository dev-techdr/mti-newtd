import { lastModified as blogUpdated } from "@/app/sitemaps/blog/sitemap";
import { lastModified as costsUpdated } from "@/app/sitemaps/costs/sitemap";
import { lastModified as countriesUpdated } from "@/app/sitemaps/countries/sitemap";
import { lastModified as answersUpdated } from "@/app/sitemaps/answers/sitemap.xml/route";
import { lastModified as countryTreatmentsUpdated } from "@/app/sitemaps/country-treatments/sitemap.xml/route";
import { lastModified as pagesUpdated } from "@/app/sitemaps/pages/sitemap";
import { lastModified as sourceCitiesUpdated } from "@/app/sitemaps/source-cities/sitemap.xml/route";
import { lastModified as treatmentsUpdated } from "@/app/sitemaps/treatments/sitemap";
import { cityTreatmentSitemapLastModified, publishedSitemapPaths } from "@/lib/city-treatments";
import { sitemapPaths } from "@/lib/sitemap-entries";
import { site } from "@/lib/site";

const lastModified = {
  "/sitemaps/pages/sitemap.xml": pagesUpdated,
  "/sitemaps/treatments/sitemap.xml": treatmentsUpdated,
  "/sitemaps/costs/sitemap.xml": costsUpdated,
  "/sitemaps/countries/sitemap.xml": countriesUpdated,
  "/sitemaps/country-treatments/sitemap.xml": countryTreatmentsUpdated,
  "/sitemaps/source-cities/sitemap.xml": sourceCitiesUpdated,
  "/sitemaps/answers/sitemap.xml": answersUpdated,
  "/sitemaps/city-treatments/sitemap.xml": cityTreatmentSitemapLastModified,
  "/sitemaps/blog/sitemap.xml": blogUpdated,
} satisfies Record<(typeof sitemapPaths)[number], string>;

export function GET() {
  const entries = publishedSitemapPaths()
    .map(
      (path) => `  <sitemap>
    <loc>${site.url}${path}</loc>
    <lastmod>${lastModified[path]}</lastmod>
  </sitemap>`,
    )
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>
`,
    {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400",
      },
    },
  );
}
