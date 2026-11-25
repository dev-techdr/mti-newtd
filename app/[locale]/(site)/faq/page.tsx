import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/accordion";
import { masterFaqs } from "@/data/faqs";
import { faqList } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/faq",
    title: "Medical Travel FAQ | TechDr",
    description:
      "Answers on cost, safety, visas, quotes and what TechDr will not arrange, including paid donation and promised medical results.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...faqList([...masterFaqs]) }} />
      <Breadcrumbs locale={locale} items={[{ name: "FAQ", path: "/faq" }]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1>Frequently asked questions</h1>
        <div className="mt-6"><FaqList items={[...masterFaqs]} /></div>
      </article>
    </>
  );
}
