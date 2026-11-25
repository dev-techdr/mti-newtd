import { setRequestLocale } from "next-intl/server";
import { HomeView } from "@/components/sections/HomeView";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/",
    title: "Affordable Treatment in India for International Patients | TechDr",
    description:
      "Send your reports and get a free written opinion and itemised estimate from accredited hospitals within 48 hours. TechDr arranges your visa letter, travel and stay.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeView />;
}
