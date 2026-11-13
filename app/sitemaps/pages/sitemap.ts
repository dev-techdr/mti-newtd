import type { MetadataRoute } from "next";
import { latestDate, localizedEntries } from "@/lib/sitemap-entries";
import { site } from "@/lib/site";

const paths = [
  "/",
  "/treatments",
  "/how-it-works",
  "/patient-services",
  "/medical-visa-india",
  "/why-india",
  "/faq",
  "/about",
  "/contact",
  "/get-a-free-quote",
  "/blog",
  "/privacy-policy",
  "/terms",
  "/medical-disclaimer",
  "/editorial-policy",
  "/medical-review-team",
];

const dates: Record<string, string> = {
  "/about": "2026-11-13",
  "/editorial-policy": "2026-11-13",
  "/medical-review-team": "2026-11-13",
};

const items = paths.map((path) => ({ path, lastModified: dates[path] ?? site.updated }));

export const lastModified = latestDate(items.map((item) => item.lastModified));

export default function sitemap(): MetadataRoute.Sitemap {
  return localizedEntries(items);
}
