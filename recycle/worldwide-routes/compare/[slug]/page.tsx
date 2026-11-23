import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { comparisons } from "@/data/worldwide";
import { routing } from "@/i18n/routing";
import { DraftNotice, requireDraft } from "@/lib/draft-pages";
import { pageMetadata } from "@/lib/seo";

type CompareParams = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => comparisons.map((item) => ({ locale, slug: item.slug })));
}

export async function generateMetadata({ params }: CompareParams) {
  const { locale, slug } = await params;
  const record = comparisons.find((item) => item.slug === slug);
  if (!record) return {};
  return pageMetadata({ locale, path: `/compare/${record.slug}`, title: record.title, description: record.title, index: false });
}

export default function Page(props: CompareParams) {
  return (
    <PageSuspense>
      <ComparePage {...props} />
    </PageSuspense>
  );
}

async function ComparePage({ params }: CompareParams) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <DraftNotice title={requireDraft(comparisons, slug).title} />;
}
