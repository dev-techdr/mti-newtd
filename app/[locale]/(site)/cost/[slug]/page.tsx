import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { notFound } from "next/navigation";
import { PatientsFromLinks, RelatedAnswers } from "@/components/seo/PatientLinks";
import { GuideArticle } from "@/components/templates/GuideArticle";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCost, type CostId } from "@/data/costs";
import { isLibraryProcedure, procedures } from "@/data/procedures";
import { routing } from "@/i18n/routing";
import { costModel } from "@/lib/page-model";
import { guideGraph } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

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
    index: !isLibraryProcedure(procedure.slug),
    translated: procedure.translated,
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
  const model = costModel(procedure);
  const cost = getCost(procedure.costId as CostId);
  const schema = guideGraph({
    url: absoluteUrl(locale, `/cost/${slug}`),
    name: model.h1,
    updated: model.updated,
    kind: "cost",
    description: procedure.description,
    faqs: model.faqs,
    price: { min: cost.india[0], max: cost.india[1] },
  });
  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs locale={locale} items={[{ name: "Costs", path: "/treatments" }, { name: `${procedure.card} cost`, path: `/cost/${slug}` }]} />
      <GuideArticle locale={locale} model={model} />
      <PatientsFromLinks procedureSlug={procedure.slug} />
      <RelatedAnswers treatment={procedure.slug} />
    </>
  );
}
