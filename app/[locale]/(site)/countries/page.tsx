import { setRequestLocale } from "next-intl/server";
import { AnswerBox } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { destinationHref, destinations } from "@/data/destinations";
import { pageMetadata } from "@/lib/seo";
import { positioning } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/countries",
    title: "Treatment Destinations | TechDr",
    description: "TechDr coordinates treatment in India. Other countries are listed only as future destinations and are not offered yet.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const active = destinations.filter((item) => item.active);
  const later = destinations.filter((item) => !item.active);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ name: "Destinations", path: "/countries" }]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1>Where TechDr coordinates treatment</h1>
        <div className="mt-6">
          <AnswerBox>{`${positioning} Today that coordinated care is in India. A country with no signed partners is not offered.`}</AnswerBox>
        </div>
        <h2 className="mt-10">Active destination</h2>
        <ul className="mt-4 space-y-2">
          {active.map((item) => (
            <li key={item.slug}>
              <Link className="font-medium text-primary-ink underline" href={destinationHref(item)}>{item.name}</Link>
              <span className="text-muted"> — partner care is coordinated here.</span>
            </li>
          ))}
        </ul>
        <h2 className="mt-10">Not offered yet</h2>
        <p className="mt-2 text-sm text-muted">Names only. No prices, visa rules, or partner claims until a sourced record is reviewed.</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {later.map((item) => (
            <li key={item.slug}>
              <Link className="text-primary-ink underline" href={destinationHref(item)}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
