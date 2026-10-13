import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { root, readJson, files } from "./lib.mjs";

export async function indexOutputs() {
  const curriculum = await readJson("curriculum/manifest.json");
  const ready = curriculum.lessons.filter(row => row.status === "ready");
  const outputs = new Map();
  const table = (rows,base) => {
    let result = "| ID | Lesson / status | Prerequisites | Observable outcome |\n| --- | --- | --- | --- |\n";
    for (const row of rows) {
      const title = row.path ? `[${row.title}](${base}${row.path})` : `${row.title} — **planned**`;
      result += `| ${row.id} | ${title} | ${row.prerequisites.join(", ") || "None"} | ${row.outcomes.join("; ")} |\n`;
    }
    return result;
  };
  let master = "# Master curriculum\n\nGenerated from manifest.json. IDs stay stable. **Ready** means authored learning material is available; it does not mean the learner has mastered it. Planned entries have no empty lesson files.\n\n";
  master += "Follow the available lessons in table order, or use prerequisites to branch after demonstrating mastery. Algorithms can begin after JS05; Angular starts after the language/type/design foundation. For fast role-specific preparation use [interview tracks](../interviews/tracks.md).\n\n";
  for (const module of curriculum.modules) {
    master += `## ${module.id.slice(0,2)}. ${module.title}\n\n` + table(curriculum.lessons.filter(row=>row.module===module.id),"../") + "\n";
    const body = `# ${module.title}\n\n[Master curriculum](../../curriculum/README.md) · [Interview tracks](../../interviews/tracks.md) · [Revision](../../revision/README.md)\n\n` + table(curriculum.lessons.filter(row=>row.module===module.id),"../../") + "\nStudy the ready lessons first. Planned extensions represent additional depth, not completed coverage.\n";
    outputs.set(`lessons/${module.id}/README.md`,body);
  }
  outputs.set("curriculum/README.md",master);
  const questions = await readJson("interviews/questions.json");
  outputs.set("revision/cards.json", JSON.stringify(questions.map(question=>({
    id:question.id, lessonIds:question.prerequisites, tags:[question.subject,question.difficulty,question.type],
    question:question.prompt, answer:question.concise, source:`interviews/answers.md#${question.id.toLowerCase()}`
  })),null,2)+"\n");
  outputs.set("revision/progress.template.json", JSON.stringify(ready.map(row=>({
    id:row.id, scores:[0,0,0,0,0,0,0], stage:0, lastReview:null, nextReview:null, evidence:""
  })),null,2)+"\n");
  const inventory = await readJson("docs/audit/original-inventory.json");
  const mapping = { "01":"F01", "02":"JS01", "03":"JS01", "04":"F01", "05":"JS02", "06":"JS05", "07":"JS04", "08":"JS06", "09":"F02", "10":"AS02", "11":"FP01", "12":"SD01", "13":"DP01", "14":"TS01" };
  let migration = "# Original-to-canonical migration map\n\nEvery original tracked file is accounted for. SHA-256 fingerprints before migration are in [the inventory](original-inventory.json). Supplementary files may cover several lessons; the listed lesson is their primary entry point. Archiving preserves useful examples while eliminating a competing study sequence. Known defects were corrected; archived fences have syntax/behavior limitations described in the audit.\n\n| Original path | Retained location | Primary role |\n| --- | --- | --- |\n";
  for (const item of inventory) {
    const moved = item.path === "README.md" ? "archive/README.original.md" : "archive/" + item.path;
    const id = mapping[item.path.slice(0,2)];
    const row = ready.find(row=>row.id===id);
    const role = row ? `[${id}](../../${row.path}) supplement` : "Historical entry page";
    migration += `| ${item.path} | [Retained file](${encodeURI("../../"+moved)}) | ${role} |\n`;
  }
  migration += "\nThe two original banking files were identical. The second now forwards to the first; no unique example was removed. The original root README is preserved unchanged. See [the correction ledger](corrections.md).\n";
  outputs.set("docs/audit/migration.md",migration);
  const tree = {};
  const paths = new Set((await files()).map(name=>path.relative(root,name).split(path.sep).join("/")));
  paths.add("docs/audit/final-tree.txt");
  for (const name of paths) {
    let branch=tree;
    for (const part of name.split("/")) branch=branch[part] ??= {};
  }
  const lines=["Master_Javascript/ (authored files; dependencies, build outputs, Git data, cache, and personal progress excluded)"];
  function draw(branch,prefix="") {
    const entries=Object.entries(branch).sort(([a],[b])=>a.localeCompare(b,"en"));
    entries.forEach(([name,child],index)=>{
      const last=index===entries.length-1, directory=Object.keys(child).length>0;
      lines.push(prefix+(last?"└── ":"├── ")+name+(directory?"/":""));
      if (directory) draw(child,prefix+(last?"    ":"│   "));
    });
  }
  draw(tree);
  outputs.set("docs/audit/final-tree.txt",lines.join("\n")+"\n");
  return outputs;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const outputs = await indexOutputs();
  for (const [name,body] of outputs) {
    await mkdir(path.dirname(path.join(root,name)),{ recursive:true });
    await writeFile(path.join(root,name),body);
  }
  console.log(`Generated ${outputs.size} indexes/maps`);
}
