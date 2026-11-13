import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { cityPath, treatmentCities, type City } from "@/data/cities";
import { guidesForSpecialty, procedurePath } from "@/data/procedures";
import type { Specialty } from "@/data/specialties";
import { citySpecialtyPath, cityTreatmentPath } from "@/lib/city-treatments";
import { absoluteUrl } from "@/lib/seo";

export function CityDepartment({
  locale,
  city,
  specialty,
}: {
  locale: string;
  city: City;
  specialty: Specialty;
}) {
  const items = guidesForSpecialty(specialty.slug);
  const indexed = treatmentCities().some((item) => item.slug === city.slug);
  const path = citySpecialtyPath(city, specialty);
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalWebPage",
            name: `${specialty.name} in ${city.searchName}`,
            url: absoluteUrl(locale, path),
            description: specialty.description,
            spatialCoverage: { "@type": "City", name: city.searchName, containedInPlace: { "@type": "Country", name: "India" } },
          },
          {
            "@type": "ItemList",
            name: `${specialty.name} in ${city.searchName}`,
            itemListElement: items.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: indexed ? `${item.label} in ${city.searchName}` : item.label,
              url: absoluteUrl(locale, indexed ? cityTreatmentPath(city, item.procedure) : procedurePath(item.procedure)),
            })),
          },
        ],
      }} />
      <Breadcrumbs locale={locale} items={[
        { name: `Treatment in ${city.searchName}`, path: cityPath(city) },
        { name: specialty.name, path },
      ]} />
      <article className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-center gap-4">
          <ServiceIcon specialty={specialty.slug} size={64} />
          <h1>{specialty.name} in {city.searchName}</h1>
        </div>
        <p className="mt-6 max-w-3xl text-muted">
          {indexed
            ? `Each name opens the ${city.searchName} guide, with the airport and a planning range. The written quote names the campus.`
            : `Each name opens the India guide. The written quote names the campus in ${city.searchName}.`}
        </p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.key}>
              <Link
                className="flex min-h-11 items-center rounded-xl border border-border px-4 py-3 font-medium text-primary-ink hover:bg-surface"
                href={indexed ? cityTreatmentPath(city, item.procedure) : procedurePath(item.procedure)}
              >
                {indexed ? `${item.label} in ${city.searchName}` : item.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link className="text-primary-ink underline" href={cityPath(city)}>All departments in {city.searchName}</Link>
        </p>
      </article>
    </>
  );
}
