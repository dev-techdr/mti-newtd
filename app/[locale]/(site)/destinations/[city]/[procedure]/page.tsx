import { notFound, permanentRedirect } from "next/navigation";
import { PageSuspense } from "@/components/ui/PageFallback";
import { setRequestLocale } from "next-intl/server";
import { getCity, treatmentCities } from "@/data/cities";
import { getProcedure, procedurePath, procedures } from "@/data/procedures";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/seo";

/** One sample so the route can be validated. Other city × procedure URLs redirect on request. */
export function generateStaticParams() {
  const city = treatmentCities()[0];
  const procedure = procedures[0];
  return routing.locales.map((locale) => ({ locale, city: city.path, procedure: procedure.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string; procedure: string }>;
}) {
  const { procedure: procedureSlug } = await params;
  const procedure = getProcedure(procedureSlug);
  if (!procedure) return {};
  return { robots: { index: false, follow: true } };
}

type ProcedureParams = {
  params: Promise<{ locale: string; city: string; procedure: string }>;
};

export default function Page(props: ProcedureParams) {
  return (
    <PageSuspense>
      <CityProcedurePage {...props} />
    </PageSuspense>
  );
}

async function CityProcedurePage({ params }: ProcedureParams) {
  const { locale, city: citySlug, procedure: procedureSlug } = await params;
  setRequestLocale(locale);
  const city = getCity(citySlug);
  const procedure = getProcedure(procedureSlug);
  if (!city || !procedure || !treatmentCities().some((item) => item.slug === city.slug)) notFound();
  permanentRedirect(localizedPath(locale, procedurePath(procedure)));
  return null;
}
