# Interview answers and follow-ups

Start with the concise answer, then expand only where the interviewer needs it. Use definition → mechanism → example → trade-off → evidence, adapted to the question. Score each answer 0–3: 0 incorrect/absent; 1 prompted recognition; 2 independent correct explanation and example; 3 handles an unfamiliar failure or trade-off. The per-question checklist identifies required evidence. Do not average away a missing security or correctness boundary.

## Q01

**Question:** How would you define and test an integer price sum?

**Testing:** Input contracts and invariants. **Prerequisites:** [F01](../lessons/01-foundations/F01-programs.md). **Difficulty/type:** fundamental, coding.

**Concise spoken answer:** Validate finite safe integer cents, maintain the processed-prefix sum, and define empty input as zero.

**Deeper mechanism:** Each accepted price extends the prefix invariant; overflow is a separate range failure. Validation adds constant work per item, preserving linear time and constant auxiliary space.

**Demonstration:** Implement F01's sum independently, then run empty/negative/overflow cases.

**Incorrect answer to avoid:** Initialize without a contract; assume every numeric-looking string is valid.

**Scenario:** An import includes an empty list, a negative amount, and a string price.

**Follow-ups:** Would you skip invalid rows or reject the import? Who decides?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Contract; invariant; range failure. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q02

**Question:** A clickable div works with a mouse; is the feature complete?

**Testing:** Accessible browser interaction. **Prerequisites:** [F02](../lessons/01-foundations/F02-browser.md). **Difficulty/type:** intermediate, debugging.

**Concise spoken answer:** Use a semantic button and test keyboard, focus, labels, and status feedback.

**Deeper mechanism:** DOM state is separate from painted pixels. A custom control requires recreating default keyboard/role behavior; ARIA does not install it. User strings need safe text rendering.

**Demonstration:** Implement a labeled button with delegated removal and inspect focus behavior.

**Incorrect answer to avoid:** Adding aria-label alone makes any interaction accessible.

**Scenario:** A dynamically added remove control must work by keyboard.

**Follow-ups:** When would preventDefault differ from stopPropagation?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Semantics; propagation distinction; safe rendering. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q03

**Question:** fetch fulfilled with a 404. What went wrong?

**Testing:** Layered network failure and trust boundaries. **Prerequisites:** [F03](../lessons/01-foundations/F03-http.md). **Difficulty/type:** intermediate, scenario.

**Concise spoken answer:** fetch fulfillment can contain an HTTP failure; check response.ok, parse the expected representation, and validate it.

**Deeper mechanism:** Transport, HTTP status, JSON parsing, schema validation, and business rules are different failure layers. Browser CORS rules and server authorization serve different purposes.

**Demonstration:** Trace F03's request diagram and compare network failure with 404.

**Incorrect answer to avoid:** fetch rejects for every 4xx; CORS authenticates callers.

**Scenario:** A frontend retries every fulfilled response as though it succeeded.

**Follow-ups:** What does no-cache mean? Where would you store a theme versus a session?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Status check; parsing boundary; browser/server distinction. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q04

**Question:** Does reassigning an object parameter change the caller's binding?

**Testing:** Value copying and object identity. **Prerequisites:** [JS01](../lessons/02-javascript/JS01-values.md). **Difficulty/type:** fundamental, output.

**Concise spoken answer:** No. The copied reference can mutate the same object, but reassigning the local parameter changes only that binding.

**Deeper mechanism:** Trace two bindings pointing to one object. Property mutation is shared; rebinding points one binding elsewhere. Strict equality compares object identity rather than contents.

**Demonstration:** Predict and trace JS01's change function before executing it.

**Incorrect answer to avoid:** Objects are passed by reference and every reassignment propagates.

**Scenario:** A helper mutates count then assigns its parameter a new object.

**Follow-ups:** Why is Number([]) zero while Boolean([]) is true?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Alias trace; mutation/rebinding; operation-specific coercion. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q05

**Question:** Why do callbacks in a var loop all read the final index?

**Testing:** Closures over lexical bindings. **Prerequisites:** [JS02](../lessons/02-javascript/JS02-scope.md). **Difficulty/type:** intermediate, output.

**Concise spoken answer:** They share one binding, read when invoked after the loop. let creates per-iteration bindings for this loop.

**Deeper mechanism:** Closures resolve bindings through the environment created at definition time; they do not snapshot values. TDZ concerns created but uninitialized lexical bindings.

**Demonstration:** Draw both environment structures from JS02 and test separate counters.

**Incorrect answer to avoid:** A closure copies the initial value; JavaScript physically moves declarations.

**Scenario:** Deferred callbacks display the same row index.

**Follow-ups:** Can typeof throw? When does captured data become collectible?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Shared binding; per-iteration fix; TDZ. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q06

**Question:** A detached class method fails. How do you derive this?

**Testing:** Call-site and lexical receiver behavior. **Prerequisites:** [JS03](../lessons/02-javascript/JS03-this.md). **Difficulty/type:** intermediate, debugging.

**Concise spoken answer:** Ordinary methods derive this from the call. Bind once or use a suitable arrow callback.

**Deeper mechanism:** The function value is not permanently attached to its owner. Class methods are strict; an arrow field captures lexical this and allocates per instance. Keep callback identity for teardown.

**Demonstration:** Repair the detached call in JS03 using bind and an arrow.

**Incorrect answer to avoid:** The method name permanently remembers its instance.

**Scenario:** A callback passed to another library reads undefined state.

**Follow-ups:** Can call replace a bound receiver? What changes with new?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Call site; binding choice; teardown identity. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q07

**Question:** Does spreading a frozen object preserve its full behavior?

**Testing:** Descriptors, copying, and reachability. **Prerequisites:** [JS04](../lessons/02-javascript/JS04-objects.md). **Difficulty/type:** advanced, trade-off.

**Concise spoken answer:** No. Spread reads enumerable own values; it does not copy all descriptors/prototype behavior, and freezing is shallow.

**Deeper mechanism:** A getter can run while spread reads it. Symbols can be enumerable yet omitted by Object.keys. Reachability controls retained data; scope exit does not force collection.

**Demonstration:** Inspect descriptors and prototype lookup using JS04.

**Incorrect answer to avoid:** Spread is deep clone; freeze makes all nested state immutable.

**Scenario:** A cloned domain instance loses methods and shares nested state.

**Follow-ups:** How would you copy descriptors? Why use Map for untrusted keys?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Copy semantics; shallow boundary; reachability. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q08

**Question:** How do a hole and explicit undefined differ in an array?

**Testing:** Collection semantics and assumptions. **Prerequisites:** [JS05](../lessons/02-javascript/JS05-collections.md). **Difficulty/type:** intermediate, output.

**Concise spoken answer:** A hole is an absent index; some methods skip it, while normal indexed reads still yield undefined.

**Deeper mechanism:** Array index/length semantics do not guarantee contiguous memory. map preserves ordinary holes; spread iteration observes undefined. Choose methods by mutation and equality semantics.

**Demonstration:** Run JS05's sparse/default-sort examples after predicting them.

**Incorrect answer to avoid:** All indices below length exist; default sort is numeric.

**Scenario:** An imported sparse list produces unexpected map results.

**Follow-ups:** Why does includes find NaN while indexOf does not?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Absence; mutation; equality. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q09

**Question:** When does a generator execute, and what happens on early exit?

**Testing:** Lazy iteration and cleanup. **Prerequisites:** [JS06](../lessons/02-javascript/JS06-modules.md). **Difficulty/type:** advanced, explanation.

**Concise spoken answer:** The call creates an iterator; next advances execution. Early for-of exit can call return and run generator finally.

**Deeper mechanism:** Iterable and iterator are different contracts. Cleanup belongs to the producer. ESM export bindings are live; module loading is determined by host configuration.

**Demonstration:** Trace JS06's generator and two-file ESM example.

**Incorrect answer to avoid:** Generator body completes at creation; every export is a copied value.

**Scenario:** A lazy reader must release resources when a consumer breaks.

**Follow-ups:** How can finally replace a result? What causes circular-import errors?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Suspension; cleanup contract; module boundary. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q10

**Question:** Explain sync, executor, end, then, microtask, timer in the lab.

**Testing:** Execution versus host scheduling. **Prerequisites:** [AS01](../lessons/03-async/AS01-event-loop.md). **Difficulty/type:** intermediate, output.

**Concise spoken answer:** The executor runs synchronously; registered reactions and microtasks run after current work; this timer runs after them.

**Deeper mechanism:** State the Node runtime and context. Do not generalize this trace to universal nextTick/setImmediate ordering or guaranteed browser paint. A microtask can enqueue more work and starve other opportunities.

**Demonstration:** Run npm run lab and reconstruct queues.

**Incorrect answer to avoid:** async means CPU work runs on another thread.

**Scenario:** An async function performs heavy CPU work and freezes a screen.

**Follow-ups:** Can a zero-delay timer interrupt a loop? What runtime details change ordering?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Executor timing; checkpoint; host limits. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q11

**Question:** Why did success display before save completed?

**Testing:** Promise chaining and failure ownership. **Prerequisites:** [AS02](../lessons/03-async/AS02-promises.md). **Difficulty/type:** intermediate, debugging.

**Concise spoken answer:** The callback did not return save's promise, so the next link did not adopt its outcome.

**Deeper mechanism:** Returning a value fulfills, returning a promise adopts, and throwing rejects. catch can recover. all aggregates outcomes; it neither creates a pool nor cancels already-active inputs.

**Demonstration:** Repair the AS02 chain and force save to reject.

**Incorrect answer to avoid:** catch always propagates rejection; all cancels every operation.

**Scenario:** A load-then-save workflow reports success after a detached failure.

**Follow-ups:** What do empty all/race/any do? When should awaits be sequential?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Return connection; rejection; combinator limits. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q12

**Question:** How do you keep late search results from overwriting new intent?

**Testing:** Races, cancellation, and bounded work. **Prerequisites:** [AS03](../lessons/03-async/AS03-concurrency.md). **Difficulty/type:** advanced, scenario.

**Concise spoken answer:** Use latest-intent ownership, cancel cooperating transport, and guard state commitment with a generation token.

**Deeper mechanism:** Old success and old error must both be guarded. Abort is cooperative and not rollback. A worker pool bounds active work; time-based rate limiting is separate.

**Demonstration:** Implement a reordered-completion test and mapLimit.

**Incorrect answer to avoid:** One thread cannot race; abort guarantees the server did nothing.

**Scenario:** A finishes after B, but B is the current query.

**Follow-ups:** How does shared in-flight cancellation work? What changes for writes?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Commit ownership; cancellation limit; active-count bound. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q13

**Question:** When is memoization incorrect even if results seem reusable?

**Testing:** Purity and cache contracts. **Prerequisites:** [FP01](../lessons/04-functional/FP01-functions.md). **Difficulty/type:** intermediate, trade-off.

**Concise spoken answer:** When the key omits relevant inputs, state changes, or retention/freshness is uncontrolled.

**Deeper mechanism:** Cache presence must preserve falsy values. Object identity and JSON serialization are not universal semantic keys. Measure hit rate, key cost, size, and invalidation needs before caching.

**Demonstration:** Test a cached zero and a tenant-key collision.

**Incorrect answer to avoid:** Any deterministic-looking function can use a permanent JSON-key cache.

**Scenario:** A tenant-scoped calculation is cached only by record ID.

**Follow-ups:** Is readonly runtime immutability? Can a pure function be a poor cache candidate?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Purity; full key; bounded retention. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q14

**Question:** Will Promise<Issue> validate a JSON response?

**Testing:** Compile-time versus runtime contracts. **Prerequisites:** [TS01](../lessons/05-typescript/TS01-contracts.md). **Difficulty/type:** fundamental, debugging.

**Concise spoken answer:** No. Parse unknown runtime data before returning a domain Issue.

**Deeper mechanism:** Annotations and assertions mostly erase. Narrowing supplies checked operations only when its runtime evidence is correct. Discriminated unions express valid states; a dishonest predicate can still lie.

**Demonstration:** Run parser tests and show a compiling assertion that would fail at runtime.

**Incorrect answer to avoid:** Casting or an HttpClient generic validates server bytes.

**Scenario:** A server returns status: archived to a type expecting open or closed.

**Follow-ups:** When do TS constructs emit runtime code? Can a class implement a type alias?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Unknown boundary; evidence; state model. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q15

**Question:** Write get(object,key) without discarding the result type.

**Testing:** Useful generic relationships. **Prerequisites:** [TS02](../lessons/05-typescript/TS02-generics.md). **Difficulty/type:** advanced, coding.

**Concise spoken answer:** Constrain K to keyof T and return T[K], so the chosen key determines the result type.

**Deeper mechanism:** Generic defaults affect type arguments, not omitted runtime values. Mapped/conditional types transform contracts; distribution over unions may need tuple wrapping to change behavior.

**Demonstration:** Compile valid keys and an @ts-expect-error missing key.

**Incorrect answer to avoid:** Generics create runtime defaults; every union transformation distributes identically.

**Scenario:** A utility loses property types by returning any.

**Follow-ups:** How do satisfies and as const differ from assertions and freezing?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Key relation; inference; negative type evidence. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q16

**Question:** A paths import typechecks but Node cannot load it. Why?

**Testing:** Compiler versus loader configuration. **Prerequisites:** [TS03](../lessons/05-typescript/TS03-configuration.md). **Difficulty/type:** advanced, scenario.

**Concise spoken answer:** paths describes compiler resolution; it does not generally rewrite emitted imports or configure Node's loader.

**Deeper mechanism:** Align module/moduleResolution/package format/import extensions with the host. lib declarations do not install APIs. Angular 16 and the root compiler have different compatibility boundaries.

**Demonstration:** Inspect emitted files and both project configs.

**Incorrect answer to avoid:** target installs polyfills; a .d.ts file supplies implementations.

**Scenario:** A shared config is copied between a bundler app and an ESM server.

**Follow-ups:** How do legacy and standard decorators differ? Does tsc file.ts use your project config?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Host model; declaration boundary; version separation. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q17

**Question:** What makes a subtype violate Liskov substitution?

**Testing:** Behavioral contracts and SOLID judgment. **Prerequisites:** [SD01](../lessons/06-design/SD01-solid.md). **Difficulty/type:** advanced, design.

**Concise spoken answer:** It breaks a guarantee expected by valid callers, even if method names and types look compatible.

**Deeper mechanism:** A read-only subtype throwing on every valid save weakens the base promise. Split capabilities or compose collaborators. DI supplies dependencies; DIP keeps policy from depending on concrete infrastructure.

**Demonstration:** Refactor the bank/reader scenario and describe all five SOLID trade-offs.

**Incorrect answer to avoid:** Any subclass is substitutable if it compiles.

**Scenario:** A current account promises overdraft but delegates to a base rule rejecting negative balance.

**Follow-ups:** Which abstraction might be unnecessary? Show one cost of interface segregation.

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Behavioral contract; capability refactor; DI/DIP distinction. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q18

**Question:** Distinguish adapter, facade, decorator, and proxy for an API client.

**Testing:** Pattern selection from actual pressure. **Prerequisites:** [DP01](../lessons/07-patterns/DP01-selection.md). **Difficulty/type:** intermediate, trade-off.

**Concise spoken answer:** Adapter translates a contract; facade simplifies orchestration; decorator adds behavior; proxy mediates access.

**Deeper mechanism:** All can be small functions. Their error/lifecycle contracts matter more than class count. A cached client is not a server authorization control; singleton scope must be defined.

**Demonstration:** Implement the design lab patterns in JS and TS and compare a simpler version.

**Incorrect answer to avoid:** More patterns guarantee maintainability; middleware is always a decorator.

**Scenario:** A team adds three layers around one stable request.

**Follow-ups:** When should Strategy be just a function? What lifetime does Observer need?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Problem first; pattern distinction; lifecycle/cost. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q19

**Question:** Why is an OnPush view sometimes stale but updates after a click?

**Testing:** Angular rendering and provider ownership. **Prerequisites:** [AG01](../lessons/08-angular/AG01-architecture.md). **Difficulty/type:** advanced, debugging.

**Concise spoken answer:** Identity-preserving mutation may not provide an input change; a relevant event can still make the subtree eligible.

**Deeper mechanism:** OnPush is not inputs-only. Understand AsyncPipe, explicit marking, view events, and provider lifetime. Component and lazy providers can differ from a root instance.

**Demonstration:** Draw AG01's feature/injector diagram and diagnose mutation.

**Incorrect answer to avoid:** OnPush never checks unless input changes; every service is universally singleton.

**Scenario:** A root feature-state service persists data across navigation unexpectedly.

**Follow-ups:** What is the first input/lifecycle sequence? Which APIs are later than Angular 16?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Eligibility; identity; scope. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q20

**Question:** Which flattening operator fits search, uploads, saves, and repeated submits?

**Testing:** RxJS intent semantics and recovery. **Prerequisites:** [AG02](../lessons/08-angular/AG02-rxjs.md). **Difficulty/type:** advanced, scenario.

**Concise spoken answer:** Use replace, overlap, queue, or ignore semantics respectively, with explicit failure and teardown policy.

**Deeper mechanism:** switchMap unsubscribes prior inner observation; it does not undo writes. Inner catchError can keep later outer events useful; outer replacement may complete the workflow. Sharing changes lifetime.

**Demonstration:** Run virtual-time tests for all four operators.

**Incorrect answer to avoid:** Observables are always async; unsubscribe always cancels server work.

**Scenario:** One failed search leaves the screen unresponsive to later terms.

**Follow-ups:** Can concatMap queue unboundedly? What does shareReplay not provide?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Intent semantics; error placement; teardown. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q21

**Question:** How would you build a typed Angular edit form against an untrusted API?

**Testing:** Form/domain/transport boundaries. **Prerequisites:** [AG03](../lessons/08-angular/AG03-forms-http.md). **Difficulty/type:** intermediate, design.

**Concise spoken answer:** Use typed reactive controls, domain validation, runtime response parsing, explicit view states, and server checks.

**Deeper mechanism:** nonNullable reset behavior differs from nullable controls. Client validators provide feedback but cannot enforce permissions. Distinguish drafts from server state, and handle field errors/repeated intent.

**Demonstration:** Compile the feature and specify edit-form acceptance cases.

**Incorrect answer to avoid:** A typed form and HttpClient generic make external data valid.

**Scenario:** Whitespace passes a form's required validator but violates the title rule.

**Follow-ups:** When is NgRx justified? Which tests cover the real adapter boundary?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Form rule; runtime data; state ownership/testing. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q22

**Question:** Design a tenant-aware searchable million-row admin table.

**Testing:** Requirements, state, API, and trade-offs. **Prerequisites:** [FE01](../lessons/09-frontend/FE01-system-design.md). **Difficulty/type:** advanced, architecture.

**Concise spoken answer:** Clarify roles/latency/consistency, use server pagination/filtering, scoped caches, explicit state ownership, and failure UX.

**Deeper mechanism:** Stable cursors need tie-breakers; permissions are server-owned; mutations invalidate relevant state. Virtualization and micro-frontends require constraints that justify their costs. Instrument latency and failure paths.

**Demonstration:** Draw FE01, write an ADR, and compare two pagination strategies.

**Incorrect answer to avoid:** Framework choice alone is architecture; client tenant headers enforce isolation.

**Scenario:** A team proposes loading every row and filtering locally.

**Follow-ups:** How do offline edits or realtime events change consistency?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Constraints; contracts/trust; failure and measure. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q23

**Question:** How can Node handle I/O while one CPU loop blocks requests?

**Testing:** Runtime facilities and backpressure. **Prerequisites:** [ND01](../lessons/10-node/ND01-runtime.md). **Difficulty/type:** intermediate, explanation.

**Concise spoken answer:** The host overlaps I/O; the CPU loop still occupies the executing JavaScript thread.

**Deeper mechanism:** Some work uses OS facilities and some libuv workers. Streams control buffering when stages honor pressure; workers can move measured CPU tasks with overhead. Shutdown needs a drain deadline.

**Demonstration:** Run the stream failure lab and describe a bounded shutdown.

**Incorrect answer to avoid:** Every async function creates a thread; streams use no memory.

**Scenario:** An upload is buffered fully and then processed inside an async handler.

**Follow-ups:** What does write false mean? Are EventEmitter listeners awaited?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Host overlap; pressure; lifecycle. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q24

**Question:** How do you prevent duplicate creation and lost updates?

**Testing:** Idempotency and persistence consistency. **Prerequisites:** [ND02](../lessons/10-node/ND02-api-data.md). **Difficulty/type:** advanced, architecture.

**Concise spoken answer:** Define scoped idempotency records for repeated intent and conditional version checks for updates.

**Deeper mechanism:** Payload/key conflicts must be explicit. In-memory key checking is one-process only. Transactions and constraints enforce durable invariants; connection pooling bounds capacity and requires cleanup.

**Demonstration:** Run duplicate-request tests and design the durable schema/transaction.

**Incorrect answer to avoid:** A timeout proves failure; two sequential in-memory operations are atomic.

**Scenario:** A timeout occurs after a write committed; the client retries.

**Follow-ups:** How do queues and an outbox affect duplication? Cursor versus offset?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Uncertain result; atomic enforcement; explicit scope/window. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q25

**Question:** Why aren't route guards, CORS, and HttpOnly enough to secure a tenant API?

**Testing:** Security boundaries. **Prerequisites:** [PE01](../lessons/11-production/PE01-security.md). **Difficulty/type:** advanced, scenario.

**Concise spoken answer:** They address different concerns; the server must validate identity and authorize the resource operation and tenant.

**Deeper mechanism:** Guards provide UX, CORS controls browser response exposure, and HttpOnly prevents script reads of a cookie. XSS can still act with a session; CSRF and server authorization require dedicated controls.

**Demonstration:** Threat-model the demo and specify an IDOR regression test.

**Incorrect answer to avoid:** Hiding a button or decoding a JWT establishes permission.

**Scenario:** A user changes an issue ID to access another tenant's data.

**Follow-ups:** Where do you validate issuer/audience? What should logs omit?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Boundary separation; tenant authorization; threat/control mapping. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q26

**Question:** An invalidated request finishes and restores stale cached data. How do you fix it?

**Testing:** Cache lifetime and failure-focused tests. **Prerequisites:** [PE02](../lessons/11-production/PE02-reliability.md). **Difficulty/type:** advanced, debugging.

**Concise spoken answer:** Make completion conditional on the current in-flight identity or generation, not just key equality.

**Deeper mechanism:** Separate in-flight deduplication from completed values. Bound active work even after invalidation; TTL does not bound retained keys. Retry budgets and idempotency must match the operation.

**Demonstration:** Run the invalidation and active-bound tests with deferred promises.

**Incorrect answer to avoid:** Clearing the Map guarantees no later repopulation; retries are always harmless.

**Scenario:** Logout clears the cache while a private request is still running.

**Follow-ups:** How should old callers resolve? What metrics would expose cache pressure?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Commit identity; caller ownership; bounded retention/work. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q27

**Question:** How do you justify time and space rather than guess Big O?

**Testing:** Input dimensions and invariants. **Prerequisites:** [AL01](../lessons/12-algorithms/AL01-complexity.md). **Difficulty/type:** fundamental, explanation.

**Concise spoken answer:** Define input dimensions, count repeated work and retained data, and state data-structure assumptions.

**Deeper mechanism:** Two nested loops are not automatically quadratic if one dimension is fixed. Recursion has stack cost; output allocation differs from auxiliary space. Expected hashing differs from a worst-case language guarantee.

**Demonstration:** Analyze the AL01 maximum and a fixed-inner-loop example.

**Incorrect answer to avoid:** Big O is elapsed time; every method call is constant time.

**Scenario:** A queue implemented with repeated shift changes the cost model.

**Follow-ups:** What is sorting's assumption? How would validation affect order?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Dimensions; operation count; space/assumptions. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q28

**Question:** Derive lowerBound and a nonrepeating window from invariants.

**Testing:** Algorithm selection and edge testing. **Prerequisites:** [AL02](../lessons/12-algorithms/AL02-patterns.md). **Difficulty/type:** intermediate, coding.

**Concise spoken answer:** Maintain a shrinking sorted candidate interval and a unique contiguous window whose left boundary never moves backward.

**Deeper mechanism:** Check abba and end-of-array targets. Two sum checks the complement before insertion; BFS marks on enqueue to prevent cycles and uses a head-index queue.

**Demonstration:** Solve P01–P06 and compare small cases with a brute-force oracle.

**Incorrect answer to avoid:** Pattern names establish correctness; BFS solves every weighted shortest path.

**Scenario:** A candidate passes happy paths but fails duplicates or a cycle.

**Follow-ups:** What precondition fails for sum windows with negative inputs?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Invariant; precondition; counterexample. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q29

**Question:** How do you answer accurately when you don't know an API or runtime detail?

**Testing:** Independent reasoning and honest verification. **Prerequisites:** [IV01](../lessons/13-communication/IV01-communication.md). **Difficulty/type:** intermediate, communication.

**Concise spoken answer:** State what you know, isolate the uncertainty, propose an assumption or experiment, and verify against the correct version.

**Deeper mechanism:** Use definition/mechanism/example/trade-off/evidence. For behavioral answers identify personal actions and measured outcomes without invented metrics. AI helps challenge a solution after your own attempt.

**Demonstration:** Record a mock, preserve your attempt, and audit a generated solution.

**Incorrect answer to avoid:** Confident guessing or memorization is safer than exposing uncertainty.

**Scenario:** An assistant invents a newer Angular API for a 16 app.

**Follow-ups:** Which test would falsify your answer? What did you personally measure?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Bounded claim; verification; clear personal evidence. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q30

**Question:** A tenant switch occurs during a shared Angular search. Design the boundary.

**Testing:** Cross-topic RxJS/cache/security reasoning. **Prerequisites:** [AS03](../lessons/03-async/AS03-concurrency.md), [AG02](../lessons/08-angular/AG02-rxjs.md), [PE01](../lessons/11-production/PE01-security.md), [PE02](../lessons/11-production/PE02-reliability.md). **Difficulty/type:** advanced, cross-topic.

**Concise spoken answer:** Cancel or detach old feature intent, change cache scope, and prevent stale completion from repopulating or rendering prior-tenant data.

**Deeper mechanism:** Transport cancellation alone is insufficient. The server derives tenant permission from verified identity; clients may request a tenant context but cannot establish it. Shared requests need caller ownership.

**Demonstration:** Combine AS03, AG02, PE01, and PE02 in a state-flow diagram.

**Incorrect answer to avoid:** A cleared service cache and header establish complete isolation.

**Scenario:** Two views share an in-flight response while one changes tenant.

**Follow-ups:** What happens to the other view? Which result/error commitment is guarded?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Current intent; cache scope; server enforcement. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q31

**Question:** A validated API write times out; a queue consumer later receives it twice.

**Testing:** Cross-topic idempotency, transactions, and observability. **Prerequisites:** [ND02](../lessons/10-node/ND02-api-data.md), [PE02](../lessons/11-production/PE02-reliability.md). **Difficulty/type:** advanced, cross-topic.

**Concise spoken answer:** Treat timeout as uncertain and make the repeated write/consumer effect idempotent using durable, scoped operation identity.

**Deeper mechanism:** Coordinate domain changes with publication via transaction/outbox where needed. Track operation correlation and duplicate outcomes; retries have a time/attempt budget. One-process Maps do not provide this guarantee.

**Demonstration:** Write a state/transaction sketch from ND02 and PE02.

**Incorrect answer to avoid:** Retrying the request guarantees exactly once; a generic repository supplies atomicity.

**Scenario:** An order notification or payment side effect may duplicate.

**Follow-ups:** Which boundary owns the idempotency window? What if payload differs?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Uncertain outcome; durable identity; duplicate-safe effect. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).

## Q32

**Question:** A generated utility compiles but asserts network types and leaks cache memory.

**Testing:** AI review plus TypeScript/runtime/resource contracts. **Prerequisites:** [TS01](../lessons/05-typescript/TS01-contracts.md), [PE02](../lessons/11-production/PE02-reliability.md), [IV01](../lessons/13-communication/IV01-communication.md). **Difficulty/type:** advanced, cross-topic.

**Concise spoken answer:** Replace unchecked boundary assertions with parsing and define full cache keys, capacity, freshness, and invalidation.

**Deeper mechanism:** Compilation is evidence about checked code, not external bytes or retention. Tests should falsify malformed data, cached falsy values, tenant collisions, and high key cardinality.

**Demonstration:** Perform the IV01 review protocol and add independent boundary tests.

**Incorrect answer to avoid:** Compilation and high coverage prove correctness and security.

**Scenario:** A plausible AI-generated implementation passes an implementation-shaped test.

**Follow-ups:** What assumptions did the generated tests repeat? Which API version is real?

**Spoken structure:** Name the tested contract, explain the mechanism, demonstrate it, then address the scenario's failure or trade-off.

**Self-assessment checklist:** Runtime evidence; resource contract; independent verification. Require evidence for each; score using the rubric above and record weaknesses in [revision](../revision/README.md).


