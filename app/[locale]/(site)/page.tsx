import { setRequestLocale } from "next-intl/server";
import { HomeView } from "@/components/sections/HomeView";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/",
    title: "Treatment in India, Up to 80% Less | TechDr",
    description:
      "TechDr plans accredited hospital care in India for international patients, with free quotes, visa letters and transparent USD estimates. No hidden fees.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeView />;
}
