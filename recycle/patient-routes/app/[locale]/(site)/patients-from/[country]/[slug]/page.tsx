import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { AnswerBox } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { getCost, moneyRange } from "@/data/costs";
import { fareLine, fareProcedures, fareTreatmentAnswer, fareTreatmentPairs } from "@/data/patients/fare-treatments";
import { fareSource, indiaFareFor } from "@/data/patients/india-fares";
import { costPath, getProcedure, procedurePath } from "@/data/procedures";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    fareTreatmentPairs().map((item) => ({ locale, country: item.country, slug: item.procedure })),
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; country: string; slug: string }> }) {
  const { locale, country, slug } = await params;
  const fare = indiaFareFor(country);
  const procedure = getProcedure(slug);
  if (!fare || !procedure || !fareProcedures().some((item) => item.slug === procedure.slug)) return {};
  const title = `${procedure.card} from ${fare.name} | TechDr`;
  return pageMetadata({
    locale,
    path: `/patients-from/${country}/${procedure.slug}`,
    title: title.length > 60 ? `${procedure.card} from ${fare.name}` : title,
    description: fareTreatmentAnswer(fare, procedure),
  });
}

type TreatmentParams = { params: Promise<{ locale: string; country: string; slug: string }> };

export default function Page(props: TreatmentParams) {
  return (
    <PageSuspense>
      <TreatmentFromCountry {...props} />
    </PageSuspense>
  );
}

async function TreatmentFromCountry({ params }: TreatmentParams) {
  const { locale, country, slug } = await params;
  setRequestLocale(locale);
  const fare = indiaFareFor(country);
  const procedure = getProcedure(slug);
  if (!fare || !procedure || !fareProcedures().some((item) => item.slug === procedure.slug)) notFound();
  const india = moneyRange(getCost(procedure.costId).india);
  const path = `/patients-from/${country}/${procedure.slug}`;
  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { name: "Patients from", path: "/patients-from" },
          { name: fare.name, path: `/patients-from/${country}` },
          { name: procedure.card, path },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1>{procedure.name} for patients from {fare.name}</h1>
        <div className="mt-6">
          <AnswerBox>{fareTreatmentAnswer(fare, procedure)}</AnswerBox>
        </div>
        <table className="mt-8 w-full text-sm">
          <caption className="mb-2 text-start font-semibold">Figures on file</caption>
          <tbody>
            <tr>
              <th scope="row" className="py-2 pe-4 text-start">India planning range</th>
              <td>{india}</td>
            </tr>
            <tr>
              <th scope="row" className="py-2 pe-4 text-start">Hospital stay</th>
              <td>{procedure.hospitalStay}</td>
            </tr>
            <tr>
              <th scope="row" className="py-2 pe-4 text-start">Time in India</th>
              <td>{procedure.totalStay}</td>
            </tr>
            <tr>
              <th scope="row" className="py-2 pe-4 text-start">Economy fare from {fare.name}</th>
              <td>{fareLine(fare)}. {fareSource(fare)}</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-6">
          <Link className="text-primary-ink underline" href={procedurePath(procedure)}>India guide</Link>
          {" · "}
          <Link className="text-primary-ink underline" href={costPath(procedure.costId)}>Cost in India</Link>
          {" · "}
          <Link className="text-primary-ink underline" href={`/patients-from/${country}`}>All treatments from {fare.name}</Link>
        </p>
      </article>
    </>
  );
}
