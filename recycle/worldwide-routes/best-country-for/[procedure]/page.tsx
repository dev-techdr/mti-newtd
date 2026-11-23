import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { bestCountryGuides } from "@/data/worldwide";
import { routing } from "@/i18n/routing";
import { DraftNotice, requireDraft } from "@/lib/draft-pages";
import { pageMetadata } from "@/lib/seo";

type GuideParams = { params: Promise<{ locale: string; procedure: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => bestCountryGuides.map((item) => ({ locale, procedure: item.slug })));
}

export async function generateMetadata({ params }: GuideParams) {
  const { locale, procedure } = await params;
  const record = bestCountryGuides.find((item) => item.slug === procedure);
  if (!record) return {};
  return pageMetadata({ locale, path: `/best-country-for/${record.slug}`, title: record.title, description: record.title, index: false });
}

export default function Page(props: GuideParams) {
  return (
    <PageSuspense>
      <GuidePage {...props} />
    </PageSuspense>
  );
}

async function GuidePage({ params }: GuideParams) {
  const { locale, procedure } = await params;
  setRequestLocale(locale);
  return <DraftNotice title={requireDraft(bestCountryGuides, procedure).title} />;
}
