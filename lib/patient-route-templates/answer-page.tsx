import { MDXRemote } from "next-mdx-remote/rsc";
import { priceMdx } from "@/components/ui/PriceText";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { PageSuspense } from "@/components/ui/PageFallback";
import { AnswerBox, Byline } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPatientCountry } from "@/data/patients/load";
import { routing } from "@/i18n/routing";
import { readyAnswerRecords } from "@/lib/answers";
import { getProcedure, procedurePath } from "@/data/procedures";
import { faqList } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => readyAnswerRecords().map((answer) => ({ locale, question: answer.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; question: string }> }) {
  const { locale, question } = await params;
  const answer = readyAnswerRecords().find((item) => item.slug === question);
  if (!answer) return {};
  const title = `${answer.question} | TechDr`;
  return pageMetadata({
    locale,
    path: `/answers/${answer.slug}`,
    title: title.length > 60 ? `${answer.question.slice(0, 48)} | TechDr` : title,
    description: answer.shortAnswer,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string; question: string }> }) {
  const { question } = await params;
  if (!readyAnswerRecords().some((item) => item.slug === question)) notFound();
  return (
    <PageSuspense>
      <AnswerPage params={params} />
    </PageSuspense>
  );
}

async function AnswerPage({ params }: { params: Promise<{ locale: string; question: string }> }) {
  const { locale, question } = await params;
  setRequestLocale(locale);
  const answer = readyAnswerRecords().find((item) => item.slug === question);
  if (!answer) notFound();
  const path = `/answers/${answer.slug}`;
  const audience = answer.countries.length === 1 ? getPatientCountry(answer.countries[0])?.name : undefined;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "MedicalWebPage",
              url: absoluteUrl(locale, path),
              name: answer.question,
              description: answer.shortAnswer,
              lastReviewed: answer.updatedDate,
              publisher: { "@id": `${site.url}/#organization` },
              ...(audience ? { audience: { "@type": "Patient", geographicArea: { "@type": "Country", name: audience } } } : {}),
            },
            faqList([{ question: answer.question, answer: answer.shortAnswer }]),
          ],
        }}
      />
      <Breadcrumbs locale={locale} items={[{ name: "Answers", path: "/answers" }, { name: answer.question, path }]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1>{answer.question}</h1>
        <div className="mt-6">
          <AnswerBox>{answer.shortAnswer}</AnswerBox>
        </div>
        <div className="mt-6 space-y-4">
          <MDXRemote source={answer.body} components={priceMdx} />
        </div>
        <h2 className="mt-10">Sources</h2>
        <ul className="mt-3 list-disc space-y-2 ps-5">
          {answer.sources.map((source) => (
            <li key={source.href}>
              <a className="text-primary-ink underline" href={source.href}>{source.label}</a>
            </li>
          ))}
        </ul>
        <h2 className="mt-10">Related pages</h2>
        <ul className="mt-3 space-y-2">
          {answer.countries.flatMap((slug) => {
            const country = getPatientCountry(slug);
            return country ? [{ href: `/patients-from/${slug}`, label: `Patients from ${country.name}` }] : [];
          }).map((item) => (
            <li key={item.href}><Link className="text-primary-ink underline" href={item.href}>{item.label}</Link></li>
          ))}
          {answer.treatments.flatMap((slug) => {
            const procedure = getProcedure(slug);
            return procedure ? [{ href: procedurePath(procedure), label: procedure.name }] : [];
          }).map((item) => (
            <li key={item.href}><Link className="text-primary-ink underline" href={item.href}>{item.label}</Link></li>
          ))}
        </ul>
        <Byline locale={locale} updated={answer.updatedDate} note={`Reviewed by ${answer.reviewedBy}.`} />
      </article>
    </>
  );
}
