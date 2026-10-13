# AS02 — Promises, async/await, and error propagation

## Learning objective

Compose asynchronous work and explain rejection and combinator behavior. Use the root runtime/compiler unless a framework-specific example says otherwise.

## Prerequisites

[AS01](../../lessons/03-async/AS01-event-loop.md), [JS06](../../lessons/02-javascript/JS06-modules.md)

## Explanation and mechanism

A promise represents eventual completion. Pending, fulfilled, and rejected are its states; settled means fulfilled or rejected. Resolving with another promise can adopt its eventual state, so “resolved” does not always mean “already fulfilled.”

then returns a new promise. Returning a value fulfills the next link; returning a promise makes it adopt that result; throwing rejects it. A catch can recover by returning a value, or propagate by throwing. Forgetting to return async work detaches it from the chain.

async functions always return promises. Code before the first await runs synchronously. await suspends that function and arranges continuation, without blocking the whole JavaScript agent.

## Examples and execution trace

```javascript
async function transform() {
  const value = await Promise.resolve(2);
  return value * 3;
}
transform().then(console.log); // 6, asynchronously

Promise.resolve(1)
  .then(() => { throw new Error("bad"); })
  .catch(() => 4)
  .then(value => console.log(value + 1)); // 5
```

The first chain adopts the awaited value then resolves to 6. In the second, the throw rejects a new promise, catch returns 4 and recovers, and the next reaction sees 4 rather than an error.

Incorrect and corrected:
```javascript
// Incorrect: next reaction does not wait for save.
load().then(data => { save(data); }).then(showSuccess);
// Correct: callers observe save rejection and completion.
load().then(data => save(data)).then(showSuccess).catch(showFailure);
```

These names are illustrative collaborators, not runnable standalone snippets.

## Combinators and work ownership

| Method | Result | Failure behavior |
| --- | --- | --- |
| all | Values in input order | Rejects on a rejection; other work continues |
| allSettled | Outcome for every input | Waits for all; inspect each status |
| race | First settled result | May settle successfully or reject |
| any | First fulfillment | Rejects with AggregateError if all reject |

Calling an async function usually starts its work; Promise.all combines outcomes of already-created inputs. It is not a worker pool, a cancellation primitive, or a guarantee of CPU parallelism. Empty all fulfills with []; empty allSettled fulfills with []; empty race stays pending; empty any rejects.

## Alternatives and common mistakes

Sequential await is necessary for a dependency or order requirement; concurrent launch is useful for independent work, with bounded concurrency where needed. Promise.all may waste work after early failure; cancellation must be provided by the operations.

An outer try/catch cannot catch a later callback throw. Convert callback APIs to promises with an explicit error contract or handle errors inside the callback. finally is for cleanup: a rejection or throw from finally can replace the previous result. A floating rejected promise can become an unhandled rejection; handle it where ownership resides.

## Interview preparation

“A chain propagates returned values, adopted promises, and thrown errors. async/await is syntax for promise-based control flow. I choose sequential or concurrent execution from dependencies, and combinators from required outcome semantics.” Follow-up: will catch always leave a promise rejected? Explain recovery.

## Practice

Repair the detached save chain. Write one program distinguishing all from allSettled with a rejected input. Explain empty race without waiting forever in a test. Design error handling for two independently started promises so rejection is observed promptly.

## Revision

Return connects; throw rejects; catch may recover; all preserves order, not cancellation.

## Completion criteria

Implement a two-stage workflow with a failed second stage, test rejection propagation, and explain each combinator including empty inputs.

[Hints and solutions](../../practice/solutions.md#as02) · [Question Q11](../../interviews/answers.md#q11)

## References

[Primary sources and version notes](../../references/README.md#promise); verified 2026-10-13.

