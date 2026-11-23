import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Byline } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getArticle, getArticles } from "@/lib/articles";
import { routing } from "@/i18n/routing";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { priceMdx, PriceText } from "@/components/ui/PriceText";
import { formatUpdated, readingMinutes } from "@/lib/utils";

function headingText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(headingText).join("");
  if (node && typeof node === "object" && "props" in node) return headingText((node as { props?: { children?: ReactNode } }).props?.children);
  return "";
}

function headingId(text: string) {
  return text.toLowerCase().replace(/&amp;/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function guideHeadings(content: string) {
  return content
    .split("\n")
    .filter((line) => /^##\s+/.test(line))
    .map((line) => {
      const text = line.replace(/^##\s+/, "").trim();
      return { text, id: headingId(text) };
    })
    .filter((item) => item.id);
}

function GuideHeading({ children }: { children?: ReactNode }) {
  return <h2 id={headingId(headingText(children))}>{children}</h2>;
}

function QuickAnswer({ children }: { children?: ReactNode }) {
  return (
    <section id="quick-answer" aria-label="Quick answer" className="mt-7 rounded-2xl border border-primary/30 bg-surface p-5 text-lg leading-relaxed">
      <span className="block text-sm font-semibold uppercase tracking-wide text-primary-ink">Quick answer</span>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function withQuickAnswer(content: string) {
  return content.replace(/<section id="quick-answer"[^>]*>[\s\S]*?<\/section>/, (block) => {
    const inner = block.replace(/^<section[^>]*>/, "").replace(/<\/section>$/, "").trim();
    return `<QuickAnswer>\n\n${inner}\n\n</QuickAnswer>`;
  });
}

function Contents({ items }: { items: { text: string; id: string }[] }) {
  if (!items.length) return null;
  return (
    <ol className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={item.id}>
          <a href={`#${item.id}`} className="text-foreground/80 hover:text-foreground hover:underline">{item.text}</a>
        </li>
      ))}
    </ol>
  );
}

export async function generateStaticParams() {
  const slugs = (await getArticles()).map((article) => article.slug);
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: article.title.length > 60 ? `${article.title.slice(0, 48)} | TechDr` : `${article.title} | TechDr`.slice(0, 60),
    description: article.description,
    type: "article",
  });
}

type ArticleParams = { params: Promise<{ locale: string; slug: string }> };

export default function Page(props: ArticleParams) {
  return (
    <PageSuspense>
      <ArticlePage {...props} />
    </PageSuspense>
  );
}

async function ArticlePage({ params }: ArticleParams) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = await getArticle(slug);
  if (!article) notFound();
  const articles = await getArticles();
  const headings = guideHeadings(article.content);
  const related = articles.filter((item) => item.slug !== article.slug && item.category === article.category).slice(0, 3);
  const url = absoluteUrl(locale, `/blog/${slug}`);
  const minutes = readingMinutes(article.content);

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        datePublished: article.date,
        dateModified: article.updated,
        author: { "@type": "Organization", name: "TechDr Editorial Team" },
        publisher: { "@type": "Organization", name: site.name, url: site.url },
        mainEntityOfPage: url,
        description: article.description,
      }} />
      <Breadcrumbs locale={locale} items={[{ name: "Guides", path: "/blog" }, { name: article.title, path: `/blog/${slug}` }]} />
      <PriceText>
      <article className="mx-auto grid w-full max-w-6xl items-start gap-10 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="min-w-0">
          <p className="text-sm font-medium text-primary-ink">{article.category}</p>
          <h1 className="mt-2 max-w-3xl">{article.title}</h1>
          <p className="mt-3 text-sm text-muted">
            Updated {formatUpdated(article.updated, locale)} · {minutes} min read
          </p>
          <details className="mt-6 rounded-2xl border border-border bg-card p-4 lg:hidden">
            <summary className="cursor-pointer text-sm font-semibold">On this page</summary>
            <nav aria-label="On this page" className="mt-3"><Contents items={headings} /></nav>
          </details>
          <div className="richtext">
            <MDXRemote source={withQuickAnswer(article.content)} components={{ ...priceMdx, h2: GuideHeading, QuickAnswer }} />
          </div>
          <Byline locale={locale} updated={article.updated} />
          {related.length ? (
            <section className="mt-10 border-t border-border pt-8">
              <h2 className="blog-kicker" style={{ fontSize: "1.35rem", lineHeight: 1.3 }}>More in {article.category}</h2>
              <ul className="mt-4 grid gap-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/blog/${item.slug}`} className="block rounded-2xl border border-border bg-card p-4 hover:border-primary">
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-muted">{item.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
        <aside className="hidden self-stretch lg:block">
          <div className="sticky top-24 z-20 max-h-[calc(100dvh-7.5rem)] overflow-y-auto rounded-2xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-primary-ink">On this page</p>
            <nav aria-label="On this page" className="mt-3"><Contents items={headings} /></nav>
          </div>
        </aside>
      </article>
      </PriceText>
    </>
  );
}
