"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { telHref, whatsappHref } from "@/lib/site";

const links = [
  { href: "/treatments", key: "treatments" },
  { href: "/how-it-works", key: "how" },
  { href: "/destinations/delhi", key: "destinations" },
  { href: "/blog", key: "blog" },
] as const;

const languages = [
  { locale: "en", label: "English" },
  { locale: "ar", label: "العربية" },
  { locale: "fr", label: "Français" },
  { locale: "ru", label: "Русский" },
  { locale: "bn", label: "বাংলা" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const skip = useTranslations("a11y")("skip");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    setDark(document.documentElement.classList.contains("dark"));
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  }

  return (
    <>
      <a href="#content" className="skip-link">{skip}</a>
      <header className={`fixed inset-x-0 top-0 z-50 ${scrolled ? "h-14 border-b border-border bg-background/85 shadow-sm backdrop-blur-md" : "h-16 bg-background/70"}`}>
        <div className="mx-auto flex h-full max-w-6xl items-center gap-3 px-4">
          <Link href="/" aria-label="techDr medical tourism" className={`shrink-0 origin-left ${scrolled ? "scale-95" : ""}`}>
            <Logo />
          </Link>
          <nav aria-label="Primary" className="ms-6 hidden items-center gap-5 lg:flex">
            {links.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-foreground/80 hover:text-foreground">
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="ms-auto flex items-center gap-2">
            <label className="sr-only" htmlFor="language">{t("language")}</label>
            <select
              id="language"
              className="hidden min-h-11 rounded-full border border-border bg-card px-3 text-sm md:block"
              value={locale}
              aria-label={t("language")}
              onChange={(event) => {
                const next = event.target.value;
                window.location.href = next === routing.defaultLocale ? pathname : `/${next}${pathname === "/" ? "" : pathname}`;
              }}
            >
              {languages.map((item) => (
                <option key={item.locale} value={item.locale}>{item.label}</option>
              ))}
            </select>
            <button type="button" className="inline-flex size-11 items-center justify-center rounded-full border border-border" onClick={toggleTheme} aria-label={t("theme")}>
              {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
            <Button href="/get-a-free-quote" className="hidden sm:inline-flex">{t("quote")}</Button>
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger className="inline-flex size-11 items-center justify-center rounded-full border border-border lg:hidden" aria-label={t("openMenu")}>
                <Menu className="size-5" />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-secondary/40" />
                <Dialog.Content className="fixed inset-y-0 end-0 z-50 flex w-[min(100%,20rem)] flex-col gap-4 bg-background p-6 shadow-xl">
                  <Dialog.Title className="font-heading text-lg">{t("openMenu")}</Dialog.Title>
                  <Dialog.Close className="absolute end-4 top-4 inline-flex size-11 items-center justify-center" aria-label={t("closeMenu")}>
                    <X className="size-5" />
                  </Dialog.Close>
                  {links.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="min-h-11 text-lg">{t(item.key)}</Link>
                  ))}
                  <Link href="/get-a-free-quote" onClick={() => setOpen(false)} className="min-h-11 text-lg">{t("quote")}</Link>
                  <a className="min-h-11" href={whatsappHref("Hello TechDr, I would like to discuss treatment in India.")}>{t("whatsapp")}</a>
                  <a className="min-h-11" href={telHref()}>Call</a>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </header>
      <div className="h-16" />
    </>
  );
}
