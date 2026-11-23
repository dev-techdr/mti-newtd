import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { destinationCities } from "@/data/worldwide";
import { routing } from "@/i18n/routing";
import { DraftNotice } from "@/lib/draft-pages";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    destinationCities.flatMap((item) =>
      item.destination ? [{ locale, destination: item.destination, city: item.slug }] : [],
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; destination: string; city: string }>;
}) {
  const { locale, destination, city } = await params;
  const record = destinationCities.find((item) => item.destination === destination && item.slug === city);
  if (!record) return {};
  return pageMetadata({
    locale,
    path: `/countries/${destination}/cities/${city}`,
    title: record.title,
    description: record.title,
    index: false,
  });
}

type CityParams = { params: Promise<{ locale: string; destination: string; city: string }> };

export default function Page(props: CityParams) {
  return (
    <PageSuspense>
      <CityPage {...props} />
    </PageSuspense>
  );
}

async function CityPage({ params }: CityParams) {
  const { locale, destination, city } = await params;
  setRequestLocale(locale);
  const record = destinationCities.find((item) => item.destination === destination && item.slug === city);
  if (!record) notFound();
  return <DraftNotice title={record.title} />;
}
