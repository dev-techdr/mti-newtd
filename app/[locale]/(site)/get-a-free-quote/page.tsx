import { setRequestLocale } from "next-intl/server";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { CostEstimator } from "@/components/sections/CostEstimator";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { procedures } from "@/data/procedures";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/get-a-free-quote",
    title: "Get a Free Treatment Quote | TechDr",
    description:
      "Send your reports for a free written opinion and an itemised estimate from accredited hospitals in India within 48 hours.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ name: "Free quote", path: "/get-a-free-quote" }]} />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1>Get a free quote</h1>
          <p className="mt-3 text-muted">Send your reports and get a free written opinion and itemised estimate within 48 hours of a complete file.</p>
          <div className="mt-6">
            <QuoteForm treatments={procedures.map((item) => ({ slug: item.slug, name: item.name }))} />
          </div>
        </div>
        <CostEstimator />
      </div>
    </>
  );
}
