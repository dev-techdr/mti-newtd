import { setRequestLocale } from "next-intl/server";
import { PageSuspense } from "@/components/ui/PageFallback";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { AnswerBox, Byline } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CostMark } from "@/components/ui/CostMark";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { getCost, moneyRange } from "@/data/costs";
import { guidesForSpecialty, procedurePath, type Procedure } from "@/data/procedures";
import { getSpecialty, specialties } from "@/data/specialties";
import { routing } from "@/i18n/routing";
import { faqList } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type GuideCard = { key: string; label: string; procedure: Procedure };

const orthoGroups: { title: string; pattern: RegExp }[] = [
  { title: "Knee", pattern: /\b(knee|acl|pcl|meniscus|osteoarthritis)\b/i },
  { title: "Hip", pattern: /\b(hip|avascular necrosis)\b/i },
  { title: "Shoulder and elbow", pattern: /\b(shoulder|rotator|elbow)\b/i },
  { title: "Hand and wrist", pattern: /\b(carpal|quervain)\b/i },
  { title: "Foot, ankle and limbs", pattern: /\b(ankle|clubfoot|flat foot|limb|deformity)\b/i },
  { title: "Fractures and bone", pattern: /fracture|bone graft|osteoporosis/i },
];

function guideGroups(specialty: string, items: GuideCard[]) {
  if (specialty !== "orthopedics") return [{ title: "", items }];
  const buckets = orthoGroups.map((group) => ({ title: group.title, items: [] as GuideCard[] }));
  const other: GuideCard[] = [];
  for (const item of items) {
    const index = orthoGroups.findIndex((group) => group.pattern.test(item.label));
    if (index === -1) other.push(item);
    else buckets[index].items.push(item);
  }
  if (other.length) buckets.push({ title: "Other conditions", items: other });
  return buckets.filter((group) => group.items.length > 0);
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => specialties.map((item) => ({ locale, specialty: item.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; specialty: string }> }) {
  const { locale, specialty: slug } = await params;
  const specialty = getSpecialty(slug);
  if (!specialty) return {};
  return pageMetadata({
    locale,
    path: `/treatments/${slug}`,
    title: `${specialty.name} in India | TechDr`.slice(0, 60),
    description: specialty.description,
  });
}

type SpecialtyParams = { params: Promise<{ locale: string; specialty: string }> };

export default function Page(props: SpecialtyParams) {
  return (
    <PageSuspense>
      <SpecialtyPage {...props} />
    </PageSuspense>
  );
}

async function SpecialtyPage({ params }: SpecialtyParams) {
  const { locale, specialty: slug } = await params;
  setRequestLocale(locale);
  const specialty = getSpecialty(slug);
  if (!specialty) notFound();
  const items = guidesForSpecialty(slug);
  const featured = items.filter((item) => item.key === item.procedure.slug);
  const rest = items.filter((item) => item.key !== item.procedure.slug);
  const groups = guideGroups(slug, rest);
  const url = absoluteUrl(locale, `/treatments/${slug}`);
  const featuredCols = featured.length === 1 ? "max-w-xl" : featured.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3";
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "MedicalWebPage", name: specialty.name, url, lastReviewed: site.updated },
          { "@type": "ItemList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, url: absoluteUrl(locale, procedurePath(item.procedure)) })) },
          faqList(specialty.faqs),
        ],
      }} />
      <Breadcrumbs locale={locale} items={[{ name: "Treatments", path: "/treatments" }, { name: specialty.name, path: `/treatments/${slug}` }]} />
      <article className="mx-auto w-full max-w-6xl px-4 py-10">
        <header className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(240px,320px)]">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <ServiceIcon specialty={specialty.slug} size={56} />
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-ink">Treatment guides</p>
            </div>
            <h1 className="mt-5 max-w-3xl">{specialty.name} in India</h1>
            <p className="mt-4 max-w-2xl">{specialty.intro}</p>
          </div>
          <AnswerBox>{specialty.answer}</AnswerBox>
        </header>

        <ul className="mt-8 grid gap-3 md:grid-cols-3">
          {specialty.focus.map((item) => (
            <li key={item} className="rounded-2xl border border-border bg-card p-4 text-sm">{item}</li>
          ))}
        </ul>

        {featured.length > 0 ? (
          <section className="mt-12">
            <h2>Guides to start with</h2>
            <ul className={`mt-4 grid gap-4 ${featuredCols}`}>
              {featured.map((item) => {
                const cost = getCost(item.procedure.costId);
                return (
                  <li key={item.key} className="h-full">
                    <Link className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 hover:bg-surface" href={procedurePath(item.procedure)}>
                      <ServiceIcon specialty={specialty.slug} procedure={item.procedure.slug} size={48} />
                      <h3 className="mt-4">{item.label}</h3>
                      <p className="mt-2 line-clamp-3 text-sm font-normal text-muted">{item.procedure.description}</p>
                      <div className="mt-auto pt-4">
                        <CostMark value={moneyRange(cost.india)} unit={cost.unit} />
                        <p className="mt-2 text-sm text-muted">{item.procedure.hospitalStay} in hospital</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {rest.length > 0 ? (
          <section className="mt-12">
            <h2>Conditions and procedures</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">Each name opens its own guide. Where two names are the same operation, both open one guide.</p>
            {groups[0]?.title ? (
              <div className="mt-6 grid items-start gap-4 md:grid-cols-2">
                {groups.map((group) => (
                  <section key={group.title} className="rounded-2xl border border-border bg-card p-4">
                    <h3>{group.title}</h3>
                    <ul className={group.items.length > 7 ? "mt-2 grid sm:grid-cols-2 sm:gap-x-4" : "mt-2 divide-y divide-border"}>
                      {group.items.map((item) => (
                        <li key={item.key} className={group.items.length > 7 ? "border-b border-border" : undefined}>
                          <Link className="flex min-h-11 items-center py-2 font-medium text-primary-ink hover:underline" href={procedurePath(item.procedure)}>{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ) : (
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {rest.map((item) => (
                  <li key={item.key}>
                    <Link className="flex min-h-11 items-center rounded-xl border border-border bg-card px-4 py-3 font-medium text-primary-ink hover:bg-surface" href={procedurePath(item.procedure)}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : null}

        <div className="mt-12 grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_260px]">
          <section>
            <h2>Questions about this specialty</h2>
            <div className="mt-4"><FaqList items={specialty.faqs} /></div>
            <Byline locale={locale} updated={site.updated} />
          </section>
          <aside className="h-max rounded-2xl bg-secondary p-6 text-background md:sticky md:top-24">
            <h2 className="text-inherit">Get a written quote</h2>
            <p className="mt-2 text-sm text-background/80">Send your reports. A case manager replies with opinions and an itemised estimate within 48 hours of a complete file.</p>
            <Button className="mt-4 w-full" href="/get-a-free-quote">Get a free quote</Button>
          </aside>
        </div>
      </article>
    </>
  );
}
