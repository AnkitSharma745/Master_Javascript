import test from "node:test";
import assert from "node:assert/strict";
import { TestScheduler } from "rxjs/testing";
import { switchMap, mergeMap, concatMap, exhaustMap } from "rxjs";
import { buildSearch } from "../dist/projects/angular16-feature/src/search.js";

test("search cancels prior subscription and keeps latest result", () => {
  const scheduler = new TestScheduler((actual,expected) => assert.deepEqual(actual,expected));
  scheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
    // Resolve the old request after replacement, avoiding an ambiguous same-frame tie.
    const a = cold("-----r|", { r: [{ id:"a", title:"Old", status:"open" }] });
    const b = cold("--r|", { r: [{ id:"b", title:"New", status:"open" }] });
    const result = buildSearch(cold("a---b-----|"), term => term === "a" ? a : b, 0);
    expectObservable(result).toBe("l---l-r---|", {
      l:{ kind:"loading" }, r:{ kind:"success", rows:[{ id:"b", title:"New", status:"open" }] }
    });
    expectSubscriptions(a.subscriptions).toBe("^---!");
    expectSubscriptions(b.subscriptions).toBe("----^--!");
  });
});
test("inner errors recover without disabling later search", () => {
  const scheduler = new TestScheduler((actual,expected) => assert.deepEqual(actual,expected));
  scheduler.run(({ cold, expectObservable }) => {
    const result = buildSearch(cold("a---b----|"), term => term === "a" ? cold("-#") : cold("-r|", { r:[] }), 0);
    expectObservable(result).toBe("le--lr---|", {
      l:{ kind:"loading" }, e:{ kind:"error", message:"Search failed; try again" }, r:{ kind:"success", rows:[] }
    });
  });
});
test("replace, overlap, queue, and ignore have distinct virtual-time results", () => {
  for (const [operator,expected] of [[switchMap,"---y---|"],[mergeMap,"---yx--|"],
    [concatMap,"----x-y|"],[exhaustMap,"----x--|"]]) {
    const scheduler = new TestScheduler((actual,wanted) => assert.deepEqual(actual,wanted));
    scheduler.run(({ cold, expectObservable }) => {
      const source = cold("a-b----|");
      const result = source.pipe(operator(value => value === "a" ? cold("----x|") : cold("-y|")));
      expectObservable(result).toBe(expected);
    });
  }
});
