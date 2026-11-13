import { Link } from "@/i18n/navigation";
import { AnswerBox, Byline, EstimateNote } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CostMark } from "@/components/ui/CostMark";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { CostTabs } from "@/components/ui/tabs";
import { treatmentCities } from "@/data/cities";
import { getCost, midpointSavings, moneyRange } from "@/data/costs";
import { getProcedure, journeySteps, procedurePath, procedures, sharedExcluded, type Procedure } from "@/data/procedures";
import { getSpecialty } from "@/data/specialties";
import { posts } from "@/data/blog";
import { cityTreatmentPath } from "@/lib/city-treatments";
import { faqList } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export function ProcedureArticle({
  locale,
  procedure,
}: {
  locale: string;
  procedure: Procedure;
}) {
  const cost = getCost(procedure.costId);
  const specialty = getSpecialty(procedure.specialty);
  const steps = journeySteps(procedure);
  const related = procedure.related.map((slug) => getProcedure(slug)).filter(Boolean);
  const articles = posts.filter((post) => procedure.articles.includes(post.slug));
  const path = procedurePath(procedure);
  const url = absoluteUrl(locale, path);
  const savings = midpointSavings(cost.india, cost.usa, Boolean(cost.usaLabel));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        url,
        name: procedure.name,
        lastReviewed: procedure.updated,
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["#quick-answer", "h1"] },
        reviewedBy: { "@type": "Organization", name: "TechDr Medical Panel", url: `${site.url}/editorial-policy` },
      },
      {
        "@type": "MedicalProcedure",
        name: procedure.name,
        procedureType: `https://schema.org/${procedure.procedureType}`,
        howPerformed: procedure.howPerformed,
        preparation: procedure.preparation.join(" "),
        followup: procedure.followup,
        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "USD",
          availability: "https://schema.org/LimitedAvailability",
          description: "Indicative starting estimate, not a binding quote.",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            minPrice: cost.india[0],
            maxPrice: cost.india[1],
          },
        },
      },
      {
        "@type": "HowTo",
        name: `How TechDr arranges ${procedure.name.toLowerCase()} in India`,
        step: steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
      },
      faqList(procedure.faqs),
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs
        locale={locale}
        items={[
          { name: "Treatments", path: "/treatments" },
          { name: specialty?.name ?? procedure.specialty, path: `/treatments/${procedure.specialty}` },
          { name: procedure.card, path },
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
          <h1 className="mt-2 max-w-3xl">{procedure.name} in India</h1>
          <div className="mt-5 max-w-md">
            <CostMark size="panel" value={moneyRange(cost.india)} unit={cost.unit} note={`Planning range for ${site.year}. A written quote follows your reports.`} />
          </div>
          <p className="mt-4 max-w-3xl text-muted">
            {procedure.card} in India is planned from your reports, with an indicative {cost.unit} range of <strong className="text-primary-ink">{moneyRange(cost.india)}</strong> in {site.year}.
          </p>
          <div className="mt-6"><AnswerBox>{procedure.answer}</AnswerBox></div>

          <section className="mt-10">
            <h2>What are the key facts?</h2>
            <p className="mt-2">These are planning facts for a typical case, not a personal prediction.</p>
            <div className="mt-4 overflow-x-auto">
              <table className="data-table">
                <caption>Key facts for {procedure.name.toLowerCase()} in India, {site.year}</caption>
                <tbody>
                  <tr className="cost"><th scope="row">Indicative cost</th><td>{moneyRange(cost.india)} {cost.unit}</td></tr>
                  <tr><th scope="row">Hospital stay</th><td>{procedure.hospitalStay}</td></tr>
                  <tr><th scope="row">Total stay in India</th><td>{procedure.totalStay}</td></tr>
                  <tr><th scope="row">Reported outcome range</th><td>{procedure.success}</td></tr>
                  <tr><th scope="row">Recovery</th><td>{procedure.recovery}</td></tr>
                  <tr><th scope="row">Anaesthesia</th><td>{procedure.anaesthesia}</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3"><EstimateNote planning={!cost.guide} /></div>
          </section>

          <section className="mt-10">
            <h2>What is {procedure.name.toLowerCase()}?</h2>
            <p className="mt-3">{procedure.whatIs}</p>
            <h3 className="mt-6">Who needs it?</h3>
            <ul className="mt-3 list-disc space-y-2 ps-5">{procedure.whoNeeds.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="mt-10">
            <h2>Which types of {procedure.card.toLowerCase()} are there?</h2>
            <div className="mt-4 grid gap-4">
              {procedure.types.map((type) => (
                <h3 key={type.title} className="rounded-2xl border border-border bg-card p-4 font-normal">
                  <span className="block font-heading font-semibold">{type.title}</span>
                  <span className="mt-2 block text-base font-normal text-muted">{type.text}</span>
                </h3>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2>How much does {procedure.card.toLowerCase()} cost in India?</h2>
            <p className="mt-2">The indicative range is <strong className="text-primary-ink">{moneyRange(cost.india)} {cost.unit}</strong>. Comparing midpoints of the published ranges, that is about {savings}% below the US figure used in our table. Your quote can sit outside the band.</p>
            <div className="mt-4"><CostTabs included={procedure.included} excluded={[...procedure.excluded, ...sharedExcluded]} /></div>
            <h3 className="mt-6">What changes the price?</h3>
            <ul className="mt-3 list-disc space-y-2 ps-5">{procedure.factors.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="mt-4"><Link className="text-primary-ink underline" href={`/cost/${procedure.costId}-cost-in-india`}>Open the dedicated cost page</Link></p>
          </section>

          <section className="mt-10 overflow-x-auto">
            <h2>How do India, the USA and the UK compare?</h2>
            <table className="data-table mt-4">
              <caption>Indicative {site.year} ranges in USD for {cost.name}</caption>
              <thead>
                <tr>
                  <th scope="col">Country</th>
                  <th scope="col">Indicative range</th>
                </tr>
              </thead>
              <tbody>
                <tr className="cost"><th scope="row">India</th><td>{moneyRange(cost.india)}</td></tr>
                <tr><th scope="row">United States</th><td>{moneyRange(cost.usa, cost.usaLabel)}</td></tr>
                <tr><th scope="row">United Kingdom</th><td>{moneyRange(cost.uk, cost.ukLabel)}</td></tr>
                {cost.thailand ? <tr><th scope="row">Thailand</th><td>{moneyRange(cost.thailand)} (chart estimate)</td></tr> : null}
              </tbody>
            </table>
          </section>

          <section className="mt-10">
            <h2>How does the trip work?</h2>
            <ol className="relative mt-6 space-y-6 border-s border-border ps-6">
              <span className="journey-line absolute inset-y-0 start-0 w-px bg-primary" aria-hidden />
              {steps.map((step) => (
                <li key={step.name}>
                  <h3>{step.name}</h3>
                  <p className="text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10">
            <h2>How should I prepare, and which documents do I need?</h2>
            <ul className="mt-3 list-disc space-y-2 ps-5">{procedure.preparation.map((item) => <li key={item}>{item}</li>)}</ul>
            <h3 className="mt-6">Documents</h3>
            <ul className="mt-3 list-disc space-y-2 ps-5">
              {["Passport bio page", "A medicine list", "Recent reports and imaging files", ...procedure.extraDocuments].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <section className="mt-10">
            <h2>What are the risks and the recovery timeline?</h2>
            <ul className="mt-3 list-disc space-y-2 ps-5">{procedure.risks.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="mt-4 grid gap-3">
              {procedure.timeline.map((item) => (
                <p key={item.when} className="rounded-2xl bg-surface p-4"><strong>{item.when}. </strong>{item.text}</p>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2>Why do people have {procedure.card.toLowerCase()} in India?</h2>
            <ul className="mt-3 list-disc space-y-2 ps-5">{procedure.whyIndia.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="mt-10">
            <h2>Frequently asked questions</h2>
            <div className="mt-4"><FaqList items={procedure.faqs} /></div>
          </section>

          <section className="mt-10" aria-label="People also ask">
            <h2>People also ask</h2>
            <ul className="mt-3 space-y-2">
              {procedure.faqs.slice(0, 4).map((faq) => (
                <li key={faq.question}><a className="text-primary-ink underline" href="#faq">{faq.question}</a></li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2>Where can I plan {procedure.card.toLowerCase()}?</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {treatmentCities().map((city) => (
                <li key={city.path}>
                  <Link className="inline-flex min-h-11 items-center rounded-full border border-border px-4" href={cityTreatmentPath(city, procedure)}>
                    {procedure.card} in {city.searchName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2>Related treatments and guides</h2>
            <ul className="mt-3 space-y-2">
              {related.map((item) => item ? <li key={item.slug}><Link className="text-primary-ink underline" href={procedurePath(item)}>{item.name}</Link></li> : null)}
              {articles.map((article) => <li key={article.slug}><Link className="text-primary-ink underline" href={`/blog/${article.slug}`}>{article.title}</Link></li>)}
            </ul>
          </section>

          <section className="mt-10 rounded-2xl bg-secondary p-6 text-background">
            <h2>Get a quote for {procedure.card.toLowerCase()}</h2>
            <p className="mt-2 text-background/80">The form opens with this procedure selected. A case manager replies with opinions and an itemised estimate within 48 hours of a complete file.</p>
            <Button className="mt-4" href={`/get-a-free-quote?procedure=${procedure.slug}`}>Get a free quote</Button>
          </section>

          <section className="mt-10">
            <h2>Sources</h2>
            <ul className="mt-3 list-disc space-y-2 ps-5">
              <li><a className="text-primary-ink underline" href="https://www.who.int/" rel="noopener noreferrer">World Health Organization</a></li>
              <li><a className="text-primary-ink underline" href="https://www.mohfw.gov.in/" rel="noopener noreferrer">Ministry of Health and Family Welfare, India</a></li>
              <li><a className="text-primary-ink underline" href="https://nabh.co/" rel="noopener noreferrer">NABH</a></li>
              <li><a className="text-primary-ink underline" href="https://www.jointcommissioninternational.org/" rel="noopener noreferrer">Joint Commission International</a></li>
            </ul>
          </section>
          <Byline locale={locale} updated={procedure.updated} />
        </div>
        <aside className="h-max lg:sticky lg:top-24">
          <CostMark size="panel" value={moneyRange(cost.india)} unit={cost.unit} note={`About ${savings}% below the US midpoint in our table. Not a guarantee.`}>
            <Button className="mt-4 w-full" href={`/get-a-free-quote?procedure=${procedure.slug}`}>Get a free quote</Button>
          </CostMark>
        </aside>
      </article>
    </>
  );
}

export function relatedProcedures(slugs: string[]) {
  return slugs.map((slug) => procedures.find((item) => item.slug === slug)).filter((item) => item !== undefined);
}
