import { writeFileSync } from "node:fs";
import { posts } from "@/data/blog";
import { cities, cityPath } from "@/data/cities";
import { destinationVisaHref, publishedDestinations } from "@/data/destinations";
import { isLibraryProcedure, procedurePath, procedures } from "@/data/procedures";
import { specialties } from "@/data/specialties";
import { toolDrafts } from "@/data/worldwide";

type Row = {
  url: string;
  cluster: string;
  status: "indexable" | "draft" | "blocked";
  index: "yes" | "no";
  primary: string;
};

const staticPages: [string, string][] = [
  ["/", "treatment abroad"],
  ["/treatments", "treatments"],
  ["/how-it-works", "how medical travel works"],
  ["/patient-services", "patient services"],
  ["/medical-visa-india", "medical visa india"],
  ["/why-india", "treatment in india"],
  ["/patients-from", "patients from"],
  ["/countries", "treatment destinations"],
  ["/faq", "medical tourism faq"],
  ["/about", "about techdr"],
  ["/contact", "contact techdr"],
  ["/get-a-free-quote", "free treatment quote"],
  ["/blog", "medical tourism guides"],
  ["/privacy-policy", "privacy policy"],
  ["/terms", "terms"],
  ["/medical-disclaimer", "medical disclaimer"],
  ["/editorial-policy", "editorial policy"],
  ["/medical-review-team", "medical review team"],
];

const rows: Row[] = [
  ...staticPages.map(([url, primary]) => ({ url, cluster: "page", status: "indexable" as const, index: "yes" as const, primary })),
  ...specialties.map((item) => ({
    url: `/treatments/${item.slug}`,
    cluster: "specialty",
    status: "indexable" as const,
    index: "yes" as const,
    primary: item.name,
  })),
  ...procedures.flatMap((item) =>
    isLibraryProcedure(item.slug)
      ? []
      : [
          {
            url: procedurePath(item),
            cluster: "procedure",
            status: "indexable" as const,
            index: "yes" as const,
            primary: item.name,
          },
          {
            url: `/cost/${item.costId}-cost-in-india`,
            cluster: "cost",
            status: "indexable" as const,
            index: "yes" as const,
            primary: `${item.name} cost in india`,
          },
        ],
  ),
  ...cities.map((city) => ({
    url: cityPath(city),
    cluster: "city",
    status: "indexable" as const,
    index: "yes" as const,
    primary: `treatment in ${city.searchName.toLowerCase()}`,
  })),
  ...posts.map((post) => ({
    url: `/blog/${post.slug}`,
    cluster: "guide",
    status: "indexable" as const,
    index: "yes" as const,
    primary: post.title,
  })),
  ...publishedDestinations.flatMap((item) => [
    {
      url: `/countries/${item.slug}`,
      cluster: "destination",
      status: "draft" as const,
      index: "no" as const,
      primary: `treatment in ${item.name.toLowerCase()}`,
    },
    {
      url: destinationVisaHref(item),
      cluster: "visa",
      status: "draft" as const,
      index: "no" as const,
      primary: `${item.name.toLowerCase()} medical visa`,
    },
  ]),
  ...[
    "tests",
    "technologies",
    "comparisons",
    "best-country",
    "glossary",
    "packages",
    "answers",
    "destination-specialty",
    "destination-city",
    "destination-cost",
  ].map((cluster) => ({
    url: "",
    cluster,
    status: "blocked" as const,
    index: "no" as const,
    primary: "",
  })),
  ...toolDrafts.map((slug) => ({
    url: "",
    cluster: `tool:${slug}`,
    status: "blocked" as const,
    index: "no" as const,
    primary: "",
  })),
];

function csv(value: string) {
  return /[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

const header = "url,cluster,status,index,primary";
const body = rows.map((row) => [row.url, row.cluster, row.status, row.index, row.primary].map(csv).join(",")).join("\n");
writeFileSync("reports/review-queue.csv", `${header}\n${body}\n`);

const keywords = rows.filter((row) => row.status === "indexable");
writeFileSync(
  "data/keyword-map.csv",
  `url,primary\n${keywords.map((row) => [row.url, row.primary].map(csv).join(",")).join("\n")}\n`,
);

console.log(`review queue ${rows.length} rows; keyword map ${keywords.length} indexable urls`);
