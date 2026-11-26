import { assistanceTopics, assistanceUpdated } from "@/data/assistance";
import { absoluteUrl } from "@/lib/seo";
import { specialties } from "@/data/specialties";
import { coordinatorLanguages, legal, positioning, site, socialLinks } from "@/lib/site";

const knowsAbout = [...specialties.map((item) => item.name), ...assistanceTopics];

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

export function guideGraph(input: {
  url: string;
  name: string;
  updated: string;
  kind: "condition" | "procedure" | "emergency" | "cost" | "country";
  description: string;
  faqs: { question: string; answer: string }[];
  procedureType?: string;
  howPerformed?: string;
  followup?: string;
  price?: { min: number; max: number };
  reviewed?: boolean;
  audience?: string;
}) {
  const page: Record<string, unknown> = {
    "@type": "MedicalWebPage",
    url: input.url,
    name: input.name,
    description: input.description,
  };
  if (input.reviewed !== false) page.lastReviewed = input.updated;
  if (input.audience) {
    page.about = input.name;
    page.audience = { "@type": "Patient", geographicArea: { "@type": "Country", name: input.audience } };
    page.publisher = { "@id": `${site.url}/#organization` };
  }
  const graph: Record<string, unknown>[] = [page];
  if (input.kind === "condition" || input.kind === "emergency") {
    graph.push({ "@type": "MedicalCondition", name: input.name, url: input.url });
  } else if (input.kind === "procedure" && input.howPerformed) {
    graph.push({
      "@type": "MedicalProcedure",
      name: input.name,
      url: input.url,
      ...(input.procedureType ? { procedureType: `https://schema.org/${input.procedureType}` } : {}),
      howPerformed: input.howPerformed,
      ...(input.followup ? { followup: input.followup } : {}),
      ...(input.price
        ? {
            offers: {
              "@type": "Offer",
              url: input.url,
              priceCurrency: "USD",
              availability: "https://schema.org/LimitedAvailability",
              description: "Indicative planning range, not a binding quote.",
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "USD",
                minPrice: input.price.min,
                maxPrice: input.price.max,
              },
            },
          }
        : {}),
    });
  }
  if (input.faqs.length) graph.push(faqList(input.faqs));
  return { "@context": "https://schema.org", "@graph": graph };
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
        description: positioning,
        knowsAbout,
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
        description: positioning,
        currenciesAccepted: "USD",
        areaServed: { "@type": "Place", name: "Worldwide" },
        knowsAbout,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "patient support",
          email: site.email,
          telephone: site.phone,
          availableLanguage: [...coordinatorLanguages],
        },
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

export function assistanceGraph(input: {
  url: string;
  name: string;
  description: string;
  faqs: { question: string; answer: string }[];
  areaServed?: string[];
}) {
  const service: Record<string, unknown> = {
    "@type": "Service",
    name: input.name,
    serviceType: input.name,
    url: input.url,
    description: input.description,
    provider: { "@id": `${site.url}/#organization` },
  };
  if (input.areaServed?.length) {
    service.areaServed = input.areaServed.map((name) => ({ "@type": "Place", name }));
  }
  const graph: Record<string, unknown>[] = [
    {
      "@type": "MedicalWebPage",
      url: input.url,
      name: input.name,
      description: input.description,
      lastReviewed: assistanceUpdated,
      publisher: { "@id": `${site.url}/#organization` },
    },
    service,
  ];
  if (input.faqs.length) graph.push(faqList(input.faqs));
  return { "@context": "https://schema.org", "@graph": graph };
}
