import { treatmentCities } from "@/data/cities";
import { absoluteUrl } from "@/lib/seo";
import { coordinatorLanguages, legal, site, socialLinks } from "@/lib/site";

export type Crumb = { name: string; path: string };

export function crumbList(locale: string, items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}

export function faqList(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function siteGraph(locale: string) {
  const orgId = `${site.url}/#organization`;
  const sameAs = socialLinks();
  const address = {
    "@type": "PostalAddress",
    streetAddress: legal.street,
    addressLocality: `${legal.locality}, ${legal.district}`,
    addressRegion: legal.region,
    postalCode: legal.postalCode,
    addressCountry: legal.country,
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.name,
        legalName: legal.entity,
        alternateName: legal.brand,
        url: site.url,
        email: site.email,
        logo: `${site.url}/logo.svg`,
        taxID: legal.pan,
        vatID: legal.gstin,
        address,
        description:
          "TechDr Medical Tourism coordinates affordable treatment in India for international patients. It is a medical travel service, not a hospital.",
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "MedicalBusiness",
        "@id": `${site.url}/#business`,
        name: site.name,
        legalName: legal.entity,
        alternateName: legal.brand,
        url: site.url,
        image: `${site.url}/logo.svg`,
        taxID: legal.pan,
        vatID: legal.gstin,
        address,
        parentOrganization: { "@id": orgId },
        description:
          "Medical tourism facilitation: treatment plans, indicative cost estimates, visa invitation letters and travel support with independent JCI and NABH-accredited partner hospitals.",
        currenciesAccepted: "USD",
        areaServed: [
          "Nigeria",
          "Kenya",
          "Bangladesh",
          "Iraq",
          "Oman",
          "Uzbekistan",
          "Ethiopia",
          "Tanzania",
          "Afghanistan",
          "Yemen",
          "United Kingdom",
          "United States",
          ...treatmentCities().map((city) => ({
            "@type": "City",
            name: city.searchName,
            containedInPlace: { "@type": "Country", name: "India" },
          })),
        ],
        contactPoint: site.whatsapps.map((telephone) => ({
          "@type": "ContactPoint",
          contactType: "patient support",
          email: site.email,
          telephone,
          availableLanguage: [...coordinatorLanguages],
          hoursAvailable: "Mo-Su 00:00-23:59",
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: locale,
        publisher: { "@id": orgId },
        potentialAction: {
          "@type": "SearchAction",
          target: `${absoluteUrl(locale, "/treatments")}?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}
