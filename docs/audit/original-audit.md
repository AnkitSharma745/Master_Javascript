# Original repository audit

Baseline: commit `8cb80e2`, audited 2026-10-13. The checkout was clean. [Inventory](original-inventory.json) records every original tracked file, size, SHA-256, headings, and example count before migration. There were 14 topic folders and a README, Markdown explanations, standalone JavaScript examples, and browser HTML demos. There was no package manifest, test runner, CI, Angular implementation, or executable TypeScript project.

## Strengths

The progression through variables, operators, control flow, functions, collections, async, classes, and TypeScript is a useful beginning. Array/object transformations are concrete; counter and multiplier closures build intuition; banking and game examples offer refactoring exercises. DOM demos cover delegation, observers, and forms. TypeScript introduces inference, interfaces, narrowing, and generics. These examples remain accessible through the [migration map](migration.md).

## Findings from actual content

| Area | Evidence | Action |
| --- | --- | --- |
| Navigation | README links to no lessons | Generated dependency-aware curriculum and domain indexes |
| Variables | Declarations physically moved; implicit assignment called a fourth declaration style | Correct declaration instantiation, TDZ, strict mode |
| Values | Objects described as passed by reference | Explain value copying and shared object identity |
| Coercion | Summary contradicts table about empty arrays | Correct Number([]) to 0 |
| Precision | MAX_SAFE_INTEGER + 1 claimed as 9007199254740993n | Correct outputs |
| Control flow | Object literal in switch called ES2023 pattern matching | Replace with property discrimination |
| Examples | problem1.js redeclares x/y/result; profile.js has no inputs | Isolate cases and define inputs |
| Arrays | Contiguous memory guaranteed; holes called undefined elements | Distinguish specification from implementation and absent properties |
| Functions | Truthiness cache misses; new Function lacks trust assumptions | Preserve falsy results and document code-injection risk |
| Objects | Symbol keys said never enumerable; freeze not labeled shallow | Correct enumeration and strict-mode assumptions |
| DOM | API strings injected with innerHTML; saved editable HTML restored | Render untrusted content as text |
| Async | Callback necessarily deferred; timers imply exact delay | Correct synchronous callbacks and scheduling |
| OOP | Underscore field called private; all objects called class instances | Explain conventions, runtime privacy, prototypes |
| SOLID | Penguin cannot fly example presented as good substitution | Refactor capabilities; teach all five through violations |
| Memory | Clearing captured data breaks repeated calls; immediate WeakMap GC implied | Explicit lifecycle and nondeterministic collection |
| Banking | Duplicate files; negative withdrawal increases balance; base method rejects overdraft | Consolidate, validate, enforce balance floor; label transfers non-atomic |
| Patterns | OOP and pattern chapters repeat examples; middleware called decorator | Canonical selection lesson and corrected supplements |
| TypeScript | tsconfig --init; aliases said not implementable; type defaults mistaken for value defaults | Fix commands, contracts, arguments; compile counterexamples |
| HTTP typing | Promise<User> and axios generic claimed to validate responses | Runtime parsing from unknown |
| Decorators | Legacy signatures and metadata not versioned | Explicit legacy configuration and limitations |
| Frameworks | React setup unversioned; Angular curriculum absent | Historical React supplement; Angular 16 lessons and fixture |
| Practice | Immediate answers; no mastery rubric | Separate prompts/answers, tracks, delayed assessments |

## Gap analysis

A–D had introductions but lacked precise runtime explanations, cancellation, concurrency limits, race handling, and assessments. E had breadth without compiler checks or runtime contracts. F–G needed contract-driven refactoring and pattern restraint. H–K were largely missing: Angular/RxJS architecture, HTTP/security, backend operations, system design, caching, testing, observability. L lacked an algorithm sequence and tested solutions. M lacked communication frameworks, behavioral evidence, mock interviews, and AI verification.

The new foundation addresses priority gaps with authored lessons and executable slices. Specialized patterns, a complete enterprise Angular application, comprehensive algorithms, deployment, database/queue integrations, and advanced production labs remain later phases. See [final scope](../implementation-report.md).
