import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { AssistanceCta } from "@/components/assistance/AssistanceCta";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { confirmedRoutes, getAssistanceRoute, routeBody, routeIsIndexable, type AssistanceRoute } from "@/data/assistance-routes";
import { routing } from "@/i18n/routing";
import { assistanceGraph } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  const routes = confirmedRoutes();
  if (!routes.length) return routing.locales.map((locale) => ({ locale, route: "unconfirmed" }));
  return routing.locales.flatMap((locale) => routes.map((route) => ({ locale, route: route.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; route: string }> }) {
  const { locale, route: slug } = await params;
  const route = getAssistanceRoute(slug);
  if (!route) return {};
  const title = `Air Ambulance from ${route.from.city} to ${route.to.city} | TechDr`;
  return pageMetadata({
    locale,
    path: `/medical-assistance/air-ambulance/${route.slug}`,
    title,
    description: `TechDr arranges a medical flight from ${route.from.city} to ${route.to.city} with a licensed air ambulance operator. Priced per case.`,
    index: routeIsIndexable(route),
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string; route: string }> }) {
  const { locale, route: slug } = await params;
  if (slug === "unconfirmed") notFound();
  const route = getAssistanceRoute(slug);
  if (!route) notFound();
  setRequestLocale(locale);
  const path = `/medical-assistance/air-ambulance/${route.slug}`;
  const faqs = routeFaqs(route);
  return (
    <>
      <JsonLd
        data={assistanceGraph({
          url: absoluteUrl(locale, path),
          name: `Air ambulance from ${route.from.city} to ${route.to.city}`,
          description: routeBody(route),
          faqs,
          areaServed: [route.from.country, route.to.country],
        })}
      />
      <Breadcrumbs
        locale={locale}
        items={[
          { name: "Medical assistance", path: "/medical-assistance" },
          { name: "Air ambulance", path: "/medical-assistance/air-ambulance" },
          { name: `${route.from.city} to ${route.to.city}`, path },
        ]}
      />
      <article className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="max-w-3xl">
        <h1 className="text-balance">
          Air ambulance from {route.from.city} to {route.to.city}
        </h1>
        <p className="mt-4">{routeIntro(route)}</p>
        <section className="mt-8">
          <h2>Which airports does this route use?</h2>
          <p className="mt-2">
            Departure is {route.from.airport}. Arrival is {route.to.airport}. The operator confirms the terminal and the ambulance door once the flight is accepted.
          </p>
        </section>
        <section className="mt-8">
          <h2>How long is the flight, and what aircraft is used?</h2>
          <p className="mt-2">{flightLine(route)}</p>
        </section>
        <section className="mt-8">
          <h2>Which permits does {route.from.country} require?</h2>
          <p className="mt-2">
            Permits for a medical flight leaving {route.from.country} are the licensed operator&apos;s responsibility. Families are usually asked for the passport, a current medical summary and a letter from the treating clinician. The operator confirms the papers for a departure from {route.from.city}.
          </p>
        </section>
        <section className="mt-8">
          <h2>What does this city pair cost?</h2>
          <p className="mt-2">{priceLine(route)}</p>
        </section>
        {route.brief ? (
          <section className="mt-8">
            <h2>What is specific to this journey?</h2>
            <p className="mt-2">{route.brief}</p>
          </section>
        ) : null}
        {faqs.map((faq) => (
          <section key={faq.question} className="mt-8">
            <h2>{faq.question}</h2>
            <p className="mt-2">{faq.answer}</p>
          </section>
        ))}
        <p className="mt-8">
          <Link className="text-primary-ink underline" href="/medical-assistance/air-ambulance">
            Read how TechDr arranges an air ambulance
          </Link>
        </p>
        <AssistanceCta service="air-ambulance" quiet={false} emergency />
        </div>
      </article>
    </>
  );
}

function routeIntro(route: AssistanceRoute) {
  if (route.direction === "to-india") {
    return `TechDr arranges a medical flight for a patient in ${route.from.city}, ${route.from.country}, who needs treatment in ${route.to.city} and is too unwell for a normal airline seat. A licensed air ambulance operator flies the patient. TechDr coordinates the request, the medical summary and the handover.`;
  }
  return `TechDr arranges a medical flight home from ${route.from.city} to ${route.to.city} when the treating team says a normal airline seat is not appropriate after care in India. A licensed air ambulance operator flies the patient. TechDr coordinates the request and the family handover.`;
}

function flightLine(route: AssistanceRoute) {
  const time =
    route.flightHours && route.flightTimeSource
      ? `A sourced planning time is about ${route.flightHours} hours (${route.flightTimeSource}). Winds, routing and a fuel stop can change it.`
      : "Flight time is confirmed by the operator in the quote. It is not published here until a sourced figure exists for this city pair.";
  const aircraft = route.aircraft ? ` Typical aircraft noted for this request: ${route.aircraft}.` : " The operator names the aircraft when the case is accepted.";
  const stops = route.fuelStops ? ` Fuel stop: ${route.fuelStops}.` : "";
  return `${time}${aircraft}${stops}`;
}

function priceLine(route: AssistanceRoute) {
  if (route.price?.verified) {
    return `A verified planning range is USD ${route.price.min}–${route.price.max}. It is not a booking until the operator confirms it in writing.`;
  }
  return "Priced per case. It depends on distance, aircraft, medical team and equipment.";
}

function routeFaqs(route: AssistanceRoute) {
  return [
    {
      question: `Can a relative fly from ${route.from.city} with the patient?`,
      answer: `Only if the operator has a spare seat on the aircraft chosen for ${route.from.city} to ${route.to.city}, and the clinicians agree. Ask when the quote is prepared.`,
    },
    {
      question: `Who arranges permission to leave ${route.from.country}?`,
      answer: `The licensed operator arranges exit permission, slots and any overflight for a departure from ${route.from.country}. TechDr collects the medical papers the operator asks for.`,
    },
  ];
}
