import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1>Page not found</h1>
      <p className="mt-3">That page is not on TechDr Medical Tourism.</p>
      <p className="mt-6"><Link href="/">Back to the homepage</Link></p>
    </main>
  );
}
