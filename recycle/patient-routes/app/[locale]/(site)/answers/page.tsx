import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { AnswerBox } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { readyAnswerRecords } from "@/lib/answers";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!readyAnswerRecords().length) return {};
  return pageMetadata({
    locale,
    path: "/answers",
    title: "Patient questions about treatment in India | TechDr",
    description: "Sourced answers to real questions from people planning treatment in India.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const answers = readyAnswerRecords();
  if (!answers.length) notFound();
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ name: "Answers", path: "/answers" }]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1>Questions patients ask before they travel</h1>
        <div className="mt-6">
          <AnswerBox>These are questions TechDr has actually been asked, with a sourced answer and a review date. A question is not a quote.</AnswerBox>
        </div>
        <ul className="mt-8 space-y-3">
          {answers.map((answer) => (
            <li key={answer.slug}>
              <Link className="text-primary-ink underline" href={`/answers/${answer.slug}`}>{answer.question}</Link>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
