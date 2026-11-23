import { notFound, permanentRedirect } from "next/navigation";
import { PageSuspense } from "@/components/ui/PageFallback";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AnswerBox, Byline } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { TreatmentSearch } from "@/components/sections/TreatmentSearch";
import { FaqList } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cities, cityPath, cityRouteParams, getCity, treatmentCities } from "@/data/cities";
import { IndiaCityMap } from "@/components/maps/IndiaCityMap";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { guidesForSpecialty, treatmentSearchItems } from "@/data/procedures";
import { specialties } from "@/data/specialties";
import { routing } from "@/i18n/routing";
import { absoluteUrl, localizedPath, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    cities.flatMap((city) => cityRouteParams(city).map((cityParam) => ({ locale, city: cityParam }))),
  );
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string; city: string }> }) {
  const { locale, city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  const title = `Treatment in ${city.searchName} | TechDr`;
  return pageMetadata({ locale, path: cityPath(city), title, description: city.description });
}

type CityParams = { params: Promise<{ locale: string; city: string }> };

export default function Page(props: CityParams) {
  return (
    <PageSuspense>
      <CityPage {...props} />
    </PageSuspense>
  );
}

async function CityPage({ params }: CityParams) {
  const { locale, city: slug } = await params;
  setRequestLocale(locale);
  const city = getCity(slug);
  if (!city) notFound();
  if (slug !== city.path) permanentRedirect(localizedPath(locale, cityPath(city)));
  const indexed = treatmentCities().some((item) => item.slug === city.slug);
  const groups = specialties
    .map((specialty) => ({ specialty, count: guidesForSpecialty(specialty.slug).length }))
    .filter((group) => group.count > 0);
  const searchItems = treatmentSearchItems().map((item) => {
    const slug = item.href.split("/").at(-1) ?? "";
    return {
      href: indexed ? `${cityPath(city)}/${slug}` : item.href,
      label: indexed ? `${item.label} in ${city.searchName}` : item.label,
      specialty: item.specialty,
    };
  });
  const quoteHref = `/get-a-free-quote?city=${encodeURIComponent(city.searchName)}`;
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalWebPage",
            name: `Medical treatment in ${city.searchName}`,
            url: absoluteUrl(locale, cityPath(city)),
            description: city.description,
            spatialCoverage: {
              "@type": "City",
              name: city.searchName,
              alternateName: city.name,
              containedInPlace: { "@type": "Country", name: "India" },
            },
          },
          {
            "@type": "ItemList",
            name: `Departments in ${city.searchName}`,
            itemListElement: groups.map(({ specialty }, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${specialty.name} in ${city.searchName}`,
              url: absoluteUrl(locale, `/treatments/${specialty.slug}`),
            })),
          },
        ],
      }} />
      <Breadcrumbs locale={locale} items={[{ name: "Cities", path: cityPath(treatmentCities()[0]) }, { name: city.searchName, path: cityPath(city) }]} />
      <article>
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="mesh-blob -start-10 top-0 size-72 bg-primary/30" />
            <div className="mesh-blob mesh-blob-b end-0 top-16 size-56 bg-accent/20" />
          </div>
          <div className="relative mx-auto grid max-w-6xl items-start gap-8 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,460px)]">
            <div>
              <p className="text-sm font-semibold text-primary-ink">{city.airportCode} · India</p>
              <h1 className="mt-2 max-w-3xl">Medical treatment in {city.searchName}</h1>
              {city.searchName !== city.name ? <p className="mt-3 text-muted">Hospital letters for this city use the name {city.name}.</p> : null}
              <div className="mt-6 max-w-3xl"><AnswerBox>{city.answer}</AnswerBox></div>
              <p className="mt-6 max-w-3xl">{city.overview}</p>
              <div className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1"><TreatmentSearch items={searchItems} /></div>
                <Button href={quoteHref}>Get a free quote</Button>
              </div>
            </div>
            <IndiaCityMap slug={city.slug} label={city.searchName} code={city.airportCode} />
            <nav className="flex gap-2 overflow-x-auto pb-1 lg:col-span-2" aria-label="Cities">
              {cities.map((item) => (
                <Link
                  key={item.path}
                  href={cityPath(item)}
                  aria-current={item.path === city.path ? "page" : undefined}
                  className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-4 text-sm ${item.path === city.path ? "bg-secondary text-background" : "border border-border bg-card"}`}
                >
                  {item.searchName}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-3">
          {[
            ["Where do you arrive?", `${city.airport}. Pickup is booked against your flight number after a plan is accepted.`],
            ["Where should you stay?", city.stay],
            ["What is the weather like for recovery?", city.climate],
          ].map(([title, copy]) => (
            <section key={title} className="rounded-2xl border border-border bg-card p-5">
              <h2 className="!text-lg">{title}</h2>
              <p className="mt-2 text-sm text-muted">{copy}</p>
            </section>
          ))}
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-4">
          <h2>Practical notes</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {city.practical.map((item) => (
              <li key={item} className="rounded-2xl bg-surface px-4 py-3 text-sm">{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">TechDr does not claim one city is the best in India. The campus in your written quote matters more than the skyline.</p>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <h2>Departments in {city.searchName}</h2>
          <p className="mt-3 max-w-3xl">Choose a department. The guides are the same treatment pages used for every Indian city. The written quote names the campus in {city.searchName}.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map(({ specialty, count }) => (
              <li key={specialty.slug}>
                <Link href={`/treatments/${specialty.slug}`} className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card p-4 hover:bg-surface">
                  <ServiceIcon specialty={specialty.slug} size={40} />
                  <span>
                    <span className="block font-semibold text-primary-ink">{specialty.name}</span>
                    <span className="mt-1 block text-sm text-muted">{count} {count === 1 ? "guide" : "guides"}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-12">
          <h2>Questions about {city.searchName}</h2>
          <div className="mt-4 max-w-3xl"><FaqList items={city.faqs} /></div>
          <Byline locale={locale} updated={site.updated} />
        </section>
      </article>
    </>
  );
}
