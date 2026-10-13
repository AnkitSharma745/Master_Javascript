# F01 — Programs, control flow, and problem solving

## Learning objective

Decompose a problem, write functions, and test boundary inputs. JavaScript examples assume the root Node runtime unless labeled browser-only.

## Prerequisites

None. Start here.

## Explanation and mechanism

A program turns inputs into outputs through explicit steps. Values are the data; variables bind names to values; expressions produce values; statements control what happens. A function names a computation so you can test and reuse it. HTML describes document structure and CSS describes presentation; JavaScript supplies behavior.

Think of a recipe: inputs, steps, result. The analogy breaks when input is invalid or another process changes shared state. Software must specify these cases rather than assume a cooperative kitchen.

Start problem solving with a contract: accepted inputs, result, failure behavior, and constraints. Write examples before choosing an algorithm. Break the task into transformations with one responsibility each. A loop needs a termination condition and an invariant: a fact that remains true before and after each iteration.

## Examples and execution trace

<!-- runnable:node -->
```javascript
function totalCents(prices) {
  let total = 0;
  for (const price of prices) {
    if (!Number.isSafeInteger(price) || price < 0) {
      throw new TypeError("Expected nonnegative integer cents");
    }
    total += price;
    if (!Number.isSafeInteger(total)) throw new RangeError("Total too large");
  }
  return total;
}
console.log(totalCents([125, 200, 0])); // expect: 325
console.log(totalCents([])); // expect: 0
```

The accumulator begins at zero. After processing each price it equals the sum of prices processed so far. Empty input performs no iterations. Validation rejects negative, fractional, non-finite, and unsafe values. The function assumes its argument is iterable; making the interface array-only would require an additional check.

Use integer cents for this small money exercise; real multi-currency accounting needs explicit currency and rounding rules. The loop makes one pass: time grows with the number of prices; the extra accumulator uses constant space.

## Alternatives and common mistakes

```javascript
// Incorrect for this contract: empty input throws, strings concatenate.
const total = prices => prices.reduce((a, b) => a + b);
```

A reduce with an initial zero can express the sum, but still needs validation. Choose the form that exposes the invariant clearly. Use if/else for ranges; switch for discrete values; avoid nested ternaries when they hide policy. A while loop is appropriate when the number of iterations is unknown, provided each step moves toward termination. for...of reads iterable values; for...in enumerates property names.

## Interview preparation

“I define the input contract and examples first, then choose a simple algorithm with an invariant. I test boundaries and explain how work and memory grow with input size.” Follow-up: does validation change complexity? It adds constant work per item, so the order remains linear.

## Practice

1. Recall: distinguish an expression, assignment, declaration, and function call.
2. Implement a grade classifier with an explicit accepted range and invalid-input behavior.
3. Debug the reduce above for an empty array and a string price.
4. Design: decide whether invalid rows should fail the whole import or produce per-row errors. State who needs the result.

## Revision

Memory cue: contract → examples → invariant → implementation → evidence. Explain why empty input is a design decision, not an afterthought.

## Completion criteria

Without copying, implement and test a bounded integer sum, explain the invariant, and reject at least three invalid inputs. Repeat the explanation after a day.

[Practice hints and solutions](../../practice/solutions.md#f01) · [Question Q01](../../interviews/answers.md#q01)

## References

[Primary sources and verification notes](../../references/README.md#ecma); verified 2026-10-13.

