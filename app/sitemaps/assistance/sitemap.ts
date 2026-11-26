import type { MetadataRoute } from "next";
import { assistancePaths, assistanceUpdated } from "@/data/assistance";
import { localizedEntries } from "@/lib/sitemap-entries";

const items = assistancePaths().map((path) => ({ path, lastModified: assistanceUpdated }));

export const lastModified = assistanceUpdated;

export default function sitemap(): MetadataRoute.Sitemap {
  return localizedEntries(items);
}
