import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { z } from "zod";

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const https = z.string().refine((value) => value.startsWith("https://"), "https URL required");
const slug = z.string().regex(/^[a-z0-9-]+$/);

const files = {
  "destination-costs": {
    file: "data/import/destination-costs.csv",
    schema: z.object({
      destination: slug,
      procedure: slug,
      minUSD: z.coerce.number().positive(),
      maxUSD: z.coerce.number().positive(),
      source: https,
      asOf: date,
    }),
  },
  "destination-regulation": {
    file: "data/import/destination-regulation.csv",
    schema: z.object({
      destination: slug,
      ivf: z.string().min(1),
      surrogacy: z.string().min(1),
      organTransplantForeigners: z.string().min(1),
      stemCell: z.string().min(1),
      source: https,
      asOf: date,
    }),
  },
  "destination-visa": {
    file: "data/import/destination-visa.csv",
    schema: z.object({
      destination: slug,
      notes: z.string().min(1),
      officialUrl: https,
      lastChecked: date,
    }),
  },
  "flight-times": {
    file: "data/import/flight-times.csv",
    schema: z.object({
      from: z.string().regex(/^[A-Z]{3}$/),
      to: z.string().regex(/^[A-Z]{3}$/),
      typicalHours: z.coerce.number().positive(),
      source: https,
      asOf: date,
    }),
  },
  partners: {
    file: "data/import/partners.csv",
    schema: z.object({
      destination: slug,
      specialty: slug,
      hospitalRef: z.string().min(1),
      signedOn: date,
    }),
  },
} as const;

function cells(line: string) {
  const values: string[] = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (quoted && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current.trim());
      current = "";
    } else current += char;
  }
  values.push(current.trim());
  return values;
}

function parseCsv(file: string) {
  const text = readFileSync(file, "utf8").replace(/^\uFEFF/, "").trim();
  if (!text) return [];
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  const headers = cells(lines[0]);
  return lines.slice(1).map((line, index) => ({
    row: index + 2,
    record: Object.fromEntries(headers.map((key, column) => [key, cells(line)[column] ?? ""])),
  }));
}

mkdirSync("data/imported", { recursive: true });

for (const [name, spec] of Object.entries(files)) {
  const accepted: unknown[] = [];
  for (const item of parseCsv(spec.file)) {
    const parsed = spec.schema.safeParse(item.record);
    if (parsed.success) accepted.push(parsed.data);
    else console.error(`${spec.file}:${item.row} ${parsed.error.issues.map((issue) => issue.message).join("; ")}`);
  }
  writeFileSync(`data/imported/${name}.json`, `${JSON.stringify(accepted, null, 2)}\n`);
  console.log(`${name}: ${accepted.length} accepted`);
}
