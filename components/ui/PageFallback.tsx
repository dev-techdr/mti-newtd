import { Suspense, type ReactNode } from "react";

export function PageFallback() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 py-12" aria-busy="true" aria-live="polite">
      <div className="h-4 w-40 rounded-full bg-surface" />
      <div className="mt-6 h-10 w-2/3 max-w-xl rounded-2xl bg-surface" />
      <div className="mt-4 h-4 w-full max-w-2xl rounded-full bg-surface" />
      <div className="mt-2 h-4 w-5/6 max-w-2xl rounded-full bg-surface" />
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="h-28 rounded-2xl bg-surface" />
        <div className="h-28 rounded-2xl bg-surface" />
        <div className="h-28 rounded-2xl bg-surface" />
      </div>
    </div>
  );
}

export function PageSuspense({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>;
}
