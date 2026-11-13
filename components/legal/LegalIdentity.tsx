import { legal } from "@/lib/site";

const rows = [
  ["Legal entity", legal.entity],
  ["Trade name", legal.tradeName],
  ["Constitution", legal.constitution],
  ["Medical tourism brand", legal.brand],
  ["Authorized signatory", `${legal.signatory}, ${legal.signatoryRole}`],
  ["GSTIN", legal.gstin],
  ["PAN", legal.pan],
  ["TAN", legal.tan],
  ["Registered address", legal.address],
] as const;

export function LegalIdentity() {
  return (
    <ul className="mt-6 space-y-2 rounded-2xl border border-border bg-card p-5 text-sm">
      {rows.map(([label, value]) => (
        <li key={label}>
          <span className="font-semibold">{label}: </span>
          {value}
        </li>
      ))}
      <li>
        <span className="font-semibold">Website: </span>
        <a className="text-primary-ink underline" href={legal.website}>
          {legal.websiteLabel}
        </a>
      </li>
    </ul>
  );
}
