import { routing } from "../i18n/routing";
import { cities } from "./cities";
import { procedurePath, procedures } from "./procedures";

type RedirectItem = {
  source: string;
  destination: string;
  permanent: boolean;
};

function cityAliasRedirects(): RedirectItem[] {
  const locales = routing.locales.filter((locale) => locale !== routing.defaultLocale);
  return cities.flatMap((city) => {
    const aliases = [...new Set([city.slug, ...city.aliases])].filter((alias) => alias !== city.path);
    return aliases.flatMap((alias) => {
      const pairs = [
        [`/destinations/${alias}`, `/destinations/${city.path}`],
        [`/destinations/${alias}/:procedure`, `/destinations/${city.path}/:procedure`],
      ] as const;
      return [
        ...pairs.map(([source, destination]) => ({ source, destination, permanent: true })),
        ...locales.flatMap((locale) =>
          pairs.map(([source, destination]) => ({
            source: `/${locale}${source}`,
            destination: `/${locale}${destination}`,
            permanent: true,
          })),
        ),
      ];
    });
  });
}

const procedureAliases: Record<string, string> = {
  cabg: "heart-bypass-surgery",
  "heart-bypass": "heart-bypass-surgery",
  "total-knee-replacement": "knee-replacement-surgery",
  "knee-replacement": "knee-replacement-surgery",
  "total-hip-replacement": "hip-replacement-surgery",
  "hip-replacement": "hip-replacement-surgery",
  "spinal-fusion": "spinal-fusion-surgery",
  "bariatric-surgery": "sleeve-gastrectomy",
  "gastric-sleeve": "sleeve-gastrectomy",
  "bone-marrow-transplantation": "bone-marrow-transplant",
  "liver-transplantation": "liver-transplant",
  "kidney-transplantation": "kidney-transplant",
  "heart-transplantation": "heart-transplant",
  "lung-transplantation": "lung-transplant",
  "cornea-transplant": "corneal-transplant",
  "corneal-transplantation": "corneal-transplant",
  keratoplasty: "corneal-transplant",
  "pancreas-transplantation": "pancreas-transplant",
  "kidney-pancreas": "kidney-pancreas-transplant",
  "simultaneous-pancreas-kidney": "kidney-pancreas-transplant",
  "brain-tumour-removal": "brain-tumour-surgery",
  "brain-tumor-surgery": "brain-tumour-surgery",
  "brain-tumor-removal": "brain-tumour-surgery",
  "paediatric-heart-surgery": "pediatric-heart-surgery",
  "congenital-heart-surgery": "congenital-heart-defect-surgery",
  ivf: "ivf-treatment",
  "ivf-icsi": "icsi",
  whipple: "whipple-procedure",
  "spinal-cord-tumor-surgery": "spinal-cord-tumour-surgery",
  "disc-replacement": "disc-replacement-surgery",
  "kidney-stones": "kidney-stone-removal",
  "gastric-bypass-surgery": "gastric-bypass",
  tavr: "tavr-tavi",
  tavi: "tavr-tavi",
  holep: "holep",
  pcnl: "pcnl",
  rirs: "rirs",
  eswl: "eswl",
  turp: "turp",
  acdf: "acdf-surgery",
  tlif: "tlif-surgery",
  plif: "plif-surgery",
  alif: "alif-surgery",
  evar: "evar",
  tevar: "tevar",
  fess: "fess",
  dsaek: "dsaek",
  dmek: "dmek",
};

function procedureAliasRedirects(): RedirectItem[] {
  return Object.entries(procedureAliases).flatMap(([alias, slug]) => {
    const target = procedures.find((item) => item.slug === slug);
    if (!target) return [];
    return [{ source: `/${alias}`, destination: procedurePath(target), permanent: true }];
  });
}

export const redirectMap: RedirectItem[] = [
  { source: "/home", destination: "/", permanent: true },
  { source: "/doctors", destination: "/about", permanent: true },
  { source: "/hospitals", destination: "/why-india", permanent: true },
  { source: "/quote", destination: "/get-a-free-quote", permanent: true },
  ...procedures.flatMap((item) => [
    {
      source: `/${item.slug}`,
      destination: procedurePath(item),
      permanent: true,
    },
    {
      source: `/cost/${item.costId}`,
      destination: `/cost/${item.costId}-cost-in-india`,
      permanent: true,
    },
  ]),
  ...cityAliasRedirects(),
  ...procedureAliasRedirects(),
];
