import { ArrowRight, BadgeCheck, Banknote, Car, FileClock, FileText, FileUp, Hotel, Languages, Moon, Plane, ShieldBan, Smartphone, Stamp, Utensils, Video, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Motion";
import { TreatmentSearch } from "@/components/sections/TreatmentSearch";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { costs, getCost, midpointSavings, moneyRange } from "@/data/costs";
import { CostMark } from "@/components/ui/CostMark";
import { PriceText } from "@/components/ui/PriceText";
import { ServiceIcon, serviceIcon } from "@/components/ui/ServiceIcon";
import { homeFaqs } from "@/data/faqs";
import { posts } from "@/data/blog";
import { cities } from "@/data/cities";
import { activeDestinations, destinationHref } from "@/data/destinations";
import { procedurePath, procedures, treatmentSearchItems } from "@/data/procedures";
import { faqList } from "@/lib/schema";
import { WhatsAppLink } from "@/components/contact/WhatsAppLink";
import { site } from "@/lib/site";

const chartIds = ["knee-replacement", "heart-bypass", "kidney-transplant", "ivf", "cataract"] as const;

const journey: { icon: LucideIcon; label: string }[] = [
  { icon: FileUp, label: "Share reports" },
  { icon: FileClock, label: "Opinions and quotes in 48h" },
  { icon: Stamp, label: "Visa invitation letter" },
  { icon: Car, label: "Airport pickup and stay" },
  { icon: Video, label: "Treatment and online follow-up" },
];

const patientServices: { icon: LucideIcon; label: string }[] = [
  { icon: Stamp, label: "Visa invitation letter" },
  { icon: Plane, label: "Flights advice" },
  { icon: Hotel, label: "Hotel near the hospital" },
  { icon: Languages, label: "Interpreter" },
  { icon: Smartphone, label: "Local SIM" },
  { icon: Banknote, label: "Currency guidance" },
  { icon: Moon, label: "Prayer space on request" },
  { icon: Utensils, label: "Halal meals on request" },
];

const indiaReasons: { icon: LucideIcon; label: string }[] = [
  { icon: BadgeCheck, label: "Accredited partner hospitals" },
  { icon: FileText, label: "English records for your doctor at home" },
  { icon: Stamp, label: "Visa letter after you accept a plan" },
  { icon: Car, label: "Airport pickup and a hotel near the campus" },
  { icon: Languages, label: "Interpreters in six coordinator languages" },
  { icon: ShieldBan, label: "No paid-donor or guaranteed-outcome cases" },
];

const words = "Find the Right Treatment Abroad — Compare Countries, Costs and Care".split(" ");

const trustPoints = [
  "Accredited partner hospitals",
  "Free written opinion",
  "Itemised written estimate",
  "Visa letter after you accept a plan",
  "Support in 6 coordinator languages",
];

const heroFacts = [
  "Free written opinion",
  "Reply on WhatsApp",
  "Written estimate within 48 hours of complete reports",
];

export function HomeView() {
  const searchItems = treatmentSearchItems();
  const chartGaps = chartIds.flatMap((id) => {
    const row = costs.find((item) => item.id === id);
    if (!row) return [];
    return [
      midpointSavings(row.india, row.usa, Boolean(row.usaLabel)),
      midpointSavings(row.india, row.uk, Boolean(row.ukLabel)),
    ];
  });
  const chartLow = chartGaps.length ? Math.min(...chartGaps) : 0;
  const chartHigh = chartGaps.length ? Math.max(...chartGaps) : 0;

  return (
    <PriceText>
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...faqList([...homeFaqs]) }} />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="mesh-blob -start-10 top-0 size-72 bg-primary/40" />
          <div className="mesh-blob mesh-blob-b end-0 top-24 size-64 bg-accent/30" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pt-8 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:pt-12 lg:pb-24">
          <div>
            <p className="text-sm font-semibold text-primary-ink">TechDr Medical Tourism</p>
            <h1 className="mt-3 max-w-3xl text-balance leading-[1.18]">
              {words.map((word, index) => (
                <span key={`${word}-${index}`} className={word === "Abroad" ? "word text-accent" : "word"} style={{ animationDelay: `${index * 40}ms` }}>{word}</span>
              ))}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              Compare countries, costs and care. India is the destination TechDr coordinates today. Free opinions, written estimates, and travel support. TechDr is a facilitator, not a hospital.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <WhatsAppLink className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink">Chat on WhatsApp</WhatsAppLink>
              <Button variant="outline" href="/get-a-free-quote">Get a free quote</Button>
            </div>
            <div className="mt-6 max-w-xl"><TreatmentSearch items={searchItems} /></div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium">Destination</span>
              {activeDestinations().map((item) => (
                <Link key={item.slug} className="rounded-full border border-border bg-card px-3 py-1.5 font-medium text-primary-ink" href={destinationHref(item)}>
                  {item.name}
                </Link>
              ))}
              <Link className="rounded-full border border-border px-3 py-1.5 font-medium" href="/countries">All destinations</Link>
            </div>
          </div>
          <div className="grid gap-3">
            {heroFacts.map((fact, index) => (
              <p key={fact} className="parallax-card rounded-2xl border border-border bg-card p-5 text-lg font-semibold shadow-sm" style={{ animationDelay: `${index * 60}ms` }}>
                {fact}
              </p>
            ))}
          </div>
        </div>
      </section>
      <ul className="flex flex-wrap justify-center gap-2 border-y border-border bg-surface px-4 py-4">
        {trustPoints.map((point) => (
          <li key={point} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium">{point}</li>
        ))}
      </ul>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2>Popular treatments</h2>
        <p className="mt-2 max-w-2xl text-muted">Indicative 2026 ranges at partner hospitals. A written quote uses your reports.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {procedures.slice(0, 12).map((item, index) => {
            const cost = getCost(item.costId);
            return (
              <Reveal key={item.slug} delay={index * 0.06}>
                <Link href={procedurePath(item)} className="group block h-full rounded-2xl border border-border bg-card p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                  {serviceIcon(item.specialty, item.slug) ? <ServiceIcon specialty={item.specialty} procedure={item.slug} size={48} /> : <span className="inline-block text-primary-ink transition-transform group-hover:rotate-6">+</span>}
                  <h3 className="mt-2">{item.card}</h3>
                  <p className="mt-3"><CostMark value={moneyRange(cost.india)} /></p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-ink">See the guide <ArrowRight className="size-4" /></span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2>How TechDr works</h2>
          <p className="mt-2 max-w-2xl text-muted">Five steps, from your reports to follow-up after you fly home.</p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {journey.map(({ icon: Icon, label }, index) => (
              <li key={label} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-heading text-2xl text-primary-ink">0{index + 1}</span>
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                </span>
                <h3 className="mt-3 text-base">{label}</h3>
              </li>
            ))}
          </ol>
          <p className="mt-4">
            <Link className="inline-flex items-center gap-1 text-primary-ink underline" href="/how-it-works">
              Read the full journey <ArrowRight className="size-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2>How do India, the USA, the UK and Thailand compare?</h2>
        <p className="mt-2 max-w-3xl text-muted">A longer bar is a higher top-of-range price. These are indicative starting estimates for {site.year}.</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {chartIds.map((id) => {
            const row = costs.find((item) => item.id === id)!;
            const series = [
              ["India", row.india[1], moneyRange(row.india), "bg-primary"],
              ["USA", row.usa[1], moneyRange(row.usa, row.usaLabel), "bg-[#0b2545] dark:bg-[#9bb6d0]"],
              ["UK", row.uk[1], moneyRange(row.uk, row.ukLabel), "bg-accent"],
            ] as const;
            const max = Math.max(...series.map((item) => item[1]));
            return (
              <div key={id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3>{row.name}</h3>
                <div className="mt-4 space-y-3" aria-hidden>
                  {series.map(([label, value, price, color], index) => (
                    <div key={label}>
                      <div className="flex items-baseline justify-between gap-3 text-sm">
                        <span className={label === "India" ? "font-semibold text-primary-ink" : undefined}>{label}</span>
                        <span className={label === "India" ? "font-semibold text-primary-ink" : "text-muted"}>{price}</span>
                      </div>
                      <span className="mt-1.5 block h-2.5 overflow-hidden rounded-full bg-border">
                        <span className={`bar block h-full ${color}`} style={{ width: `${max ? (value / max) * 100 : 0}%`, animationDelay: `${index * 80}ms` }} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 max-w-3xl text-sm text-muted">
          Across these procedures, the India midpoint is about {chartLow === chartHigh ? `${chartLow}%` : `${chartLow}–${chartHigh}%`} below the United States and United Kingdom midpoints, based on the published ranges in this table.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card px-4">
          <table className="data-table">
            <caption>Indicative ranges behind the chart</caption>
            <thead><tr><th scope="col">Procedure</th><th scope="col">India</th><th scope="col">USA</th><th scope="col">UK</th></tr></thead>
            <tbody>
              {chartIds.map((id) => {
                const row = costs.find((item) => item.id === id)!;
                return (
                  <tr key={id}>
                    <th scope="row">{row.name}</th>
                    <td className="cost-cell">{moneyRange(row.india)}</td>
                    <td>{moneyRange(row.usa, row.usaLabel)}</td>
                    <td>{moneyRange(row.uk, row.ukLabel)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section className="bg-secondary py-16 text-background dark:bg-[#10243a] dark:text-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <h2>Why patients choose India</h2>
          <p className="mt-2 max-w-2xl text-background/80 dark:text-muted">Accredited hospitals, a written plan, and the trip arranged around the campus.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {indiaReasons.map(({ icon: Icon, label }) => (
              <h3 key={label} className="flex items-start gap-3 rounded-2xl bg-background/10 p-4 text-lg font-medium dark:border dark:border-border dark:bg-card">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="pt-2">{label}</span>
              </h3>
            ))}
          </div>
          <p className="mt-6">
            <Link className="inline-flex items-center gap-1 underline" href="/why-india">
              Read the reasons <ArrowRight className="size-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2>Patient services</h2>
        <p className="mt-2 max-w-2xl text-muted">The practical side of the trip, arranged with the treatment plan.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {patientServices.map(({ icon: Icon, label }) => (
            <p key={label} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="pt-2">{label}</span>
            </p>
          ))}
        </div>
        <p className="mt-4">
          <Link className="inline-flex items-center gap-1 text-primary-ink underline" href="/patient-services">
            See patient services <ArrowRight className="size-4" aria-hidden />
          </Link>
        </p>
      </section>
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2>Cities patients fly into</h2>
          <p className="mt-2 max-w-2xl text-muted">The quote names the hospital campus, not only the arrival city.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <li key={city.path}>
                <Link className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5" href={`/destinations/${city.path}`}>
                  <span className="font-heading text-lg font-semibold">{city.searchName}</span>
                  <span className="text-sm font-medium text-muted">{city.airportCode}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2>Guides</h2>
        <p className="mt-2 max-w-2xl text-muted">Cost, safety and the medical visa, written in plain language.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <article key={post.slug} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <p className="text-sm font-semibold text-primary-ink">{post.category}</p>
              <h3 className="mt-2"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
              <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2>Questions patients ask first</h2>
        <div className="mt-4"><FaqList items={[...homeFaqs]} /></div>
      </section>
      <section className="plan-band py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2 md:items-center">
          <div>
            <h2>Ask for a written plan</h2>
            <p className="mt-2 max-w-md text-white/85">Share your name, country and the treatment you need. A case manager replies within 48 hours of a complete file.</p>
          </div>
          <form className="grid gap-3 rounded-2xl border border-white/25 bg-white/10 p-4 shadow-lg backdrop-blur-sm" action="/get-a-free-quote">
            <label className="text-sm font-medium">Name<input name="name" autoComplete="name" className="mt-1 min-h-11 w-full rounded-xl border border-white bg-white px-3 text-[#0b2545] shadow-sm" /></label>
            <label className="text-sm font-medium">Email<input name="email" type="email" autoComplete="email" className="mt-1 min-h-11 w-full rounded-xl border border-white bg-white px-3 text-[#0b2545] shadow-sm" /></label>
            <button className="min-h-11 rounded-full bg-accent px-5 font-semibold text-accent-ink" type="submit">Continue to the full form</button>
          </form>
        </div>
      </section>
    </>
    </PriceText>
  );
}
