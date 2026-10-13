import { pathToFileURL } from "node:url";

export async function executionTrace() {
  const events = ["sync"];
  const done = new Promise(resolve => setTimeout(() => { events.push("timer"); resolve(); }, 0));
  new Promise(resolve => { events.push("executor"); resolve(); }).then(() => events.push("then"));
  queueMicrotask(() => events.push("microtask"));
  events.push("end");
  await done;
  return events;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log((await executionTrace()).join(" -> "));
}
