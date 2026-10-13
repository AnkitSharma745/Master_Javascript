import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mapLimit, createCachedLoader, retry, sleep } from "../labs/async-tools.mjs";
import { twoSum, longestUnique, lowerBound, breadthFirst } from "../labs/algorithms.mjs";
import { executionTrace } from "../labs/execution.mjs";
import { uppercaseAscii } from "../labs/streams.mjs";
const require = createRequire(import.meta.url);
const { parseIssue, parseIssues, parseNewIssue, get, pluck } = require("../build/labs/contracts.js");
const { shippingQuote, adaptName, Topic } = require("../build/labs/design.js");
const deferred = () => { let resolve, reject; const promise = new Promise((a,b) => { resolve=a; reject=b; }); return { promise, resolve, reject }; };

test("event loop executor is synchronous; reactions precede this timer", async () => {
  assert.deepEqual(await executionTrace(), ["sync", "executor", "end", "then", "microtask", "timer"]);
});
test("mapLimit bounds active work while preserving input order", async () => {
  let active = 0, peak = 0;
  const result = await mapLimit([1,2,3,4,5], 2, async value => {
    active++; peak = Math.max(peak, active);
    await new Promise(resolve => setImmediate(resolve));
    active--; return value * 2;
  });
  assert.equal(peak, 2); assert.deepEqual(result, [2,4,6,8,10]);
  const gates = [deferred(), deferred()];
  const reversed = mapLimit([0,1], 2, value => gates[value].promise);
  gates[1].resolve("second"); gates[0].resolve("first");
  assert.deepEqual(await reversed, ["first", "second"]);
});
test("mapLimit stops new work after error and drains active work", async () => {
  const gate = deferred(), started = [];
  const result = mapLimit([0,1,2,3], 2, async value => {
    started.push(value); if (value === 0) throw new Error("failed");
    return gate.promise;
  });
  const rejection = assert.rejects(result, /failed/);
  await Promise.resolve(); gate.resolve(1); await rejection;
  assert.deepEqual(started, [0,1]);
});
test("mapLimit validates boundaries and pre-aborted signals", async () => {
  assert.deepEqual(await mapLimit([], 1, value => value), []);
  await assert.rejects(mapLimit([1], 0, value => value), TypeError);
  const signal = AbortSignal.abort(new Error("stop"));
  await assert.rejects(mapLimit([1], 1, value => value, { signal }), /stop/);
});
test("cache deduplicates, preserves falsy results, and expires deterministically", async () => {
  let clock = 0, calls = 0;
  const cache = createCachedLoader(() => { calls++; return 0; }, { now: () => clock, ttlMs: 10 });
  const first = cache.read("a"), second = cache.read("a");
  assert.equal(first, second); assert.equal(await first, 0);
  assert.equal(await cache.read("a"), 0); assert.equal(calls, 1);
  clock = 10; await cache.read("a"); assert.equal(calls, 2);
  const undefinedCache = createCachedLoader(() => undefined);
  assert.equal(await undefinedCache.read("x"), undefined);
  assert.equal(undefinedCache.stats().entries, 1);
});
test("rejected cache load is evicted, bounded LRU retains recent keys", async () => {
  let attempts = 0;
  const cache = createCachedLoader(() => { if (++attempts === 1) throw new Error("bad"); return 7; });
  await assert.rejects(cache.read("a"), /bad/); assert.equal(await cache.read("a"), 7);
  let calls = 0;
  const bounded = createCachedLoader(key => { calls++; return key; }, { maxEntries: 2 });
  await bounded.read("a"); await bounded.read("b"); await bounded.read("a"); await bounded.read("c");
  await bounded.read("a"); assert.equal(calls, 3);
  await bounded.read("b"); assert.equal(calls, 4); assert.equal(bounded.stats().entries, 2);
});
test("invalidation prevents stale in-flight repopulation", async () => {
  const gate = deferred(); let calls = 0;
  const cache = createCachedLoader(() => ++calls === 1 ? gate.promise : "fresh");
  const old = cache.read("key"); await Promise.resolve();
  cache.invalidate("key"); assert.equal(await cache.read("key"), "fresh");
  gate.resolve("stale"); assert.equal(await old, "stale");
  assert.equal(await cache.read("key"), "fresh"); assert.equal(calls, 2);
});
test("clearing keys does not bypass the underlying active-load bound", async () => {
  const gate = deferred(); const cache = createCachedLoader(() => gate.promise, { maxInFlight: 1 });
  const active = cache.read("a"); cache.clear();
  await assert.rejects(cache.read("b"), /Too many/);
  gate.resolve(1); await active; assert.equal(cache.stats().active, 0);
});
test("retry budgets, classification, backoff, and cancellation", async () => {
  let calls = 0; const waits = [];
  const value = await retry(() => { if (++calls < 3) throw new Error("transient"); return 9; }, {
    shouldRetry: error => error.message === "transient", random: () => .5,
    wait: async delay => { waits.push(delay); }
  });
  assert.equal(value, 9); assert.deepEqual(waits, [50,100]);
  calls = 0; await assert.rejects(retry(() => { calls++; throw new Error("permanent"); }), /permanent/);
  assert.equal(calls, 1);
  const controller = new AbortController();
  await assert.rejects(retry(() => { throw new Error("temporary"); }, {
    signal: controller.signal, shouldRetry: () => true,
    wait: async () => { controller.abort(new Error("cancelled")); }
  }), /cancelled/);
  await assert.rejects(sleep(1, AbortSignal.abort(new Error("already"))), /already/);
  await assert.rejects(sleep(-1), TypeError);
});
test("runtime parsing rejects malformed shapes and strips unknown response fields", () => {
  assert.deepEqual(parseIssue({ id: "1", title: " Login ", status: "open", extra: true }), { id: "1", title: "Login", status: "open" });
  for (const value of [null, [], {}, { id:"1", title:"x", status:"other" }, { id:"1", title:" ", status:"open" }]) {
    assert.throws(() => parseIssue(value), TypeError);
  }
  assert.throws(() => parseIssues([{ id:"1", title:"x", status:"open" }, {}]), TypeError);
  assert.throws(() => parseIssues(new Array(1)), TypeError);
  assert.throws(() => parseNewIssue({ title: "x", status: "closed" }), TypeError);
  assert.equal(get({ retries: 2 }, "retries"), 2);
  assert.deepEqual(pluck([{ id:"1" }, { id:"2" }], "id"), ["1","2"]);
});
test("strategy, adapter, observer lifetime, and failure policy", () => {
  assert.equal(shippingQuote(2, kg => 100 + kg * 20), 140);
  assert.throws(() => shippingQuote(-1, () => 0), TypeError);
  assert.equal(adaptName({ getName: () => ({ full_name: "Ada" }) }).read().name, "Ada");
  const topic = new Topic(), seen = [];
  const stop = topic.subscribe(value => seen.push(value));
  topic.publish(1); stop(); stop(); topic.publish(2);
  assert.deepEqual(seen, [1]); assert.equal(topic.size, 0);
  topic.subscribe(() => { throw new Error("listener"); });
  assert.throws(() => topic.publish(3), /listener/);
});
test("algorithms handle duplicates, boundaries, Unicode code points, and cycles", () => {
  assert.deepEqual(twoSum([3,3], 6), [0,1]); assert.equal(twoSum([3], 6), null);
  assert.deepEqual(twoSum([-1,2,4], 3), [0,2]); assert.equal(twoSum([], 1), null);
  assert.equal(longestUnique("abba"), 2); assert.equal(longestUnique("😀a😀"), 2); assert.equal(longestUnique(""), 0);
  for (let size = 0; size < 25; size++) {
    const values = Array.from({ length: size }, (_, i) => Math.floor(i / 2));
    for (let target = -1; target <= size; target++) {
      const expected = values.findIndex(value => value >= target);
      assert.equal(lowerBound(values, target), expected < 0 ? values.length : expected);
    }
  }
  const graph = new Map([["a",["b","c"]],["b",["a","d"]],["c",["d"]],["x",[]]]);
  assert.deepEqual(breadthFirst(graph,"a"), ["a","b","c","d"]);
});
test("stream pipeline propagates transform failure", async () => {
  assert.equal(await uppercaseAscii(["hello", " world"]), "HELLO WORLD");
  await assert.rejects(uppercaseAscii(["hello"], { fail: true }), /Transform failed/);
});
