import { notFound, permanentRedirect } from "next/navigation";
import { PageSuspense } from "@/components/ui/PageFallback";
import { setRequestLocale } from "next-intl/server";
import { treatmentCities, getCity } from "@/data/cities";
import { guidesForSpecialty } from "@/data/procedures";
import { getSpecialty, specialties } from "@/data/specialties";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/seo";

/** One sample so the route can be validated. Other city × department URLs redirect on request. */
export function generateStaticParams() {
  const city = treatmentCities()[0];
  const specialty = specialties.find((item) => guidesForSpecialty(item.slug).length > 0) ?? specialties[0];
  return routing.locales.map((locale) => ({ locale, city: city.path, specialty: specialty.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string; specialty: string }>;
}) {
  const { specialty: specialtySlug } = await params;
  const specialty = getSpecialty(specialtySlug);
  if (!specialty) return {};
  return { robots: { index: false, follow: true } };
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
  permanentRedirect(localizedPath(locale, `/treatments/${specialty.slug}`));
  return null;
}
