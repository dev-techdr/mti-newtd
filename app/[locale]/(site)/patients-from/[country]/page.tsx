import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/templates/GuideArticle";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { countries, getCountry } from "@/data/countries";
import { routing } from "@/i18n/routing";
import { countryModel } from "@/lib/page-model";
import { guideGraph } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => countries.map((country) => ({ locale, country: country.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; country: string }> }) {
  const { locale, country: slug } = await params;
  const country = getCountry(slug);
  if (!country) return {};
  return pageMetadata({
    locale,
    path: `/patients-from/${slug}`,
    title: `Treatment in India from ${country.name} | TechDr`.slice(0, 60),
    description: country.description,
  });
}

type CountryParams = { params: Promise<{ locale: string; country: string }> };

export default function Page(props: CountryParams) {
  return (
    <PageSuspense>
      <CountryPage {...props} />
    </PageSuspense>
  );
}

async function CountryPage({ params }: CountryParams) {
  const { locale, country: slug } = await params;
  setRequestLocale(locale);
  const country = getCountry(slug);
  if (!country) notFound();
  const model = countryModel(country);
  const schema = guideGraph({
    url: absoluteUrl(locale, `/patients-from/${slug}`),
    name: model.h1,
    updated: model.updated,
    kind: "country",
    description: country.description,
    faqs: model.faqs,
  });
  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs locale={locale} items={[{ name: `Patients from ${country.name}`, path: `/patients-from/${slug}` }]} />
      <GuideArticle locale={locale} model={model} />
    </>
  );
}
