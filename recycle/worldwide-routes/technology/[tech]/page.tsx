import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { technologies } from "@/data/worldwide";
import { routing } from "@/i18n/routing";
import { DraftNotice, requireDraft } from "@/lib/draft-pages";
import { pageMetadata } from "@/lib/seo";

type TechParams = { params: Promise<{ locale: string; tech: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => technologies.map((item) => ({ locale, tech: item.slug })));
}

export async function generateMetadata({ params }: TechParams) {
  const { locale, tech } = await params;
  const record = technologies.find((item) => item.slug === tech);
  if (!record) return {};
  return pageMetadata({ locale, path: `/technology/${record.slug}`, title: record.title, description: record.title, index: false });
}

export default function Page(props: TechParams) {
  return (
    <PageSuspense>
      <TechPage {...props} />
    </PageSuspense>
  );
}

async function TechPage({ params }: TechParams) {
  const { locale, tech } = await params;
  setRequestLocale(locale);
  return <DraftNotice title={requireDraft(technologies, tech).title} />;
}
