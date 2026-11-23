import { cities } from "../data/cities";
import { countries } from "../data/countries";
import { directoryQuickAnswer, directoryText } from "../data/patients/directory";
import { isCountryIndexable } from "../data/patients/publish";
import { prioritySlugs } from "../data/decision-guides";
import { isLibraryProcedure, procedures } from "../data/procedures";
import { costModel, countryModel, longSentences, pageText, treatmentModel, wordCount } from "../lib/page-model";

type Page = { id: string; indexable: boolean; text: string; quick?: string; faqs?: number; facts?: number };

function sentences(text: string) {
  return longSentences(text).map((item) => item.toLowerCase());
}

const pages: Page[] = [];

for (const procedure of procedures) {
  const model = treatmentModel(procedure);
  pages.push({
    id: `treatment:${procedure.slug}`,
    indexable: !isLibraryProcedure(procedure.slug),
    text: pageText(model),
    quick: model.quickAnswer,
    faqs: model.faqs.length,
    facts: model.facts.length,
  });
  if (procedure.kind !== "emergency") {
    const cost = costModel(procedure);
    pages.push({
      id: `cost:${procedure.costId}`,
      indexable: !isLibraryProcedure(procedure.slug),
      text: pageText(cost),
      quick: cost.quickAnswer,
      faqs: cost.faqs.length,
      facts: cost.facts.length,
    });
  }
}

for (const country of countries) {
  const model = countryModel(country);
  pages.push({
    id: `country:${country.slug}`,
    indexable: isCountryIndexable(country.slug),
    text: pageText(model),
    quick: model.quickAnswer,
    faqs: model.faqs.length,
    facts: model.facts.length,
  });
}

pages.push({
  id: "directory:patients-from",
  indexable: true,
  text: directoryText(),
  quick: directoryQuickAnswer,
});

for (const city of cities) {
  const text = [city.answer, city.overview, city.stay, city.climate, ...city.practical, ...city.faqs.flatMap((item) => [item.question, item.answer])].join("\n");
  pages.push({ id: `city:${city.path}`, indexable: true, text });
}

const missingPriority = prioritySlugs.filter((slug) => !procedures.some((item) => item.slug === slug));
if (missingPriority.length) {
  console.error(`Priority slugs missing: ${missingPriority.join(", ")}`);
  process.exit(1);
}

const errors: string[] = [];

for (const page of pages) {
  const list = sentences(page.text);
  const counts = new Map<string, number>();
  for (const sentence of list) counts.set(sentence, (counts.get(sentence) ?? 0) + 1);
  for (const [sentence, count] of counts) {
    if (count > 1) errors.push(`${page.id} repeats (${count}): ${sentence.slice(0, 180)}`);
  }
  if (page.quick && (wordCount(page.quick) < 40 || wordCount(page.quick) > 60)) {
    errors.push(`${page.id} quick answer is ${wordCount(page.quick)} words`);
  }
  if (!page.indexable) continue;
  if (page.faqs !== undefined && page.faqs < 8) errors.push(`${page.id} has ${page.faqs} FAQs`);
  if (page.facts !== undefined && page.facts < 3) errors.push(`${page.id} has ${page.facts} facts`);
}

const indexable = pages.filter((page) => page.indexable).map((page) => ({ id: page.id, sentences: [...new Set(sentences(page.text))] }));
for (let i = 0; i < indexable.length; i++) {
  const a = new Set(indexable[i].sentences);
  for (let j = i + 1; j < indexable.length; j++) {
    const b = indexable[j].sentences;
    if (!a.size || !b.length) continue;
    let shared = 0;
    const seen = new Set<string>();
    for (const sentence of b) {
      if (seen.has(sentence)) continue;
      seen.add(sentence);
      if (a.has(sentence)) shared++;
    }
    const denom = Math.min(a.size, seen.size);
    if (denom > 0 && shared / denom > 0.4) {
      errors.push(`${indexable[i].id} and ${indexable[j].id} share ${shared}/${denom} sentences`);
    }
  }
}

if (errors.length) {
  console.error(errors.slice(0, 40).join("\n"));
  console.error(`\n${errors.length} repetition or structure errors`);
  process.exit(1);
}

console.log(`Repetition check passed for ${pages.length} pages.`);
