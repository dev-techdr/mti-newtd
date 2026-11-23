import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { packages } from "@/data/worldwide";
import { routing } from "@/i18n/routing";
import { DraftNotice, requireDraft } from "@/lib/draft-pages";
import { pageMetadata } from "@/lib/seo";

type PackageParams = { params: Promise<{ locale: string; package: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => packages.map((item) => ({ locale, package: item.slug })));
}

export async function generateMetadata({ params }: PackageParams) {
  const { locale, package: slug } = await params;
  const record = packages.find((item) => item.slug === slug);
  if (!record) return {};
  return pageMetadata({ locale, path: `/medical-tourism-packages/${record.slug}`, title: record.title, description: record.title, index: false });
}

export default function Page(props: PackageParams) {
  return (
    <PageSuspense>
      <PackagePage {...props} />
    </PageSuspense>
  );
}

async function PackagePage({ params }: PackageParams) {
  const { locale, package: slug } = await params;
  setRequestLocale(locale);
  return <DraftNotice title={requireDraft(packages, slug).title} />;
}
