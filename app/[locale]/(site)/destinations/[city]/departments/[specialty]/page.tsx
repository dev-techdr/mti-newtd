import { notFound, permanentRedirect } from "next/navigation";
import { PageSuspense } from "@/components/ui/PageFallback";
import { setRequestLocale } from "next-intl/server";
import { CityDepartment } from "@/components/templates/CityDepartment";
import { cities, cityRouteParams, getCity } from "@/data/cities";
import { guidesForSpecialty } from "@/data/procedures";
import { getSpecialty, specialties } from "@/data/specialties";
import { routing } from "@/i18n/routing";
import { citySpecialtyPath } from "@/lib/city-treatments";
import { localizedPath, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    cities.flatMap((city) =>
      cityRouteParams(city).flatMap((cityParam) =>
        specialties.map((specialty) => ({ locale, city: cityParam, specialty: specialty.slug })),
      ),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string; specialty: string }>;
}) {
  const { locale, city: citySlug, specialty: specialtySlug } = await params;
  const city = getCity(citySlug);
  const specialty = getSpecialty(specialtySlug);
  if (!city || !specialty || !guidesForSpecialty(specialty.slug).length) return {};
  const title = `${specialty.name} in ${city.searchName} | TechDr`;
  return pageMetadata({
    locale,
    path: citySpecialtyPath(city, specialty),
    title: title.length > 60 ? `${specialty.name} in ${city.searchName}` : title,
    description: `${specialty.name} guides for ${city.searchName}. ${specialty.description}`,
    index: false,
  });
}

type DepartmentParams = {
  params: Promise<{ locale: string; city: string; specialty: string }>;
};

export default function Page(props: DepartmentParams) {
  return (
    <PageSuspense>
      <DepartmentPage {...props} />
    </PageSuspense>
  );
}

async function DepartmentPage({ params }: DepartmentParams) {
  const { locale, city: citySlug, specialty: specialtySlug } = await params;
  setRequestLocale(locale);
  const city = getCity(citySlug);
  const specialty = getSpecialty(specialtySlug);
  if (!city || !specialty || !guidesForSpecialty(specialty.slug).length) notFound();
  if (citySlug !== city.path) permanentRedirect(localizedPath(locale, citySpecialtyPath(city, specialty)));
  return <CityDepartment locale={locale} city={city} specialty={specialty} />;
}
