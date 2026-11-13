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
        <p className="mt-4">Treatment pages say who reviewed them, and the date of that review. A name appears only after that person has read the page.</p>
        <p className="mt-4">TODO(client): add each reviewer with their name, qualification, medical registration number, specialty, a short biography and a photograph. Do not publish a name for a page that person has not reviewed.</p>
        <p className="mt-4">Until those records exist, pages keep the line “Medically reviewed by TODO(client): Dr ___, qualification”. {site.name} will not invent a doctor to fill it.</p>
        <p className="mt-4">The same people, the same qualifications and the same registration numbers should match any public profile you later create. Corrections go to {site.email}.</p>
      </article>
    </>
  );
}
