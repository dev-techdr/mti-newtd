"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Script from "next/script";
import { Link, usePathname } from "@/i18n/navigation";
import { telHref, whatsappHref } from "@/lib/site";

const wa = whatsappHref("Hello TechDr, I would like a free treatment quote.");

export function Assist() {
  const t = useTranslations();
  const pathname = usePathname();
  const [cookies, setCookies] = useState<"unknown" | "set">("unknown");

  useEffect(() => {
    setCookies(localStorage.getItem("cookie-consent") ? "set" : "unknown");
  }, []);

  function choose(value: "accepted" | "rejected") {
    localStorage.setItem("cookie-consent", value);
    setCookies("set");
    if (value === "accepted") window.dispatchEvent(new Event("analytics-consent"));
  }

  return (
    <>
      <a href={wa} className="pulse fixed end-4 bottom-24 z-40 size-14 shadow-lg md:bottom-6" aria-label={t("nav.whatsapp")}>
        <img src="/images/icons/social.svg" alt="" width={56} height={56} className="size-14" />
      </a>
      {pathname === "/get-a-free-quote" ? null : (
        <Link href="/get-a-free-quote" className="fixed end-4 bottom-40 z-40 hidden min-h-11 items-center rounded-full bg-accent px-4 text-sm font-semibold text-accent-ink md:inline-flex">
          {t("nav.quote")}
        </Link>
      )}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-background md:hidden" aria-label="Quick contact">
        <a className="flex min-h-14 items-center justify-center text-sm font-medium" href={telHref()}>{t("mobile.call")}</a>
        <a className="flex min-h-14 items-center justify-center text-sm font-medium" href={wa}>{t("mobile.whatsapp")}</a>
        <Link className="flex min-h-14 items-center justify-center text-sm font-semibold text-accent-ink" href="/get-a-free-quote">{t("mobile.quote")}</Link>
      </nav>
      {cookies === "unknown" ? (
        <div className="fixed inset-x-3 bottom-20 z-40 rounded-2xl border border-border bg-card p-4 shadow-lg md:bottom-6 md:end-auto md:start-4 md:max-w-sm" role="dialog" aria-label="Cookies">
          <p className="text-sm">{t("cookie.text")} <Link className="underline" href="/privacy-policy">{t("footer.privacy")}</Link></p>
          <div className="mt-3 flex gap-2">
            <button type="button" className="min-h-11 rounded-full bg-secondary px-4 text-sm text-background" onClick={() => choose("accepted")}>{t("cookie.accept")}</button>
            <button type="button" className="min-h-11 rounded-full border border-border px-4 text-sm" onClick={() => choose("rejected")}>{t("cookie.reject")}</button>
          </div>
        </div>
      ) : null}
      <Analytics />
    </>
  );
}

function Analytics() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const sync = () => setAllowed(localStorage.getItem("cookie-consent") === "accepted");
    sync();
    window.addEventListener("analytics-consent", sync);
    return () => window.removeEventListener("analytics-consent", sync);
  }, []);
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!allowed) return null;
  return (
    <>
      {ga ? <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="lazyOnload" /> : null}
      {ga ? (
        <Script id="ga4" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
        </Script>
      ) : null}
      {plausible ? (
        <Script defer data-domain={plausible} src="https://plausible.io/js/script.js" strategy="lazyOnload" />
      ) : null}
    </>
  );
}
