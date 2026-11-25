import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/medical-review-team",
    title: "Medical Review Team | TechDr",
    description: "Named clinicians review TechDr Medical Tourism pages only after they have actually read them. Reviewers are not invented.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ name: "Medical review team", path: "/medical-review-team" }]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1>Medical review team</h1>
        <p className="mt-4">Pages are written by the TechDr editorial team. A clinician’s name is added only after that person has read the page and their registration number is on file. {site.name} does not invent a reviewer.</p>
        <p className="mt-4">Corrections go to {site.email}.</p>
      </article>
    </>
  );
}
