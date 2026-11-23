# Gap report — why the site has 232 sitemap URLs

Read-only diagnosis. Step 1 has not been started.

The live sitemap index at `http://localhost:3000/sitemap.xml` lists **232 English URLs**. There is no `app/sitemap.ts`. Sitemaps are the XML routes under `app/sitemaps/`. `reports/quality-gate.json` does not exist. The only gate output is `reports/readiness.csv` (244 rows, written by `scripts/readiness.ts`) and `reports/readiness-summary.txt`.

`npm run build` was not run for this count. That command rewrites `data/patients/indexable.json` and moves route files before it builds. The 232 figure is the sitemap this code is serving now.

## Sitemap now

| Sitemap | URLs |
|---|---|
| `/sitemaps/treatments/sitemap.xml` | 101 (31 specialty hubs + 70 hand-written clinical pages) |
| `/sitemaps/costs/sitemap.xml` | 70 |
| `/sitemaps/blog/sitemap.xml` | 38 |
| `/sitemaps/pages/sitemap.xml` | 17 |
| `/sitemaps/countries/sitemap.xml` | 6 Indian cities |
| **Total** | **232** |

Country, country × treatment, source-city, answer, and city × treatment sitemaps are omitted because they have nothing indexable.

## Why the planned inventory is not in the sitemap

Three different things are being counted as one gap.

1. **Generated, then held out of the index.** `data/procedures/library.ts` builds 594 clinical pages from shared band profiles. They fail the unique-facts rule (median about 3% unique once the page name is removed). They stay on the site with `noindex` and are excluded from the sitemap and `llms.txt`. Their cost URLs are noindex too. This is the drop from 1,420 English URLs to 232.
2. **Drafted, but the publish gate is closed.** Source-country pages exist only as data. `scripts/readiness.ts` copies the answer and country-child routes into `app/` only when `data/patients/indexable.json` lists them. That file is empty, so those URLs are not routed. Zero of 150 planned country × treatment pages are built. The summary also says Wave 2 must wait until 70% of Wave 1 is indexed in Search Console. That share is 0%, and the public host is not deployed.
3. **Never started.** Tests, technologies, comparisons, glossary, packages, recovery destinations, tools, patient stories, and every worldwide cluster have no data file and no route.

A full `npx next build` before the library noindex prerendered 26,024 HTML files, because every locale, city alias, and noindex city × procedure URL is still generated. Page count in the build is not the indexable count.

## Master-prompt clusters

Targets are section 2 of the master plan. “Blocked” means a URL or a readiness row exists and is not indexable. “Not started” means there is no record and no route.

| Cluster | Target | Built | Indexable | Blocked | Not started |
|---|---:|---:|---:|---:|---:|
| 1. Specialty hubs `/treatments/{specialty}` | 20 | 31 | 31 | 0 | 0 |
| 2. Procedures `/treatments/{specialty}/{procedure}` | 160 | 480 | 67 | 413 library | 0 URLs; 93 still short of a unique set of 160 |
| 3. Conditions `/conditions/{condition}` | 200 | 183, all under `/treatments/…` | 3 | 180 library | 17 unique topics, and the `/conditions` URL was never added |
| 4. Cost pages `/cost/{procedure}-cost-in-india` | 90 | 663 pages, plus the cauda equina cost URL which 301s | 70 | 593 library | 0 URLs; the plan only wants 90 high-volume pages |
| 5. Diagnostic tests `/tests/{test}` | 50 | 0 | 0 | 0 | 50 |
| 6. Technologies `/technology/{tech}` | 40 | 0 | 0 | 0 | 40 |
| 7. Source-country hubs `/patients-from/{country}` | 50 | 10 | 0 | 10 (data gate) | 35 named in the wave list, with no country file |
| 8. Country × treatment `/patients-from/{country}/{treatment}` | 300 | 0 | 0 | 150 rows in the readiness file | 150 beyond the 15-treatment pool |
| 9. Source-city hubs `/patients-from/{country}/{city}` | 60 | 0 | 0 | 23 stub records, 46 candidates in the readiness file | the rest of the 60 |
| 10. Indian cities `/destinations/{city}` | 12–20 | 6 | 6 | 0 | 6–14 cities |
| 11. Packages | 45 | 0 | 0 | 0 | 45 |
| 12. Recovery destinations | 12 | 0 | 0 | 0 | 12 |
| 13. Comparisons `/compare/…` | 60 | 0 | 0 | 0 | 60 |
| 14. Answers `/answers/{question}` | 250 | 0 | 0 | 1 readiness row: no files in `content/answers` | 250 |
| 15. Glossary | 120 | 0 | 0 | 0 | 120 |
| 16. Guides `/blog/{slug}` | 120 | 38 | 38 | 0 | 82 |
| 17. Tools `/tools/{tool}` | 10 | 0 routes (one estimator sits on the quote page) | 0 | 0 | 10 |
| 18. Patient stories | 40 | 0 | 0 | 0 | 40 |
| 19. Trust and policy | 25 | 17 static sitemap URLs, including home, quote, and the blog index | 17 | review-team page is a placeholder | separate reviewer profiles, how we’re paid, complaints, HTML site map |
| City × procedure and city × department | 0 (explicitly excluded) | about 3,320 + 180 | 0 | all noindex | do not add |

Indexable clinical pages are the 70 hand-written records: 67 procedures and 3 conditions (brain tumour, brain aneurysm, epilepsy). The one emergency page, cauda equina, is a library page, so it is noindex. The three indexable conditions are not at `/conditions/…`.

Specialty hubs are already past the target of 20. Neurology is still an indexable hub with no procedure list of its own.

## What unlocks the most pages

Grouped from `reports/readiness.csv`. Every non-indexable row is counted once per missing field.

### 150 country × treatment rows (0 built)

Each row is blocked by the same three gates:

| Missing field | Rows |
|---|---:|
| Country record incomplete (the parent hub is not indexable) | 150 |
| `localCosts.{treatment}` with minUSD, maxUSD, setting, source, asOf, fly-home note, follow-up note, and 6–8 FAQs | 150 |
| `visa.processingDays` | 150 |

These routes are not installed until the parent country passes. Filling one country unlocks its hub first, then up to 15 treatment URLs.

### 10 built source-country hubs (all noindex)

These fields are missing on all 10 (`/patients-from/nigeria` through Afghanistan):

| Missing field | Countries |
|---|---:|
| `reviewed.by` and `reviewed.date` | 10 |
| `visa.eMedicalEligible`, `visa.attendantVisa`, `visa.processingNotes`, `visa.applyVia`, `visa.lastChecked` | 10 |
| `travel.routesToIndia` (direct yes/no and duration) and `travel.lastChecked` | 10 |
| `money.paymentMethods` and `money.notes` | 10 |
| `localCareContext.commonReasonsPatientsTravel` and `localCareContext.followUpAtHome` | 10 |
| `cultural.foodNotes` and `cultural.prayerFacilities` | 10 |
| `fxRateToUSD` (local units per 1 USD, asOf, source) | 10 |
| `localCosts` for at least one treatment, with source and date | 10 |
| Country-only FAQs: 4 of 8 | 10 |
| `uniqueContent` under 300 words | 9 (Nigeria is 330 and clears this one) |

Nigeria is the closest hub. It still needs the shared visa, travel, money, care, culture, FX, one sourced local cost, two more FAQs, and a named review.

### 35 later source countries, 46 source cities, answers, translations

| Block | What is missing |
|---|---|
| 35 Wave 2–4 countries | No country file. The readiness script also says not to open the wave until 70% of the previous wave is indexed. |
| 23 source-city candidates with no city record, plus 23 stubs | `routesToIndia`, `visaCentre`, `localSupport`, `lastChecked`, and an indexable treatment corridor in the same country. |
| Answers | `content/answers` has no files. The note says to collect 50 real questions from forms, WhatsApp, and Search Console before drafting. |
| Locales | No human-reviewed translation. `ar`, `fr`, `ru`, and `bn` stay noindex. |

Clinical library pages are not in this CSV. They are blocked in code by `isLibraryProcedure()`, not by an empty `reviewedBy` field. None of the 70 indexable clinical pages have a named reviewer either. The byline is still `TODO(client): Dr ___`. The medical-review rule would also hold those 70 out of the index. That rule is not wired into the sitemap yet.

## Clusters with no drafts

These have no data file and no route. They are the Step 2 generation list, and they cannot be filled by flipping a flag.

**India clusters from the master plan**

- Diagnostic tests
- Technologies
- Comparisons
- Glossary
- Packages
- Recovery destinations
- Tool routes
- Patient stories
- `/conditions/{condition}` as its own path
- Answer pages (`content/answers` is empty; the route template is parked in `recycle/patient-routes/`)

**Worldwide clusters from this prompt**

| Cluster | Target | Status |
|---|---:|---|
| W1 Destination hubs `/countries/{destination}` | 20 | Not started. No `data/destinations.ts`. |
| W2 Destination × specialty | ~120 | Not started |
| W3 Procedure cost in a destination other than India | ~300 | Not started. India cost URLs already exist. |
| W4 Destination cities | ~50 | Not started. Indian cities use `/destinations/{city}`, not this pattern. |
| W5 Visa and travel guides | 20 | Not started. India has one page, `/medical-visa-india`. |
| W6 Procedure comparisons, country vs country | ~120 | Not started |
| W7 Best country for a procedure | ~50 | Not started |
| W8 Sections inside `/patients-from/{country}` | 0 new URLs | Not started. Those hubs are noindex. |
| W9 Worldwide answers | +150 | Not started |
| W10 Packages for active destinations | ~60 | Not started |

Iran is not in the data. No destination is marked active or inactive, because the destination file does not exist.

## Phase 0 fixes, checked again

| Fix | Live now? |
|---|---|
| Untranslated `ar` / `fr` / `ru` / `bn` noindex, and absent from the sitemap | Yes. Hreflang is `en` and `x-default` only. |
| Library template pages out of the sitemap | Yes. 594 clinical URLs and their cost URLs are noindex. |
| Cauda equina cost URL | Yes. `/cost/cauda-equina-syndrome-cost-in-india` returns 301 to `/treatments/spine-surgery/cauda-equina-syndrome`, including the locale copies. The short `/cost/cauda-equina-syndrome` path does the same. |
| Merged duplicates | Yes for slipped disc, epilepsy surgery, aneurysm clipping, brain-tumour surgery, and the colorectal, pancreatic-cancer, and liver-cancer surgery URLs. Those 301s are in `data/redirects.ts`. |
| Doorway city × procedure and city × department pages removed | No. They are noindex and out of the sitemap. About 3,500 URLs are still generated, and city hubs still link to the department URLs. |
| One intent, one URL | Not finished. Whipple and pancreatic surgery are both indexable. Cosmetic and plastic hubs are both indexable. Neurology (empty) and neurosurgery are both indexable. Parkinson’s is noindex only because it is a library page; deep brain stimulation is still indexable. |
| Named medical review before indexing | Not done. The review-team page is still a placeholder. |

## Stop

The 232 sitemap URLs are the hand-written India set. The rest of the 1,350-page plan is either a template page held out of the index, a patient-corridor row waiting on visa, price, and reviewer fields, or a cluster that has not been created.

Step 1 has not been started. Worldwide destination pages, brand copy, and new clusters should wait until this gap report is accepted.
