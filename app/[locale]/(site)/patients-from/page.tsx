import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AnswerBox } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { countryLine, directoryIntro, directoryQuickAnswer } from "@/data/patients/directory";
import { indiaFares, oneWayLabel, returnLabel } from "@/data/patients/india-fares";
import { patientCountries } from "@/data/patients/load";
import { indexableCityRecords, isCountryIndexable } from "@/data/patients/publish";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/patients-from",
    title: "Patients travelling to India | TechDr",
    description: directoryQuickAnswer,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const cities = indexableCityRecords();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Medical treatment in India by country",
          url: absoluteUrl(locale, "/patients-from"),
          publisher: { "@id": `${site.url}/#organization` },
        }}
      />
      <Breadcrumbs locale={locale} items={[{ name: "Patients from", path: "/patients-from" }]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1>Medical treatment in India by country</h1>
        <div className="mt-6">
          <AnswerBox>{directoryQuickAnswer}</AnswerBox>
        </div>
        {directoryIntro.map((paragraph) => (
          <p key={paragraph} className="mt-4">{paragraph}</p>
        ))}
        <h2 className="mt-10">Countries</h2>
        <ul className="mt-4 space-y-4">
          {patientCountries.map((record) => (
            <li key={record.slug}>
              {isCountryIndexable(record.slug) ? (
                <Link className="font-semibold text-primary-ink underline" href={`/patients-from/${record.slug}`}>{record.name}</Link>
              ) : (
                <span className="font-semibold">{record.name}</span>
              )}
              <p className="mt-1">{countryLine(record)}</p>
            </li>
          ))}
        </ul>
        <h2 className="mt-10">Starting fares to India</h2>
        <p className="mt-2 text-sm text-muted">Each country page states where its fare came from. A listed fare is a starting benchmark, not a ticket TechDr sells.</p>
        <table className="mt-4 w-full text-sm">
          <caption className="sr-only">Economy starting fares from each country to Mumbai or New Delhi</caption>
          <thead>
            <tr className="border-b border-border text-start">
              <th className="py-2 pe-3 text-start">Country</th>
              <th className="py-2 pe-3 text-start">One-way from</th>
              <th className="py-2 pe-3 text-start">Return from</th>
              <th className="py-2 text-start">Airlines noted</th>
            </tr>
          </thead>
          <tbody>
            {indiaFares.map((fare) => {
              return (
                <tr key={fare.slug} className="border-b border-border">
                  <th scope="row" className="py-2 pe-3 text-start font-medium">
                    {isCountryIndexable(fare.slug) ? (
                      <Link className="text-primary-ink underline" href={`/patients-from/${fare.slug}`}>{fare.name}</Link>
                    ) : (
                      fare.name
                    )}
                  </th>
                  <td className="py-2 pe-3">{oneWayLabel(fare)}</td>
                  <td className="py-2 pe-3">{returnLabel(fare)}</td>
                  <td className="py-2">{fare.airlines ?? "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {cities.length ? (
          <>
            <h2 className="mt-10">Cities with their own route notes</h2>
            <ul className="mt-4 space-y-2">
              {cities.map((city) => (
                <li key={`${city.country}/${city.slug}`}>
                  <Link className="text-primary-ink underline" href={`/patients-from/${city.country}/${city.slug}`}>{city.name}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </article>
    </>
  );
}
