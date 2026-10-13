# AL01 — Complexity, invariants, and JavaScript pitfalls

## Learning objective

Explain time/space with explicit input assumptions. Examples distinguish implemented labs from design sketches and production extensions.

## Prerequisites

[JS05](../../lessons/02-javascript/JS05-collections.md)

## Explanation and mechanism

Complexity describes how resource use grows with input size, not exact elapsed time. Define n and other dimensions before naming Big O. A loop over n items is often linear; two nested loops are quadratic only when both scale with n. A fixed ten-iteration loop remains constant with respect to n.

An invariant is a fact preserved by each step. It connects the algorithm to its result and reveals edge cases. Explain correctness before optimizing.

## Examples and execution trace

<!-- runnable:node -->
```javascript
function maximum(values) {
  if (values.length === 0) return undefined;
  let best = values[0];
  for (let i = 1; i < values.length; i++) {
    if (values[i] > best) best = values[i];
  }
  return best;
}
console.log(maximum([-5, -2, -8])); // expect: -2
console.log(maximum([])); // expect: undefined
```

After each iteration, best is the maximum of the processed prefix. The empty contract is explicit. Initializing best to zero would fail for all-negative data. Assumption: a dense array of comparable finite numbers; add ingress validation where required.

The function uses O(n) comparisons and O(1) auxiliary space. If it returns a copied array, that output allocation needs a separate accounting. Recursion can add stack space even without an explicit collection.

## JavaScript-specific assumptions

Map/Set lookup is commonly analyzed as expected O(1) under hashing assumptions; the language specifies average sublinear access rather than universal worst-case constant time. Sorting complexity and auxiliary memory depend on the engine algorithm; state a comparison-sort model when discussing O(n log n).

String concatenation cost may depend on representation and later materialization; do not confidently claim every repeated + is constant-time. Array.shift repeatedly moving indices can make a naive queue costly. A head-index queue avoids repeated shifting, but retained processed entries need compaction/lifetime consideration.

Default sort is lexicographic, bitwise operators on Numbers coerce to 32-bit integers, and recursion can overflow the stack. Algorithms over text must define code units, code points, or grapheme clusters. Plain objects have inherited keys; Map or Object.create(null) is safer for general dictionaries.

## Alternatives and common mistakes

A brute-force solution is useful evidence and an oracle for small inputs. Optimize when constraints require it. A hash table may trade time for O(n) extra memory; sorted two-pointer reasoning may require sorting and mutate input unless copied.

Do not memorize a pattern name and force it onto every prompt. Ask about order, duplicates, negative values, input mutation, empty input, and return behavior. Test the smallest counterexample to your invariant.

## Interview preparation

“I define input dimensions, state an invariant, and count repeated operations and retained data. Then I name the data-structure assumptions and show a counterexample test.” Follow-up: is an algorithm still O(n) if it validates each item first?

## Practice

Compare one loop, nested loops over n and a fixed 5, and a loop that halves a range. Diagnose a maximum initialized to zero. Count auxiliary and output space separately for a traversal.

## Revision

Big O ≠ timing; nested ≠ automatically quadratic; output space ≠ auxiliary space; invariant ≠ comment describing syntax.

## Completion criteria

Analyze four unseen snippets with assumptions, implement maximum correctly, and explain a correctness invariant aloud.

[Hints and solutions](../../practice/solutions.md#al01) · [Question Q27](../../interviews/answers.md#q27)

## References

[Primary sources and version notes](../../references/README.md#amazon); verified 2026-10-13.

