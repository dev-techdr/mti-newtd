import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ServiceView } from "@/components/assistance/ServiceView";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { areaServedFor, getAssistanceService, publishedServices } from "@/data/assistance";
import { routing } from "@/i18n/routing";
import { assistanceGraph } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => publishedServices().map((service) => ({ locale, service: service.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; service: string }> }) {
  const { locale, service: slug } = await params;
  const service = getAssistanceService(slug);
  if (!service) return {};
  return pageMetadata({
    locale,
    path: `/medical-assistance/${service.slug}`,
    title: service.title,
    description: service.description,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string; service: string }> }) {
  const { locale, service: slug } = await params;
  const service = getAssistanceService(slug);
  if (!service) notFound();
  setRequestLocale(locale);
  const path = `/medical-assistance/${service.slug}`;
  return (
    <>
      <JsonLd
        data={assistanceGraph({
          url: absoluteUrl(locale, path),
          name: service.h1,
          description: service.description,
          faqs: service.faqs,
          areaServed: areaServedFor(service.slug),
        })}
      />
      <Breadcrumbs
        locale={locale}
        items={[
          { name: "Medical assistance", path: "/medical-assistance" },
          { name: service.label, path },
        ]}
      />
      <ServiceView locale={locale} service={service} />
    </>
  );
}
