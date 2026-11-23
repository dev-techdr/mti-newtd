import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { destinationSpecialties } from "@/data/worldwide";
import { routing } from "@/i18n/routing";
import { DraftNotice } from "@/lib/draft-pages";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    destinationSpecialties.flatMap((item) =>
      item.destination && item.specialty ? [{ locale, destination: item.destination, specialty: item.specialty }] : [],
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; destination: string; specialty: string }>;
}) {
  const { locale, destination, specialty } = await params;
  const record = destinationSpecialties.find((item) => item.destination === destination && item.specialty === specialty);
  if (!record) return {};
  return pageMetadata({
    locale,
    path: `/countries/${destination}/${specialty}`,
    title: record.title,
    description: record.title,
    index: false,
  });
}

type SpecialtyParams = { params: Promise<{ locale: string; destination: string; specialty: string }> };

export default function Page(props: SpecialtyParams) {
  return (
    <PageSuspense>
      <SpecialtyPage {...props} />
    </PageSuspense>
  );
}

async function SpecialtyPage({ params }: SpecialtyParams) {
  const { locale, destination, specialty } = await params;
  setRequestLocale(locale);
  const record = destinationSpecialties.find((item) => item.destination === destination && item.specialty === specialty);
  if (!record) notFound();
  return <DraftNotice title={record.title} />;
}
