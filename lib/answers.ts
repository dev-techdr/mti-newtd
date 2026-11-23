import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getProcedure } from "@/data/procedures";
import { wordCount } from "@/data/patients/assess";
import { getPatientCountry } from "@/data/patients/load";
import { isAnswerIndexable } from "@/data/patients/publish";
import { answerFrontmatterSchema, type AnswerFrontmatter } from "@/data/patients/schema";

export type AnswerRecord = AnswerFrontmatter & { slug: string; body: string; words: number };

export type AnswerFile = { slug: string; record: AnswerRecord | null; error: string | null };

const dir = path.join(process.cwd(), "content/answers");

export function loadAnswerFiles(): AnswerFile[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const parsed = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      const data = answerFrontmatterSchema.safeParse(parsed.data);
      if (!data.success) {
        return { slug, record: null, error: data.error.issues.map((issue) => issue.message).join("; ") };
      }
      const body = parsed.content.trim();
      return { slug, record: { ...data.data, slug, body, words: wordCount(body) }, error: null };
    });
}

export function answerGaps(record: AnswerRecord) {
  const gaps: string[] = [];
  if (record.words < 300) gaps.push(`body: ${record.words} words, need 300`);
  const short = wordCount(record.shortAnswer);
  if (short < 40 || short > 60) gaps.push(`shortAnswer: ${short} words, need 40-60`);
  if (!record.sources.length) gaps.push("sources");
  if (!record.reviewedBy) gaps.push("reviewedBy");
  if (!record.countries.length) gaps.push("countries: name at least one country page");
  if (!record.treatments.length) gaps.push("treatments: name at least one treatment page");
  for (const country of record.countries) {
    if (!getPatientCountry(country)) gaps.push(`countries.${country} has no country page`);
  }
  for (const treatment of record.treatments) {
    if (!getProcedure(treatment)) gaps.push(`treatments.${treatment} has no treatment page`);
  }
  if (/TODO/i.test(record.body) || /TODO/i.test(record.shortAnswer)) gaps.push("TODO in the answer");
  return gaps;
}

export function readyAnswerRecords() {
  return loadAnswerFiles().flatMap((file) => {
    if (!file.record || !isAnswerIndexable(file.slug) || answerGaps(file.record).length) return [];
    return [file.record];
  });
}

export function answerSitemapItems() {
  return readyAnswerRecords().map((answer) => ({ path: `/answers/${answer.slug}`, lastModified: answer.updatedDate }));
}
