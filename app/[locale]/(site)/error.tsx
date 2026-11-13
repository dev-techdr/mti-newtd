"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void error.digest;
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1>Something went wrong</h1>
      <p className="mt-3 text-muted">The page did not load. You can try again, or return to the treatment guides.</p>
      <button type="button" className="mt-6 min-h-11 rounded-full bg-accent px-5 font-semibold text-accent-ink" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
