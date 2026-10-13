import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
import { files } from "./lib.mjs";
const dom = new JSDOM("<!doctype html><html><body></body></html>");
globalThis.window = dom.window;
globalThis.document = dom.window.document;
const { default: mermaid } = await import("mermaid");
mermaid.initialize({ startOnLoad:false, securityLevel:"strict" });
let count = 0;
for (const name of (await files()).filter(name=>name.endsWith(".md"))) {
  const text = await readFile(name,"utf8");
  for (const match of text.matchAll(/```mermaid\n([\s\S]*?)```/g)) {
    try { await mermaid.parse(match[1]); count++; }
    catch (error) { console.error(`${name}: ${error.message}`); process.exitCode=1; }
  }
}
dom.window.close();
if (!process.exitCode) console.log(`Mermaid syntax pass: ${count} diagrams (not a rendered layout check)`);
