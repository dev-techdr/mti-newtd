import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { LegalIdentity } from "@/components/legal/LegalIdentity";
import { formatPhone, positioning, site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/about",
    title: "About TechDr Medical Tourism | TechDr",
    description:
      positioning,
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
        <p className="mt-4">{positioning} The work is coordination: reports, written opinions, indicative prices, visa invitation letters, arrival and follow-up. India is the destination coordinated today.</p>
        <p className="mt-4">The legal entity is {site.entity}. The founder and authorised signatory is the proprietor named in the footer. TODO(client): add the year TechDr Medical Tourism started.</p>
        <p className="mt-4">TechDr does coordinate hospital opinions, itemised estimates, invitation letters and travel support with independent partner hospitals. TechDr does not perform surgery, does not employ the treating doctors, does not promise a bed or a result, and does not arrange paid organ donation or surrogacy.</p>
        <p className="mt-4">TODO(client): state how TechDr is paid, for example by partner hospitals, by a coordination fee, or by both, in the words the accounts actually use.</p>
        <p className="mt-4">Complaints come to {site.email} with the page address or the case reference. We acknowledge the email and correct a factual error on the page it concerns. Clinical complaints about a hospital stay belong to that hospital as well, and we will say so.</p>
        <p className="mt-4">The comparison prices on this site are indicative starting estimates in USD for {site.year}. A written quote after your reports replaces the table. The phone numbers and the Secunderabad address in the footer are the ones used for this site.</p>
        <p className="mt-4">Write to {site.email}, or WhatsApp {site.whatsapps.map(formatPhone).join(" or ")}.</p>
        <LegalIdentity />
      </article>
    </>
  );
}
