import { setRequestLocale } from "next-intl/server";
import { Car, FileClock, FileUp, Stamp, Video, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";

const steps: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: FileUp, title: "Share your reports", text: "Send the imaging, not only a photo of a screen, plus a medicine list and a short history. A case manager checks the file before a specialist sees it." },
  { icon: FileClock, title: "Receive opinions and quotes in 48 hours", text: "You get a written plan and an itemised indicative estimate. You can ask for a second opinion before anyone talks about flights." },
  { icon: Stamp, title: "Get the visa invitation letter", text: "After you accept a plan, the partner hospital issues an invitation letter for the visa category you are eligible for. You still apply on the official portal." },
  { icon: Car, title: "Arrive. We handle airport pickup and the stay", text: "A car meets the flight number you send. The hotel is booked near the campus in the quote, not across the city." },
  { icon: Video, title: "Treatment, recovery and online follow-up", text: "You get English discharge papers. Video reviews continue after you are home. A companion should travel with you for any operation." },
];

const related = [
  ["Patient services", "Visa letters, hotels near the campus, interpreters and follow-up.", "/patient-services"],
  ["Medical visa", "The hospital letter supports the application. It is not the visa.", "/medical-visa-india"],
  ["Treatments", "Open a department and a guide before you send reports.", "/treatments"],
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/how-it-works",
    title: "How TechDr Medical Tourism Works | TechDr",
    description:
      "Five steps from sending reports to flying home: a written quote, a visa invitation letter, airport pickup and follow-up. No hospital is booked before you accept.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ name: "How it works", path: "/how-it-works" }]} />
      <article className="mx-auto w-full max-w-6xl px-4 py-10">
        <header className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(240px,320px)]">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-ink">Five steps</p>
            <h1 className="mt-3 max-w-3xl">How TechDr works</h1>
            <p className="mt-4 max-w-2xl">TechDr Medical Tourism (medicaltourism.techdr.in) coordinates planned treatment in India. We are not a hospital. Nothing is booked until you accept a written plan, and emergencies belong in the nearest capable hospital, not on a flight.</p>
          </div>
          <aside className="rounded-2xl bg-secondary p-6 text-background">
            <h2 className="text-inherit">Start with your reports</h2>
            <p className="mt-2 text-sm text-background/80">A case manager checks the file before a specialist sees it. No hospital is booked before you accept.</p>
            <Button className="mt-4 w-full" href="/get-a-free-quote">Get a free quote</Button>
          </aside>
        </header>

        <ol className="mt-12 grid gap-4">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="grid items-start gap-4 rounded-2xl border border-border bg-card p-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-6">
              <span className="flex items-center gap-3">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-heading text-3xl font-bold leading-none text-primary-ink">0{index + 1}</span>
              </span>
              <div className="min-w-0">
                <h2>{title}</h2>
                <p className="mt-2 max-w-3xl text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ol>

        <section className="mt-12">
          <h2>Around the treatment</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {related.map(([title, text, href]) => (
              <li key={href}>
                <Link href={href} className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 hover:bg-surface">
                  <span className="font-heading text-lg font-semibold text-primary-ink">{title}</span>
                  <span className="mt-2 text-sm text-muted">{text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  );
}
