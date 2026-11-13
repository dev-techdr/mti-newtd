import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { cityPath, treatmentCities } from "@/data/cities";
import { specialties } from "@/data/specialties";
import { formatPhone, legal, site, whatsappHref } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <Link href="/" aria-label="techDr medical tourism" className="inline-flex w-fit text-background">
            <Logo markClassName="size-11" />
          </Link>
          <p className="mt-3 text-sm text-background/80">
            TechDr Medical Tourism helps international patients plan accredited treatment in India, with written estimates and support from visa to follow-up.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-background/80">
            {treatmentCities().map((city) => (
              <li key={city.path}><Link className="hover:underline" href={cityPath(city)}>Treatment in {city.searchName}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Treatments</h2>
          <ul className="mt-3 space-y-2 text-sm text-background/80">
            {specialties.slice(0, 6).map((item) => (
              <li key={item.slug}>
                <Link className="inline-flex items-center gap-2 hover:underline" href={`/treatments/${item.slug}`}>
                  <ServiceIcon specialty={item.slug} size={28} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">For patients</h2>
          <ul className="mt-3 space-y-2 text-sm text-background/80">
            <li><Link href="/how-it-works">How it works</Link></li>
            <li><Link href="/patient-services">Patient services</Link></li>
            <li><Link href="/medical-visa-india">Medical visa</Link></li>
            <li><Link href="/why-india">Why India</Link></li>
            <li><Link href="/patients-from/nigeria">Patients from Nigeria</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Company</h2>
          <ul className="mt-3 space-y-2 text-sm text-background/80">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/editorial-policy">Editorial policy</Link></li>
            <li><Link href="/privacy-policy">Privacy policy</Link></li>
            <li><Link href="/terms">Terms of use</Link></li>
            <li><Link href="/medical-disclaimer">Medical disclaimer</Link></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            {site.whatsapps.map((number) => (
              <li key={number}>
                <a href={whatsappHref("Hello TechDr, I would like to discuss treatment in India.", number)}>WhatsApp {formatPhone(number)}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl space-y-2 px-4 py-6 text-xs text-background/70">
          <p>© {site.year} {legal.entity}, a sole proprietorship trading as {legal.tradeName}. {legal.brand}. GSTIN {legal.gstin}.</p>
          <p>{legal.address}</p>
          <p>TechDr coordinates care with independent hospitals. We are not a hospital and we do not provide medical advice or promise an outcome.</p>
        </div>
      </div>
    </footer>
  );
}
