import { fareTreatmentPairs } from "@/data/patients/fare-treatments";
import { treatmentSitemapItems } from "@/data/patients/publish";
import { latestDate, localizedEntries, sitemapXml } from "@/lib/sitemap-entries";
import { site } from "@/lib/site";

const items = [
  ...treatmentSitemapItems(),
  ...fareTreatmentPairs().map((item) => ({
    path: `/patients-from/${item.country}/${item.procedure}`,
    lastModified: site.updated,
  })),
];

export const lastModified = items.length ? latestDate(items.map((item) => item.lastModified)) : site.updated;

export function GET() {
  if (!items.length) return new Response(null, { status: 404, headers: { "Cache-Control": "public, max-age=3600" } });
  return new Response(sitemapXml(localizedEntries(items)), {
    headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=86400" },
  });
}
