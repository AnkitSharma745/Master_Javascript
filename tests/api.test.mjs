import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { once } from "node:events";
import { request } from "node:http";
const { createIssueServer } = createRequire(import.meta.url)("../build/projects/issue-board/server.js");

async function fixture(t, options = {}) {
  const server = createIssueServer(options);
  server.listen(0, "127.0.0.1"); await once(server, "listening");
  t.after(() => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }));
  const url = "http://127.0.0.1:" + server.address().port;
  const create = (body, key) => fetch(url + "/api/issues", {
    method: "POST", headers: { "Content-Type": "application/json", ...(key ? { "Idempotency-Key": key } : {}) },
    body: JSON.stringify(body)
  });
  return { server, url, create };
}
test("real HTTP: creation, search, errors, and safe static client", async t => {
  const logs = []; const { url, create } = await fixture(t, { log: entry => logs.push(entry) });
  const response = await create({ title: " Login bug " });
  assert.equal(response.status, 201); assert.ok(response.headers.get("x-request-id"));
  const issue = await response.json(); assert.equal(issue.title, "Login bug"); assert.equal(issue.status, "open");
  const list = await fetch(url + "/api/issues?q=LOGIN"); assert.deepEqual(await list.json(), [issue]);
  assert.equal((await fetch(url + "/api/issues?limit=0")).status, 400);
  assert.equal((await fetch(url + "/api/issues?limit=2junk")).status, 400);
  assert.equal((await create({ title:" " })).status, 400);
  const invalid = await create({ title:"x", tenantId:"other" });
  assert.equal(invalid.status, 400); assert.equal((await invalid.json()).error.code, "VALIDATION");
  assert.equal((await fetch(url + "/missing")).status, 404);
  const method = await fetch(url + "/api/issues", { method: "DELETE" });
  assert.equal(method.status, 405); assert.equal(method.headers.get("allow"), "GET, POST");
  const html = await fetch(url); assert.match(await html.text(), /label for="title"/);
  const js = await fetch(url + "/client.js"); assert.match(await js.text(), /textContent/);
  assert.equal(html.headers.get("cache-control"), "no-store");
  assert.ok(logs.every(entry => !Object.hasOwn(entry, "body")));
});
test("real HTTP: duplicate intent, payload conflict, expiry, and capacity", async t => {
  let clock = 0;
  const { url, create } = await fixture(t, { now: () => clock, idempotencyTtlMs: 10, maxRecords: 3 });
  const responses = await Promise.all([create({ title:"x" }, "same"), create({ title:"x" }, "same")]);
  const [a,b] = await Promise.all(responses.map(response => response.json()));
  assert.equal(a.id, b.id);
  assert.equal((await create({ title:"y" }, "same")).status, 409);
  assert.equal((await (await fetch(url + "/api/issues")).json()).length, 1);
  clock = 10; const after = await (await create({ title:"x" }, "same")).json();
  assert.notEqual(after.id, a.id);
  await create({ title:"z" }); assert.equal((await create({ title:"full" })).status, 503);
});
test("real HTTP: body, media, JSON, host, and origin boundaries", async t => {
  const { url, create } = await fixture(t);
  assert.equal((await create({ title:"x".repeat(2000) })).status, 413);
  assert.equal((await fetch(url + "/api/issues", { method:"POST", body:"x" })).status, 415);
  assert.equal((await fetch(url + "/api/issues", { method:"POST", headers:{"Content-Type":"application/json"}, body:"{" })).status, 400);
  assert.equal((await fetch(url + "/api/issues", { headers:{ Origin:"https://attacker.example" } })).status, 403);
  const hostStatus = await new Promise((resolve,reject) => {
    const req = request(url + "/api/issues", { headers:{ Host:"attacker.example" } }, response => { response.resume(); resolve(response.statusCode); });
    req.on("error",reject); req.end();
  });
  assert.equal(hostStatus, 403);
  const chunkedStatus = await new Promise((resolve,reject) => {
    const req = request(url + "/api/issues", {
      method:"POST",headers:{ "Content-Type":"application/json", "Transfer-Encoding":"chunked" }
    }, response => { response.resume(); resolve(response.statusCode); });
    req.on("error",reject); req.write('{"title":"' + "x".repeat(1500)); req.end('"}');
  });
  assert.equal(chunkedStatus, 413);
});
test("logging rejection never changes a successful HTTP operation", async t => {
  const { create } = await fixture(t,{ log:async () => { throw new Error("Sink unavailable"); } });
  const response = await create({ title:"Independent result" });
  assert.equal(response.status,201); assert.equal((await response.json()).title,"Independent result");
});
