import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { cities, cityPath } from "@/data/cities";
import { specialties } from "@/data/specialties";
import { listIndexableCountries } from "@/data/patients/publish";
import { WhatsAppLink } from "@/components/contact/WhatsAppLink";
import { formatPhone, legal, site, socialLinks, telHref } from "@/lib/site";

const link = "hover:underline";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const socials = socialLinks().map((href) => ({ href, label: hostLabel(href) }));

  return (
    <footer className="mt-20 border-t border-border bg-secondary text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <Link href="/" aria-label="techDr medical tourism" className="inline-flex w-fit text-background">
            <Logo markClassName="size-11" />
          </Link>
          <p className="mt-3 text-sm text-background/80">{t("blurb")}</p>
          <ul className="mt-4 space-y-2 text-sm text-background/80">
            {cities.map((city) => (
              <li key={city.path}>
                <Link className={link} href={cityPath(city)}>Treatment in {city.searchName}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{t("treatments")}</h2>
          <ul className="mt-3 space-y-2 text-sm text-background/80">
            {specialties.slice(0, 6).map((item) => (
              <li key={item.slug}>
                <Link className={`inline-flex items-center gap-2 ${link}`} href={`/treatments/${item.slug}`}>
                  <ServiceIcon specialty={item.slug} size={28} />
                  {item.name}
                </Link>
              </li>
            ))}
            <li><Link className={link} href="/treatments">{t("allTreatments")}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{t("patients")}</h2>
          <ul className="mt-3 space-y-2 text-sm text-background/80">
            <li><Link className={link} href="/how-it-works">{nav("how")}</Link></li>
            <li><Link className={link} href="/patient-services">{nav("services")}</Link></li>
            <li><Link className={link} href="/medical-visa-india">{nav("visa")}</Link></li>
            <li><Link className={link} href="/why-india">{nav("why")}</Link></li>
            <li><Link className={link} href="/patients-from">{nav("from")}</Link></li>
            {listIndexableCountries().map((country) => (
              <li key={country.slug}><Link className={link} href={`/patients-from/${country.slug}`}>Patients from {country.name}</Link></li>
            ))}
            <li><Link className={link} href="/faq">{nav("faq")}</Link></li>
            <li><Link className={link} href="/blog">{nav("blog")}</Link></li>
            <li><Link className={link} href="/get-a-free-quote">{nav("quote")}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{t("company")}</h2>
          <ul className="mt-3 space-y-2 text-sm text-background/80">
            <li><Link className={link} href="/about">{nav("about")}</Link></li>
            <li><Link className={link} href="/medical-review-team">Medical review team</Link></li>
            <li><Link className={link} href="/contact">{nav("contact")}</Link></li>
            <li><Link className={link} href="/editorial-policy">{t("editorial")}</Link></li>
            <li><Link className={link} href="/privacy-policy">{t("privacy")}</Link></li>
            <li><Link className={link} href="/terms">{t("terms")}</Link></li>
            <li><Link className={link} href="/medical-disclaimer">{t("disclaimer")}</Link></li>
            <li><a className={link} href={`mailto:${site.email}`}>{site.email}</a></li>
            <li>
              <a className={link} href={telHref()}>{t("call")} {formatPhone(site.phone)}</a>
            </li>
            <li>
              <WhatsAppLink className={link}>WhatsApp {formatPhone(site.whatsapp)}</WhatsAppLink>
            </li>
            {socials.map((item) => (
              <li key={item.href}><a className={link} href={item.href}>{item.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl space-y-2 px-4 py-6 text-xs text-background/70">
          <p>© {site.year} {legal.entity}, a sole proprietorship trading as {legal.tradeName}. {legal.brand}. GSTIN {legal.gstin}.</p>
          <p>{legal.address}</p>
          <p>{t("note")}</p>
        </div>
      </div>
    </footer>
  );
}

function hostLabel(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}
