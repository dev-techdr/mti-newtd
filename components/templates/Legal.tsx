import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LegalIdentity } from "@/components/legal/LegalIdentity";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";

const adLinks = [
  ["Google privacy policy", "https://policies.google.com/privacy"],
  ["Google ad settings", "https://adssettings.google.com"],
  ["Meta privacy policy", "https://www.facebook.com/privacy/policy"],
] as const;

const pages = {
  "privacy-policy": {
    title: "Privacy Policy | TechDr",
    description:
      "How TechDr Medical Tourism handles enquiry forms, the reports you send, optional cookies, and requests to correct or delete your case in 2026.",
    h1: "Privacy policy",
    body: [
      "Personal data on this website is controlled by Gorityala Abhista Sai, a sole proprietorship trading as TechDr and operating the medical tourism brand Medical Tours India.",
      "TechDr Medical Tourism collects only what a case needs: your name, contact details, country, the treatment you ask about, and the reports you upload. The lawful reason is to reply to your enquiry and, if you continue, to coordinate a hospital opinion.",
      "Reports are sent to the case desk by email or webhook configured by TechDr, and then to the partner hospital that will actually review them. We do not sell medical files.",
      "You can ask for a copy of your case file, a correction, or deletion by emailing medicaltourism@techdr.in. Deletion is limited where a hospital must keep a clinical record of care it has already given.",
      "The site is hosted for a global audience. Transfers follow the provider’s terms. Do not send reports you are not willing to have reviewed by a hospital in India.",
    ],
  },
  terms: {
    title: "Terms of Use | TechDr",
    description:
      "Terms for using the TechDr Medical Tourism website, including indicative prices, the limit of a quote, and what the site will not arrange in 2026.",
    h1: "Terms of use",
    body: [
      "This website is published by Gorityala Abhista Sai, a sole proprietorship trading as TechDr and operating the medical tourism brand Medical Tours India. It offers information and a coordination service. It is not a hospital, not an emergency service, and not a promise of admission.",
      "Prices are indicative starting estimates in USD for 2026 unless a written quote says otherwise. A quote is an offer to coordinate, not a contract for surgery, until you and the hospital accept the same written plan.",
      "You must not use the site to seek paid organ donation, false visa documents, or a guarantee of cure. We will close those enquiries.",
      "You are responsible for the accuracy of the reports you send. We are responsible for passing them on as received and for labelling estimates as estimates.",
      "Advertisements on Google and Meta are invitations to enquire. They are not an offer of surgery, not a fixed price, and not a promise of an outcome. The medical disclaimer applies to those ads and to the pages they open.",
    ],
  },
  "medical-disclaimer": {
    title: "Medical Disclaimer | TechDr",
    description:
      "TechDr Medical Tourism publishes information only. Google Ads and Meta ads are marketing, not a diagnosis, a quote, or emergency care.",
    h1: "Medical disclaimer",
    body: [
      "This content is published by Gorityala Abhista Sai, trading as TechDr (Medical Tours India). It is for information only and is not a substitute for professional medical advice. Do not delay local emergency care because of a page on this site.",
      "Outcome ranges describe published series in general. They are not a prediction for you. TechDr does not guarantee a price, a visa, a bed, or a clinical result.",
      "Partner hospitals are independent. Their clinicians decide whether an operation is appropriate after they see you or your full file.",
      "Advertisements on Google Ads, including Search and YouTube, and on Meta, including Facebook and Instagram, are marketing. They are not medical advice, not a hospital offer, and not a guarantee of a price, a visa, a bed, or a clinical result.",
      "Opening this website from an advertisement does not create a doctor-patient relationship. A written plan after your reports replaces anything an advertisement says.",
    ],
  },
  "editorial-policy": {
    title: "Editorial Policy | TechDr",
    description:
      "How TechDr Medical Tourism writes, reviews, and updates treatment guides, who checks medical pages, and how 2026 prices are revised in one table.",
    h1: "Editorial policy",
    body: [
      "Guides are written by the TechDr editorial team for international patients. A page names a reviewer only after that person has read it and a registration number is on file. Names are not invented.",
      "Prices are indicative ranges in US dollars, kept in one cost table so a figure is not changed on a single page and forgotten elsewhere. A range is revised when a partner hospital’s written quotes, or a public tariff we rely on, moves enough to change the band. Each page shows the date its own content last changed.",
      "We do not copy hospital brochures. We do not invent case counts, median quotes or survival percentages. A data box or an itemised sample is published only when TechDr supplies the real figures.",
      "Sources are specific pages: the NABH hospital programme and the 6th-edition hospital standards, and the government e-Medical Visa application. Each source line says what it supports.",
      "Corrections: email medicaltourism@techdr.in with the page address and the sentence you believe is wrong. Material price or visa changes are updated in the same week they are confirmed. The correction replaces the sentence and the page date moves with it.",
    ],
  },
} as const;

export type LegalKind = keyof typeof pages;

export async function LegalPage({ kind, locale }: { kind: LegalKind; locale: string }) {
  setRequestLocale(locale);
  const page = pages[kind];
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ name: page.h1, path: `/${kind}` }]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1>{page.h1}</h1>
        {kind === "privacy-policy" || kind === "terms" ? <LegalIdentity /> : null}
        {page.body.map((paragraph) => (
          <p key={paragraph} className="mt-4">
            {paragraph}
          </p>
        ))}
        {kind === "privacy-policy" ? (
          <>
            <h2 className="mt-10">Cookies and advertising</h2>
            <p className="mt-4">TechDr may advertise on Google and Meta. An advertisement is an invitation to enquire. It is not a diagnosis, a personal quote, or a promised result.</p>
            <p className="mt-4">If you choose Allow, measurement and advertising tags may load so we can see that a visit came from an ad. Reject leaves the site usable and those tags stay off. The choice is stored in this browser.</p>
            <ul className="mt-4 space-y-2">
              {adLinks.map(([label, href]) => (
                <li key={href}><a className="text-primary-ink underline" href={href}>{label}</a></li>
              ))}
            </ul>
          </>
        ) : null}
        {kind === "medical-disclaimer" ? (
          <p className="mt-4">How those advertising cookies work is in the <Link className="text-primary-ink underline" href="/privacy-policy">privacy policy</Link>.</p>
        ) : null}
      </article>
    </>
  );
}

export function legalMeta(kind: LegalKind, locale: string) {
  const page = pages[kind];
  return pageMetadata({ locale, path: `/${kind}`, title: page.title, description: page.description });
}
