import { citySitemapItems } from "@/lib/city-treatments";
import { localizedEntries, sitemapXml } from "@/lib/sitemap-entries";

export function GET() {
  const entries = localizedEntries(citySitemapItems());
  if (entries.length === 0) {
    return new Response(null, {
      status: 404,
      headers: { "Cache-Control": "public, max-age=3600" },
    });
  }

  return new Response(sitemapXml(entries), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
