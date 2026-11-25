"use client";

import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cities, cityPath } from "@/data/cities";
import { WhatsAppLink } from "@/components/contact/WhatsAppLink";
import { telHref } from "@/lib/site";
import { cn } from "@/lib/utils";

const languages = [
  { locale: "en", label: "English" },
  { locale: "ar", label: "العربية" },
  { locale: "fr", label: "Français" },
  { locale: "ru", label: "Русский" },
  { locale: "bn", label: "বাংলা" },
] as const;

function active(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const t = useTranslations("nav");
  const call = useTranslations("mobile")("call");
  const skip = useTranslations("a11y")("skip");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  const cityLinks = [
    ...cities.map((city) => ({ href: cityPath(city), label: city.searchName })),
    { href: "/countries", label: t("allDestinations") },
  ];
  const planLinks = [
    { href: "/why-india", label: t("why") },
    { href: "/patient-services", label: t("services") },
    { href: "/medical-visa-india", label: t("visa") },
    { href: "/patients-from", label: t("from") },
    { href: "/faq", label: t("faq") },
    { href: "/contact", label: t("contact") },
  ];

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

  function chooseLocale(next: string) {
    window.location.href = next === routing.defaultLocale ? pathname : `/${next}${pathname === "/" ? "" : pathname}`;
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
            <NavLink href="/treatments" pathname={pathname}>{t("treatments")}</NavLink>
            <Drop label={t("destinations")} href="/countries" pathname={pathname} items={cityLinks} />
            <Drop label={t("how")} href="/how-it-works" pathname={pathname} items={planLinks} />
            <NavLink href="/blog" pathname={pathname}>{t("blog")}</NavLink>
          </nav>
          <div className="ms-auto flex items-center gap-2">
            <LanguageSelect id="language" label={t("language")} locale={locale} onChange={chooseLocale} className="hidden md:block" />
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
                <Dialog.Content className="fixed inset-y-0 end-0 z-50 flex w-[min(100%,20rem)] flex-col gap-1 overflow-y-auto bg-background p-6 shadow-xl">
                  <Dialog.Title className="font-heading text-lg">{t("openMenu")}</Dialog.Title>
                  <Dialog.Close className="absolute end-4 top-4 inline-flex size-11 items-center justify-center" aria-label={t("closeMenu")}>
                    <X className="size-5" />
                  </Dialog.Close>
                  <NavLink href="/treatments" pathname={pathname} onClick={() => setOpen(false)} className="min-h-11 text-lg">{t("treatments")}</NavLink>
                  <p className="mt-2 text-xs font-semibold tracking-wide text-muted uppercase">{t("destinations")}</p>
                  {cityLinks.map((item) => (
                    <NavLink key={item.href} href={item.href} pathname={pathname} onClick={() => setOpen(false)} className="min-h-11 ps-2 text-lg">{item.label}</NavLink>
                  ))}
                  <NavLink href="/how-it-works" pathname={pathname} onClick={() => setOpen(false)} className="mt-2 min-h-11 text-lg">{t("how")}</NavLink>
                  {planLinks.map((item) => (
                    <NavLink key={item.href} href={item.href} pathname={pathname} onClick={() => setOpen(false)} className="min-h-11 text-lg">{item.label}</NavLink>
                  ))}
                  <NavLink href="/blog" pathname={pathname} onClick={() => setOpen(false)} className="min-h-11 text-lg">{t("blog")}</NavLink>
                  <LanguageSelect id="language-menu" label={t("language")} locale={locale} onChange={chooseLocale} className="mt-3 w-full" />
                  <NavLink href="/get-a-free-quote" pathname={pathname} onClick={() => setOpen(false)} className="min-h-11 text-lg">{t("quote")}</NavLink>
                  <WhatsAppLink className="min-h-11 text-lg">{t("whatsapp")}</WhatsAppLink>
                  <a className="min-h-11 text-lg" href={telHref()}>{call}</a>
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

function NavLink({
  href,
  pathname,
  children,
  onClick,
  className,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const on = active(pathname, href);
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={on ? "page" : undefined}
      className={cn("text-sm font-medium", on ? "text-foreground" : "text-foreground/80 hover:text-foreground", className)}
    >
      {children}
    </Link>
  );
}

function Drop({
  label,
  href,
  pathname,
  items,
}: {
  label: string;
  href: string;
  pathname: string;
  items: { href: string; label: string }[];
}) {
  const on = active(pathname, href) || items.some((item) => active(pathname, item.href));
  return (
    <div className="group relative">
      <Link
        href={href}
        aria-current={pathname === href ? "page" : undefined}
        aria-haspopup="true"
        className={cn("inline-flex items-center gap-1 text-sm font-medium", on ? "text-foreground" : "text-foreground/80 hover:text-foreground")}
      >
        {label}
        <ChevronDown className="size-3.5 opacity-70" aria-hidden />
      </Link>
      <div className="invisible absolute start-0 top-full z-50 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <ul className="min-w-52 rounded-xl border border-border bg-background p-1.5 shadow-lg">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="block rounded-lg px-3 py-2 text-sm hover:bg-surface"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LanguageSelect({
  id,
  label,
  locale,
  onChange,
  className,
}: {
  id: string;
  label: string;
  locale: string;
  onChange: (locale: string) => void;
  className?: string;
}) {
  return (
    <>
      <label className="sr-only" htmlFor={id}>{label}</label>
      <select
        id={id}
        className={cn("min-h-11 rounded-full border border-border bg-card px-3 text-sm", className)}
        value={locale}
        aria-label={label}
        onChange={(event) => onChange(event.target.value)}
      >
        {languages.map((item) => (
          <option key={item.locale} value={item.locale}>{item.label}</option>
        ))}
      </select>
    </>
  );
}
