import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { crumbList, type Crumb } from "@/lib/schema";

export function Breadcrumbs({ locale, items }: { locale: string; items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-6xl px-4 pt-6">
      <JsonLd data={{ "@context": "https://schema.org", ...crumbList(locale, all) }} />
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {all.map((item, index) => {
          const last = index === all.length - 1;
          return (
            <li key={`${item.path}-${index}`} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-foreground">{item.name}</span>
              ) : (
                <Link href={item.path} className="underline-offset-2 hover:underline">{item.name}</Link>
              )}
              {last ? null : <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
