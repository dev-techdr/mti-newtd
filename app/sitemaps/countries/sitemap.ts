import type { MetadataRoute } from "next";
import { cities, cityPath } from "@/data/cities";
import { indiaFares } from "@/data/patients/india-fares";
import { countryLastModified, listIndexableCountries } from "@/data/patients/publish";
import { latestDate, localizedEntries } from "@/lib/sitemap-entries";
import { site } from "@/lib/site";

const items = [
  ...cities.map((city) => ({ path: cityPath(city), lastModified: site.updated })),
  ...listIndexableCountries().map((country) => ({
    path: `/patients-from/${country.slug}`,
    lastModified: countryLastModified(country),
  })),
  ...indiaFares
    .filter((fare) => !listIndexableCountries().some((country) => country.slug === fare.slug))
    .map((fare) => ({ path: `/patients-from/${fare.slug}`, lastModified: site.updated })),
];

export const lastModified = latestDate(items.map((item) => item.lastModified));

export default function sitemap(): MetadataRoute.Sitemap {
  return localizedEntries(items);
}
