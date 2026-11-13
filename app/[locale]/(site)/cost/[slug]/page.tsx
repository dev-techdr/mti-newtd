import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { AnswerBox, Byline, EstimateNote } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CostMark } from "@/components/ui/CostMark";
import { getCost, midpointSavings, moneyRange, type CostId } from "@/data/costs";
import { procedures, procedurePath, sharedExcluded } from "@/data/procedures";
import { routing } from "@/i18n/routing";
import { faqList } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    procedures.map((item) => ({ locale, slug: `${item.costId}-cost-in-india` })),
  );
}

function fromSlug(slug: string) {
  const suffix = "-cost-in-india";
  if (!slug.endsWith(suffix)) return undefined;
  const costId = slug.slice(0, -suffix.length);
  return procedures.find((item) => item.costId === costId);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const procedure = fromSlug(slug);
  if (!procedure) return {};
  const title = `${procedure.card} Cost in India 2026 | TechDr`;
  return pageMetadata({
    locale,
    path: `/cost/${slug}`,
    title: title.length > 60 ? `${procedure.card} Cost India 2026 | TechDr` : title,
    description: procedure.description,
  });
}

type CostParams = { params: Promise<{ locale: string; slug: string }> };

export default function Page(props: CostParams) {
  return (
    <PageSuspense>
      <CostPage {...props} />
    </PageSuspense>
  );
}

async function CostPage({ params }: CostParams) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const procedure = fromSlug(slug);
  if (!procedure) notFound();
  const cost = getCost(procedure.costId as CostId);
  const savings = midpointSavings(cost.india, cost.usa, Boolean(cost.usaLabel));
  const faqs = procedure.faqs.filter((item) => /cost|price|include|stay|quote/i.test(item.question)).slice(0, 8);
  const list = faqs.length >= 4 ? faqs : procedure.faqs.slice(0, 8);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...faqList(list) }} />
      <Breadcrumbs locale={locale} items={[{ name: "Costs", path: "/treatments" }, { name: `${procedure.card} cost`, path: `/cost/${slug}` }]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1>{procedure.card} cost in India in {site.year}</h1>
        <div className="mt-5"><CostMark size="panel" value={moneyRange(cost.india)} unit={cost.unit} note={`About ${savings}% below the US midpoint in our table. Not your invoice.`} /></div>
        <div className="mt-6"><AnswerBox>{procedure.answer}</AnswerBox></div>
        <p className="mt-6">The midpoint gap versus the US range in our table is about {savings}%. That is an illustration, not your invoice. A case quote can be higher if the operation is a revision, a donor is involved, or extra days in intensive care are required.</p>
        <div className="mt-4"><EstimateNote planning={!cost.guide} /></div>
        <h2 className="mt-10">What is the indicative range?</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="data-table">
            <caption>Indicative USD ranges for {cost.name}, {site.year}</caption>
            <thead><tr><th scope="col">India</th><th scope="col">USA</th><th scope="col">UK</th></tr></thead>
            <tbody><tr><td className="cost-cell">{moneyRange(cost.india)}</td><td>{moneyRange(cost.usa, cost.usaLabel)}</td><td>{moneyRange(cost.uk, cost.ukLabel)}</td></tr></tbody>
          </table>
        </div>
        <h2 className="mt-10">What does the quote usually include?</h2>
        <ul className="mt-3 list-disc ps-5">{procedure.included.map((item) => <li key={item}>{item}</li>)}</ul>
        <h2 className="mt-10">What is not included?</h2>
        <ul className="mt-3 list-disc ps-5">{[...procedure.excluded, ...sharedExcluded].map((item) => <li key={item}>{item}</li>)}</ul>
        <h2 className="mt-10">Which factors move the price?</h2>
        <ul className="mt-3 list-disc ps-5">{procedure.factors.map((item) => <li key={item}>{item}</li>)}</ul>
        <p className="mt-6"><Link className="text-primary-ink underline" href={procedurePath(procedure)}>Read the clinical guide, including risks and recovery</Link></p>
        <h2 className="mt-10">Cost questions</h2>
        <div className="mt-4"><FaqList items={list} /></div>
        <Button className="mt-8" href={`/get-a-free-quote?procedure=${procedure.slug}`}>Get a free quote</Button>
        <Byline locale={locale} updated={procedure.updated} />
      </article>
    </>
  );
}
