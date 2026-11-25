import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageSuspense } from "@/components/ui/PageFallback";
import { GuideArticle } from "@/components/templates/GuideArticle";
import { AnswerBox } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
import { getCost, moneyRange } from "@/data/costs";
import { getCountry } from "@/data/countries";
import { fareLine, fareTreatmentAnswer, fareTreatmentPairs } from "@/data/patients/fare-treatments";
import { fareSource, indiaFareFor, type IndiaFare } from "@/data/patients/india-fares";
import { builtCountryChildPaths } from "@/data/patients/publish";
import { costPath, getProcedure, isLibraryProcedure, procedurePath, type Procedure } from "@/data/procedures";
import { routing } from "@/i18n/routing";
import { cityCorridorModel, treatmentCorridorModel } from "@/lib/patient-pages";
import { guideGraph } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type ChildParams = { params: Promise<{ locale: string; country: string; slug: string }> };

function corridorFor(country: string, slug: string) {
  return builtCountryChildPaths().find((item) => item.country === country && item.slug === slug);
}

function fareFor(country: string, slug: string) {
  const fare = indiaFareFor(country);
  const procedure = getProcedure(slug);
  if (!fare || !procedure || isLibraryProcedure(procedure.slug)) return null;
  return { fare, procedure };
}

/** Corridors are prerendered. One fare URL validates the shell; the rest render on request. */
export function generateStaticParams() {
  const seen = new Set<string>();
  const pairs: { country: string; slug: string }[] = [];
  const add = (country: string, slug: string) => {
    const key = `${country}/${slug}`;
    if (seen.has(key)) return;
    seen.add(key);
    pairs.push({ country, slug });
  };
  for (const item of builtCountryChildPaths()) add(item.country, item.slug);
  const sample = fareTreatmentPairs()[0];
  if (sample) add(sample.country, sample.procedure);
  return routing.locales.flatMap((locale) => pairs.map((item) => ({ locale, country: item.country, slug: item.slug })));
}

export async function generateMetadata({ params }: ChildParams) {
  const { locale, country, slug } = await params;
  const path = `/patients-from/${country}/${slug}`;
  const corridor = corridorFor(country, slug);
  if (corridor && getCountry(country)) {
    const model = corridor.kind === "treatment" ? treatmentCorridorModel(country, slug) : cityCorridorModel(country, slug);
    const title = `${model.h1} | TechDr`;
    return pageMetadata({
      locale,
      path,
      title: title.length > 60 ? model.h1.slice(0, 60) : title,
      description: model.quickAnswer,
      index: false,
    });
  }
  const fare = fareFor(country, slug);
  if (!fare) return {};
  const title = `${fare.procedure.card} from ${fare.fare.name} | TechDr`;
  return pageMetadata({
    locale,
    path,
    title: title.length > 60 ? `${fare.procedure.card} from ${fare.fare.name}` : title,
    description: fareTreatmentAnswer(fare.fare, fare.procedure),
    index: false,
  });
}

export default function Page(props: ChildParams) {
  return (
    <PageSuspense>
      <ChildPage {...props} />
    </PageSuspense>
  );
}

async function ChildPage({ params }: ChildParams) {
  const { locale, country: countrySlug, slug } = await params;
  setRequestLocale(locale);
  const corridor = corridorFor(countrySlug, slug);
  if (corridor && getCountry(countrySlug)) return <CorridorPage locale={locale} countrySlug={countrySlug} slug={slug} kind={corridor.kind} />;
  const fare = fareFor(countrySlug, slug);
  if (fare) return <FarePage locale={locale} countrySlug={countrySlug} fare={fare.fare} procedure={fare.procedure} />;
  notFound();
}

function CorridorPage({
  locale,
  countrySlug,
  slug,
  kind,
}: {
  locale: string;
  countrySlug: string;
  slug: string;
  kind: "treatment" | "city";
}) {
  const country = getCountry(countrySlug);
  if (!country) notFound();
  const model = kind === "treatment" ? treatmentCorridorModel(countrySlug, slug) : cityCorridorModel(countrySlug, slug);
  const path = `/patients-from/${countrySlug}/${slug}`;
  return (
    <>
      <JsonLd
        data={guideGraph({
          url: absoluteUrl(locale, path),
          name: model.h1,
          updated: model.updated,
          kind: "country",
          description: model.quickAnswer,
          faqs: model.faqs,
          reviewed: false,
          audience: country.name,
        })}
      />
      <Breadcrumbs
        locale={locale}
        items={[
          { name: "Patients from", path: "/patients-from" },
          { name: country.name, path: `/patients-from/${countrySlug}` },
          { name: model.h1, path },
        ]}
      />
      <GuideArticle locale={locale} model={model} />
    </>
  );
}

function FarePage({
  locale,
  countrySlug,
  fare,
  procedure,
}: {
  locale: string;
  countrySlug: string;
  fare: IndiaFare;
  procedure: Procedure;
}) {
  const india = moneyRange(getCost(procedure.costId).india);
  const path = `/patients-from/${countrySlug}/${procedure.slug}`;
  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { name: "Patients from", path: "/patients-from" },
          { name: fare.name, path: `/patients-from/${countrySlug}` },
          { name: procedure.card, path },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1>
          {procedure.name} for patients from {fare.name}
        </h1>
        <div className="mt-6">
          <AnswerBox>{fareTreatmentAnswer(fare, procedure)}</AnswerBox>
        </div>
        <table className="mt-8 w-full text-sm">
          <caption className="mb-2 text-start font-semibold">Figures on file</caption>
          <tbody>
            <tr>
              <th scope="row" className="py-2 pe-4 text-start">
                India planning range
              </th>
              <td>{india}</td>
            </tr>
            <tr>
              <th scope="row" className="py-2 pe-4 text-start">
                Hospital stay
              </th>
              <td>{procedure.hospitalStay}</td>
            </tr>
            <tr>
              <th scope="row" className="py-2 pe-4 text-start">
                Time in India
              </th>
              <td>{procedure.totalStay}</td>
            </tr>
            <tr>
              <th scope="row" className="py-2 pe-4 text-start">
                Economy fare from {fare.name}
              </th>
              <td>
                {fareLine(fare)}. {fareSource(fare)}
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mt-6">
          <Link className="text-primary-ink underline" href={procedurePath(procedure)}>
            India guide
          </Link>
          {" · "}
          <Link className="text-primary-ink underline" href={costPath(procedure.costId)}>
            Cost in India
          </Link>
          {" · "}
          <Link className="text-primary-ink underline" href={`/patients-from/${countrySlug}`}>
            All treatments from {fare.name}
          </Link>
        </p>
      </article>
    </>
  );
}
