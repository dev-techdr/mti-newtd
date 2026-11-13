import { Link } from "@/i18n/navigation";
import { procedures } from "@/data/procedures";
import { procedurePath } from "@/data/procedures";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1>We can’t find that page</h1>
      <p className="mt-3 text-muted">Try a treatment search, or open one of the guides below.</p>
      <form className="mt-6" action="/treatments">
        <label className="block text-sm font-medium" htmlFor="q">Search a treatment</label>
        <input id="q" name="q" className="mt-1 min-h-11 w-full rounded-xl border border-border px-3" placeholder="Knee, IVF, visa…" />
      </form>
      <ul className="mt-6 space-y-2">
        {procedures.slice(0, 6).map((item) => (
          <li key={item.slug}><Link className="text-primary-ink underline" href={procedurePath(item)}>{item.name}</Link></li>
        ))}
      </ul>
    </div>
  );
}
