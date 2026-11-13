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
];

const items = paths.map((path) => ({ path, lastModified: site.updated }));

export const lastModified = latestDate(items.map((item) => item.lastModified));

export default function sitemap(): MetadataRoute.Sitemap {
  return localizedEntries(items);
}
