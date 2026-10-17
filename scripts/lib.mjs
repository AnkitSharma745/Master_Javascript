import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
export const root = path.resolve(import.meta.dirname, "..");
export const readJson = async name => JSON.parse((await readFile(path.join(root,name),"utf8")).replace(/^\uFEFF/,""));
export async function files(directory = root) {
  const result = [];
  for (const entry of await readdir(directory,{ withFileTypes:true })) {
    if ([".git","node_modules","build","dist",".cache","personal"].includes(entry.name)) continue;
    const location = path.join(directory,entry.name);
    if (entry.isDirectory()) result.push(...await files(location));
    else result.push(location);
  }
  return result.sort();
}
export const stripFences = text => text.replace(/(^|\n)[ \t]*```[^\n]*\n[\s\S]*?\n[ \t]*```/g,"\n");
export function anchors(text) {
  const counts = new Map(), result = new Set();
  for (const match of stripFences(text).matchAll(/^#{1,6}\s+(.+)$/gm)) {
    const slug = match[1].toLowerCase().replace(/<[^>]*>/g,"").replace(/[^\p{L}\p{N}_\-\s]/gu,"").trim().replace(/\s/g,"-");
    const count = counts.get(slug) ?? 0;
    result.add(count ? slug + "-" + count : slug); counts.set(slug,count+1);
  }
  for (const match of text.matchAll(/(?:id|name)=["']([^"']+)["']/g)) result.add(match[1]);
  return result;
}
