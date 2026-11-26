import fs from "node:fs";
import path from "node:path";
import { assistanceCopyIssues } from "../data/assistance";

const builtOnly = process.argv.includes("--built");
const roots = ["app", "components", "data", "content", "messages", "public", "lib"];
const skipDirs = new Set(["node_modules", ".next", "recycle", "docs", "reports", "out"]);
const extensions = new Set([".ts", ".tsx", ".mdx", ".md", ".json", ".html", ".txt"]);

const patterns: { label: string; re: RegExp }[] = [
  { label: "TODO", re: /\bTODO\b/i },
  { label: "TBD", re: /\bTBD\b/i },
  { label: "placeholder", re: /\bplaceholder\b/i },
  { label: "planning figure", re: /planning figures?/i },
  { label: "lorem", re: /\blorem\b/i },
  { label: "Dr ___", re: /Dr ___/ },
  { label: "XXX", re: /\bXXX\b/ },
  { label: "chart estimate", re: /chart estimate/i },
  { label: "What still needs a real client record", re: /What still needs a real client record/i },
  { label: "best", re: /\bbest\b(?!-)/i },
  { label: "No.1", re: /No\.1/i },
  { label: "guaranteed", re: /\bguaranteed\b/i },
  { label: "100%", re: /(?<![\w.[("'])100%/ },
];

type Hit = { file: string; line: number; label: string; text: string };

function stripForScan(source: string, ext: string) {
  let text = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
  text = text.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
  text = text.replace(/\splaceholder\s*=\s*(?:"[^"]*"|'[^']*'|\{[^}]*\}|[^\s>]+)/gi, " ");
  text = text.replace(/\bplaceholder\b(?=\s*[?:,}])/gi, " ");
  text = text.replace(/\/(?:TODO|TBD)\/[a-z]*/gi, " ");
  text = text.replace(/\[[^\]]*\]\(([^)]+)\)/g, " ");
  text = text.replace(/https?:\/\/\S+/g, " ");
  text = text.replace(/\/[A-Za-z0-9_./?=&%-]+/g, " ");
  text = text.replace(/className=(?:"[^"]*"|'[^']*'|\{[^}]*\})/g, " ");
  text = text.replace(/offset="100%"/g, " ");
  if (ext === ".html" || ext === ".mdx" || ext === ".md" || ext === ".txt") {
    text = text.replace(/<[^>]+>/g, " ");
  }
  return text;
}

function scanText(file: string, text: string, hits: Hit[]) {
  const lines = text.split("\n");
  lines.forEach((line, index) => {
    const found = patterns.find((item) => item.re.test(line));
    if (!found) return;
    hits.push({ file, line: index + 1, label: found.label, text: line.trim().slice(0, 160) });
  });
}

function walk(dir: string, hits: Hit[], terms: string[]) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skipDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, hits, terms);
      continue;
    }
    const ext = path.extname(entry.name);
    if (!extensions.has(ext)) continue;
    const raw = fs.readFileSync(full, "utf8");
    scanText(full, stripForScan(raw, ext), hits);
    scanPartners(full, raw, terms, hits);
  }
}

function walkHtml(dir: string, hits: Hit[], terms: string[]) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "cache") continue;
      walkHtml(full, hits, terms);
      continue;
    }
    if (!entry.name.endsWith(".html")) continue;
    const raw = fs.readFileSync(full, "utf8");
    scanText(full, stripForScan(raw, ".html"), hits);
    scanPartners(full, raw, terms, hits);
  }
}

function loadEnvFile(name: string) {
  const full = path.join(process.cwd(), name);
  if (!fs.existsSync(full)) return;
  for (const line of fs.readFileSync(full, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const split = trimmed.indexOf("=");
    if (split < 1) continue;
    const key = trimmed.slice(0, split);
    if (process.env[key]) continue;
    process.env[key] = trimmed.slice(split + 1).replace(/^["']|["']$/g, "");
  }
}

function partnerTerms() {
  loadEnvFile(".env");
  loadEnvFile(".env.local");
  const fromEnv = (process.env.BANNED_PARTNER_TERMS || "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length >= 4);
  const file = path.join(process.cwd(), "config/banned-partners.json");
  const fromFile = fs.existsSync(file)
    ? ((JSON.parse(fs.readFileSync(file, "utf8")) as { terms?: string[] }).terms ?? [])
        .map((item) => item.trim())
        .filter((item) => item.length >= 4)
    : [];
  return [...new Set([...fromEnv, ...fromFile])];
}

function scanPartners(file: string, raw: string, terms: string[], hits: Hit[]) {
  const lines = raw.split("\n");
  lines.forEach((line, index) => {
    const found = terms.find((term) => line.toLowerCase().includes(term.toLowerCase()));
    if (!found) return;
    hits.push({ file, line: index + 1, label: "partner term", text: found });
  });
}

const hits: Hit[] = [];
const partners = partnerTerms();
if (!partners.length) console.log("Partner-term list is empty. Set BANNED_PARTNER_TERMS or config/banned-partners.json.");
if (builtOnly) {
  walkHtml(path.join(process.cwd(), ".next"), hits, partners);
  walkHtml(path.join(process.cwd(), "out"), hits, partners);
} else {
  for (const issue of assistanceCopyIssues()) hits.push({ file: "data/assistance.ts", line: 1, label: "assistance copy", text: issue });
  for (const root of roots) walk(path.join(process.cwd(), root), hits, partners);
}

if (hits.length) {
  console.error(`Unfinished copy in rendered content (${hits.length}):`);
  for (const hit of hits.slice(0, 40)) console.error(`${hit.file}:${hit.line}: [${hit.label}] ${hit.text}`);
  process.exit(1);
}

console.log(builtOnly ? "Built HTML placeholder check passed." : "Placeholder check passed.");
