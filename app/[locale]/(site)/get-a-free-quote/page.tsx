import { setRequestLocale } from "next-intl/server";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { CostEstimator } from "@/components/sections/CostEstimator";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/get-a-free-quote",
    title: "Get a Free Treatment Quote | TechDr",
    description:
      "Send your reports for a free India treatment plan. A case manager shares specialist opinions and a written USD estimate within 48 hours.",
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
          <p className="mt-3 text-muted">One short form. Add reports in any format. You will hear back within 48 hours of a complete submission.</p>
          <div className="mt-6"><QuoteForm /></div>
        </div>
        <CostEstimator />
      </div>
    </>
  );
}
