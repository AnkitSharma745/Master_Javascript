# Independent coding practice

Use a 25-minute attempt before opening [solutions](solutions.md). State the contract, derive an invariant, implement, test, and explain complexity. Save your first attempt. Run reference tests only after you have your own edge cases.

| ID | Prerequisites | Prompt | Required edge cases |
| --- | --- | --- | --- |
| P01 | JS05, AL01 | Return two different indices whose finite numeric values sum to target, or null | Empty, one item, duplicates, negatives; do not pair an item with itself |
| P02 | JS05, AL01 | Longest substring without repeated Unicode code points, returning length | Empty, abba, repeated emoji; explain code points versus graphemes |
| P03 | AL01 | First index whose sorted value is at least target, possibly length | Empty, duplicate target, below minimum, above maximum |
| P04 | JS06, AL01 | BFS over Map-based adjacency from start | Cycle, duplicate edges, disconnected component, leaf with absent adjacency |
| P05 | AS02, AS03 | Ordered results with at most k active async operations | Invalid k, empty input, out-of-order completion, failed active task, cancellation |
| P06 | FP01, AS03 | Bounded TTL cache with in-flight deduplication | Cached zero/undefined, failure then retry, expiry, capacity, invalidation during work |

Reference implementations live in [algorithms](../labs/algorithms.mjs) and [async tools](../labs/async-tools.mjs). Tests are in [learning.test.mjs](../tests/learning.test.mjs). These are six deliberately different patterns rather than a collection of repeated puzzles.

## Debugging exercises

D01: a map callback starts save but doesn't return it; success appears early. D02: a cache uses if(cache[key]) and recomputes zero. D03: a guard hides a route but the API accepts another tenant's ID. D04: an OnPush child receives an identity-preserving mutation. D05: a binary search sets left = middle and never terminates for two candidates. Explain the failure, add a distinguishing test, and fix the contract.

## Progression and assessment

First use tiny examples and a brute-force oracle. Next add a counterexample. Then solve a changed constraint without looking: weighted graph instead of unweighted, negative numbers in a sum window, or shared cancellation in a cache. Advanced variants that require new algorithms may remain beyond this release; identify the missing prerequisite rather than bluff a solution.

For every substantial lesson use its own practice section and completion criteria. Open [system-design cases](system-design.md) for architectural exercises and [cumulative assessments](../revision/assessments.md) for mixed practice.
