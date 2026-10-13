# Executable labs

Run `npm ci`, `npm run check`, and `npm run lab` from the root. Implement an independent version before reading the reference implementation.

| File | What it demonstrates | Important assumption |
| --- | --- | --- |
| [execution.mjs](execution.mjs) | Immediate executor, queued reactions, timer trace | Does not compare nextTick/setImmediate across contexts |
| [async-tools.mjs](async-tools.mjs) | Worker limit, bounded cache, in-flight dedup, invalidation, classified retries | Cancellation is cooperative; cache keys supplied by caller; no universal serialization |
| [contracts.ts](contracts.ts) | Parsing from unknown, valid states, useful generics, negative type checks | Title length uses UTF-16 code units; response parser strips extra fields |
| [design.ts](design.ts) | Strategy, adapter, observer ownership | Notifications synchronous and fail-fast; identical callback registrations deduplicate; snapshot notification means additions/removals affect the next publication |
| [algorithms.mjs](algorithms.mjs) | Two sum, unique window, lower bound, BFS | Dense finite numeric inputs; lowerBound sorted; text uses code points; graph identity uses Map keys |
| [streams.mjs](streams.mjs) | Stream composition and error propagation | ASCII-only transformation; collects a small result for demonstration |

mapLimit stops starting new work after a known failure and drains already-active calls; it cannot cancel an operation that ignores its signal. A never-settling active call can therefore prevent completion. The cache bounds completed entries and underlying active loads even when keys are cleared; invalidation prevents old completion from repopulating but does not reject existing callers. Cache keys must include all semantic inputs and scope. retry defaults to **no retry classification** until a caller supplies shouldRetry; only explicitly safe transient failures should be retried.

Use [practice prompts](../practice/README.md), [solutions](../practice/solutions.md), and the project acceptance criteria to make the labs your own. Passing these reference tests is a baseline, not proof against all production failures.
