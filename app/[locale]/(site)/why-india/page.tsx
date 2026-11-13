import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { AnswerBox } from "@/components/seo/AnswerBox";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/why-india",
    title: "Why Treatment in India | TechDr",
    description:
      "Why international patients compare treatment in India: accredited hospitals, itemised USD estimates, English records and stays that can be planned.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ name: "Why India", path: "/why-india" }]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1>Why people compare treatment in India</h1>
        <div className="mt-6"><AnswerBox>Patients compare India because indicative private prices for many operations are far below US and UK private ranges, while partner hospitals can be JCI or NABH accredited. A lower price is not a guarantee of a better result. The written plan still has to fit your reports.</AnswerBox></div>
        <ul className="mt-6 list-disc space-y-3 ps-5">
          <li>Accredited partner hospitals, not a promise that every building in a city is equal.</li>
          <li>Itemised estimates in USD, with exclusions written down.</li>
          <li>Senior specialists with 15–30+ years of experience review files. We do not publish their names.</li>
          <li>English discharge papers for the doctor who continues your care at home.</li>
          <li>Coordinators in English, Arabic, French, Russian, Bengali and Hindi.</li>
          <li>A case desk that will tell you not to fly if the case is an emergency or the donor pathway is not legal.</li>
        </ul>
      </article>
    </>
  );
}
