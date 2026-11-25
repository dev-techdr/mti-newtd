import { blogRedirects } from "./blog";
import { routing } from "../i18n/routing";
import { cities } from "./cities";
import { procedurePath, procedures } from "./procedures";

type RedirectItem = {
  source: string;
  destination: string;
  statusCode: 301;
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
        ...pairs.map(([source, destination]) => ({ source, destination, statusCode: 301 as const })),
        ...locales.flatMap((locale) =>
          pairs.map(([source, destination]) => ({
            source: `/${locale}${source}`,
            destination: `/${locale}${destination}`,
            statusCode: 301 as const,
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
  "brain-tumour-removal": "brain-tumour-treatment",
  "brain-tumor-surgery": "brain-tumour-treatment",
  "brain-tumor-removal": "brain-tumour-treatment",
  "brain-tumour-surgery": "brain-tumour-treatment",
  "slipped-disc": "lumbar-disc-herniation",
  "epilepsy-surgery": "epilepsy-treatment",
  "aneurysm-clipping": "brain-aneurysm-treatment",
  "colorectal-cancer-surgery": "colorectal-surgery",
  "pancreatic-cancer-surgery": "whipple-procedure",
  "liver-cancer-surgery": "liver-resection",
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
    return [{ source: `/${alias}`, destination: procedurePath(target), statusCode: 301 as const }];
  });
}

function localizedRedirect(source: string, destination: string): RedirectItem[] {
  const locales = routing.locales.filter((locale) => locale !== routing.defaultLocale);
  return [
    { source, destination, statusCode: 301 as const },
    ...locales.map((locale) => ({
      source: `/${locale}${source}`,
      destination: `/${locale}${destination}`,
      statusCode: 301 as const,
    })),
  ];
}

const mergedPaths: [string, string][] = [
  ["/treatments/spine-surgery/slipped-disc", "/treatments/spine-surgery/lumbar-disc-herniation"],
  ["/treatments/neurosurgery/epilepsy-surgery", "/treatments/neurosurgery/epilepsy-treatment"],
  ["/treatments/neurosurgery/aneurysm-clipping", "/treatments/neurosurgery/brain-aneurysm-treatment"],
  ["/treatments/neurology/brain-tumour-surgery", "/treatments/neurosurgery/brain-tumour-treatment"],
  ["/treatments/oncology/colorectal-cancer-surgery", "/treatments/gastroenterology/colorectal-surgery"],
  ["/treatments/oncology/pancreatic-cancer-surgery", "/treatments/gastroenterology/whipple-procedure"],
  ["/treatments/oncology/liver-cancer-surgery", "/treatments/gastroenterology/liver-resection"],
  ["/cost/colorectal-cancer-surgery-cost-in-india", "/cost/colorectal-surgery-cost-in-india"],
  ["/cost/pancreatic-cancer-surgery-cost-in-india", "/cost/whipple-procedure-cost-in-india"],
  ["/cost/liver-cancer-surgery-cost-in-india", "/cost/liver-resection-cost-in-india"],
  ["/cost/colorectal-cancer-surgery", "/cost/colorectal-surgery-cost-in-india"],
  ["/cost/pancreatic-cancer-surgery", "/cost/whipple-procedure-cost-in-india"],
  ["/cost/liver-cancer-surgery", "/cost/liver-resection-cost-in-india"],
  ["/cost/cauda-equina-syndrome", "/treatments/spine-surgery/cauda-equina-syndrome"],
  ["/cost/cauda-equina-syndrome-cost-in-india", "/treatments/spine-surgery/cauda-equina-syndrome"],
  ["/countries/india", "/why-india"],
  ["/blog/is-techdr-the-best-medical-tourism-facilitator-india", "/blog/how-to-check-a-medical-tourism-facilitator-in-india"],
  ["/countries/india/visa-and-travel", "/medical-visa-india"],
];

export const redirectMap: RedirectItem[] = [
  { source: "/home", destination: "/", statusCode: 301 as const },
  { source: "/doctors", destination: "/about", statusCode: 301 as const },
  { source: "/hospitals", destination: "/why-india", statusCode: 301 as const },
  { source: "/quote", destination: "/get-a-free-quote", statusCode: 301 as const },
  ...procedures.flatMap((item) => [
    {
      source: `/${item.slug}`,
      destination: procedurePath(item),
      statusCode: 301 as const,
    },
    ...(item.slug === "cauda-equina-syndrome"
      ? []
      : [
          {
            source: `/cost/${item.costId}`,
            destination: `/cost/${item.costId}-cost-in-india`,
            statusCode: 301 as const,
          },
        ]),
  ]),
  ...cityAliasRedirects(),
  ...procedureAliasRedirects(),
  ...mergedPaths.flatMap(([source, destination]) => localizedRedirect(source, destination)),
  ...blogRedirects.flatMap((item) => localizedRedirect(item.source, item.destination)),
];
