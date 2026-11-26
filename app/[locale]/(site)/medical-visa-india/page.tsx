import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AnswerBox, Byline } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/accordion";
import { countries } from "@/data/countries";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const faqs = [
  { question: "How long does an Indian e-Medical Visa take?", answer: "Processing is often a few days, and it can be longer. Apply only after you have the hospital letter and do not buy a non-refundable ticket first. Check the current time on the official portal." },
  { question: "What does TechDr’s invitation letter do?", answer: "It is a hospital letter supporting your application. It is not a visa, and it does not guarantee approval." },
  { question: "Can my companion apply?", answer: "A medical attendant visa exists for eligible companions. The rules, the number of attendants and the documents change. Confirm them on the official portal." },
  { question: "Which documents are usually needed?", answer: "Passport, photo, the invitation letter, proof of funds and, sometimes, a letter explaining the treatment. The portal’s checklist for your nationality is the one that counts." },
  { question: "What are validity and entries?", answer: "They are printed on the approval and can differ by nationality. Do not assume a 60-day stay. Read your own grant letter." },
  { question: "Can I convert a tourist visa after I land?", answer: "Do not plan on it. Arrive on the category that allows your treatment." },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/medical-visa-india",
    title: "India e-Medical Visa Guide | TechDr",
    description:
      "How the India e-Medical Visa and attendant visa work, what the hospital invitation letter is for, and why you must confirm rules on the official portal.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }} />
      <Breadcrumbs locale={locale} items={[{ name: "Medical visa", path: "/medical-visa-india" }]} />
      <article className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="max-w-3xl">
          <h1 className="text-balance">India e-Medical Visa and attendant visa</h1>
          <div className="mt-6"><AnswerBox>An Indian e-Medical Visa lets eligible patients travel for treatment at a recognised hospital. TechDr arranges the hospital invitation letter after you accept a written plan. The visa itself is issued only through the official portal, and the rules change.</AnswerBox></div>
          <p className="mt-4 rounded-2xl bg-amber-100 p-4 text-sm text-amber-950">Visa rules change. Always confirm on the official Indian visa portal.</p>
          <h2 className="mt-10">Who can apply?</h2>
          <p className="mt-3">Eligibility depends on your passport. Some nationalities use a different channel from the standard e-visa. Check the list before you pay an agent. The patient and each attendant usually file separate applications. A child needs a parent or legal guardian on the documents.</p>
          <h2 className="mt-10">Which documents should you prepare?</h2>
          <ul className="mt-4 list-disc space-y-2 rounded-2xl border border-border bg-card p-5 ps-10 text-sm">
            <li>Passport with the validity the portal currently requires, plus a spare copy</li>
            <li>A digital photo that matches the size rules</li>
            <li>The hospital invitation letter</li>
            <li>Proof of funds or a return plan, if the form asks</li>
            <li>Attendant proof of relationship when that category asks for it</li>
          </ul>
          <h2 className="mt-10">How do you apply, step by step?</h2>
          <ol className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
            {[
              "Accept a written TechDr plan so the partner hospital can issue an invitation letter.",
              "Open the official portal and select the medical category your passport is offered.",
              "Upload the letter, photo and passport page. Pay the fee shown there, not a fee invented in a chat group.",
              "Wait for the grant. Print it or save the PDF. Airlines sometimes ask at check-in.",
              "Carry the letter and the grant in your cabin bag.",
            ].map((step, index) => (
              <li key={step} className="grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-3 border-b border-border px-4 py-4 last:border-b-0">
                <span className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary-ink">{index + 1}</span>
                <p className="text-sm leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
          <h2 className="mt-10">How long does it take, and how long is it valid?</h2>
          <p className="mt-3">Many applications are decided in a few working days. Some take longer, and some are refused. Validity, the number of entries and the length of each stay are on your grant letter. A treatment that needs eight weeks in India may not fit a short stay. Tell the case manager your expected length of stay before the letter is requested, so the hospital can state it.</p>
          <h2 className="mt-10">What does the invitation letter contain?</h2>
          <p className="mt-3">It identifies the patient, the planned treatment in general terms, and the partner hospital. It does not promise a bed on a date the surgeon has not confirmed, and it does not override a committee decision on a transplant donor.</p>
          <p className="mt-3">Apply at <a className="text-primary-ink underline" href="https://indianvisaonline.gov.in/">indianvisaonline.gov.in</a>.</p>
        </div>
        <h2 className="mt-10">Country guides</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((country) => (
            <li key={country.slug}>
              <Link className="block rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-primary-ink hover:bg-surface" href={`/patients-from/${country.slug}`}>{country.name}</Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 max-w-3xl">
          <h2>Visa questions</h2>
          <div className="mt-4"><FaqList items={faqs} /></div>
          <Byline locale={locale} updated={site.updated} />
        </div>
      </article>
    </>
  );
}
