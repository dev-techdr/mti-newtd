import { Link } from "@/i18n/navigation";
import { childLinksForCountry, corridorsForProcedure, getApprovedAnswerSlugs } from "@/data/patients/publish";
import { loadAnswerFiles } from "@/lib/answers";

function LinkList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  if (!links.length) return null;
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-6">
      <h2>{title}</h2>
      <ul className="mt-3 space-y-2">
        {links.map((item) => (
          <li key={item.href}>
            <Link className="text-primary-ink underline" href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PatientsFromLinks({ procedureSlug }: { procedureSlug: string }) {
  return <LinkList title="Patients from" links={corridorsForProcedure(procedureSlug)} />;
}

export function CountryChildLinks({ country }: { country: string }) {
  return <LinkList title="Corridors with their own records" links={childLinksForCountry(country)} />;
}

export function RelatedAnswers({ country, treatment }: { country?: string; treatment?: string }) {
  if (!getApprovedAnswerSlugs().length) return null;
  const links = loadAnswerFiles().flatMap((file) => {
    if (!file.record || !getApprovedAnswerSlugs().includes(file.slug)) return [];
    if (country && !file.record.countries.includes(country)) return [];
    if (treatment && !file.record.treatments.includes(treatment)) return [];
    return [{ href: `/answers/${file.slug}`, label: file.record.question }];
  });
  return <LinkList title="Questions from this corridor" links={links} />;
}
