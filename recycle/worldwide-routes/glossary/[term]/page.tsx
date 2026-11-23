import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { glossaryTerms } from "@/data/worldwide";
import { routing } from "@/i18n/routing";
import { DraftNotice, requireDraft } from "@/lib/draft-pages";
import { pageMetadata } from "@/lib/seo";

type TermParams = { params: Promise<{ locale: string; term: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => glossaryTerms.map((item) => ({ locale, term: item.slug })));
}

export async function generateMetadata({ params }: TermParams) {
  const { locale, term } = await params;
  const record = glossaryTerms.find((item) => item.slug === term);
  if (!record) return {};
  return pageMetadata({ locale, path: `/glossary/${record.slug}`, title: record.title, description: record.title, index: false });
}

export default function Page(props: TermParams) {
  return (
    <PageSuspense>
      <TermPage {...props} />
    </PageSuspense>
  );
}

async function TermPage({ params }: TermParams) {
  const { locale, term } = await params;
  setRequestLocale(locale);
  return <DraftNotice title={requireDraft(glossaryTerms, term).title} />;
}
