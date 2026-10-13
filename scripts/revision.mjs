import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { root, readJson } from "./lib.mjs";
const intervals = [1,3,7,14,30];
const location = path.join(root,"revision/personal/progress.json");
export function validDate(value) {
  if (typeof value!=="string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed=new Date(value+"T00:00:00Z");
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0,10)===value;
}
export function reviewRecord(previous,scores,date,evidence) {
  if (!validDate(date) || scores.length!==7 || scores.some(score=>!Number.isInteger(score)||score<0||score>3)) {
    throw new TypeError("Use an ISO calendar date and seven integer scores from 0 to 3");
  }
  if (previous.lastReview && date <= previous.lastReview) throw new Error("Review must be on a later calendar date");
  if (!evidence || evidence.trim().length < 8) throw new Error("Record specific evidence");
  const success = scores.every(score=>score>=2);
  const stage = success ? previous.lastReview ? Math.min(previous.stage+1,intervals.length-1) : 0 : 0;
  const next = new Date(date+"T00:00:00Z"); next.setUTCDate(next.getUTCDate()+intervals[stage]);
  return { ...previous,scores,stage,lastReview:date,nextReview:next.toISOString().slice(0,10),evidence:evidence.trim() };
}
if (process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
  try {
    const args=process.argv.slice(2), command=args[0];
    if (command==="init") {
      const template=await readJson("revision/progress.template.json");
      await mkdir(path.dirname(location),{ recursive:true });
      await writeFile(location,JSON.stringify(template,null,2)+"\n",{ flag:"wx" });
      console.log("Created revision/personal/progress.json; existing trackers are never overwritten");
    } else {
      const rows=JSON.parse(await readFile(location,"utf8"));
      const parts=new Intl.DateTimeFormat("en-CA",{ timeZone:"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit" }).formatToParts(new Date());
      const part=name=>parts.find(item=>item.type===name).value;
      const dateIndex=args.indexOf("--date");
      const date=dateIndex>=0?args[dateIndex+1]:`${part("year")}-${part("month")}-${part("day")}`;
      if (!validDate(date)) throw new Error("Invalid calendar date");
      if (command==="due") {
        const due=rows.filter(row=>row.lastReview && row.nextReview<=date);
        console.log(due.length ? due.map(row=>`${row.id}: weakest ${Math.min(...row.scores)}, due ${row.nextReview}`).join("\n") : "No studied lessons due. Follow the curriculum or your weak-topic tracker.");
      } else if (command==="record") {
        const index=rows.findIndex(row=>row.id===args[1]);
        if (index<0) throw new Error("Unknown authored lesson ID");
        const evidenceIndex=args.indexOf("--evidence");
        rows[index]=reviewRecord(rows[index],args.slice(2,9).map(Number),date,evidenceIndex>=0?args[evidenceIndex+1]:"");
        await writeFile(location,JSON.stringify(rows,null,2)+"\n");
        console.log(`${rows[index].id}: next review ${rows[index].nextReview}; scores are self-reported`);
      } else throw new Error("Use init, due, or record ID followed by seven scores, --date, and --evidence");
    }
  } catch (error) { console.error(error.message); process.exitCode=1; }
}
