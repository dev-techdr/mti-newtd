import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { LegalIdentity } from "@/components/legal/LegalIdentity";
import { formatPhone, site, telHref, whatsappHref } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/contact",
    title: "Contact TechDr Medical Tourism | TechDr",
    description:
      "Contact TechDr Medical Tourism for a treatment plan in India. Email medicaltourism@techdr.in or WhatsApp +91 63032 25006 and +91 84990 05006.",
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
          {site.whatsapps.map((number) => (
            <li key={number}>
              <a className="text-primary-ink underline" href={telHref(number)}>Call {formatPhone(number)}</a>
              {" · "}
              <a className="text-primary-ink underline" href={whatsappHref("Hello TechDr, I would like to discuss treatment in India.", number)}>WhatsApp {formatPhone(number)}</a>
            </li>
          ))}
        </ul>
        <p className="mt-4">Both numbers are the same case desk. They are not personal numbers that change between staff.</p>
        <h2 className="mt-10">Registered office</h2>
        <LegalIdentity />
      </article>
    </>
  );
}
