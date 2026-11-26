import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { AnswerBox, Byline } from "@/components/seo/AnswerBox";
import { FaqList } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CostMark } from "@/components/ui/CostMark";
import { PriceText } from "@/components/ui/PriceText";
import type { PageModel } from "@/lib/page-model";

export function GuideArticle({
  locale,
  model,
  eyebrow,
  mark,
}: {
  locale: string;
  model: PageModel;
  eyebrow?: string;
  mark?: ReactNode;
}) {
  return (
    <PriceText>
    <article className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_280px]">
      <div>
        {eyebrow ? <p className="text-sm font-semibold text-primary-ink">{eyebrow}</p> : null}
        <div className="mt-2 flex items-center gap-4">
          {mark}
          <h1 className="max-w-3xl">{model.h1}</h1>
        </div>
        {model.alsoKnownAs.length ? (
          <p className="mt-3 text-muted">Also known as {model.alsoKnownAs.join(", ")}.</p>
        ) : null}
        {model.price ? (
          <div className="mt-5 max-w-md">
            <CostMark size="panel" value={model.price.value} unit={model.price.unit} note={model.price.note} />
          </div>
        ) : null}
        <div className="mt-6">
          <AnswerBox>{model.quickAnswer}</AnswerBox>
        </div>

        {model.facts.length ? (
          <section className="mt-10">
            <h2>What are the key facts?</h2>
            <div className="mt-4 overflow-x-auto overflow-y-clip">
              <table className="data-table">
                <caption>Key facts for {model.h1}</caption>
                <tbody>
                  {model.facts.map((fact) => (
                    <tr key={fact.label}>
                      <th scope="row">{fact.label}</th>
                      <td>{fact.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {model.sections.map((section) => (
          <section key={section.id} id={section.id} className="mt-10">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3">{paragraph}</p>
            ))}
            {section.items?.length ? (
              <ul className="mt-3 list-disc space-y-2 ps-5">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        {model.comparison ? (
          <section className="mt-10 overflow-x-auto overflow-y-clip">
            <h2>How do the published ranges compare?</h2>
            <table className="data-table mt-4">
              <caption>{model.comparison.caption}</caption>
              <thead>
                <tr>
                  {model.comparison.headers.map((header) => (
                    <th key={header} scope="col">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {model.comparison.rows.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    {row.slice(1).map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}

        {model.sampleQuote ? (
          <section className="mt-10">
            <h2>What does an itemised quote look like?</h2>
            <p className="mt-3">{model.sampleQuote.note}</p>
            <div className="mt-4 overflow-x-auto overflow-y-clip">
              <table className="data-table">
                <caption>Anonymised sample lines</caption>
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {model.sampleQuote.lines.map((line) => (
                    <tr key={line.item}>
                      <th scope="row">{line.item}</th>
                      <td>{line.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {model.dataNote ? (
          <section className="mt-10">
            <h2>What have coordinated cases shown?</h2>
            <p className="mt-3">{model.dataNote}</p>
          </section>
        ) : null}

        {model.journeys?.length ? (
          <section className="mt-10">
            <h2>How did anonymised patients move through the plan?</h2>
            {model.journeys.map((journey) => (
              <p key={`${journey.name}-${journey.country}`} className="mt-3">
                {journey.name} from {journey.country}. {journey.summary}
              </p>
            ))}
          </section>
        ) : null}

        {model.followups.length ? (
          <section className="mt-10">
            <h2>Which follow-up questions does this page answer?</h2>
            <ul className="mt-3 space-y-3">
              {model.followups.map((item) => (
                <li key={item.question}>
                  {item.href.startsWith("#") ? (
                    <a className="text-primary-ink underline" href={item.href}>{item.question}</a>
                  ) : (
                    <Link className="text-primary-ink underline" href={item.href}>{item.question}</Link>
                  )}
                  <p className="mt-1">{item.answer}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {model.faqs.length ? (
          <section id="faq" className="mt-10">
            <h2>Questions patients ask next</h2>
            <div className="mt-4">
              <FaqList items={model.faqs} />
            </div>
          </section>
        ) : null}

        {model.related.length ? (
          <section className="mt-10">
            <h2>Which related guides should I read?</h2>
            <ul className="mt-3 space-y-2">
              {model.related.map((item) => (
                <li key={item.href}>
                  <Link className="text-primary-ink underline" href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {model.sources.length ? (
          <section className="mt-10">
            <h2>Which sources support this page?</h2>
            <ul className="mt-3 list-disc space-y-2 ps-5">
              {model.sources.map((source) => (
                <li key={source.href}>
                  <a className="text-primary-ink underline" href={source.href} rel="noopener noreferrer">{source.label}</a>
                  . {source.supports}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {model.showQuote && model.quoteHref ? (
          <section className="mt-10 rounded-2xl bg-secondary p-6 text-background">
            <h2>Ask for a written quote</h2>
            <p className="mt-2 text-background/80">The quote form for {model.h1} opens with this subject selected.</p>
            <Button className="mt-4" href={model.quoteHref}>Get a free quote</Button>
          </section>
        ) : null}
        <Byline locale={locale} updated={model.updated} note={model.reviewNote} />
      </div>
      <aside className="h-max self-start lg:sticky lg:top-24">
        {model.price ? (
          <CostMark size="panel" value={model.price.value} unit={model.price.unit} note={model.price.note}>
            {model.showQuote && model.quoteHref ? (
              <Button className="mt-4 w-full" href={model.quoteHref}>Get a free quote</Button>
            ) : null}
          </CostMark>
        ) : (
          <p className="rounded-2xl border border-border p-4 text-sm">
            {model.kind === "country"
              ? "Visa rules and prices appear here only with a date and a source. Ask for a written quote before you pay for flights."
              : "This page is information for an emergency. It is not a quote."}
          </p>
        )}
      </aside>
    </article>
    </PriceText>
  );
}
