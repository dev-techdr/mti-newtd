import { Link } from "@/i18n/navigation";
import { AnswerBox, Byline, EstimateNote } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CostMark } from "@/components/ui/CostMark";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { cityPath, treatmentCities, type City } from "@/data/cities";
import { getCost, moneyRange } from "@/data/costs";
import { procedurePath, type Procedure } from "@/data/procedures";
import { getSpecialty } from "@/data/specialties";
import {
  cityPlace,
  cityTreatmentAnswer,
  cityTreatmentDescription,
  cityTreatmentFaqs,
  citySpecialtyPath,
  cityTreatmentPath,
} from "@/lib/city-treatments";
import { faqList } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export function CityTreatment({
  locale,
  city,
  procedure,
}: {
  locale: string;
  city: City;
  procedure: Procedure;
}) {
  const cost = getCost(procedure.costId);
  const specialty = getSpecialty(procedure.specialty);
  const path = cityTreatmentPath(city, procedure);
  const url = absoluteUrl(locale, path);
  const faqs = cityTreatmentFaqs(city, procedure);
  const description = cityTreatmentDescription(city, procedure);
  const otherCities = treatmentCities().filter((item) => item.path !== city.path);
  const quoteHref = `/get-a-free-quote?procedure=${procedure.slug}&city=${encodeURIComponent(city.searchName)}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        url,
        name: `${procedure.name} in ${city.searchName}`,
        description,
        lastReviewed: procedure.updated,
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["#quick-answer", "h1"] },
        spatialCoverage: {
          "@type": "City",
          name: city.searchName,
          alternateName: city.name,
          containedInPlace: { "@type": "Country", name: "India" },
        },
        reviewedBy: { "@type": "Organization", name: "TechDr Medical Panel", url: `${site.url}/editorial-policy` },
      },
      {
        "@type": "MedicalProcedure",
        name: `${procedure.name} in ${city.searchName}`,
        procedureType: `https://schema.org/${procedure.procedureType}`,
        howPerformed: procedure.howPerformed,
        followup: procedure.followup,
        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "USD",
          availability: "https://schema.org/LimitedAvailability",
          areaServed: { "@type": "City", name: city.searchName },
          description: "Indicative starting estimate for a typical case, not a binding quote.",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            minPrice: cost.india[0],
            maxPrice: cost.india[1],
          },
        },
      },
      faqList(faqs),
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs
        locale={locale}
        items={[
          { name: `Treatment in ${city.searchName}`, path: cityPath(city) },
          ...(specialty ? [{ name: specialty.name, path: citySpecialtyPath(city, specialty) }] : []),
          { name: `${procedure.card} in ${city.searchName}`, path },
        ]}
      />
      <article className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_280px]">
        <div>
          <div className="sticky top-14 z-30 -mx-4 border-b border-border bg-background px-4 py-2">
            <div className="flex items-center gap-3">
              <ServiceIcon specialty={procedure.specialty} procedure={procedure.slug} size={64} />
              <p className="text-sm font-semibold text-primary-ink">{specialty?.name}</p>
            </div>
          </div>
          <h1 className="mt-2 max-w-3xl">{procedure.name} in {city.searchName}</h1>
          <div className="mt-5 max-w-md">
            <CostMark size="panel" value={moneyRange(cost.india)} unit={cost.unit} label={`Indicative cost in ${city.searchName}`} note={`${site.year} planning range. Fly into ${city.airportCode}.`} />
          </div>
          <p className="mt-4 max-w-3xl text-muted">
            {procedure.card} in {cityPlace(city)} is an indicative {site.year} plan of <strong className="text-primary-ink">{moneyRange(cost.india)} {cost.unit}</strong>, with arrival at {city.airportCode}.
          </p>
          <div className="mt-6"><AnswerBox>{cityTreatmentAnswer(city, procedure)}</AnswerBox></div>

          <section className="mt-10">
            <h2>What should you plan for {city.searchName}?</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="data-table">
                <caption>{procedure.card} in {city.searchName}, indicative {site.year} facts</caption>
                <tbody>
                  <tr className="cost"><th scope="row">Indicative cost</th><td>{moneyRange(cost.india)} {cost.unit}</td></tr>
                  <tr><th scope="row">Hospital stay</th><td>{procedure.hospitalStay}</td></tr>
                  <tr><th scope="row">Time in {city.searchName}</th><td>{procedure.totalStay}</td></tr>
                  <tr><th scope="row">Airport</th><td>{city.airport}</td></tr>
                  <tr><th scope="row">Recovery</th><td>{procedure.recovery}</td></tr>
                  <tr><th scope="row">Reported outcome range</th><td>{procedure.success}</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3"><EstimateNote /></div>
          </section>

          <section className="mt-10">
            <h2>How do you arrive and where do you stay?</h2>
            <p className="mt-3">Land at {city.airport}. Pickup is booked to the campus named in the quote, after you accept a plan.</p>
            <p className="mt-3">{city.stay}</p>
            <p className="mt-3">{city.climate}</p>
            <ul className="mt-3 list-disc space-y-2 ps-5">{city.practical.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="mt-10">
            <h2>What is {procedure.name.toLowerCase()}?</h2>
            <p className="mt-3">{procedure.whatIs}</p>
            <h3 className="mt-6">Who needs it?</h3>
            <ul className="mt-3 list-disc space-y-2 ps-5">{procedure.whoNeeds.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="mt-4">
              <Link className="text-primary-ink underline" href={procedurePath(procedure)}>Read the full {procedure.card.toLowerCase()} guide for India</Link>
              {" · "}
              <Link className="text-primary-ink underline" href={`/cost/${procedure.costId}-cost-in-india`}>Cost comparison</Link>
            </p>
          </section>

          <section className="mt-10">
            <h2>What changes the quote in {city.searchName}?</h2>
            <ul className="mt-3 list-disc space-y-2 ps-5">{procedure.factors.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="mt-3 text-sm text-muted">The campus, the implant or drug, and the length of stay set the quote.</p>
          </section>

          <section className="mt-10">
            <h2>Questions about {procedure.card.toLowerCase()} in {city.searchName}</h2>
            <div className="mt-4"><FaqList items={faqs} /></div>
          </section>

          {specialty ? (
            <p className="mt-10">
              <Link className="text-primary-ink underline" href={citySpecialtyPath(city, specialty)}>All {specialty.name} guides in {city.searchName}</Link>
            </p>
          ) : null}

          <section className="mt-10">
            <h2>{procedure.card} in other cities</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {otherCities.map((item) => (
                <li key={item.path}>
                  <Link className="inline-flex min-h-11 items-center rounded-full border border-border px-4" href={cityTreatmentPath(item, procedure)}>
                    {procedure.card} in {item.searchName}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              <Link className="text-primary-ink underline" href={cityPath(city)}>All treatments in {city.searchName}</Link>
            </p>
          </section>

          <section className="mt-10 rounded-2xl bg-secondary p-6 text-background">
            <h2>Get a quote for {procedure.card.toLowerCase()} in {city.searchName}</h2>
            <p className="mt-2 text-background/80">The form opens with this procedure and {city.searchName} selected. A case manager replies with opinions and an itemised estimate within 48 hours of a complete file.</p>
            <Button className="mt-4" href={quoteHref}>Get a free quote</Button>
          </section>
          <Byline locale={locale} updated={procedure.updated} />
        </div>
        <aside className="h-max lg:sticky lg:top-24">
          <CostMark size="panel" value={moneyRange(cost.india)} unit={cost.unit} label={`Indicative cost in ${city.searchName}`} note={`Fly into ${city.airportCode}. Indicative range, not a guarantee.`}>
            <Button className="mt-4 w-full" href={quoteHref}>Get a free quote</Button>
          </CostMark>
        </aside>
      </article>
    </>
  );
}
