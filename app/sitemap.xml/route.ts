import { lastModified as blogUpdated } from "@/app/sitemaps/blog/sitemap";
import { lastModified as cityTreatmentsUpdated } from "@/app/sitemaps/city-treatments/sitemap";
import { lastModified as costsUpdated } from "@/app/sitemaps/costs/sitemap";
import { lastModified as countriesUpdated } from "@/app/sitemaps/countries/sitemap";
import { lastModified as pagesUpdated } from "@/app/sitemaps/pages/sitemap";
import { lastModified as treatmentsUpdated } from "@/app/sitemaps/treatments/sitemap";
import { sitemapPaths } from "@/lib/sitemap-entries";
import { site } from "@/lib/site";

const lastModified = {
  "/sitemaps/pages/sitemap.xml": pagesUpdated,
  "/sitemaps/treatments/sitemap.xml": treatmentsUpdated,
  "/sitemaps/costs/sitemap.xml": costsUpdated,
  "/sitemaps/countries/sitemap.xml": countriesUpdated,
  "/sitemaps/city-treatments/sitemap.xml": cityTreatmentsUpdated,
  "/sitemaps/blog/sitemap.xml": blogUpdated,
} satisfies Record<(typeof sitemapPaths)[number], string>;

export function GET() {
  const entries = sitemapPaths
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
