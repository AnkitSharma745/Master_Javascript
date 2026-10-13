# Research and source index

Verified 2026-10-13. Primary technical sources support mechanisms and version boundaries. Employer guides support broad preparation areas; they do not establish topic-frequency statistics or represent every employer. Lesson sequencing and project scope are curriculum judgments.

## How evidence influences priority

Timeless fundamentals: values, scope, contracts, complexity, HTTP, and debugging. Employer-evidenced preparation areas: coding, algorithms, testing, design, and clear reasoning. Current production concerns: supported runtimes, input validation, accessible interaction, bounded resource use, and observability. Monitor emerging features separately from maintenance baselines. Low-priority depth includes type puzzles, micro-frontends without ownership pressure, and specialized patterns without a concrete use case.

Public guides do not provide enough evidence to rank the frequency of closures versus RxJS questions. The selected questions test useful competence; they are not presented as a statistically frequent list. No job-board sample or hiring-trend measurement was performed.

## Version and retrieval limitations

See [version policy](versions.md). The v16.angular.io guide endpoints failed to retrieve during research; version-tagged Angular repository sources were used instead. RxJS's documentation shell did not expose full text; its 7.8.2 implementation and installed declarations/tests supplied the relevant evidence. Living TC39/Node pages may describe features beyond the teaching baseline. External URLs are research references and are not fetched by the offline link checker.

## ECMA

[ECMAScript specification](https://tc39.es/ecma262/multipage/) — Language types, bindings, objects, iteration, and promise semantics; living draft, not proof every feature is shipped. Evidence: specification; checked 2026-10-13.

## CLOSURES

[MDN closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures) — Lexical environments and retained bindings. Evidence: platform documentation; checked 2026-10-13.

## ARRAY

[MDN Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) — Index semantics, holes, and methods; no contiguous-storage guarantee. Evidence: platform documentation; checked 2026-10-13.

## MAP

[MDN Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) — Key identity, SameValueZero, average sublinear access. Evidence: platform documentation; checked 2026-10-13.

## MEMORY

[MDN memory management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management) — Reachability and weak-key lifetime. Evidence: platform documentation; checked 2026-10-13.

## FREEZE

[MDN Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) — Shallow runtime freezing and strict-mode behavior. Evidence: platform documentation; checked 2026-10-13.

## LET

[MDN let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) — Lexical binding initialization and TDZ. Evidence: platform documentation; checked 2026-10-13.

## PROMISE

[MDN Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) — Aggregate result order and rejection; no cancellation of remaining work. Evidence: platform documentation; checked 2026-10-13.

## ABORT

[MDN AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) — Cooperative cancellation signal. Evidence: platform documentation; checked 2026-10-13.

## NODELOOP

[Node event loop guide](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick) — Host phases and the libuv timer change included in Node 20. Evidence: runtime documentation; checked 2026-10-13.

## NODERELEASE

[Node release schedule](https://github.com/nodejs/Release) — Current/LTS/EOL status; recheck before choosing a production runtime. Evidence: runtime policy; checked 2026-10-13.

## NODEHTTP

[Node HTTP API](https://nodejs.org/api/http.html) — HTTP server/timeouts/shutdown; living API docs may show a newer runtime than the lab. Evidence: runtime documentation; checked 2026-10-13.

## STREAM

[Node stream API](https://nodejs.org/api/stream.html) — Writable backpressure and pipeline; only baseline APIs used here. Evidence: runtime documentation; checked 2026-10-13.

## TSNARROW

[TypeScript narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — Control-flow narrowing and discriminated unions. Evidence: compiler documentation; checked 2026-10-13.

## TSGENERICS

[TypeScript generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) — Type relationships, constraints, and generic defaults. Evidence: compiler documentation; checked 2026-10-13.

## TSMODULES

[TypeScript modules reference](https://www.typescriptlang.org/docs/handbook/modules/reference.html) — Host-aligned module resolution and emitted import behavior. Evidence: compiler documentation; checked 2026-10-13.

## TSSATISFIES

[TypeScript 4.9 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html) — satisfies introduction and preservation of inferred information. Evidence: versioned compiler documentation; checked 2026-10-13.

## TSDECORATORS

[TypeScript 5.0 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html) — Standard versus legacy decorator models. Evidence: versioned compiler documentation; checked 2026-10-13.

## ANGULAR16

[Angular 16 announcement](https://blog.angular.dev/angular-v16-is-here-4d7a28ec680d) — Version-specific introduction of preview capabilities. Evidence: versioned framework announcement; checked 2026-10-13.

## ANGULARMATRIX

[Angular compatibility table](https://angular.dev/reference/versions) — Angular 16.2 TypeScript/Node/RxJS historical matrix and unsupported status. Evidence: framework policy; checked 2026-10-13.

## ANGULARLIFECYCLE

[Angular 16.2.12 lifecycle source](https://raw.githubusercontent.com/angular/angular/16.2.12/aio/content/guide/lifecycle-hooks.md) — Versioned component lifecycle explanation. Evidence: versioned framework source; checked 2026-10-13.

## ANGULARONPUSH

[Angular 16.2.12 OnPush source](https://raw.githubusercontent.com/angular/angular/16.2.12/aio/content/guide/change-detection-skipping-subtrees.md) — Inputs, events, and subtree eligibility; avoid claiming only inputs cause checks. Evidence: versioned framework source; checked 2026-10-13.

## ANGULARHYDRATION

[Angular 16.2.12 hydration source](https://raw.githubusercontent.com/angular/angular/16.2.12/aio/content/guide/hydration.md) — Developer-preview status, DOM matching, Zone.js and i18n limitations. Evidence: versioned framework source; checked 2026-10-13.

## ANGULARCLEANUP

[Angular 16.2.12 takeUntilDestroyed source](https://raw.githubusercontent.com/angular/angular/16.2.12/packages/core/rxjs-interop/src/take_until_destroyed.ts) — Injection-context and DestroyRef contract; developer preview in this version. Evidence: versioned framework source; checked 2026-10-13.

## RXJS

[RxJS 7.8.2 switchMap implementation](https://raw.githubusercontent.com/ReactiveX/rxjs/7.8.2/src/internal/operators/switchMap.ts) — Inner unsubscription and latest-observation behavior; checked alongside virtual-time tests. Evidence: versioned library source; checked 2026-10-13.

## HTTP

[MDN HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching) — Freshness/revalidation, private/shared caches, no-cache/no-store. Evidence: platform documentation; checked 2026-10-13.

## OWASP

[OWASP CSRF](https://community.owasp.org/attacks/csrf) — Browser credential use and CSRF boundary; not a complete security checklist. Evidence: security documentation; checked 2026-10-13.

## WAI

[W3C WAI tutorials](https://www.w3.org/WAI/tutorials/) — Semantics, accessible controls, forms, tables, and keyboard interaction. Evidence: platform documentation; checked 2026-10-13.

## AMAZON

[Amazon software-development interview topics](https://amazon.jobs/content/en/how-we-hire/interview-prep/software-development-topics) — Coding, data structures, design, and applied understanding; employer-specific evidence. Evidence: employer guide; checked 2026-10-13.

## MICROSOFT

[Microsoft technical interviewing](https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing) — Problem solving, coding, testing, design, and communication; employer-specific evidence. Evidence: employer guide; checked 2026-10-13.

## RETRIEVAL

[Karpicke and Blunt (2011)](https://pubmed.ncbi.nlm.nih.gov/21252317/) — Retrieval-practice experiment; application to coding study is a curriculum inference. Evidence: primary research; checked 2026-10-13.

## SPACING

[Dunlosky et al. (2013)](https://www.psychologicalscience.org/journals/pspi/1529100612453266/) — Review supporting practice testing/distributed practice; does not prescribe our exact intervals. Evidence: research review; checked 2026-10-13.


