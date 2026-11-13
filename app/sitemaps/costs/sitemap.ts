import type { MetadataRoute } from "next";
import { procedures } from "@/data/procedures";
import { latestDate, localizedEntries } from "@/lib/sitemap-entries";

const items = procedures.map((item) => ({
  path: `/cost/${item.costId}-cost-in-india`,
  lastModified: item.updated,
}));

export const lastModified = latestDate(items.map((item) => item.lastModified));

export default function sitemap(): MetadataRoute.Sitemap {
  return localizedEntries(items);
}
