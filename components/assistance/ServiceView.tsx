import { Link } from "@/i18n/navigation";
import { AssistanceCta } from "@/components/assistance/AssistanceCta";
import { AnswerBox, Byline } from "@/components/seo/AnswerBox";
import { FaqList } from "@/components/ui/accordion";
import {
  areaServedFor,
  assistanceCoverage,
  assistanceUpdated,
  priceFor,
  type AssistanceService,
} from "@/data/assistance";

export function ServiceView({ locale, service }: { locale: string; service: AssistanceService }) {
  const price = priceFor(service.slug);
  const homeCities = service.slug === "home-care" ? assistanceCoverage.homeCareLocations : [];
  const countries = service.slug === "hospital-assistance" ? assistanceCoverage.hospitalAssistanceCountries : [];
  const covered = areaServedFor(service.slug);

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-10">
        <div className="min-w-0 max-w-3xl">
          <h1 className="text-balance">{service.h1}</h1>
          <div className="mt-6">
            <AnswerBox>{service.quickAnswer}</AnswerBox>
          </div>
        </div>

        <AssistanceCta
          service={service.slug}
          quiet={service.quiet}
          emergency={service.emergency}
          className="mt-0 h-max lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1"
        />

        <div className="min-w-0 max-w-3xl space-y-10">
          <section>
            <h2>When is this needed?</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.when.map((item) => (
                <li key={item.title} className="rounded-2xl border border-border bg-card p-4">
                  <h3>{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>How it works</h2>
            <ol className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
              {service.steps.map((item, index) => (
                <li key={item.title} className="grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-3 border-b border-border px-4 py-4 last:border-b-0">
                  <span className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary-ink">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="!text-base !leading-snug">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <div className="grid gap-4 sm:grid-cols-2">
            <section className="rounded-2xl border border-border bg-card p-5">
              <h2 className="!text-xl">What is included?</h2>
              <ul className="mt-3 list-disc space-y-2 ps-5 text-sm">
                {service.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section className="rounded-2xl border border-border bg-card p-5">
              <h2 className="!text-xl">What depends on the case?</h2>
              <ul className="mt-3 list-disc space-y-2 ps-5 text-sm">
                {service.depends.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <section>
            <h2>What we need from you</h2>
            <ul className="mt-3 list-disc space-y-2 ps-5">
              {service.documents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {homeCities.length ? (
            <section>
              <h2>Where can home care be arranged?</h2>
              <p className="mt-3">{homeCities.join(", ")}.</p>
            </section>
          ) : null}
          {countries.length ? (
            <section>
              <h2>Where is hospital assistance confirmed?</h2>
              <p className="mt-3">{countries.join(", ")}.</p>
            </section>
          ) : null}

          <section>
            <h2>What does it cost?</h2>
            <p className="mt-3">Priced per case. It depends on distance, aircraft or vehicle, medical team and equipment.</p>
            {price ? (
              <p className="mt-3">
                A verified planning range for this service is {price.currency} {price.min}–{price.max} ({price.label}). It is not a booking until it is confirmed in writing.
              </p>
            ) : null}
          </section>

          <section>
            <h2>Can insurance cover it?</h2>
            <p className="mt-3">{service.insurance}</p>
          </section>

          <section>
            <h2>Who is licensed to provide this?</h2>
            <p className="mt-3">{service.safety}</p>
            {covered.length ? <p className="mt-3">Confirmed coverage: {covered.join(", ")}.</p> : null}
          </section>

          <section>
            <h2>Common questions</h2>
            <div className="mt-4">
              <FaqList items={service.faqs} />
            </div>
          </section>

          {service.related.length ? (
            <section>
              <h2>Related help</h2>
              <ul className="mt-3 space-y-2">
                {service.related.map((item) => (
                  <li key={item.href}>
                    <Link className="text-primary-ink underline" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <Byline
            locale={locale}
            updated={assistanceUpdated}
            note="Written by the TechDr editorial team. Clinical care is given by the licensed operator or practitioner arranged for the case."
          />
        </div>
      </div>
    </article>
  );
}
