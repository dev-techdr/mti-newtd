import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { notFound } from "next/navigation";
import { ProcedureArticle } from "@/components/templates/ProcedureArticle";
import { getProcedure, isLibraryProcedure, procedures } from "@/data/procedures";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    procedures.map((item) => ({ locale, specialty: item.specialty, procedure: item.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; specialty: string; procedure: string }>;
}) {
  const { locale, procedure: slug } = await params;
  const procedure = getProcedure(slug);
  if (!procedure) return {};
  const priced = `${procedure.card} Cost in India 2026 | TechDr`;
  const title = procedure.kind === "emergency"
    ? `${procedure.card} is an emergency | TechDr`
    : priced.length > 60
      ? `${procedure.card} in India 2026 | TechDr`
      : priced;
  return pageMetadata({
    locale,
    path: `/treatments/${procedure.specialty}/${procedure.slug}`,
    title,
    description: procedure.description,
    index: !isLibraryProcedure(procedure.slug),
    translated: procedure.translated,
  });
}

type ProcedureParams = {
  params: Promise<{ locale: string; specialty: string; procedure: string }>;
};

export default function Page(props: ProcedureParams) {
  return (
    <PageSuspense>
      <ProcedurePage {...props} />
    </PageSuspense>
  );
}

async function ProcedurePage({ params }: ProcedureParams) {
  const { locale, specialty, procedure: slug } = await params;
  const procedure = getProcedure(slug);
  if (!procedure || procedure.specialty !== specialty) notFound();
  setRequestLocale(locale);
  return <ProcedureArticle locale={locale} procedure={procedure} />;
}
