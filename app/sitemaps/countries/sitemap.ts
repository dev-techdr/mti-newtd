import type { MetadataRoute } from "next";
import { cities, cityPath } from "@/data/cities";
import { countries } from "@/data/countries";
import { latestDate, localizedEntries } from "@/lib/sitemap-entries";
import { site } from "@/lib/site";

const items = [
  ...cities.map((city) => ({ path: cityPath(city), lastModified: site.updated })),
  ...countries.map((country) => ({ path: `/patients-from/${country.slug}`, lastModified: "2026-11-13" })),
];

export const lastModified = latestDate(items.map((item) => item.lastModified));

export default function sitemap(): MetadataRoute.Sitemap {
  return localizedEntries(items);
}
