import { setRequestLocale } from "next-intl/server";
import { HomeView } from "@/components/sections/HomeView";
import { pageMetadata } from "@/lib/seo";
import { positioning } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/",
    title: "Find the Right Treatment Abroad | TechDr",
    description: positioning,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeView />;
}
