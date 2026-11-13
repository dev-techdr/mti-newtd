import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { AnswerBox, Byline } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { countries, getCountry } from "@/data/countries";
import { routing } from "@/i18n/routing";
import { faqList } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappHref } from "@/lib/site";

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
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...faqList(country.faqs) }} />
      <Breadcrumbs locale={locale} items={[{ name: `Patients from ${country.name}`, path: `/patients-from/${slug}` }]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1>Treatment in India for patients from {country.name}</h1>
        <div className="mt-6"><AnswerBox>{country.answer}</AnswerBox></div>
        <h2 className="mt-10">How long is the flight, and which cities do people use?</h2>
        <p className="mt-3">{country.flights}</p>
        <h2 className="mt-10">What visa should a {country.adjective} passport holder check?</h2>
        <p className="mt-3">{country.visa}</p>
        <p className="mt-3">Visa rules change. Always confirm on the <a className="text-primary-ink underline" href="https://indianvisaonline.gov.in/">official Indian visa portal</a>. Read the <Link className="text-primary-ink underline" href="/medical-visa-india">e-Medical Visa guide</Link>.</p>
        <h2 className="mt-10">Which languages can the case team use?</h2>
        <p className="mt-3">{country.language}</p>
        <h2 className="mt-10">How should you plan money?</h2>
        <p className="mt-3">{country.money}</p>
        <h2 className="mt-10">Which treatments do families from {country.name} usually ask about?</h2>
        <p className="mt-3">{country.treatments}</p>
        <h2 className="mt-10">What cultural and practical care can be arranged?</h2>
        <p className="mt-3">{country.culture}</p>
        <p className="mt-3">Your TechDr case manager is the contact for this corridor. WhatsApp and email stay on the same desk, so you are not passed to a different company at the airport.</p>
        <Button className="mt-6" href={whatsappHref(`Hello TechDr, I am writing from ${country.name} about treatment in India.`)} external>WhatsApp the case desk</Button>
        <h2 className="mt-10">Questions from {country.name}</h2>
        <div className="mt-4"><FaqList items={country.faqs} /></div>
        <Byline locale={locale} updated={site.updated} />
      </article>
    </>
  );
}
