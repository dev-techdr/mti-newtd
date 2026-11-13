import type { Metadata } from "next";
import type { TranslatedFlags } from "@/data/procedures/types";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/lib/site";
import { indexableLocales, localeIsIndexable, untranslated } from "@/lib/translation";

const ogLocale: Record<Locale, string> = {
  en: "en_IN",
  ar: "ar_AR",
  fr: "fr_FR",
  ru: "ru_RU",
  bn: "bn_BD",
};

export function localizedPath(locale: string, path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function absoluteUrl(locale: string, path: string) {
  return `${site.url}${localizedPath(locale, path)}`;
}

export function languageAlternates(path: string, translated: TranslatedFlags = untranslated) {
  const languages: Record<string, string> = {};
  for (const locale of indexableLocales(translated)) {
    languages[locale] = absoluteUrl(locale, path);
  }
  languages["x-default"] = absoluteUrl(routing.defaultLocale, path);
  return languages;
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  index = true,
  translated = untranslated,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  index?: boolean;
  translated?: TranslatedFlags;
}): Metadata {
  const url = absoluteUrl(locale, path);
  const localeIndex = index && localeIsIndexable(locale, translated);
  return {
    title,
    description,
    alternates: {
      canonical: index ? absoluteUrl(routing.defaultLocale, path) : url,
      ...(localeIndex ? { languages: languageAlternates(path, translated) } : {}),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: ogLocale[locale as Locale] ?? "en_IN",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: localeIndex, follow: true },
  };
}
