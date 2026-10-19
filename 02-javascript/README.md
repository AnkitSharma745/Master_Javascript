# 02 — JavaScript

JavaScript is the core of this repository. Angular, Node.js and Electron are all JavaScript underneath. This section goes from the basics to how the engine really runs your code: scope, closures, `this`, prototypes, the event loop, promises and memory.

The documents explain *execution behavior*, not just definitions. Most topics include "what does this print?" questions, and every output shown was checked by running the code with Node.js.

**Before this:** [01 — Core CS and Web Fundamentals](../01-cs-and-web-fundamentals/README.md) is helpful but not required.

## Study order

### Part 1 — Language fundamentals

| # | Topic | What you will learn |
| --- | --- | --- |
| 1 | [Basics: variables, types, operators](01-basics-variables-types-operators.md) | `var`/`let`/`const`, primitive types, `typeof`, operators, truthy/falsy, control flow |
| 2 | [Type coercion and equality](02-type-coercion-and-equality.md) | How values convert, `==` vs `===`, `Object.is`, the classic tricky outputs |
| 3 | [Scope, hoisting and TDZ](03-scope-hoisting-and-tdz.md) | Execution context, scope chain, hoisting, the temporal dead zone |
| 4 | [Functions and functional programming](04-functions-and-functional-programming.md) | Function types, arrow functions, higher-order functions, pure functions, currying, composition |
| 5 | [Closures](05-closures.md) | How closures work, the loop problem, private state, memory implications |
| 6 | [`this`, call, apply, bind](06-this-call-apply-bind.md) | The binding rules, losing `this`, arrow functions, explicit binding |

### Part 2 — Objects and data

| # | Topic | What you will learn |
| --- | --- | --- |
| 7 | [Objects and copying](07-objects-and-copying.md) | Properties, descriptors, freeze/seal, shallow vs deep copy, `structuredClone`, JSON |
| 8 | [Prototypes and inheritance](08-prototypes-and-inheritance.md) | The prototype chain, `new`, `__proto__` vs `prototype`, `instanceof` |
| 9 | [Classes](09-classes.md) | Class syntax, private fields, static members, `extends` and `super` |
| 10 | [Arrays and array methods](10-arrays-and-array-methods.md) | All important methods, mutating vs non-mutating, common array tasks |
| 11 | [Strings, numbers and dates](11-strings-numbers-and-dates.md) | String methods, regex basics, floating point, BigInt, dates and time zones |
| 12 | [Map, Set, WeakMap, WeakSet](12-map-set-weakmap-weakset.md) | Keyed collections, weak references, an LRU cache |
| 13 | [Iterators and generators](13-iterators-and-generators.md) | The iteration protocol, generators, async iteration |
| 14 | [Modules: ESM and CommonJS](14-modules-esm-and-commonjs.md) | `import`/`export`, `require`, live bindings, dynamic import, circular dependencies |
| 15 | [Error handling](15-error-handling.md) | Error types, try/catch/finally, custom errors, async errors, global handlers |

### Part 3 — Asynchronous JavaScript

| # | Topic | What you will learn |
| --- | --- | --- |
| 16 | [The event loop](16-event-loop.md) | Call stack, task queue, microtask queue, rendering, many output puzzles |
| 17 | [Callbacks and promises](17-callbacks-and-promises.md) | Promise states, chaining, error flow, `all`/`allSettled`/`race`/`any` |
| 18 | [Async/await](18-async-await.md) | How `await` works, sequential vs parallel, cancellation, race conditions |

### Part 4 — Memory, performance and modern JavaScript

| # | Topic | What you will learn |
| --- | --- | --- |
| 19 | [Memory management and garbage collection](19-memory-management-and-garbage-collection.md) | Reachability, V8's garbage collector, memory leaks and how to find them |
| 20 | [Debounce, throttle and performance](20-debounce-throttle-and-performance.md) | Debounce and throttle implementations, memoization, workers, measuring performance |
| 21 | [Modern JavaScript features](21-modern-javascript-features.md) | What each ECMAScript version added (ES2015–ES2025), Proxy and Reflect |

**Interview practice:** every topic ends with its own interview questions. For mixed questions across the whole subject, see [interview-questions.md](interview-questions.md). For extra practice, see [mixed output questions](../11-coding-interviews/03-javascript-output-questions.md) and [polyfills and implementations](../11-coding-interviews/04-javascript-polyfills-and-implementations.md).

**Next subject:** [03 — TypeScript](../03-typescript/README.md)
