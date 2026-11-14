import { posts } from "@/data/blog";
import { cityComboIndexable } from "@/data/city-unique";
import { cities, cityPath, treatmentCities, type City } from "@/data/cities";
import { getCost, moneyRange } from "@/data/costs";
import { procedurePath, procedures, type Procedure } from "@/data/procedures";
import { specialties } from "@/data/specialties";
import { absoluteUrl } from "@/lib/seo";
import { latestDate, sitemapPaths } from "@/lib/sitemap-entries";
import { legal, site } from "@/lib/site";

export function cityTreatmentPath(city: Pick<City, "path">, procedure: Pick<Procedure, "slug">) {
  return `${cityPath(city)}/${procedure.slug}`;
}

export function citySpecialtyPath(city: Pick<City, "path">, specialty: { slug: string }) {
  return `${cityPath(city)}/departments/${specialty.slug}`;
}

export function citySpecialtyEntries() {
  return cities.flatMap((city) =>
    specialties
      .filter((specialty) => cityComboIndexable(city.path, `departments/${specialty.slug}`))
      .map((specialty) => ({ path: citySpecialtyPath(city, specialty), lastModified: site.updated })),
  );
}

export function cityTreatmentPairs() {
  return treatmentCities().flatMap((city) => procedures.map((procedure) => ({ city, procedure })));
}

export function cityPlace(city: City) {
  return city.searchName === city.name ? city.searchName : `${city.searchName} (${city.name})`;
}

export function cityTreatmentTitle(city: City, procedure: Procedure) {
  const title = `${procedure.card} in ${city.searchName} | TechDr`;
  return title.length > 60 ? `${procedure.card} in ${city.searchName}` : title;
}

const transplantLimit = "Foreign patients cannot freely receive an Indian deceased-donor organ. A lawful donor and authorisation-committee approval are required. Paid donation is refused.";

export function cityTreatmentDescription(city: City, procedure: Procedure) {
  const cost = getCost(procedure.costId);
  const base = `${procedure.card} in ${city.searchName}: ${moneyRange(cost.india)} ${cost.unit}. Stay ${procedure.totalStay}, fly into ${city.airportCode}. ${city.name} campus named in a written TechDr quote.`;
  return procedure.specialty === "organ-transplant" ? `${base} ${transplantLimit}` : base;
}

export function cityTreatmentAnswer(city: City, procedure: Procedure) {
  const cost = getCost(procedure.costId);
  const base = `${procedure.name} in ${cityPlace(city)} is planned from your reports, with an indicative ${site.year} range of ${moneyRange(cost.india)} ${cost.unit}. Most people spend ${procedure.hospitalStay} in hospital and ${procedure.totalStay} in the city. Fly into ${city.airport}. The written quote names the campus. TechDr does not promise a price or a clinical outcome.`;
  return procedure.specialty === "organ-transplant" ? `${base} ${transplantLimit}` : base;
}

export function cityTreatmentFaqs(city: City, procedure: Procedure) {
  const cost = getCost(procedure.costId);
  const range = `${moneyRange(cost.india)} ${cost.unit}`;
  return [
    {
      question: `How much does ${procedure.card.toLowerCase()} cost in ${city.searchName}?`,
      answer: `The indicative ${site.year} range is ${range}. It is a planning band for a typical case. Drugs, the length of stay and a complication can move the figure. A written quote follows review of your reports.`,
    },
    {
      question: `Which airport should I use for ${procedure.card.toLowerCase()} in ${city.searchName}?`,
      answer: `${city.airport}. Pickup is booked against your flight number after you accept a plan. ${city.practical[0] ?? ""}`.trim(),
    },
    {
      question: `How long do I stay in ${city.searchName} for ${procedure.card.toLowerCase()}?`,
      answer: `Hospital stay is usually ${procedure.hospitalStay}. Total time in the city is usually ${procedure.totalStay}. ${city.stay}`,
    },
    {
      question: `What is recovery like after ${procedure.card.toLowerCase()} in ${city.searchName}?`,
      answer: `Ask the discharge summary how walking, wounds and medicines should go after ${procedure.card.toLowerCase()} in ${city.searchName}. Weather is not a recovery plan.`,
    },
    {
      question: `Can TechDr arrange ${procedure.card.toLowerCase()} in ${city.searchName}?`,
      answer: `${city.answer} Anaesthesia for this operation is ${procedure.anaesthesia.charAt(0).toLowerCase()}${procedure.anaesthesia.slice(1)}.`,
    },
  ];
}

export function cityTreatmentEntries() {
  return cityTreatmentPairs()
    .filter(({ city, procedure }) => cityComboIndexable(city.path, procedure.slug))
    .map(({ city, procedure }) => ({
      path: cityTreatmentPath(city, procedure),
      lastModified: procedure.updated,
    }));
}

const cityItems = [...citySpecialtyEntries(), ...cityTreatmentEntries()];

export function citySitemapItems() {
  return cityItems;
}

export const cityTreatmentSitemapLastModified = latestDate(cityItems.map((item) => item.lastModified));

export function publishedSitemapPaths() {
  return sitemapPaths.filter((path) => path !== "/sitemaps/city-treatments/sitemap.xml" || cityItems.length > 0);
}

export function llmsText() {
  const cityList = treatmentCities()
    .map((city) => `- [${city.searchName}](${absoluteUrl("en", cityPath(city))}): ${city.description}`)
    .join("\n");
  const treatments = procedures
    .map((procedure) => {
      const cost = getCost(procedure.costId);
      return `- [${procedure.name}](${absoluteUrl("en", procedurePath(procedure))}): ${moneyRange(cost.india)} ${cost.unit}. Care ${procedure.hospitalStay}. Time in India ${procedure.totalStay}.`;
    })
    .join("\n");

  return `# ${site.name}

> ${site.name} (${site.url.replace("https://", "")}) helps international patients plan affordable treatment in India with JCI and NABH-accredited partner hospitals. It is a medical travel service, not a hospital, and it does not publish the names of individual doctors.

- Canonical site: ${site.url}
- Email: ${site.email}
- WhatsApp and phone: ${site.whatsapps.join(", ")}
- Legal entity: ${legal.entity}, ${legal.constitution}, trading as ${legal.tradeName}
- Medical tourism brand: ${legal.brand} (${legal.websiteLabel})
- Authorized signatory: ${legal.signatory}, ${legal.signatoryRole}
- GSTIN: ${legal.gstin}. PAN: ${legal.pan}. TAN: ${legal.tan}
- Registered address: ${legal.address}
- Content language: English, with Arabic, French, Russian and Bengali navigation. Hindi-speaking coordinators are also offered.
- Last updated: ${site.updated}
- Prices are indicative starting estimates in USD for ${site.year}. They are not a personal quote and not a promise of an outcome.
- Paid organ donation is refused. Surrogacy arrangements are refused.
- Visa rules change. Confirm them on the official Indian visa portal.
- Google Ads and Meta (Facebook and Instagram) advertisements are marketing. They are not medical advice, a personal quote, or a promised outcome. Advertising cookies load only after the visitor allows them.

## Cities

The five city guides below are the indexable destination pages. City × treatment URLs stay out of this list until they have unique copy.

${cityList}

## Treatments

${treatments}

## Guides

${posts
  .map((post) => `- [${post.title}](${absoluteUrl("en", `/blog/${post.slug}`)}): ${post.description}`)
  .join("\n")}

## Sitemaps

- ${site.url}/sitemap.xml
${publishedSitemapPaths().map((path) => `- ${site.url}${path}`).join("\n")}
- Full brief: ${site.url}/llms-full.txt
`;
}
