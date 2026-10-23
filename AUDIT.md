# Repository Audit and Change Summary

This document records what the repository looked like before the October 2026 rebuild, the problems found, the decisions taken, and where the old material went. Full history is still available in git (`git log`, or browse the commit before this change).

## 1. What the repository contained before

The repository had gone through two earlier stages.

**Stage 1 — original notes (later moved to `archive/`).** There were 14 numbered beginner folders: introduction to programming, variables and data types, operators, control flow, functions, arrays, objects, ES6, DOM, async JavaScript, "advanced concepts" (modules, closures, event loop, FP), OOP with classes, design patterns, and TypeScript. That was 84 files, including small runnable `.js`/`.html` examples.

**Stage 2 — a "learning system" rewrite.** It added:

- `lessons/`: 29 short lessons (about 4–5 KB each).
- `curriculum/manifest.json` with generated indexes. 24 of its 53 entries were marked "planned" and had no content.
- `interviews/`: 32 questions in `answers.md` and `questions.json`, plus role "tracks", a diagnostic and mock-interview scripts.
- `revision/`: flashcards JSON, a spaced-repetition CLI, a seven-dimension self-scoring template, weak-topic and assessment sheets.
- `labs/`, `practice/`, `projects/`: an issue-board API and an Angular 16 exercise.
- `scripts/`, `tests/` and a CI workflow to check all of the above.

## 2. Problems found

| Area | Problem |
| --- | --- |
| Language | The Stage 2 lessons were written in dense, abstract English, for example "It retains bindings, not a frozen snapshot." That is hard to learn from, especially in a second language. |
| Depth | Lessons were 4–5 KB. Big topics such as closures, the event loop, prototypes, Angular DI, change detection and RxJS had one or two paragraphs each. There were few examples and execution walkthroughs. |
| Interview answers | Each lesson had about one sentence of "interview preparation". The 32 questions in `answers.md` had one-line answers and a scoring checklist instead of real explanations and follow-ups. |
| Complexity | Manifests, generated indexes, spaced-repetition scoring, flashcards, diagnostics, tracks and rubrics made the repo feel like a system you must learn before you can start learning. This is exactly what the owner did not want. |
| Missing subjects | No Electron at all. Little or nothing on OS basics, networking/DNS, CSS layout, accessibility, React, Jest/Vitest, Playwright, CI/CD, observability, resilience patterns, behavioral interviews, or machine coding. There were no system design case studies (only one practice page). |
| Incomplete subjects | 24 curriculum entries were "planned" with no content, including all design pattern chapters, NgRx, Node databases/queues/caching, large tables, real-time, micro-frontends and load testing. |
| Duplication | The same topics existed three times: the archive, the lessons, and the practice/interview files, each with a different partial explanation. |
| Accuracy (original notes) | Some original notes taught incorrect models: "variables without a keyword are a declaration type", "objects are passed by reference", "hoisting moves code to the top", and "primitives live on the stack". Stage 2 patched some of these but kept the archive as a second source. |
| Navigation | A reader had to understand IDs (F01, JS02, AG03…), the manifest, and the difference between "ready" and "mastered" before finding a topic. |

## 3. Decisions

1. **Simple structure:** Subject → topic documents → interview questions. There are 10 numbered subject folders (01–09 and 11), each with a `README.md` (study order) and numbered topic documents. Eight of them also have an `interview-questions.md` for mixed, cross-topic practice. Folder number 10 is intentionally unused (see section 6).
2. **One standard format for every topic:** concept explanation (what, why, simple explanation, analogy, how it works inside, diagrams, examples from simple to realistic, walkthroughs, real-world use, trade-offs, alternatives, mistakes, best practices). Then **Interview questions**, where each important question has a short spoken answer, detailed explanation, code or diagram, follow-ups with answers, common mistakes and real-world usage. Then a **Summary** and **References**.
3. **Teach explaining, not just knowing:** the most important topics include a "How to explain this in an interview" section (define → why → how → example → where → trade-offs). A dedicated document, [How to explain technical answers](11-coding-interviews/01-how-to-explain-technical-answers.md), teaches the method with weak vs strong answers.
4. **Simple English everywhere:** short sentences, plain words, every technical term explained the first time.
5. **Remove the learning-management layer:** the manifest, generated indexes, revision CLI, flashcards, scoring rubrics, diagnostics, tracks and their scripts/tests are gone. They are replaced by one file, [progress-tracker.html](progress-tracker.html): a checklist that saves progress in the browser.
6. **One home per concept:** each concept is explained in one place, and other documents link to it. Ownership rules are listed in section 5.
7. **Version awareness:** Angular examples target Angular 16, with clear notes for newer versions and a dedicated comparison chapter. Node.js targets the 22/24 LTS lines, TypeScript 5.x, and ECMAScript 2025. Electron examples use secure defaults.
8. **Executable checking:** JavaScript examples and every output-prediction answer were run with Node.js while writing. Mermaid diagrams were parsed with the Mermaid library, and internal links and anchors were checked by script.

## 4. Where the old material went

The old folders were removed after their useful content was rewritten into the new documents. Nothing was dropped silently: good examples and correct explanations were kept and rewritten in simple English, and incorrect models were fixed.

| Old location | New location |
| --- | --- |
| `archive/01_Introduction_to_Programming` | [01/01 How programs run](01-cs-and-web-fundamentals/01-how-programs-run.md) |
| `archive/02_JavaScript Variable and Data types` | [02/01 Basics](02-javascript/01-basics-variables-types-operators.md), [02/02 Coercion](02-javascript/02-type-coercion-and-equality.md) |
| `archive/03_Expression_And_Operator` (docs + `.js` exercises) | [02/01 Basics](02-javascript/01-basics-variables-types-operators.md), [02/02 Coercion](02-javascript/02-type-coercion-and-equality.md) |
| `archive/04_Control_Flow` | [02/01 Basics](02-javascript/01-basics-variables-types-operators.md) |
| `archive/05_Functions` | [02/04 Functions and FP](02-javascript/04-functions-and-functional-programming.md) |
| `archive/06_Javascript_Arrays` | [02/10 Arrays](02-javascript/10-arrays-and-array-methods.md) |
| `archive/07_Javascript_Objects` | [02/07 Objects and copying](02-javascript/07-objects-and-copying.md) |
| `archive/08_ES6_Features` | [02/21 Modern JavaScript features](02-javascript/21-modern-javascript-features.md) |
| `archive/09_DOM_Manipulation` (+ HTML demos) | [05/03 DOM and events](05-frontend-engineering/03-dom-and-events.md), [05/examples](05-frontend-engineering/examples/README.md) |
| `archive/10_Asynchronous_Javascript` | [02/16 Event loop](02-javascript/16-event-loop.md), [02/17 Promises](02-javascript/17-callbacks-and-promises.md), [02/18 Async/await](02-javascript/18-async-await.md) |
| `archive/11_Advanced_Concepts` | [02/03 Scope](02-javascript/03-scope-hoisting-and-tdz.md), [02/05 Closures](02-javascript/05-closures.md), [02/14 Modules](02-javascript/14-modules-esm-and-commonjs.md), [02/16 Event loop](02-javascript/16-event-loop.md), [02/04 FP](02-javascript/04-functions-and-functional-programming.md) |
| `archive/12_OOPs_Javascript_Classes` (+ example programs) | [02/08 Prototypes](02-javascript/08-prototypes-and-inheritance.md), [02/09 Classes](02-javascript/09-classes.md), [04/01](04-oop-solid-design-patterns/01-oop-four-pillars.md), [04/02](04-oop-solid-design-patterns/02-composition-inheritance-and-mixins.md), [04/examples](04-oop-solid-design-patterns/examples/README.md) |
| `archive/13_Design_Pattern` | [04/06 Creational](04-oop-solid-design-patterns/06-creational-patterns.md), [04/07 Structural](04-oop-solid-design-patterns/07-structural-patterns.md), [04/08 Behavioral](04-oop-solid-design-patterns/08-behavioral-patterns.md), [04/09 Patterns in real apps](04-oop-solid-design-patterns/09-patterns-in-real-javascript-apps.md) |
| `archive/14_Typescript` | All of [03 — TypeScript](03-typescript/README.md) |
| `lessons/01-foundations` | [01 — Fundamentals](01-cs-and-web-fundamentals/README.md) |
| `lessons/02-javascript`, `03-async`, `04-functional` | [02 — JavaScript](02-javascript/README.md) |
| `lessons/05-typescript` | [03 — TypeScript](03-typescript/README.md) |
| `lessons/06-design`, `07-patterns` | [04 — OOP, SOLID, Patterns](04-oop-solid-design-patterns/README.md) |
| `lessons/08-angular` | [06 — Angular 16](06-angular-16/README.md) |
| `lessons/09-frontend` | [05 — Frontend](05-frontend-engineering/README.md), [09 — System Design](09-system-design/README.md) |
| `lessons/10-node` | [07 — Node.js](07-nodejs-backend/README.md) |
| `lessons/11-production` | [07/14 Production Node.js](07-nodejs-backend/14-production-nodejs.md), [01/08 Web security basics](01-cs-and-web-fundamentals/08-browser-storage-and-web-security-basics.md) |
| `lessons/12-algorithms` | [01/02 Data structures](01-cs-and-web-fundamentals/02-data-structures-and-big-o.md), [11/02 Problem solving](11-coding-interviews/02-problem-solving-and-complexity.md) |
| `lessons/13-communication`, `interviews/mock-interviews.md` | [11/01 How to explain answers](11-coding-interviews/01-how-to-explain-technical-answers.md), [11/07 Project and behavioral](11-coding-interviews/07-project-discussion-and-behavioral.md) |
| `interviews/answers.md`, `questions.json` | Questions were rewritten with full answers inside the relevant topic documents and the subject interview banks |
| `practice/solutions.md` (coding P01–P06, debugging D01–D05) | [11/02 Problem solving](11-coding-interviews/02-problem-solving-and-complexity.md), [11/06 Debugging and code review](11-coding-interviews/06-debugging-and-code-review.md) |
| `practice/system-design.md` | [09 — System Design](09-system-design/README.md) |
| `labs/async-tools.mjs`, `labs/algorithms.mjs` | [11/04 Polyfills and implementations](11-coding-interviews/04-javascript-polyfills-and-implementations.md), [02/17 Promises](02-javascript/17-callbacks-and-promises.md) |
| `labs/contracts.ts` | [03/11 Runtime validation](03-typescript/11-runtime-validation-and-type-safe-apis.md) |
| `labs/streams.mjs` | [07/05 Streams](07-nodejs-backend/05-streams.md) |
| `projects/issue-board` (TypeScript API + client) | Its production patterns (body limits, request IDs, timeouts, idempotency keys) are taught in [07/06](07-nodejs-backend/06-http-servers-and-express.md), [07/07](07-nodejs-backend/07-rest-api-design.md) and [07/14](07-nodejs-backend/14-production-nodejs.md) |
| `projects/angular16-feature` | Its examples are used in [06/01](06-angular-16/01-angular-fundamentals.md) and the Angular chapters |
| `references/` | [REFERENCES.md](REFERENCES.md) |
| `docs/audit`, `docs/implementation-report.md` | This document |

**Removed without a replacement (on purpose):** `curriculum/` (manifest and generated indexes), `revision/` (flashcards, spaced-repetition CLI, scoring templates), `interviews/diagnostic.md`, `interviews/tracks.md`, `docs/lesson-template.md`, `docs/study-guide.md`, `CONTRIBUTING.md` (written for the manifest workflow), and the old `scripts/`, `tests/`, `labs/`, `projects/` and `tsconfig.json` that existed only to run those systems. One small script remains: `npm run check` validates links and Mermaid diagrams (also run by the GitHub workflow). The owner asked for no learning-management features. A simple checklist page replaces them.

## 5. One home per concept

To avoid repeating explanations, each overlapping concept has one main document:

| Concept | Main document | Others link to it from |
| --- | --- | --- |
| Rendering pipeline | [01/07](01-cs-and-web-fundamentals/07-browser-architecture-and-rendering.md) | Frontend performance |
| Web security basics (origin, SOP, cookies) | [01/08](01-cs-and-web-fundamentals/08-browser-storage-and-web-security-basics.md) | Security, Angular, Node |
| XSS, CSRF, CORS, CSP essentials | [01/08](01-cs-and-web-fundamentals/08-browser-storage-and-web-security-basics.md) | Angular security, Node.js production, Electron security |
| Browser event loop | [02/16](02-javascript/16-event-loop.md) | Node event loop (differences only) |
| Node event loop phases | [07/02](07-nodejs-backend/02-node-event-loop.md) | JS event loop |
| `class` language mechanics | [02/09](02-javascript/09-classes.md) | OOP chapters |
| Dependency injection (general) | [04/05](04-oop-solid-design-patterns/05-dependency-inversion-and-injection.md) | Angular DI |
| HTTP protocol | [01/05](01-cs-and-web-fundamentals/05-http-https-and-tls.md) | REST design, system design |
| REST API design | [07/07](07-nodejs-backend/07-rest-api-design.md) | API styles (system design) |
| Caching (Node/Redis implementation) | [07/11](07-nodejs-backend/11-caching.md) | Caching strategy (system design) |
| Auth implementation | [07/09](07-nodejs-backend/09-authentication-and-authorization.md) | Auth architecture, secure auth checklist |
| Debounce/throttle | [02/20](02-javascript/20-debounce-throttle-and-performance.md) | Polyfills, RxJS |
| Polyfill implementations | [11/04](11-coding-interviews/04-javascript-polyfills-and-implementations.md) | Topic docs (core idea only) |

## 6. Scope changes made during the rebuild

The owner made three scope decisions while the work was in progress:

1. **Subject 10 (Testing, Security and Production) was dropped.** The repository was already very large. The folder was removed before any of it was written. Links that pointed to it now go to the closest existing document:
   - security → [01/08 Web security basics](01-cs-and-web-fundamentals/08-browser-storage-and-web-security-basics.md) and [07/09 Auth](07-nodejs-backend/09-authentication-and-authorization.md)
   - observability, reliability, CI/CD → [07/14 Production Node.js](07-nodejs-backend/14-production-nodejs.md)
   - testing → [06/14 Angular testing](06-angular-16/14-testing.md)
   - debugging → [11/06 Debugging and code review](11-coding-interviews/06-debugging-and-code-review.md)
2. **Subject 01 was kept lighter.** The six full documents stayed. The two remaining topics, operating systems (03) and browser storage with web-security basics (08), were written as compact documents, because they are common interview topics. Subject 01 has no mixed interview-questions file.
3. **One subject at a time.** After JavaScript, each subject was finished and reviewed before the next one started.

## 7. What the repository contains now

| Subject | Topic docs | Interview questions in topic docs | Mixed question bank |
| --- | --- | --- | --- |
| 01 Core CS and web fundamentals | 8 | 164 | — |
| 02 JavaScript | 21 | 462 | yes (26 mixed + 54 rapid) |
| 03 TypeScript | 12 | 215 | yes (21 mixed + 52 rapid) |
| 04 OOP, SOLID, design patterns | 9 + runnable examples | 177 | yes (28 mixed + 60 rapid) |
| 05 Frontend engineering | 10 + HTML demos | 207 | yes (25 mixed + 56 rapid) |
| 06 Angular 16 | 16 | 272 | yes (26 mixed + 65 rapid) |
| 07 Node.js and backend | 14 | 278 | yes (25 mixed + 58 rapid) |
| 08 Electron and desktop | 9 | 174 | yes (24 mixed + 55 rapid) |
| 09 System design (6 concepts + 8 case studies) | 14 | 202 | yes (26 mixed + 53 rapid) |
| 10 C# and .NET backend (added after the rebuild) | 14 | 243 | yes (25 mixed + 60 rapid) |
| 11 Coding interviews | 7 | 201 (including 105 mixed output questions) | — |
| 12 Data structures and algorithms (added after the rebuild) | 14 | 189 problems + about 115 pattern questions | yes (40 "which pattern?" items) |
| **Total** | **148** | **about 2,900** | **10 banks** |

In total there are about 1.9 million words and 600 Mermaid diagrams. Slot 10 was reused for the C# and .NET subject after the original subject 10 was dropped (see section 6).

## 8. Validation performed

- **Writing check:** every subject except 01 and 11 got a separate editor pass after it was written. The editors fixed technical errors, made version facts consistent, removed duplicate explanations and checked the style. Bugs they found include:
  - a token-refresh retry that never sent the new token (Angular 08)
  - a sender check that rejected the real app (Electron 07)
  - a login rate-limit key that blocked neither attack (Node 09/14)
  - a dialog that could repeat a delete (Frontend 01/04)
  - several wrong outputs and wrong version dates
- **Code:** JavaScript examples and every output-prediction answer were run with Node.js 22.20.
  - TypeScript examples were type-checked with TypeScript 5.9 in `--strict` mode.
  - Angular 16 examples were compiled and run with the real Angular 16.2.12 compiler, RxJS 7.8.2 and zone.js, using a local install.
  - DOM examples were run with jsdom.
- **Diagrams and links:** `npm run check` parses all 510 Mermaid diagrams and checks about 8,900 internal links and anchors. It passes with 0 broken diagrams and 0 broken links.
- **Version facts:** checked against primary sources: TC39 proposals, MDN compatibility data, nodejs.org, angular.dev and the Angular changelog, electronjs.org and its release schedule, TypeScript release notes and RFCs.

## 9. Known gaps

- **Not executed:** packages that were not installed locally (Express, NgRx, the Angular router, React, Electron itself, Redis, RabbitMQ, Kafka, Prisma, Zod in some places) and browser-only APIs. This code was written from the official documentation and reviewed, but not run. The documents say which examples were not run.
- **Length:** most documents are longer than first planned (8,000–17,000 words), because of the many examples and interview answers. Each has a table of contents and a two-minute summary at the end.
- **Dropped topics (by the owner's choice):** dedicated chapters on Jest/Vitest/Playwright, CI/CD, observability and resilience patterns. The essentials appear inside Angular 14 (testing), Node.js 14 (production) and CS 08 (web security).
- **.NET examples not run:** code that needs NuGet packages (EF Core, Serilog, Polly, xUnit, FluentValidation and others) was written from official docs and is marked "not run here". Plain C# and ASP.NET Core examples were run on the .NET 10 SDK.
- **DSA:** every one of the 189 solutions runs with Node.js and was compared against brute-force versions on random inputs. Problem statements are written in our own words and reference the similar LeetCode problem by name.
