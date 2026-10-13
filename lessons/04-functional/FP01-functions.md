# FP01 — Pure functions, composition, and memoization

## Learning objective

Isolate effects and justify functional abstractions and cache contracts. Use the root runtime/compiler unless a framework-specific example says otherwise.

## Prerequisites

[JS02](../../lessons/02-javascript/JS02-scope.md), [JS05](../../lessons/02-javascript/JS05-collections.md)

## Explanation and mechanism

A pure function returns the same result for the same inputs and has no observable side effects. Referential transparency means an expression can be replaced by its value without changing observable behavior. A function reading the clock, logging, or mutating external state is not pure even if it looks short.

Functional design often puts pure transformations at the center and I/O at the boundary. This makes business rules easier to test. It does not require every part of an application to be pure; useful programs must communicate with the world.

Higher-order functions accept or return functions. Currying transforms a multi-argument operation into chained single-argument functions; partial application fixes some arguments. Composition connects compatible functions. These are tools for reuse, not a readability competition.

## Examples and execution trace

<!-- runnable:node -->
```javascript
const pipe = (...steps) => input => steps.reduce((value, step) => step(value), input);
const summarize = pipe(
  rows => rows.filter(row => row.open),
  rows => rows.map(row => row.title.trim()),
  titles => titles.join(", ")
);
console.log(summarize([{ open: true, title: " Login " },
  { open: false, title: "Old" }])); // expect: Login
const multiply = a => b => a * b;
console.log(multiply(3)(4)); // expect: 12
```

filter allocates a selected array; map allocates transformed values; join creates a summary. No source row is changed. This composition is readable because each step has one clear purpose. For a hot path, a single loop may avoid intermediate allocations; measure before changing it.

## Memoization with a contract

Memoization caches a function result for a key. It is correct only if the key describes all relevant inputs and the function's behavior remains valid for reuse. The [cache lab](../../labs/async-tools.mjs) uses Map.has rather than truthiness to recognize cached results. It bounds cache size, gives entries TTLs, deduplicates in-flight work, and does not retain failed work as a successful value.

A key must include tenant/user scope where results depend on them. JSON.stringify is not a universal identity function: undefined, special numbers, ordering, cycles, and BigInt can violate assumptions. A fresh object key is not equal to another object with the same properties. Select a key from the domain contract.

## Alternatives and common mistakes

An “immutable” outer object can still share nested state. TypeScript readonly is compile-time and shallow; Object.freeze is runtime and shallow. Copy only the path that changes, or use an established immutable-data strategy when the model justifies it.

Recursive algorithms need a base case and progress toward it. JavaScript recursion consumes call stack; do not rely on universal tail-call optimization. Iteration is often safer for deep input.

Defensive programming should clarify boundaries, not bury every function in redundant checks. Validate untrusted input at ingress; internal pure functions can operate on a documented domain type.

## Interview preparation

“I keep deterministic transformations separate from effects so I can reason and test locally. I introduce composition or memoization only when the data flow and cache contract stay clear.” Follow-up: when can a pure function still be a bad memoization candidate? Expensive keys, low hit rate, or large retained results.

## Practice

Write a pure invoice subtotal and inject tax policy. Fix a cache that misses zero. Compare a pipeline with a loop for readability, allocations, and complexity. Review a recursive implementation on very deep input.

## Revision

Pure ≠ useful without effects; readonly ≠ frozen; cache key ≠ serialization guess; abstraction ≠ automatic simplification.

## Completion criteria

Refactor one effectful calculation into pure rules and boundary I/O; test deterministic outputs and justify one rejected abstraction.

[Hints and solutions](../../practice/solutions.md#fp01) · [Question Q13](../../interviews/answers.md#q13)

## References

[Primary sources and version notes](../../references/README.md#ecma); verified 2026-10-13.

