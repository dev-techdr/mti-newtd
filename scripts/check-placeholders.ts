import fs from "node:fs";
import path from "node:path";

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
];

type Hit = { file: string; line: number; label: string; text: string };

function stripForScan(source: string, ext: string) {
  let text = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
  text = text.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
  text = text.replace(/\splaceholder\s*=\s*(?:"[^"]*"|'[^']*'|\{[^}]*\}|[^\s>]+)/gi, " ");
  text = text.replace(/\bplaceholder\b(?=\s*[?:,}])/gi, " ");
  text = text.replace(/\/(?:TODO|TBD)\/[a-z]*/gi, " ");
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

function walk(dir: string, hits: Hit[]) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skipDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, hits);
      continue;
    }
    const ext = path.extname(entry.name);
    if (!extensions.has(ext)) continue;
    scanText(full, stripForScan(fs.readFileSync(full, "utf8"), ext), hits);
  }
}

function walkHtml(dir: string, hits: Hit[]) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "cache") continue;
      walkHtml(full, hits);
      continue;
    }
    if (!entry.name.endsWith(".html")) continue;
    scanText(full, stripForScan(fs.readFileSync(full, "utf8"), ".html"), hits);
  }
}

const hits: Hit[] = [];
if (builtOnly) {
  walkHtml(path.join(process.cwd(), ".next"), hits);
  walkHtml(path.join(process.cwd(), "out"), hits);
} else {
  for (const root of roots) walk(path.join(process.cwd(), root), hits);
}

if (hits.length) {
  console.error(`Unfinished copy in rendered content (${hits.length}):`);
  for (const hit of hits.slice(0, 40)) console.error(`${hit.file}:${hit.line}: [${hit.label}] ${hit.text}`);
  process.exit(1);
}

console.log(builtOnly ? "Built HTML placeholder check passed." : "Placeholder check passed.");
