import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { LegalPage, legalMeta, type LegalKind } from "@/components/templates/Legal";
import { routing } from "@/i18n/routing";

function legalRoute(kind: LegalKind) {
  return async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) notFound();
    return <LegalPage kind={kind} locale={locale} />;
  };
}

function legalGenerate(kind: LegalKind) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    return legalMeta(kind, locale);
  };
}

export const PrivacyPage = legalRoute("privacy-policy");
export const privacyMetadata = legalGenerate("privacy-policy");
export const TermsPage = legalRoute("terms");
export const termsMetadata = legalGenerate("terms");
export const DisclaimerPage = legalRoute("medical-disclaimer");
export const disclaimerMetadata = legalGenerate("medical-disclaimer");
export const EditorialPage = legalRoute("editorial-policy");
export const editorialMetadata = legalGenerate("editorial-policy");
