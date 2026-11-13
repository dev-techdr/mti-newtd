import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";
import { formatUpdated } from "@/lib/utils";

const categoryOrder = [
  "Costs",
  "Planning",
  "Safety",
  "Visas",
  "Recovery",
  "Transplants",
  "Spine",
  "Bariatric",
  "Eyes",
  "Dental",
  "Cosmetic",
  "Neurology",
  "Hearing",
  "Fertility",
  "Cancer",
  "Cities",
  "Second opinions",
];

function categoryId(name: string) {
  return `guides-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/blog",
    title: "Patient Guides | TechDr",
    description:
      "2026 guides on treatment costs in India, hospital checks, visas, quotes, insurance, companions and what to carry home after surgery.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const articles = await getArticles();
  const groups = new Map<string, typeof articles>();
  for (const article of articles) {
    const list = groups.get(article.category) ?? [];
    list.push(article);
    groups.set(article.category, list);
  }
  const sections = [...groups.entries()].sort((a, b) => {
    const ai = categoryOrder.indexOf(a[0]);
    const bi = categoryOrder.indexOf(b[0]);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi) || a[0].localeCompare(b[0]);
  });

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ name: "Guides", path: "/blog" }]} />
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <h1>Guides for international patients</h1>
        <p className="mt-3 max-w-2xl text-muted">
          {articles.length} practical articles from the TechDr editorial team. They are information, not a personal medical plan.
        </p>
        <nav aria-label="Guide categories" className="chip-row mt-6 flex gap-2 overflow-x-auto pb-1">
          {sections.map(([name, items]) => (
            <a key={name} href={`#${categoryId(name)}`} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium">
              {name}
              <span className="text-muted">{items.length}</span>
            </a>
          ))}
        </nav>
        <div className="mt-10 space-y-12">
          {sections.map(([name, items]) => (
            <section key={name} id={categoryId(name)} className="blog-section scroll-mt-24">
              <h2>{name}</h2>
              <ul className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {items.map((article) => (
                  <li key={article.slug} className="blog-card">
                    <Link href={`/blog/${article.slug}`} className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 hover:border-primary">
                      <h2 className="mt-0" style={{ fontSize: "1.2rem", lineHeight: 1.35, letterSpacing: "-0.02em" }}>{article.title}</h2>
                      <p className="mt-2 line-clamp-3 text-sm text-muted">{article.description}</p>
                      <p className="mt-4 text-sm text-muted">{formatUpdated(article.updated, locale)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
