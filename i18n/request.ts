import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const loaders = {
  en: () => import("../messages/en.json"),
  ar: () => import("../messages/ar.json"),
  fr: () => import("../messages/fr.json"),
  ru: () => import("../messages/ru.json"),
  bn: () => import("../messages/bn.json"),
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await loaders[locale]()).default,
  };
});
