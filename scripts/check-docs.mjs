import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { format } from "node:util";
import { root, files, anchors, stripFences, readJson } from "./lib.mjs";
import { indexOutputs } from "./generate-indexes.mjs";
const errors = [];
const all = await files();
const markdown = all.filter(name=>name.endsWith(".md"));
let linkCount = 0, runnableCount = 0, syntaxCount = 0;
const bodies = new Map(await Promise.all(markdown.map(async name=>[name,await readFile(name,"utf8")])));
for (const [name,body] of bodies) {
  const clean = stripFences(body);
  const targets = [...clean.matchAll(/!?\[[^\]]*\]\(<?([^\s)>]+)>?(?:\s+"[^"]*")?\)/g)].map(match=>match[1]);
  targets.push(...[...clean.matchAll(/href=["']([^"']+)["']/g)].map(match=>match[1]));
  for (const target of targets) {
    if (/^(https?:|mailto:|data:|app:)/.test(target)) continue;
    linkCount++;
    const [relative,fragment] = target.split("#");
    const resolved = relative ? path.resolve(path.dirname(name),decodeURIComponent(relative)) : name;
    if (resolved !== root && !resolved.startsWith(root+path.sep)) {
      errors.push(`${path.relative(root,name)}: link escapes repository: ${target}`); continue;
    }
    try {
      if (!(await stat(resolved)).isFile() && fragment) throw new Error("anchor on directory");
      if (fragment && resolved.endsWith(".md")) {
        const targetBody = bodies.get(resolved) ?? await readFile(resolved,"utf8");
        if (!anchors(targetBody).has(decodeURIComponent(fragment))) throw new Error("missing anchor");
      }
    } catch (error) { errors.push(`${path.relative(root,name)}: ${target} (${error.message})`); }
  }
  for (const match of body.matchAll(/<!-- runnable:node -->\s*```javascript\n([\s\S]*?)```/g)) {
    runnableCount++;
    const expected = [...match[1].matchAll(/\/\/ expect: (.*)/g)].map(match=>match[1].trim());
    const actual = [];
    try {
      vm.runInNewContext(match[1],{console:{ log:(...args)=>actual.push(format(...args)) }},{ timeout:1000 });
      if (!expected.length || JSON.stringify(actual)!==JSON.stringify(expected)) {
        errors.push(`${path.relative(root,name)}: output mismatch ${JSON.stringify({expected,actual})}`);
      }
    } catch (error) { errors.push(`${path.relative(root,name)}: runnable example: ${error.message}`); }
  }
}
for (const name of all.filter(name=>name.endsWith(".js") || name.endsWith(".html"))) {
  const body = await readFile(name,"utf8");
  const snippets = name.endsWith(".js") ? [body] : [...body.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(match=>match[1]);
  for (const source of snippets) {
    try { new vm.Script(source); syntaxCount++; }
    catch (error) { errors.push(`${path.relative(root,name)}: script syntax: ${error.message}`); }
  }
}
const curriculum = await readJson("curriculum/manifest.json");
const sources = await readJson("references/sources.json");
const questions = await readJson("interviews/questions.json");
const ids = new Set(), visiting = new Set(), visited = new Set();
const byId = new Map(curriculum.lessons.map(row=>[row.id,row]));
function visit(id) {
  if (visiting.has(id)) { errors.push(`Prerequisite cycle at ${id}`); return; }
  if (visited.has(id)) return;
  visiting.add(id);
  for (const prerequisite of byId.get(id)?.prerequisites ?? []) {
    if (!byId.has(prerequisite)) errors.push(`Missing prerequisite ${prerequisite}`); else visit(prerequisite);
  }
  visiting.delete(id); visited.add(id);
}
const sections = ["Learning objective","Prerequisites","Interview preparation","Practice","Revision","Completion criteria","References"];
for (const row of curriculum.lessons) {
  if (ids.has(row.id)) errors.push(`Duplicate ID ${row.id}`); ids.add(row.id);
  visit(row.id);
  if (row.status === "planned") { if (row.path !== null) errors.push(`Planned ${row.id} has a path`); continue; }
  if (row.status !== "ready") errors.push(`Unknown status ${row.status}`);
  const body = bodies.get(path.join(root,row.path));
  if (!body) { errors.push(`Missing lesson ${row.id}`); continue; }
  if (!body.startsWith(`# ${row.id} `)) errors.push(`Lesson title ID mismatch ${row.id}`);
  for (const section of sections) if (!body.includes(`## ${section}\n`)) errors.push(`${row.id} missing ${section}`);
  if (body.split(/\s+/).length < 350) errors.push(`${row.id} needs substantive teaching`);
  if (!row.outcomes.length || !row.sources.length || !row.questions.length) errors.push(`${row.id} incomplete metadata`);
  for (const source of row.sources) if (!sources.some(item=>item.id===source)) errors.push(`${row.id} unknown source ${source}`);
  for (const question of row.questions) if (!questions.some(item=>item.id===question)) errors.push(`${row.id} unknown question ${question}`);
  for (const prerequisite of row.prerequisites) if (byId.get(prerequisite)?.status!=="ready") errors.push(`${row.id} depends on planned ${prerequisite}`);
}
for (const question of questions) {
  for (const id of question.prerequisites) if (!byId.has(id)) errors.push(`${question.id} unknown prerequisite ${id}`);
}
for (const [name,expected] of await indexOutputs()) {
  if (await readFile(path.join(root,name),"utf8").catch(()=>"") !== expected) errors.push(`Stale index: ${name}; run npm run indexes`);
}
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(`Docs pass: ${markdown.length} Markdown files, ${linkCount} internal links, ${curriculum.lessons.length} lesson IDs, ${runnableCount} executed fences, ${syntaxCount} JS/HTML script syntax checks`);
