import type { MetadataRoute } from "next";
import { publishedSitemapPaths } from "@/lib/city-treatments";
import { site } from "@/lib/site";

const bots = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: bots, allow: "/" },
    ],
    sitemap: [`${site.url}/sitemap.xml`, ...publishedSitemapPaths().map((path) => `${site.url}${path}`)],
    host: site.url,
  };
}
