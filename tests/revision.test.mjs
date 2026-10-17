import test from "node:test";
import assert from "node:assert/strict";
import { reviewRecord, validDate } from "../scripts/revision.mjs";
test("revision uses weakest dimension, delayed evidence, and calendar dates", () => {
  const empty={ id:"F01",stage:0,lastReview:null };
  const first=reviewRecord(empty,[2,2,2,2,2,2,2],"2026-10-13","Independent edge tests");
  assert.equal(first.nextReview,"2026-10-14");
  const later=reviewRecord(first,[2,2,2,2,2,2,2],"2026-10-14","Unseen variant passed");
  assert.equal(later.nextReview,"2026-10-17");
  const weak=reviewRecord(later,[3,3,1,3,3,3,3],"2026-10-17","Implementation still needs prompts");
  assert.equal(weak.stage,0); assert.equal(weak.nextReview,"2026-10-18");
  assert.throws(()=>reviewRecord(first,[2,2,2,2,2,2,2],"2026-10-13","Repeated same day"),/later/);
  assert.equal(validDate("2026-02-30"),false);
  assert.equal(validDate("2026-13-01"),false);
  assert.equal(validDate(undefined),false);
  assert.throws(()=>reviewRecord(empty,[2,2,2],"2026-10-13","Not seven ratings"),TypeError);
});
