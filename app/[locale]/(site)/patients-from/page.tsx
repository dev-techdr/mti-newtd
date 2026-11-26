import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AnswerBox } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { countryLine, directoryIntro, directoryQuickAnswer } from "@/data/patients/directory";
import { indiaFares, oneWayLabel, returnLabel } from "@/data/patients/india-fares";
import { patientCountries } from "@/data/patients/load";
import { indexableCityRecords } from "@/data/patients/publish";
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
      <article className="mx-auto w-full max-w-6xl px-4 py-10">
        <h1 className="max-w-3xl text-balance">Medical treatment in India by country</h1>
        <div className="mt-6 max-w-3xl">
          <AnswerBox>{directoryQuickAnswer}</AnswerBox>
        </div>
        {directoryIntro.map((paragraph) => (
          <p key={paragraph} className="mt-4 max-w-3xl">{paragraph}</p>
        ))}
        <h2 className="mt-10">Countries</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {patientCountries.map((record) => (
            <li key={record.slug} className="rounded-2xl border border-border bg-card p-4">
              <Link className="font-semibold text-primary-ink underline" href={`/patients-from/${record.slug}`}>{record.name}</Link>
              <p className="mt-2 text-sm leading-relaxed text-muted">{countryLine(record)}</p>
            </li>
          ))}
        </ul>
        <h2 className="mt-10">Starting fares to India</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">Each country page states where its fare came from. A listed fare is a starting benchmark, not a ticket TechDr sells.</p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
        <table className="data-table min-w-[40rem]">
          <caption className="sr-only">Economy starting fares from each country to Mumbai or New Delhi</caption>
          <thead>
            <tr>
              <th scope="col">Country</th>
              <th scope="col">One-way from</th>
              <th scope="col">Return from</th>
              <th scope="col">Airlines noted</th>
            </tr>
          </thead>
          <tbody>
            {indiaFares.map((fare) => {
              return (
                <tr key={fare.slug}>
                  <th scope="row">
                    <Link className="text-primary-ink underline" href={`/patients-from/${fare.slug}`}>{fare.name}</Link>
                  </th>
                  <td>{oneWayLabel(fare)}</td>
                  <td>{returnLabel(fare)}</td>
                  <td>{fare.airlines ?? "Not listed"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        {cities.length ? (
          <>
            <h2 className="mt-10">Cities with their own route notes</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((city) => (
                <li key={`${city.country}/${city.slug}`}>
                  <Link className="block rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-primary-ink hover:bg-surface" href={`/patients-from/${city.country}/${city.slug}`}>{city.name}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </article>
    </>
  );
}
