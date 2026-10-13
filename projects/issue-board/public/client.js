"use strict";
const list = document.querySelector("#issues");
const status = document.querySelector("#load-status");
const notice = document.querySelector("#notice");
const retry = document.querySelector("#retry");
const results = document.querySelector("#results");
const search = document.querySelector("#search");
const title = document.querySelector("#title");
const submit = document.querySelector("#submit");
let generation = 0, controller, pendingCreate, creating = false;

function parseRows(value) {
  if (!Array.isArray(value) || value.some(row => !row || typeof row.id !== "string" ||
    typeof row.title !== "string" || (row.status !== "open" && row.status !== "closed"))) {
    throw new Error("Invalid server response");
  }
  return value;
}

async function load() {
  const current = ++generation;
  controller?.abort();
  const ownController = new AbortController();
  controller = ownController;
  status.textContent = "Loading…";
  results.setAttribute("aria-busy", "true");
  retry.hidden = true;
  try {
    const response = await fetch("/api/issues?q=" + encodeURIComponent(search.value),
      { signal: ownController.signal });
    if (!response.ok) throw new Error("Load failed (HTTP " + response.status + ")");
    const rows = parseRows(await response.json());
    if (current !== generation) return;
    list.replaceChildren(...rows.map(row => {
      const item = document.createElement("li");
      item.textContent = row.title + " — " + row.status;
      return item;
    }));
    document.querySelector("#count").textContent = "(" + rows.length + ")";
    status.textContent = rows.length ? "Showing up to 50 matching issues." : "No matching issues.";
  } catch (error) {
    if (current === generation && !ownController.signal.aborted) {
      status.textContent = error.message + ". Previous results may be stale.";
      retry.hidden = false;
    }
  } finally {
    if (current === generation) results.setAttribute("aria-busy", "false");
  }
}

document.querySelector("#search-form").addEventListener("submit", event => {
  event.preventDefault(); void load();
});
retry.addEventListener("click", () => { void load(); });
document.querySelector("#create").addEventListener("submit", async event => {
  event.preventDefault();
  if (creating) return;
  const text = title.value.trim();
  if (!text) { notice.textContent = "Enter a nonblank title."; title.focus(); return; }
  // Reuse the key after an uncertain failure for identical user intent.
  if (pendingCreate?.title !== text) pendingCreate = { title: text, key: crypto.randomUUID() };
  creating = true; submit.disabled = true;
  try {
    const response = await fetch("/api/issues", {
      method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": pendingCreate.key },
      body: JSON.stringify({ title: text })
    });
    if (!response.ok) throw new Error("Save failed (HTTP " + response.status + ")");
    parseRows([await response.json()]);
    pendingCreate = undefined;
    title.value = "";
    notice.textContent = "Issue added. The current filter may exclude it.";
    title.focus();
    await load();
  } catch (error) { notice.textContent = error.message + ". Retry the same title to reuse its key."; }
  finally { creating = false; submit.disabled = false; }
});
void load();
