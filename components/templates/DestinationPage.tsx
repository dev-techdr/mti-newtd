import { AnswerBox } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { destinationGaps, destinationVisaHref, type Destination } from "@/data/destinations";

export function DestinationPage({
  locale,
  destination,
  mode,
}: {
  locale: string;
  destination: Destination;
  mode: "hub" | "visa";
}) {
  const gaps = destinationGaps(destination);
  const path = mode === "hub" ? `/countries/${destination.slug}` : destinationVisaHref(destination);
  const h1 = mode === "hub" ? `Treatment in ${destination.name}` : `Visa and travel for treatment in ${destination.name}`;
  const answer =
    mode === "hub"
      ? `TechDr does not arrange treatment in ${destination.name}. No partner, price, or accreditation claim is published for ${destination.name} until a sourced record is reviewed. India is the destination TechDr coordinates today.`
      : `Visa rules for ${destination.name} are not published on this page. There is no official link and no last-checked date on the record. Use the government visa site for ${destination.name}, not this page, until those fields exist.`;

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { name: "Destinations", path: "/countries" },
          { name: destination.name, path: `/countries/${destination.slug}` },
          ...(mode === "visa" ? [{ name: "Visa and travel", path }] : []),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1>{h1}</h1>
        <div className="mt-6">
          <AnswerBox>{answer}</AnswerBox>
        </div>
        <table className="mt-8 w-full text-sm">
          <caption className="mb-2 text-start font-semibold">
            {mode === "hub" ? `Facts on file for ${destination.name}` : `Visa record for ${destination.name}`}
          </caption>
          <tbody>
            <tr>
              <th scope="row" className="py-2 pe-4 text-start">Coordinated by TechDr</th>
              <td>{destination.active ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <th scope="row" className="py-2 pe-4 text-start">Currency</th>
              <td>{destination.currency}</td>
            </tr>
            <tr>
              <th scope="row" className="py-2 pe-4 text-start">Languages</th>
              <td>{destination.languages.join(", ")}</td>
            </tr>
            {mode === "hub" ? (
              <tr>
                <th scope="row" className="py-2 pe-4 text-start">Cities named for later guides</th>
                <td>{destination.cities.map((city) => city.name).join(", ")}</td>
              </tr>
            ) : (
              <tr>
                <th scope="row" className="py-2 pe-4 text-start">Official visa page</th>
                <td>{destination.visa.officialUrl ?? "Not on file"}</td>
              </tr>
            )}
          </tbody>
        </table>
        <p className="mt-6 text-sm text-muted">
          This page stays out of the sitemap until these fields are sourced: {gaps.join(", ")}.
        </p>
        <p className="mt-4">
          <Link className="text-primary-ink underline" href="/why-india">Treatment coordinated in India</Link>
          {" · "}
          <Link className="text-primary-ink underline" href="/countries">All destinations</Link>
          {mode === "hub" ? (
            <>
              {" · "}
              <Link className="text-primary-ink underline" href={destinationVisaHref(destination)}>Visa and travel</Link>
            </>
          ) : null}
        </p>
      </article>
    </>
  );
}
