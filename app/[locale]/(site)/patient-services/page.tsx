import { setRequestLocale } from "next-intl/server";
import { Banknote, Hotel, Languages, Moon, Plane, Smartphone, Stamp, Video, type LucideIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/patient-services",
    title: "Patient Services in India | TechDr",
    description:
      "Visa letters, airport pickup, hotels near the hospital, interpreters, SIM cards, currency guidance, halal meals and prayer space on request.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const services: { icon: LucideIcon; title: string; text: string }[] = [
    { icon: Stamp, title: "Visa invitation letter", text: "Issued by the partner hospital after you accept a plan. You apply for the visa yourself on the official portal." },
    { icon: Plane, title: "Flights", text: "We advise on timing. We do not force a non-refundable ticket before a surgeon has accepted the file." },
    { icon: Hotel, title: "Hotel", text: "Booked near the campus named in the quote, with a lift if you will be using a frame or wheelchair." },
    { icon: Languages, title: "Interpreter", text: "English, Arabic, French, Russian, Bengali and Hindi coordinators. Other languages can be requested before the consultation, not in the anaesthetic room." },
    { icon: Smartphone, title: "Local SIM", text: "Useful for one-time passwords and discharge calls. We can point you to an airport counter." },
    { icon: Banknote, title: "Currency", text: "Declare foreign currency above the Indian customs threshold. Cards are the cleaner payment route. We do not suggest informal transfers." },
    { icon: Moon, title: "Prayer space and halal food", text: "Request both before admission. Partner hospitals can usually arrange them. We do not claim every ward has a dedicated prayer room." },
    { icon: Video, title: "Follow-up", text: "English summaries for your doctor at home, plus scheduled video reviews." },
  ];
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ name: "Patient services", path: "/patient-services" }]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1>Patient services</h1>
        <p className="mt-4">The clinical plan is the centre of the trip. These services exist so the clinical plan is not undone by a visa, a hotel on the wrong side of the city, or a consent form you could not read.</p>
        {services.map(({ icon: Icon, title, text }) => (
          <section key={title} className="mt-8">
            <h2 className="flex items-center gap-3">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              {title}
            </h2>
            <p className="mt-2">{text}</p>
          </section>
        ))}
      </article>
    </>
  );
}
