import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { stories } from "@/data/stories";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/patient-stories",
    title: "Patient Stories | TechDr",
    description:
      "Composite, anonymised examples of how international patients use TechDr. Replace them with consented stories before treating them as reviews.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ name: "Patient stories", path: "/patient-stories" }]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1>Patient stories</h1>
        <p className="mt-4">These are composite, anonymised examples so you can see the shape of a journey. They are not reviews, and they are not outcomes. TechDr will replace them with consented stories before launch. We do not publish star ratings.</p>
        <div className="mt-8 space-y-4">
          {stories.map((story) => (
            <blockquote key={story.name} className="rounded-2xl border border-border p-5">
              <p>{story.quote}</p>
              <footer className="mt-3 text-sm text-muted">{story.name} · {story.country} · {story.procedure}</footer>
            </blockquote>
          ))}
        </div>
      </article>
    </>
  );
}
