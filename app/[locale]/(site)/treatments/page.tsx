import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { TreatmentSearch } from "@/components/sections/TreatmentSearch";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { cityPath, treatmentCities } from "@/data/cities";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { guidesForSpecialty, treatmentSearchItems } from "@/data/procedures";
import { specialties } from "@/data/specialties";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/treatments",
    title: "Treatments in India | TechDr",
    description:
      "Browse heart, joint, cancer, transplant, IVF and other treatment guides for India, with indicative 2026 USD ranges and written-quote advice.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const items = treatmentSearchItems();
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ name: "Treatments", path: "/treatments" }]} />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1>Treatments in India</h1>
        <p className="mt-3 max-w-3xl text-muted">Choose a department. Each department page lists its conditions and procedures. Search still finds a single guide. The written quote after your reports is the figure you can plan with.</p>
        <div className="mt-6 max-w-xl"><TreatmentSearch items={items} /></div>
        <h2 className="mt-10">Departments</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((specialty) => {
            const count = guidesForSpecialty(specialty.slug).length;
            return (
              <li key={specialty.slug}>
                <Link href={`/treatments/${specialty.slug}`} className="flex h-full items-start gap-3 rounded-2xl border border-border p-4 hover:bg-surface">
                  <ServiceIcon specialty={specialty.slug} size={40} />
                  <span>
                    <span className="block font-semibold text-primary-ink">{specialty.name}</span>
                    <span className="mt-1 block text-sm text-muted">{count} {count === 1 ? "guide" : "guides"}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <h2 className="mt-10">Browse by city</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {treatmentCities().map((city) => (
            <li key={city.path}>
              <Link className="inline-flex min-h-11 items-center rounded-full border border-border px-4" href={cityPath(city)}>Treatment in {city.searchName}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
