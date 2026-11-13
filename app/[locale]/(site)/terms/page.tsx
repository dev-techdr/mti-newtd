import type { Metadata } from "next";
import { LegalPage, legalMeta } from "@/components/templates/Legal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return legalMeta("terms", locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LegalPage kind="terms" locale={locale} />;
}
