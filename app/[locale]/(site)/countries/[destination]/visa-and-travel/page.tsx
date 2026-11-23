import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { DestinationPage } from "@/components/templates/DestinationPage";
import { destinationIndexable, destinationVisaHref, getDestination, publishedDestinations } from "@/data/destinations";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => publishedDestinations.map((item) => ({ locale, destination: item.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; destination: string }> }) {
  const { locale, destination: slug } = await params;
  const destination = getDestination(slug);
  if (!destination || destination.slug === "india") return {};
  return pageMetadata({
    locale,
    path: destinationVisaHref(destination),
    title: `${destination.name} medical travel visa | TechDr`,
    description: `Visa rules for ${destination.name} are unpublished until an official source and a last-checked date are on the record.`,
    index: destinationIndexable(destination),
  });
}

type VisaParams = { params: Promise<{ locale: string; destination: string }> };

export default function Page(props: VisaParams) {
  return (
    <PageSuspense>
      <VisaPage {...props} />
    </PageSuspense>
  );
}

async function VisaPage({ params }: VisaParams) {
  const { locale, destination: slug } = await params;
  setRequestLocale(locale);
  const destination = getDestination(slug);
  if (!destination || destination.slug === "india") notFound();
  return <DestinationPage locale={locale} destination={destination} mode="visa" />;
}
