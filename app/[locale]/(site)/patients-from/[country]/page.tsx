import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/templates/GuideArticle";
import { CountryChildLinks, RelatedAnswers } from "@/components/seo/PatientLinks";
import { AnswerBox } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { countries, getCountry } from "@/data/countries";
import { FareTreatmentLinks } from "@/components/patients/FareTreatments";
import { fareLine } from "@/data/patients/fare-treatments";
import { fareSource, indiaFareFor, indiaFares } from "@/data/patients/india-fares";
import { getPatientCountry } from "@/data/patients/load";
import { isCountryIndexable } from "@/data/patients/publish";
import { routing } from "@/i18n/routing";
import { countryModel } from "@/lib/page-model";
import { guideGraph } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  const slugs = new Set([...countries.map((country) => country.slug), ...indiaFares.map((fare) => fare.slug)]);
  return routing.locales.flatMap((locale) => [...slugs].map((country) => ({ locale, country })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; country: string }> }) {
  const { locale, country: slug } = await params;
  const country = getCountry(slug);
  const fare = indiaFareFor(slug);
  if (!country && fare) {
    return pageMetadata({
      locale,
      path: `/patients-from/${slug}`,
      title: `Treatment in India from ${fare.name} | TechDr`,
      description: `Patients from ${fare.name}: India treatment guides and the Skyscanner economy fare to Mumbai or New Delhi.`,
    });
  }
  if (!country) return {};
  return pageMetadata({
    locale,
    path: `/patients-from/${slug}`,
    title: `Treatment in India from ${country.name} | TechDr`.slice(0, 60),
    description: country.description,
    index: Boolean(fare) || isCountryIndexable(slug),
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
  const fare = indiaFareFor(slug);
  if (!country && fare) {
    return (
      <>
        <Breadcrumbs locale={locale} items={[{ name: "Patients from", path: "/patients-from" }, { name: fare.name, path: `/patients-from/${slug}` }]} />
        <article className="mx-auto max-w-3xl px-4 py-10">
          <h1>Treatment in India for patients from {fare.name}</h1>
          <div className="mt-6">
            <AnswerBox>{`Patients leaving ${fare.name} use the India treatment guides below. A recent economy fare to ${fare.arrivals ?? "Mumbai or New Delhi"} is ${fareLine(fare)}. ${fareSource(fare)}`}</AnswerBox>
          </div>
        </article>
        <FareTreatmentLinks country={slug} />
      </>
    );
  }
  if (!country) notFound();
  const model = countryModel(country);
  const record = getPatientCountry(slug);
  const reviewed = Boolean(record?.reviewed.by && record.reviewed.date);
  const schema = guideGraph({
    url: absoluteUrl(locale, `/patients-from/${slug}`),
    name: model.h1,
    updated: reviewed && record?.reviewed.date ? record.reviewed.date : model.updated,
    kind: "country",
    description: country.description,
    faqs: model.faqs,
    reviewed,
    audience: country.name,
  });
  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs
        locale={locale}
        items={[
          { name: "Patients from", path: "/patients-from" },
          { name: country.name, path: `/patients-from/${slug}` },
        ]}
      />
      <GuideArticle locale={locale} model={model} />
      {fare ? <IndiaFareNote slug={slug} /> : null}
      {fare ? <FareTreatmentLinks country={slug} /> : null}
      <CountryChildLinks country={slug} />
      <RelatedAnswers country={slug} />
    </>
  );
}

function IndiaFareNote({ slug }: { slug: string }) {
  const fare = indiaFareFor(slug);
  if (!fare) return null;
  return (
    <p className="mx-auto max-w-3xl px-4 pb-4 text-sm text-muted">
      Starting economy fare from {fare.name}: {fareLine(fare)}. {fare.airlines ? `${fare.airlines}. ` : ""}{fareSource(fare)}
    </p>
  );
}
