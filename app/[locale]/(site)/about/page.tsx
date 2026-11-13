import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { LegalIdentity } from "@/components/legal/LegalIdentity";
import { formatPhone, site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/about",
    title: "About TechDr Medical Tourism | TechDr",
    description:
      "TechDr Medical Tourism coordinates planned treatment in India for international patients. We are not a hospital and we do not promise outcomes.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ name: "About", path: "/about" }]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1>About TechDr Medical Tourism</h1>
        <p className="mt-4">TechDr Medical Tourism (medicaltourism.techdr.in) helps people from the Middle East, Africa, the CIS, SAARC, Southeast Asia, the UK and the US plan treatment in India. The work is coordination: reports, written opinions, indicative prices, visa invitation letters, arrival and follow-up.</p>
        <p className="mt-4">We are not a hospital. Surgery is done by independent specialists at JCI and NABH-accredited partner hospitals. We do not publish doctors’ or hospitals’ names on this website. Files are reviewed by senior consultants, described here only as specialists with 15–30+ years of experience.</p>
        <p className="mt-4">We will refuse a case that depends on paid organ donation, a guaranteed cure, or a commercial flight for someone who is too unwell to travel. The comparison prices on this site are indicative starting estimates in USD for {site.year}. A written quote after your reports replaces the table.</p>
        <p className="mt-4">TechDr is the trade name of Gorityala Abhista Sai, a sole proprietorship. The medical tourism brand is Medical Tours India. Write to {site.email}, or WhatsApp {site.whatsapps.map(formatPhone).join(" or ")}.</p>
        <LegalIdentity />
      </article>
    </>
  );
}
