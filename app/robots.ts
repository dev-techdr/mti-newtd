import type { MetadataRoute } from "next";
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

const disallow = ["/api/", "/thank-you"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: bots, allow: "/", disallow },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
