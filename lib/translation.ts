import { routing, type Locale } from "@/i18n/routing";
import type { TranslatedFlags } from "@/data/procedures/types";

export type { TranslatedFlags };

/** Main copy, titles and meta descriptions are English until a locale is marked. */
export const untranslated: TranslatedFlags = { ar: false, fr: false, ru: false, bn: false };

export function localeIsIndexable(locale: string, translated: TranslatedFlags = untranslated) {
  if (locale === routing.defaultLocale) return true;
  if (locale === "ar" || locale === "fr" || locale === "ru" || locale === "bn") return translated[locale];
  return false;
}

export function indexableLocales(translated: TranslatedFlags = untranslated): Locale[] {
  return routing.locales.filter((locale) => localeIsIndexable(locale, translated));
}
