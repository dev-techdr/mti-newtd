import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { tests } from "@/data/worldwide";
import { routing } from "@/i18n/routing";
import { DraftNotice, requireDraft } from "@/lib/draft-pages";
import { pageMetadata } from "@/lib/seo";

type TestParams = { params: Promise<{ locale: string; test: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => tests.map((item) => ({ locale, test: item.slug })));
}

export async function generateMetadata({ params }: TestParams) {
  const { locale, test } = await params;
  const record = tests.find((item) => item.slug === test);
  if (!record) return {};
  return pageMetadata({ locale, path: `/tests/${record.slug}`, title: record.title, description: record.title, index: false });
}

export default function Page(props: TestParams) {
  return (
    <PageSuspense>
      <TestPage {...props} />
    </PageSuspense>
  );
}

async function TestPage({ params }: TestParams) {
  const { locale, test } = await params;
  setRequestLocale(locale);
  return <DraftNotice title={requireDraft(tests, test).title} />;
}
