import { ArrowRight, BadgeCheck, Banknote, Car, FileClock, FileText, FileUp, Hotel, Languages, Moon, Plane, ShieldBan, Smartphone, Stamp, Utensils, Video, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Motion";
import { TreatmentSearch } from "@/components/sections/TreatmentSearch";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { costs, getCost, moneyRange } from "@/data/costs";
import { CostMark } from "@/components/ui/CostMark";
import { ServiceIcon, serviceIcon } from "@/components/ui/ServiceIcon";
import { homeFaqs } from "@/data/faqs";
import { posts } from "@/data/blog";
import { cities } from "@/data/cities";
import { procedurePath, procedures, treatmentSearchItems } from "@/data/procedures";
import { faqList } from "@/lib/schema";
import { site, whatsappHref } from "@/lib/site";

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

const words = "World-Class Medical Treatment in India — At Up to 80% Less Cost".split(" ");

export function HomeView() {
  const searchItems = treatmentSearchItems();

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...faqList([...homeFaqs]) }} />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="mesh-blob -start-10 top-0 size-72 bg-primary/40" />
          <div className="mesh-blob mesh-blob-b end-0 top-24 size-64 bg-accent/30" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div>
            <p className="text-sm font-semibold text-primary-ink">TechDr Medical Tourism</p>
            <h1 className="mt-3 max-w-3xl text-balance">
              {words.map((word, index) => (
                <span key={`${word}-${index}`} className="word" style={{ animationDelay: `${index * 40}ms` }}>{word} </span>
              ))}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              TechDr connects international patients with accredited hospitals and experienced specialists in India. Free treatment plans, transparent cost estimates, and end-to-end support — from your visa to your flight home.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/get-a-free-quote">Get a Free Quote</Button>
              <Button variant="outline" href={whatsappHref("Hello TechDr, I would like to discuss treatment in India.")} external>Talk on WhatsApp</Button>
            </div>
            <div className="mt-6 max-w-xl"><TreatmentSearch items={searchItems} /></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["10,000+", "Patients guided"],
              ["50+", "Countries"],
              ["60–80%", "Average savings"],
              ["24h", "Quote turnaround"],
            ].map(([value, label], index) => (
              <p key={label} className="parallax-card rounded-2xl border border-white/40 bg-card/80 p-5 shadow-sm backdrop-blur" style={{ animationDelay: `${index * 60}ms` }}>
                <span className="block font-heading text-3xl font-bold">{value}</span>
                <span className="text-sm text-muted">{label}</span>
              </p>
            ))}
            <p className="sm:col-span-2 text-xs text-muted">Planning placeholders — confirm audited totals before publishing them as facts.</p>
          </div>
        </div>
      </section>
      <p className="border-y border-border bg-surface px-4 py-3 text-center text-sm">
        JCI & NABH-accredited partners · 24/7 patient care · Free second opinion · No hidden fees · Support in 6 languages
      </p>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2>Popular treatments</h2>
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
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {journey.map(({ icon: Icon, label }, index) => (
              <li key={label} className="rounded-2xl bg-card p-4">
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
        <p className="mt-2 max-w-3xl text-muted">Bars show each country’s top-of-range as a share of the highest figure for that procedure. Numbers are indicative starting estimates for {site.year}.</p>
        <div className="mt-6 space-y-6">
          {chartIds.map((id) => {
            const row = costs.find((item) => item.id === id)!;
            const series = [
              ["India", row.india[1], "bg-primary"],
              ["USA", row.usa[1], "bg-secondary"],
              ["UK", row.uk[1], "bg-accent"],
              ["Thailand", row.thailand?.[1] ?? 0, "bg-warning"],
            ] as const;
            const max = Math.max(...series.map((item) => item[1]));
            return (
              <div key={id}>
                <h3>{row.name}</h3>
                <div className="mt-2 space-y-2" aria-hidden>
                  {series.map(([label, value, color], index) => (
                    <div key={label} className="grid grid-cols-[6rem_1fr_auto] items-center gap-3 text-sm">
                      <span>{label}</span>
                      <span className="block h-3 overflow-hidden rounded-full bg-border">
                        <span className={`bar block h-full ${color}`} style={{ width: `${(value / max) * 100}%`, animationDelay: `${index * 80}ms` }} />
                      </span>
                      <span className={label === "India" ? "font-semibold text-primary-ink" : undefined}>{label === "USA" && row.usaLabel ? row.usaLabel : moneyRange(label === "India" ? row.india : label === "USA" ? row.usa : label === "UK" ? row.uk : row.thailand ?? row.uk)}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="data-table">
            <caption>Indicative ranges behind the chart, in USD</caption>
            <thead><tr><th scope="col">Procedure</th><th scope="col">India</th><th scope="col">USA</th><th scope="col">UK</th><th scope="col">Thailand</th></tr></thead>
            <tbody>
              {chartIds.map((id) => {
                const row = costs.find((item) => item.id === id)!;
                return (
                  <tr key={id}>
                    <th scope="row">{row.name}</th>
                    <td className="cost-cell">{moneyRange(row.india)}</td>
                    <td>{moneyRange(row.usa, row.usaLabel)}</td>
                    <td>{moneyRange(row.uk, row.ukLabel)}</td>
                    <td>{row.thailand ? moneyRange(row.thailand) : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section className="bg-secondary py-16 text-background">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {indiaReasons.map(({ icon: Icon, label }) => (
            <h3 key={label} className="flex items-start gap-3 text-lg font-medium">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="pt-2">{label}</span>
            </h3>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-6xl px-4">
          <Link className="inline-flex items-center gap-1 underline" href="/why-india">
            Why patients choose India <ArrowRight className="size-4" aria-hidden />
          </Link>
        </p>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2>Patient services</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {patientServices.map(({ icon: Icon, label }) => (
            <p key={label} className="flex items-start gap-3 rounded-2xl border border-border p-4">
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
          <ul className="mt-6 flex gap-3 overflow-x-auto pb-2">
            {cities.map((city) => (
              <li key={city.path}><Link className="inline-flex min-h-11 items-center rounded-full bg-card px-4" href={`/destinations/${city.path}`}>{city.searchName}</Link></li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2>Guides</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <article key={post.slug} className="rounded-2xl border border-border p-5">
              <p className="text-sm text-primary-ink">{post.category}</p>
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
      <section className="bg-primary-ink py-14 text-background">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2 md:items-center">
          <div>
            <h2>Ask for a written plan</h2>
            <p className="mt-2 text-background/80">Share your name, country and the treatment you need. A case manager replies within 48 hours of a complete file.</p>
          </div>
          <form className="grid gap-3" action="/get-a-free-quote">
            <label className="text-sm">Name<input name="name" className="mt-1 min-h-11 w-full rounded-xl px-3 text-foreground" /></label>
            <label className="text-sm">Email<input name="email" type="email" className="mt-1 min-h-11 w-full rounded-xl px-3 text-foreground" /></label>
            <button className="min-h-11 rounded-full bg-accent px-5 font-semibold text-accent-ink" type="submit">Continue to the full form</button>
          </form>
        </div>
      </section>
    </>
  );
}
