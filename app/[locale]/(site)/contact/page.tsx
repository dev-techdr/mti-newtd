import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { LegalIdentity } from "@/components/legal/LegalIdentity";
import { WhatsAppLink } from "@/components/contact/WhatsAppLink";
import { formatPhone, site, telHref } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/contact",
    title: "Contact TechDr Medical Tourism | TechDr",
    description:
      "Contact TechDr Medical Tourism for a treatment plan in India. Email medicaltourism@techdr.in or WhatsApp +91 63032 25006.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ name: "Contact", path: "/contact" }]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1>Contact</h1>
        <p className="mt-4">Email <a className="text-primary-ink underline" href={`mailto:${site.email}`}>{site.email}</a>. The case desk aims to reply within one working day, and a complete medical file is turned into opinions and an estimate within 48 hours.</p>
        <ul className="mt-4 space-y-2" id="whatsapp">
          <li>
            <a className="text-primary-ink underline" href={telHref()}>Call {formatPhone(site.phone)}</a>
            {" · "}
            <WhatsAppLink className="text-primary-ink underline">WhatsApp {formatPhone(site.whatsapp)}</WhatsAppLink>
          </li>
        </ul>
        <h2 className="mt-10">Registered office</h2>
        <LegalIdentity />
      </article>
    </>
  );
}
