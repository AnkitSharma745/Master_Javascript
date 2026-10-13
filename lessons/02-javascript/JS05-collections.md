# JS05 — Arrays, strings, numbers, and keyed collections

## Learning objective

Select collections and handle holes, mutation, and numeric limits. JavaScript examples assume the root Node runtime unless labeled browser-only.

## Prerequisites

[JS01](../../lessons/02-javascript/JS01-values.md), [JS04](../../lessons/02-javascript/JS04-objects.md)

## Explanation and mechanism

JavaScript arrays are specialized objects with index/length behavior, not a specification guarantee of contiguous memory. Engines can optimize dense arrays differently from sparse arrays. A hole is an absent index property, distinct from an explicit undefined element.

Choose transformations by intent: map produces corresponding outputs, filter selects values, reduce accumulates, find locates the first match, and some/every express conditions. sort/reverse/splice mutate; slice and spread create shallow arrays. toSorted/toReversed/toSpliced are modern copying alternatives on the root runtime; older browsers need compatibility review.

## Examples and execution trace

<!-- runnable:node -->
```javascript
const sparse = new Array(2);
const explicit = [undefined, undefined];
console.log(0 in sparse, 0 in explicit); // expect: false true
console.log(sparse.map(() => 1).join(",")); // expect: ,
console.log([...sparse].length); // expect: 2
const scores = [2, 10, 1];
console.log([...scores].sort().join(",")); // expect: 1,10,2
console.log([...scores].sort((a, b) => a - b).join(",")); // expect: 1,2,10
console.log([].every(Boolean), [].some(Boolean)); // expect: true false
console.log([NaN].includes(NaN), [NaN].indexOf(NaN)); // expect: true -1
```

map skips absent indices and preserves holes. Iterating an ordinary hole with spread yields undefined. Default sort compares string representations; numeric sorting requires a comparator. Empty every is true because no item violates the predicate.

## Strings, numbers, dates, and keyed collections

Strings use UTF-16 code units: length/indexing may split a Unicode character. for...of iterates code points, still not necessarily user-perceived grapheme clusters. Use an appropriate segmentation strategy for visible-character operations.

Number uses floating-point semantics: 0.1 + 0.2 is not exactly 0.3. MAX_SAFE_INTEGER bounds exact integer reasoning; BigInt supports arbitrary integer precision but cannot be mixed directly with Number arithmetic. Number.isFinite avoids accepting Infinity/NaN for finite measurements. Date represents an instant; local/UTC methods and date-only parsing have different implications. Keep instants in explicit formats, and define business timezone rules.

Map stores arbitrary keys with identity for objects. Set removes repeated values under SameValueZero. WeakMap/WeakSet are for lifetime-associated weak keys, not enumerable collections or general size-bounded caches. Symbol creates unique keys; descriptions are not identity.

## Alternatives and common mistakes

forEach does not await returned promises. Use a loop for sequential work or map plus an explicit concurrency strategy. A reduce without an initial value throws on an empty array. A queue that repeatedly shifts large arrays can cost substantial index movement; use a head index, occasionally compact, or a dedicated queue.

The specification requires average sublinear Map access, not a universal worst-case O(1) guarantee. For interview analysis, state expected hashing assumptions and include memory proportional to distinct keys.

## Interview preparation

“I choose collection operations by intent and mutation behavior. Arrays have index semantics, while Map handles key lookup. I distinguish holes, undefined, numeric sorting, Unicode units, and finite-number validation because those change correctness.” Follow-up: why can includes find NaN while indexOf cannot?

## Practice

Implement a stable deduplication using Set. Group issues by status with Map. Test empty input, a sparse array, duplicate object references, and emoji text. Explain the mutation difference between sort and toSorted.

## Revision

map ≠ side effects; slice ≠ splice; hole ≠ undefined; code unit ≠ character; identity ≠ content equality.

## Completion criteria

Build a validated transformation pipeline, predict four collection edge cases, and explain complexity with stated data-structure assumptions.

[Practice hints and solutions](../../practice/solutions.md#js05) · [Question Q08](../../interviews/answers.md#q08)

## References

[Primary sources and verification notes](../../references/README.md#array); verified 2026-10-13.

