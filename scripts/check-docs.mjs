// Checks every Markdown file in the repository:
//  1. relative links point to files that exist, and #anchors match a heading (GitHub-style slugs)
//  2. every ```mermaid block parses
// Run with: npm ci && npm run check
import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { JSDOM } from "jsdom";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");

async function markdownFiles(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await markdownFiles(full, out);
    else if (entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function slugify(heading) {
  return heading.trim().toLowerCase()
    .replace(/<[^>]+>/g, "").replace(/`/g, "")
    .replace(/[^\p{L}\p{N}\s_-]/gu, "").replace(/\s/g, "-");
}

function anchorsOf(text) {
  const counts = new Map();
  const set = new Set();
  let inFence = false;
  for (const line of text.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const m = /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    let slug = slugify(m[2].replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\*/g, ""));
    const n = counts.get(slug) ?? 0;
    counts.set(slug, n + 1);
    if (n > 0) slug = `${slug}-${n}`;
    set.add(slug);
  }
  for (const m of text.matchAll(/<a\s+(?:name|id)="([^"]+)"/g)) set.add(m[1]);
  return set;
}

const files = await markdownFiles(ROOT);
const texts = new Map();
for (const f of files) texts.set(f, (await readFile(f, "utf8")).replace(/\r\n/g, "\n"));
const anchorCache = new Map();
const anchorsFor = (f) => {
  if (!anchorCache.has(f)) anchorCache.set(f, anchorsOf(texts.get(f) ?? ""));
  return anchorCache.get(f);
};

let brokenLinks = 0, links = 0;
for (const [file, text] of texts) {
  const prose = text.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
  for (const m of prose.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|data:)/.test(href)) continue;
    links++;
    const [pathPart, anchor] = href.split("#");
    const target = pathPart ? resolve(dirname(file), decodeURIComponent(pathPart)) : file;
    if (!existsSync(target)) { brokenLinks++; console.log(`Missing file: ${file.slice(ROOT.length + 1)} -> ${href}`); continue; }
    if (anchor && target.endsWith(".md") && !anchorsFor(target).has(decodeURIComponent(anchor).toLowerCase())) {
      brokenLinks++; console.log(`Missing anchor: ${file.slice(ROOT.length + 1)} -> ${href}`);
    }
  }
}

const dom = new JSDOM("<!doctype html><html><body></body></html>");
globalThis.window = dom.window;
globalThis.document = dom.window.document;
const { default: mermaid } = await import("mermaid");
mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
let diagrams = 0, brokenDiagrams = 0;
for (const [file, text] of texts) {
  for (const m of text.matchAll(/```mermaid\n([\s\S]*?)```/g)) {
    diagrams++;
    try { await mermaid.parse(m[1]); }
    catch (error) {
      brokenDiagrams++;
      const line = text.slice(0, m.index).split("\n").length;
      console.log(`Broken diagram: ${file.slice(ROOT.length + 1)}:${line} ${String(error.message).split("\n")[0]}`);
    }
  }
}
dom.window.close();

console.log(`${files.length} files · links: ${links - brokenLinks} ok, ${brokenLinks} broken · diagrams: ${diagrams - brokenDiagrams} ok, ${brokenDiagrams} broken`);
process.exit(brokenLinks || brokenDiagrams ? 1 : 0);
