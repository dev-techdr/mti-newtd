import type { MetadataRoute } from "next";
import { latestDate, localizedEntries } from "@/lib/sitemap-entries";
import { isLibraryProcedure, procedurePath, procedures } from "@/data/procedures";
import { specialties } from "@/data/specialties";
import { site } from "@/lib/site";

const items = [
  ...specialties.map((item) => ({ path: `/treatments/${item.slug}`, lastModified: site.updated })),
  ...procedures.flatMap((item) =>
    isLibraryProcedure(item.slug) ? [] : [{ path: procedurePath(item), lastModified: item.updated }],
  ),
];

export const lastModified = latestDate(items.map((item) => item.lastModified));

export default function sitemap(): MetadataRoute.Sitemap {
  return localizedEntries(items);
}
