import { catalogProcedures } from "./catalog";
import { finalProcedures } from "./final";
import { heartProcedures } from "./heart";
import { libraryProcedures, sameGuideLabel, sectionEntries } from "./library";
import { moreProcedures } from "./more";
import { primaryProcedures } from "./orthopedic";
import { otherProcedures } from "./eyes";
import { transplantProcedures } from "./transplant";
import type { Procedure } from "./types";

export type { Procedure } from "./types";
export { journeySteps, sharedExcluded } from "./types";

const untranslated = { ar: false, fr: false, ru: false, bn: false } as const;

function stamp(item: Procedure): Procedure {
  return {
    ...item,
    translated: item.translated ?? untranslated,
    kind: item.kind ?? (item.slug === "cauda-equina-syndrome" ? "emergency" : "procedure"),
  };
}

export const procedures: Procedure[] = [
  ...primaryProcedures,
  ...heartProcedures,
  ...transplantProcedures,
  ...otherProcedures,
  ...moreProcedures,
  ...finalProcedures,
  ...catalogProcedures,
  ...libraryProcedures,
].map(stamp);

const duplicateSlugs = procedures.map((item) => item.slug).filter((slug, index, all) => all.indexOf(slug) !== index);
if (duplicateSlugs.length) throw new Error(`Duplicate procedure slugs: ${[...new Set(duplicateSlugs)].join(", ")}`);

const librarySlugs = new Set(libraryProcedures.map((item) => item.slug));

/** Library rows share one template. They stay reachable and out of the index until each record has its own facts. */
export function isLibraryProcedure(slug: string) {
  return librarySlugs.has(slug);
}

const bySlug = new Map(procedures.map((item) => [item.slug, item]));

export function getProcedure(slug: string) {
  return bySlug.get(slug);
}

export function proceduresBySpecialty(specialty: string) {
  return procedures.filter((item) => item.specialty === specialty);
}

export function guidesForSpecialty(specialty: string) {
  const own = proceduresBySpecialty(specialty);
  const catalogue = sectionEntries.filter((entry) => entry.specialty === specialty);
  const leads = own.filter((item) => !catalogue.some((entry) => entry.slug === item.slug && sameGuideLabel(entry.label, item.name)));
  const cards = leads.map((procedure) => ({ key: procedure.slug, label: procedure.name, procedure }));
  const seen = new Set(cards.map((card) => `${card.procedure.slug}|${card.label.toLowerCase()}`));
  for (const entry of catalogue) {
    const procedure = bySlug.get(entry.slug);
    if (!procedure) continue;
    if (cards.some((card) => card.procedure.slug === procedure.slug && sameGuideLabel(card.label, entry.label))) continue;
    const key = `${procedure.slug}|${entry.label.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    cards.push({ key, label: entry.label, procedure });
  }
  return cards;
}

export function treatmentSearchItems() {
  const items = new Map<string, { href: string; label: string; specialty: string }>();
  for (const item of procedures) {
    const href = procedurePath(item);
    items.set(`${href}|${item.name.toLowerCase()}`, { href, label: item.name, specialty: item.specialty });
  }
  for (const entry of sectionEntries) {
    const page = bySlug.get(entry.slug);
    if (!page) continue;
    const href = procedurePath(page);
    const key = `${href}|${entry.label.toLowerCase()}`;
    if (!items.has(key)) items.set(key, { href, label: entry.label, specialty: entry.specialty });
  }
  return [...items.values()];
}

export function costPath(costId: string) {
  return `/cost/${costId}-cost-in-india`;
}

export function procedurePath(item: Pick<Procedure, "specialty" | "slug">) {
  return `/treatments/${item.specialty}/${item.slug}`;
}
