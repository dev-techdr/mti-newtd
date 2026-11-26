import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { EmergencyNotice } from "@/components/assistance/AssistanceCta";
import { AnswerBox } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { assistanceHub, assistanceUpdated, publishedServices } from "@/data/assistance";
import { assistanceGraph } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/medical-assistance",
    title: assistanceHub.title,
    description: assistanceHub.description,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const path = "/medical-assistance";
  return (
    <>
      <JsonLd
        data={assistanceGraph({
          url: absoluteUrl(locale, path),
          name: assistanceHub.h1,
          description: assistanceHub.description,
          faqs: [],
        })}
      />
      <Breadcrumbs locale={locale} items={[{ name: "Medical assistance", path }]} />
      <article className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="max-w-3xl">{assistanceHub.h1}</h1>
        <div className="mt-6 max-w-3xl">
          <AnswerBox>{assistanceHub.quickAnswer}</AnswerBox>
          <EmergencyNotice />
          <p className="mt-4 text-sm text-muted">Updated {assistanceUpdated}.</p>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {publishedServices().map((service) => (
            <li key={service.slug}>
              <Link className="block h-full rounded-2xl border border-border bg-card p-5 hover:bg-surface" href={`/medical-assistance/${service.slug}`}>
                <h2 className="text-xl">{service.label}</h2>
                <p className="mt-2 text-sm text-muted">{service.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink" href="/medical-assistance/request">
            Send a request
          </Link>
        </p>
      </article>
    </>
  );
}
