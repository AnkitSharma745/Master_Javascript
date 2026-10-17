# Master curriculum

Generated from manifest.json. IDs stay stable. **Ready** means authored learning material is available; it does not mean the learner has mastered it. Planned entries have no empty lesson files.

Follow the available lessons in table order, or use prerequisites to branch after demonstrating mastery. Algorithms can begin after JS05; Angular starts after the language/type/design foundation. For fast role-specific preparation use [interview tracks](../interviews/tracks.md).

## 01. Programming and web foundations

| ID | Lesson / status | Prerequisites | Observable outcome |
| --- | --- | --- | --- |
| F01 | [Programs, control flow, and problem solving](../lessons/01-foundations/F01-programs.md) | None | Decompose a problem, write functions, and test boundary inputs |
| F02 | [Browser rendering, DOM, and accessible events](../lessons/01-foundations/F02-browser.md) | F01 | Trace rendering and implement safe accessible DOM updates |
| F03 | [HTTP, DNS, TLS, APIs, and browser storage](../lessons/01-foundations/F03-http.md) | F02 | Trace a request and distinguish transport, storage, and trust boundaries |
| F04 | HTML/CSS layout and responsive design depth — **planned** | F02 | Independently implement and assess html/css layout and responsive design depth |

## 02. JavaScript language

| ID | Lesson / status | Prerequisites | Observable outcome |
| --- | --- | --- | --- |
| JS01 | [Values, identity, coercion, and equality](../lessons/02-javascript/JS01-values.md) | F01 | Predict conversions and distinguish mutation from rebinding |
| JS02 | [Scope, hoisting, TDZ, and closures](../lessons/02-javascript/JS02-scope.md) | JS01 | Trace lexical bindings and implement a closure without leaks |
| JS03 | [this, call, apply, bind, and classes](../lessons/02-javascript/JS03-this.md) | JS02 | Derive this from a call site and repair detached methods |
| JS04 | [Objects, descriptors, prototypes, and memory](../lessons/02-javascript/JS04-objects.md) | JS03 | Trace prototype lookup and explain shallow copying and reachability |
| JS05 | [Arrays, strings, numbers, and keyed collections](../lessons/02-javascript/JS05-collections.md) | JS01, JS04 | Select collections and handle holes, mutation, and numeric limits |
| JS06 | [Iteration, generators, modules, and errors](../lessons/02-javascript/JS06-modules.md) | JS02, JS05 | Design module contracts and consume iterables with cleanup |
| JS07 | Modern ECMAScript release-by-release compatibility — **planned** | JS06 | Independently implement and assess modern ecmascript release-by-release compatibility |

## 03. Asynchronous JavaScript

| ID | Lesson / status | Prerequisites | Observable outcome |
| --- | --- | --- | --- |
| AS01 | [Execution contexts, tasks, and microtasks](../lessons/03-async/AS01-event-loop.md) | JS02 | Predict scheduling while separating host behavior from language rules |
| AS02 | [Promises, async/await, and error propagation](../lessons/03-async/AS02-promises.md) | AS01, JS06 | Compose asynchronous work and explain rejection and combinator behavior |
| AS03 | [Cancellation, races, and bounded concurrency](../lessons/03-async/AS03-concurrency.md) | AS02, F03 | Prevent stale commits and bound active operations |
| AS04 | Rate limiting, scheduling, and memory profiling — **planned** | AS03 | Independently implement and assess rate limiting, scheduling, and memory profiling |

## 04. Functional programming

| ID | Lesson / status | Prerequisites | Observable outcome |
| --- | --- | --- | --- |
| FP01 | [Pure functions, composition, and memoization](../lessons/04-functional/FP01-functions.md) | JS02, JS05 | Isolate effects and justify functional abstractions and cache contracts |
| FP02 | Recursion, persistent structures, and API design — **planned** | FP01 | Independently implement and assess recursion, persistent structures, and api design |

## 05. TypeScript

| ID | Lesson / status | Prerequisites | Observable outcome |
| --- | --- | --- | --- |
| TS01 | [Types, narrowing, and runtime contracts](../lessons/05-typescript/TS01-contracts.md) | JS06 | Parse unknown data and model valid states with discriminated unions |
| TS02 | [Generics and useful type transformations](../lessons/05-typescript/TS02-generics.md) | TS01 | Preserve input/output relationships with constrained types |
| TS03 | [Compiler, modules, declarations, and debugging](../lessons/05-typescript/TS03-configuration.md) | TS02 | Choose strict compiler and runtime module settings without mixing toolchains |
| TS04 | Variance, overload design, and declaration authoring — **planned** | TS03 | Independently implement and assess variance, overload design, and declaration authoring |
| TS05 | Recursive types, template literals, and advanced inference — **planned** | TS02 | Independently implement and assess recursive types, template literals, and advanced inference |

## 06. Object-oriented software design

| ID | Lesson / status | Prerequisites | Observable outcome |
| --- | --- | --- | --- |
| SD01 | [Contracts, composition, SOLID, and refactoring](../lessons/06-design/SD01-solid.md) | JS04, TS01 | Refactor actual contract violations and justify abstraction costs |
| SD02 | Domain models, lifecycle, and incremental refactoring — **planned** | SD01 | Independently implement and assess domain models, lifecycle, and incremental refactoring |

## 07. Design patterns

| ID | Lesson / status | Prerequisites | Observable outcome |
| --- | --- | --- | --- |
| DP01 | [Choose patterns from concrete problems](../lessons/07-patterns/DP01-selection.md) | SD01, FP01 | Implement strategies, observers, and adapters without forcing classes |
| DP02 | Creational patterns in JavaScript and TypeScript — **planned** | DP01 | Independently implement and assess creational patterns in javascript and typescript |
| DP03 | Structural patterns in JavaScript and TypeScript — **planned** | DP02 | Independently implement and assess structural patterns in javascript and typescript |
| DP04 | Behavioral patterns, middleware, and repositories — **planned** | DP03 | Independently implement and assess behavioral patterns, middleware, and repositories |

## 08. Angular 16

| ID | Lesson / status | Prerequisites | Observable outcome |
| --- | --- | --- | --- |
| AG01 | [Angular 16 components, DI, routing, and boundaries](../lessons/08-angular/AG01-architecture.md) | F02, TS03, SD01 | Design component/provider scopes and trace OnPush rendering |
| AG02 | [RxJS streams, operator choice, and cleanup](../lessons/08-angular/AG02-rxjs.md) | AG01, AS03 | Choose flattening behavior and make failure and teardown explicit |
| AG03 | [Angular forms, HTTP, state, and feature testing](../lessons/08-angular/AG03-forms-http.md) | AG02, F03, TS01 | Build a feature with typed forms, validated API data, and testable state |
| AG04 | NgRx actions, reducers, selectors, effects, and entities — **planned** | AG03 | Independently implement and assess ngrx actions, reducers, selectors, effects, and entities |
| AG05 | Design systems, i18n, SSR, and hydration lab — **planned** | AG03 | Independently implement and assess design systems, i18n, ssr, and hydration lab |
| AG06 | Angular 16 build, deployment, profiling, and migration — **planned** | AG05 | Independently implement and assess angular 16 build, deployment, profiling, and migration |

## 09. Frontend architecture and system design

| ID | Lesson / status | Prerequisites | Observable outcome |
| --- | --- | --- | --- |
| FE01 | [Design an enterprise frontend under constraints](../lessons/09-frontend/FE01-system-design.md) | AG03, F03, DP01 | Gather requirements and design state, caching, failures, and accessibility |
| FE02 | Large tables, analytics, pagination, and virtualization — **planned** | FE01 | Independently implement and assess large tables, analytics, pagination, and virtualization |
| FE03 | Realtime notifications, offline state, and uploads — **planned** | FE02 | Independently implement and assess realtime notifications, offline state, and uploads |
| FE04 | Multi-tenant SaaS, monorepos, and micro-frontends — **planned** | FE03, PE01 | Independently implement and assess multi-tenant saas, monorepos, and micro-frontends |
| FE05 | E-commerce, UI library, and telemetry design cases — **planned** | FE04 | Independently implement and assess e-commerce, ui library, and telemetry design cases |

## 10. Node.js backend engineering

| ID | Lesson / status | Prerequisites | Observable outcome |
| --- | --- | --- | --- |
| ND01 | [Node runtime, streams, workers, and shutdown](../lessons/10-node/ND01-runtime.md) | AS03, JS06, TS03 | Explain nonblocking I/O, backpressure, and service lifecycle |
| ND02 | [REST APIs, validation, persistence, and consistency](../lessons/10-node/ND02-api-data.md) | ND01, F03, TS01 | Build a validated API and reason about transactional boundaries |
| ND03 | SQL integration, transactions, and connection pools — **planned** | ND02 | Independently implement and assess sql integration, transactions, and connection pools |
| ND04 | Queues, jobs, caching, and rate limiting — **planned** | ND03, PE02 | Independently implement and assess queues, jobs, caching, and rate limiting |
| ND05 | Framework API, deployment, CI/CD, and profiling — **planned** | ND04 | Independently implement and assess framework api, deployment, ci/cd, and profiling |

## 11. Production engineering

| ID | Lesson / status | Prerequisites | Observable outcome |
| --- | --- | --- | --- |
| PE01 | [Authentication, authorization, and web security](../lessons/11-production/PE01-security.md) | F03, TS01 | Locate XSS, CSRF, CORS, and tenant authorization controls |
| PE02 | [Caching, retries, testing, and observability](../lessons/11-production/PE02-reliability.md) | PE01, FP01, AS03 | Test failure behavior and design bounded caches and safe retries |
| PE03 | Load testing, tracing, resilience, and supply chain — **planned** | PE02 | Independently implement and assess load testing, tracing, resilience, and supply chain |

## 12. Algorithms and coding interviews

| ID | Lesson / status | Prerequisites | Observable outcome |
| --- | --- | --- | --- |
| AL01 | [Complexity, invariants, and JavaScript pitfalls](../lessons/12-algorithms/AL01-complexity.md) | JS05 | Explain time/space with explicit input assumptions |
| AL02 | [Hashing, windows, search, and traversal](../lessons/12-algorithms/AL02-patterns.md) | AL01, JS06 | Derive core algorithms from invariants and test counterexamples |
| AL03 | Linked lists, heaps, and sorting implementations — **planned** | AL02 | Independently implement and assess linked lists, heaps, and sorting implementations |
| AL04 | Backtracking, greedy algorithms, and dynamic programming — **planned** | AL03 | Independently implement and assess backtracking, greedy algorithms, and dynamic programming |

## 13. Interview communication and AI verification

| ID | Lesson / status | Prerequisites | Observable outcome |
| --- | --- | --- | --- |
| IV01 | [Explain, investigate, and verify independently](../lessons/13-communication/IV01-communication.md) | F01, JS02 | Give structured technical and behavioral answers and audit AI output |
| IV02 | Senior cross-topic panel and portfolio defense — **planned** | IV01, ND05 | Independently implement and assess senior cross-topic panel and portfolio defense |

