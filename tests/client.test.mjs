import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { JSDOM } from "jsdom";
const flush = () => new Promise(resolve => setImmediate(resolve));
async function harness(t) {
  const html = await readFile(new URL("../projects/issue-board/public/index.html",import.meta.url),"utf8");
  const script = await readFile(new URL("../projects/issue-board/public/client.js",import.meta.url),"utf8");
  const dom = new JSDOM(html,{ url:"http://127.0.0.1:3000", runScripts:"outside-only" });
  t.after(() => dom.window.close());
  const requests = [];
  dom.window.crypto.randomUUID = randomUUID;
  dom.window.fetch = (url,options = {}) => new Promise((resolve,reject) => {
    // Deliberately ignore cancellation so generation ownership is tested too.
    requests.push({ url,options,resolve,reject });
  });
  dom.window.eval(script);
  const reply = (index,value) => requests[index].resolve({ ok:true,status:200,json:async()=>value });
  const submit = id => dom.window.document.querySelector(id).dispatchEvent(new dom.window.Event("submit",{ bubbles:true,cancelable:true }));
  return { window:dom.window,document:dom.window.document,requests,reply,submit };
}
test("headless DOM renders malicious-looking API title as text", async t => {
  const app = await harness(t);
  app.reply(0,[{ id:"1",title:'<img src=x onerror="alert(1)">',status:"open" }]); await flush();
  assert.equal(app.document.querySelectorAll("#issues img").length,0);
  assert.match(app.document.querySelector("#issues").textContent,/<img/);
  assert.equal(app.document.querySelector("#results").getAttribute("aria-busy"),"false");
});
test("headless DOM late result cannot replace latest search intent", async t => {
  const app = await harness(t);
  app.document.querySelector("#search").value = "new"; app.submit("#search-form");
  assert.equal(app.requests[0].options.signal.aborted,true);
  app.reply(1,[{ id:"new",title:"New",status:"open" }]); await flush();
  app.reply(0,[{ id:"old",title:"Old",status:"open" }]); await flush();
  assert.equal(app.document.querySelector("#issues").textContent,"New — open");
});
test("headless DOM preserves intent key after uncertain save and suppresses repeated active submit", async t => {
  const app = await harness(t); app.reply(0,[]); await flush();
  const title = app.document.querySelector("#title");
  title.value = " "; app.submit("#create"); assert.equal(app.requests.length,1);
  title.value = "Login"; app.submit("#create"); app.submit("#create");
  assert.equal(app.requests.length,2); assert.equal(app.document.querySelector("#submit").disabled,true);
  const key = app.requests[1].options.headers["Idempotency-Key"];
  app.requests[1].reject(new Error("Uncertain network outcome")); await flush();
  assert.equal(title.value,"Login"); app.submit("#create");
  assert.equal(app.requests[2].options.headers["Idempotency-Key"],key);
  app.reply(2,{ id:"1",title:"Login",status:"open" }); await flush();
  app.reply(3,[{ id:"1",title:"Login",status:"open" }]); await flush();
  assert.equal(title.value,""); assert.equal(app.document.querySelector("#submit").disabled,false);
});
