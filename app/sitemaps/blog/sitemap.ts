import type { MetadataRoute } from "next";
import { posts } from "@/data/blog";
import { latestDate, localizedEntries } from "@/lib/sitemap-entries";

const items = posts.map((post) => ({ path: `/blog/${post.slug}`, lastModified: post.updated }));

export const lastModified = latestDate(items.map((item) => item.lastModified));

export default function sitemap(): MetadataRoute.Sitemap {
  return localizedEntries(items);
}
