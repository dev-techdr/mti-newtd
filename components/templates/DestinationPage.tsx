import { AnswerBox } from "@/components/seo/AnswerBox";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { destinationVisaHref, type Destination } from "@/data/destinations";

export function DestinationPage({
  locale,
  destination,
  mode,
}: {
  locale: string;
  destination: Destination;
  mode: "hub" | "visa";
}) {
  const path = mode === "hub" ? `/countries/${destination.slug}` : destinationVisaHref(destination);
  const h1 = mode === "hub" ? `Treatment in ${destination.name}` : `Visa and travel for treatment in ${destination.name}`;
  const answer =
    mode === "hub"
      ? `TechDr arranges treatment in India. It does not arrange treatment in ${destination.name}.`
      : `Visa steps for treatment in India are on the medical visa page. This page does not publish visa rules for ${destination.name}.`;

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
            {mode === "hub" && destination.active ? (
              <tr>
                <th scope="row" className="py-2 pe-4 text-start">Cities</th>
                <td>{destination.cities.map((city) => city.name).join(", ")}</td>
              </tr>
            ) : null}
            {mode === "visa" && destination.visa.officialUrl ? (
              <tr>
                <th scope="row" className="py-2 pe-4 text-start">Official visa page</th>
                <td><a className="text-primary-ink underline" href={destination.visa.officialUrl}>{destination.visa.officialUrl}</a></td>
              </tr>
            ) : null}
          </tbody>
        </table>
        <p className="mt-6">
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
