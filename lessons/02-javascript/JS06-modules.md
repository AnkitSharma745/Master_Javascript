# JS06 — Iteration, generators, modules, and errors

## Learning objective

Design module contracts and consume iterables with cleanup. JavaScript examples assume the root Node runtime unless labeled browser-only.

## Prerequisites

[JS02](../../lessons/02-javascript/JS02-scope.md), [JS05](../../lessons/02-javascript/JS05-collections.md)

## Explanation and mechanism

An iterable exposes Symbol.iterator; its iterator returns objects with value and done. for...of consumes that protocol. Generators suspend execution at yield and resume when next is called. The generator body starts when iteration starts, not when its function returns an iterator. Iteration can be lazy; building an array eagerly is simpler when data is small and reusable.

A module provides an explicit dependency boundary. ES modules have module scope, strict semantics, and live export bindings. CommonJS exposes module.exports through a host-specific loading model. Browser imports use URLs; Node resolves paths and package rules. “JavaScript file” alone does not determine the module system.

## Examples and execution trace

<!-- runnable:node -->
```javascript
function* range(start, end) {
  for (let value = start; value < end; value++) yield value;
}
const iterator = range(2, 4);
console.log(iterator.next().value); // expect: 2
console.log(iterator.next().value); // expect: 3
console.log(iterator.next().done); // expect: true

function* resource() {
  try { yield "row"; }
  finally { console.log("cleanup"); } // expect: cleanup
}
for (const row of resource()) { break; }
```

Each next advances until a yield or completion. Breaking for...of can call iterator.return, causing generator finally cleanup. A hand-written iterator must define its own resource-release contract; iteration alone does not close arbitrary resources.

ESM illustration, separate files:
```javascript
// counter.mjs
export let count = 0;
export function increment() { count += 1; }
// consumer.mjs
import { count, increment } from "./counter.mjs";
increment();
console.log(count); // 1, live binding
```

Use .mjs explicitly for root JavaScript labs. Root .ts files compile under NodeNext to CommonJS because the root package does not declare type: module. Do not paste module.exports into an ESM file and expect it to work.

## Errors and contracts

Throw Error objects with meaningful context; separate expected validation failures from unexpected defects. A catch that logs and continues may hide failure from callers. finally performs cleanup but returning/throwing from it can replace the prior result or error. Use structured domain results where expected failures are normal; use exceptions where the caller cannot proceed without handling failure.

## Alternatives and common mistakes

Use ES modules instead of IIFEs for new module boundaries, unless classic-script constraints require another approach. Dynamic import is asynchronous and can support on-demand loading; code splitting still depends on a bundler or deployment layout. Circular dependencies can expose uninitialized bindings; remove unnecessary cycles by extracting shared contracts.

Do not expose a mutable collection if callers must not alter it. Offer operations, readonly types, or copies appropriate to the boundary. Avoid serializing an Error blindly and leaking stack traces to API clients.

## Interview preparation

“Iterators define pull-based traversal; generators implement that traversal with suspension. Modules define dependency boundaries, and the runtime configuration determines loading. I make cleanup and error propagation part of the interface.” Follow-up: what executes when a generator is created versus advanced?

## Practice

Implement a lazy range and stop early. Split a utility into two ESM files. Debug an error swallowed by a catch and a result overridden by finally. Explain a circular-import risk.

## Revision

Iterable ≠ iterator; creation ≠ execution; live export ≠ copied snapshot; cleanup ≠ success.

## Completion criteria

Demonstrate lazy traversal, early cleanup, and two-file module loading; explain who owns each error.

[Practice hints and solutions](../../practice/solutions.md#js06) · [Question Q09](../../interviews/answers.md#q09)

## References

[Primary sources and verification notes](../../references/README.md#ecma); verified 2026-10-13.

