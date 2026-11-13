import { notFound, permanentRedirect } from "next/navigation";
import { PageSuspense } from "@/components/ui/PageFallback";
import { setRequestLocale } from "next-intl/server";
import { CityTreatment } from "@/components/templates/CityTreatment";
import { getCity, treatmentCities } from "@/data/cities";
import { getProcedure, procedures } from "@/data/procedures";
import { routing } from "@/i18n/routing";
import { cityTreatmentDescription, cityTreatmentPath, cityTreatmentTitle } from "@/lib/city-treatments";
import { localizedPath, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    treatmentCities().flatMap((city) =>
      procedures.map((procedure) => ({ locale, city: city.path, procedure: procedure.slug })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string; procedure: string }>;
}) {
  const { locale, city: citySlug, procedure: procedureSlug } = await params;
  const city = getCity(citySlug);
  const procedure = getProcedure(procedureSlug);
  if (!city || !procedure || !treatmentCities().some((item) => item.slug === city.slug)) return {};
  return pageMetadata({
    locale,
    path: cityTreatmentPath(city, procedure),
    title: cityTreatmentTitle(city, procedure),
    description: cityTreatmentDescription(city, procedure),
  });
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
  if (citySlug !== city.path) {
    permanentRedirect(localizedPath(locale, cityTreatmentPath(city, procedure)));
  }
  return <CityTreatment locale={locale} city={city} procedure={procedure} />;
}
