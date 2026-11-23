import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { DestinationPage } from "@/components/templates/DestinationPage";
import { destinationIndexable, getDestination, publishedDestinations } from "@/data/destinations";
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
    path: `/countries/${destination.slug}`,
    title: `Treatment in ${destination.name} | TechDr`,
    description: `TechDr does not currently arrange treatment in ${destination.name}. India is the coordinated destination.`,
    index: destinationIndexable(destination),
  });
}

type DestinationParams = { params: Promise<{ locale: string; destination: string }> };

export default function Page(props: DestinationParams) {
  return (
    <PageSuspense>
      <HubPage {...props} />
    </PageSuspense>
  );
}

async function HubPage({ params }: DestinationParams) {
  const { locale, destination: slug } = await params;
  setRequestLocale(locale);
  const destination = getDestination(slug);
  if (!destination || destination.slug === "india") notFound();
  return <DestinationPage locale={locale} destination={destination} mode="hub" />;
}
