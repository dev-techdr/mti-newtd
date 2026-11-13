import type { MetadataRoute } from "next";
import { citySpecialtyEntries, cityTreatmentEntries } from "@/lib/city-treatments";
import { latestDate, localizedEntries } from "@/lib/sitemap-entries";

const items = [...citySpecialtyEntries(), ...cityTreatmentEntries()];

export const lastModified = latestDate(items.map((item) => item.lastModified));

export default function sitemap(): MetadataRoute.Sitemap {
  return localizedEntries(items);
}
