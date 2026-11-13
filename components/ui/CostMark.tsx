export function CostMark({
  value,
  unit,
  label = "Indicative cost in India",
  size = "tag",
  note,
  children,
}: {
  value: string;
  unit?: string;
  label?: string;
  size?: "tag" | "panel";
  note?: string;
  children?: React.ReactNode;
}) {
  if (size === "panel") {
    return (
      <div className="rounded-2xl border border-primary/40 bg-primary/10 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-ink">{label}</p>
        <p className="mt-1 font-heading text-3xl font-bold leading-tight text-primary-ink">{value}</p>
        {unit ? <p className="mt-1 text-sm font-medium text-primary-ink">{unit}</p> : null}
        {children}
        {note ? <p className="mt-4 text-sm text-muted">{note}</p> : null}
      </div>
    );
  }
  return (
    <span className="inline-flex w-fit items-baseline gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-sm font-semibold text-primary-ink">
      <span>{value}</span>
      {unit ? <span className="font-medium">{unit}</span> : null}
    </span>
  );
}
