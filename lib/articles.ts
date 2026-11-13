import fs from "node:fs";
import path from "node:path";
import { cacheLife } from "next/cache";
import matter from "gray-matter";

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  category: string;
  content: string;
};

const dir = path.join(process.cwd(), "content/blog");

export async function getArticles(): Promise<Article[]> {
  "use cache";
  cacheLife("max");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: String(data.title ?? ""),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        updated: String(data.updated ?? data.date ?? ""),
        category: String(data.category ?? "Guides"),
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticle(slug: string) {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug);
}
