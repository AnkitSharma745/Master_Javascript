# Practice hints and reference solutions

Open only after an independent attempt. A design prompt can have several valid solutions; compare constraints and evidence rather than trying to copy one universal architecture. Each lesson section below supplies a model result or approach, and points to the relevant reference implementation where one exists.

## Coding problems P01–P06

P01–P04 reference implementations: [algorithms.mjs](../labs/algorithms.mjs). P05–P06: [async-tools.mjs](../labs/async-tools.mjs). Their contracts and limitations are documented in [labs](../labs/README.md); [tests](../tests/learning.test.mjs) show boundary evidence.

P01 expects [0,1] for [3,3] and target 6, but null for [3] and target 6. P02 returns 2 for abba and for 😀a😀. P03 returns 1 for [1,2,2,4] with target 2, 4 for target 5, and 0 for an empty list. P04 visits only the reachable component and enqueues each identity once. P05 preserves index order despite reversed completion and does not start more work after a known error. P06 must prevent stale repopulation after invalidation, preserve cached zero, remove failed work, and retain bounded state.

## Debugging models D01–D05

D01: return/adopt save's promise (AS02). D02: check membership rather than truthiness (FP01/PE02). D03: authorize server identity/resource/tenant independently (PE01). D04: replace changed input identity or use intentional marking/state flow (AG01). D05: choose an interval invariant and updates that always shrink it (AL02).

## F01

Hint: initialize the accumulator and define accepted numeric inputs first. A grade function should reject non-finite/out-of-range scores, then compare descending thresholds (90, 80, 70, 60). 85 returns B and 42 returns F. Use the F01 sum as a reference only after your independent attempt; empty input returns zero and unsafe accumulation throws.

Compare with [the lesson](../lessons/01-foundations/F01-programs.md) and [Q01](../interviews/answers.md#q01). Retest a changed input after a delay and record actual evidence.

## F02

Hint: use native controls before custom keyboard handlers. A delegated listener should check an Element target, find closest matching button, confirm container.contains(button), and remove the owned row. Create user strings with textContent. Test nested button content, keyboard activation, focus after removal, and listener teardown; visual/assistive-technology behavior requires real browser evidence.

Compare with [the lesson](../lessons/01-foundations/F02-browser.md) and [Q02](../interviews/answers.md#q02). Retest a changed input after a delay and record actual evidence.

## F03

Hint: separate failure layers. A fulfilled 404 is an HTTP error; malformed JSON is a parsing error; an array with invalid rows is a schema failure. A theme can use non-secret local storage, large offline drafts can use IndexedDB with quota/conflict policy, and a cookie session needs server validation and CSRF design. Choose from the deployment threat model.

Compare with [the lesson](../lessons/01-foundations/F03-http.md) and [Q03](../interviews/answers.md#q03). Retest a changed input after a delay and record actual evidence.

## JS01

null == 0 is false; [] == false is true; NaN === NaN is false; Object.is(-0,0) is false. Loose equality is not a universal numeric conversion. The copied object reference permits shared mutation; assigning the parameter a new object changes only that parameter. Replace limit || default with limit ?? default when zero is legitimate.

Compare with [the lesson](../lessons/02-javascript/JS01-values.md) and [Q04](../interviews/answers.md#q04). Retest a changed input after a delay and record actual evidence.

## JS02

The var callbacks read 3,3,3 after the loop because there is one shared binding. let produces per-iteration bindings and 0,1,2. Two createCounter calls own separate environments. A retained global listener can keep its closure and data alive after a node is removed; unsubscribe/abort the listener and release unused ownership rather than assuming removal forces collection.

Compare with [the lesson](../lessons/02-javascript/JS02-scope.md) and [Q05](../interviews/answers.md#q05). Retest a changed input after a delay and record actual evidence.

## JS03

Bind a method once and store that callback, or expose an arrow callback field that closes over the instance. Keep its identity for removal. Ordinary object-literal arrows capture surrounding this rather than the object. call cannot replace the receiver of an ordinary bound call. A prototype method is shared; arrow fields allocate per instance.

Compare with [the lesson](../lessons/02-javascript/JS03-this.md) and [Q06](../interviews/answers.md#q06). Retest a changed input after a delay and record actual evidence.

## JS04

defineProperty with value and enumerable:false creates a non-enumerable own ID; unspecified writable/configurable flags are false. Strict mutation throws TypeError. Removing an own shadow can reveal inherited state. Freeze is shallow: nested references still mutate. A detached-node leak must be investigated through its retaining path, not by counting removed elements.

Compare with [the lesson](../lessons/02-javascript/JS04-objects.md) and [Q07](../interviews/answers.md#q07). Retest a changed input after a delay and record actual evidence.

## JS05

Stable primitive deduplication can return [...new Set(values)]. Group with Map keys chosen from the domain, appending to each owned group. Different object identities do not deduplicate structurally. Numeric sorting needs a comparator; sort mutates while toSorted copies. A hole is absent, not an explicit undefined index. String length counts UTF-16 units.

Compare with [the lesson](../lessons/02-javascript/JS05-collections.md) and [Q08](../interviews/answers.md#q08). Retest a changed input after a delay and record actual evidence.

## JS06

A range generator loops from start while value < end and yields each value. next starts/resumes the body; break can trigger finally via iterator.return. For ESM use actual separate .mjs files and resolvable extensions. Re-throw a failure after logging if the caller must still observe it; avoid return from finally because it overrides a prior result.

Compare with [the lesson](../lessons/02-javascript/JS06-modules.md) and [Q09](../interviews/answers.md#q09). Retest a changed input after a delay and record actual evidence.

## AS01

The root lab prints sync -> executor -> end -> then -> microtask -> timer. Explain immediate execution and queue insertion, not elapsed milliseconds. A reaction adding another reaction can place it after already-queued microtasks. An async CPU loop still blocks its agent; use measured splitting or worker computation as appropriate. Node ordering questions need context.

Compare with [the lesson](../lessons/03-async/AS01-event-loop.md) and [Q10](../interviews/answers.md#q10). Retest a changed input after a delay and record actual evidence.

## AS02

Return save(data) from the chain so later work adopts it. catch returning 4 fulfills a next link with 4; catch throwing preserves rejection. allSettled reports per-input status; all rejects on a rejection while other work continues. Empty all/allSettled fulfill with []; empty race remains pending; empty any rejects. Attach error ownership promptly to concurrently started work.

Compare with [the lesson](../lessons/03-async/AS02-promises.md) and [Q11](../interviews/answers.md#q11). Retest a changed input after a delay and record actual evidence.

## AS03

Hint: a worker claims an index before awaiting it, then claims the next only when done. Preserve output by index. The reference mapLimit stops new starts after known failure and drains active calls; a non-cooperating call cannot be force-cancelled. Generation ownership guards both successful and failed UI commitments. See the deferred-promise tests for a distinguishing race.

Compare with [the lesson](../lessons/03-async/AS03-concurrency.md) and [Q12](../interviews/answers.md#q12). Retest a changed input after a delay and record actual evidence.

## FP01

Calculate subtotal as a pure function over validated cents, then inject the tax policy and perform sending outside it. Use Map.has for cached zero/undefined. A cache key must include every relevant semantic input. Compare a pipeline's intermediate allocations with a loop only after measuring. Deep recursion can overflow; an explicit stack may meet the same contract.

Compare with [the lesson](../lessons/04-functional/FP01-functions.md) and [Q13](../interviews/answers.md#q13). Retest a changed input after a delay and record actual evidence.

## TS01

parseIssues first checks Array.isArray then parses every row from unknown. A malformed row should fail the chosen whole-list contract; a partial-import contract would instead report per-row results explicitly. A discriminated union prevents a success shape without data in checked code. An assertion on JSON supplies no runtime checks; see contracts.ts and its malformed-payload tests.

Compare with [the lesson](../lessons/05-typescript/TS01-contracts.md) and [Q14](../interviews/answers.md#q14). Retest a changed input after a delay and record actual evidence.

## TS02

pluck<T,K extends keyof T>(rows: readonly T[], key: K): T[K][] returns rows.map(row => row[key]). Define a patch as Partial<Pick<Issue,'title'|'status'>> so id is excluded. A naked conditional type parameter distributes over unions; tuple wrapping changes that. A default type argument cannot supply a missing function argument.

Compare with [the lesson](../lessons/05-typescript/TS02-generics.md) and [Q15](../interviews/answers.md#q15). Retest a changed input after a delay and record actual evidence.

## TS03

Root .ts emits CommonJS because its NodeNext project sits in a package without type:module. .mjs is explicitly ESM. Source maps describe source positions; declarations describe types and supply no runtime implementation. TS paths alone does not make Node resolve an alias. Run project-local compilers and keep Angular's 5.1.6 configuration separate.

Compare with [the lesson](../lessons/05-typescript/TS03-configuration.md) and [Q16](../interviews/answers.md#q16). Retest a changed input after a delay and record actual evidence.

## SD01

Separate pure invoice policy from delivery, inject delivery at the composition root, and split Reader from Writer where capabilities differ. A current account's permitted minimum balance must be respected by the base withdrawal operation too. Test valid caller behavior rather than merely class inheritance. One small stable conditional can be preferable to a strategy layer.

Compare with [the lesson](../lessons/06-design/SD01-solid.md) and [Q17](../interviews/answers.md#q17). Retest a changed input after a delay and record actual evidence.

## DP01

The JS strategy can be a function parameter; the TS contract can be type Pricing = (kg:number)=>number. An adapter maps full_name to name. An observer must define registration identity, unsubscribe, notification errors, and lifecycle. A proxy cache does not secure a server. Use the compiled design lab as a reference and reject patterns without a variation problem.

Compare with [the lesson](../lessons/07-patterns/DP01-selection.md) and [Q18](../interviews/answers.md#q18). Retest a changed input after a delay and record actual evidence.

## AG01

Update the changed nested path with new object identities rather than mutating an input silently. OnPush still reacts to relevant events and observable marking. A root service lives in an application injector; component providers live with instances; lazy providers may differ. Initial ngOnChanges precedes ngOnInit. Server permissions must remain independent of route UX.

Compare with [the lesson](../lessons/08-angular/AG01-architecture.md) and [Q19](../interviews/answers.md#q19). Retest a changed input after a delay and record actual evidence.

## AG02

Search uses latest debounced read intent; concurrent independent uploads fit mergeMap; ordered writes fit concatMap if queue growth is controlled; repeated submits may fit exhaustMap if dropping intent is acceptable. Put recoverable request errors inside the inner workflow to keep future terms alive. unsubscribe is producer-specific teardown, not rollback. Inspect virtual-time subscriptions.

Compare with [the lesson](../lessons/08-angular/AG02-rxjs.md) and [Q20](../interviews/answers.md#q20). Retest a changed input after a delay and record actual evidence.

## AG03

Trim and reject blank domain text independently of required validation. A nonNullable control resets to its configured initial value. Parse HttpClient unknown results and map server field failures to controls without deleting the draft. Start feature-local state; introduce NgRx when sharing/workflow needs justify actions/reducers/selectors/effects. Compiler checks do not replace component/browser integration tests.

Compare with [the lesson](../lessons/08-angular/AG03-forms-http.md) and [Q21](../interviews/answers.md#q21). Retest a changed input after a delay and record actual evidence.

## FE01

For a million-row table, prefer server filters and stable page/cursor contracts. Include a deterministic tie-breaker in cursor ordering and scope query results by verified tenant permission. Cache invalidation follows writes and scope changes. Offline editing requires a queued intent/conflict policy, not only local persistence. An ADR against micro-frontends can cite small-team ownership and deployment-coordination costs.

Compare with [the lesson](../lessons/09-frontend/FE01-system-design.md) and [Q22](../interviews/answers.md#q22). Retest a changed input after a delay and record actual evidence.

## ND01

Use pipeline and await/catch its outcome; a transform callback error propagates through the pipeline. Streaming text decoding must handle characters split across chunks. EventEmitter invokes listeners synchronously and does not inherently await async returns. On shutdown stop intake, drain within a deadline, close dependencies, and force remaining work according to the stated policy.

Compare with [the lesson](../lessons/10-node/ND01-runtime.md) and [Q23](../interviews/answers.md#q23). Retest a changed input after a delay and record actual evidence.

## ND02

An optimistic SQL update can include id, authorized tenant, and expected version in its WHERE condition while incrementing version. Zero matched rows needs a deliberate absent/conflict/permission policy. A transaction can couple domain writes and an outbox record. Do not describe an in-memory sequence as a database transaction or a key Map as multi-process idempotency.

Compare with [the lesson](../lessons/10-node/ND02-api-data.md) and [Q24](../interviews/answers.md#q24). Retest a changed input after a delay and record actual evidence.

## PE01

Identity comes from validated server session/token claims; tenant/resource permission is checked at the operation. Hidden UI and CORS do not authorize it. Test a verified user attempting another tenant's ID, expired identity, forbidden operation, and malicious rendered text. Keep secret/body data out of logs. Explain cookie/CSRF and token/XSS choices from a threat model.

Compare with [the lesson](../lessons/11-production/PE01-security.md) and [Q25](../interviews/answers.md#q25). Retest a changed input after a delay and record actual evidence.

## PE02

On completion compare the exact current in-flight promise or a generation before storing. invalidation removes ownership but old callers still receive their original outcome unless another cancellation policy exists. Keep active count separate from key membership so clear cannot bypass capacity. Test expiry with an injected clock; retry only classified safe failures within a budget.

Compare with [the lesson](../lessons/11-production/PE02-reliability.md) and [Q26](../interviews/answers.md#q26). Retest a changed input after a delay and record actual evidence.

## AL01

A scan is O(n); n times a fixed five is O(n); an interval halved repeatedly is O(log n). Initialize maximum from the first value or define an empty result, not zero for all-negative input. Count output space separately from auxiliary state. State expected hashing and engine-sort assumptions rather than universal complexity guarantees.

Compare with [the lesson](../lessons/12-algorithms/AL01-complexity.md) and [Q27](../interviews/answers.md#q27). Retest a changed input after a delay and record actual evidence.

## AL02

Check complement before inserting the current index. In the unique window, left = max(left, lastSeen+1) prevents abba from moving backward. lowerBound uses a half-open interval and left = middle+1 or right = middle, so it shrinks. BFS marks on enqueue, handles cycles, and finds unweighted shortest edge count with distance tracking; weights require another algorithm.

Compare with [the lesson](../lessons/12-algorithms/AL02-patterns.md) and [Q28](../interviews/answers.md#q28). Retest a changed input after a delay and record actual evidence.

## IV01

A strong uncertain answer names the known contract, identifies the missing runtime/version assumption, and proposes a small verified experiment. Preserve your attempt before AI review; test counterexamples, check installed/official APIs, and explain the final choice unaided. Behavioral answers should state personal actions and actual evidence without invented metrics.

Compare with [the lesson](../lessons/13-communication/IV01-communication.md) and [Q29](../interviews/answers.md#q29). Retest a changed input after a delay and record actual evidence.


