import { notFound, permanentRedirect } from "next/navigation";
import { PageSuspense } from "@/components/ui/PageFallback";
import { setRequestLocale } from "next-intl/server";
import { cities, cityPath, cityRouteParams, getCity } from "@/data/cities";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    cities.flatMap((city) => cityRouteParams(city).map((cityParam) => ({ locale, city: cityParam }))),
  );
}

type CityParams = { params: Promise<{ locale: string; city: string }> };

export default function Page(props: CityParams) {
  return (
    <PageSuspense>
      <DepartmentsRedirect {...props} />
    </PageSuspense>
  );
}

async function DepartmentsRedirect({ params }: CityParams) {
  const { locale, city: slug } = await params;
  setRequestLocale(locale);
  const city = getCity(slug);
  if (!city) notFound();
  permanentRedirect(localizedPath(locale, cityPath(city)));
  return null;
}
