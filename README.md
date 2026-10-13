# Master JavaScript: learn, build, explain

A dependency-aware learning and interview practice repository for JavaScript, TypeScript, Angular 16, and Node.js engineers. Use it to write code, trace execution, debug failures, and defend design decisions in your own words.

This release contains a coherent **foundation and priority lessons**, executable labs, a TypeScript API with a browser client, and an Angular 16 feature exercise. Advanced extensions are explicitly marked **planned** in the [curriculum](curriculum/README.md). A document or passing test does not establish mastery or guarantee interview success.

## Start here

1. Read [how to study](docs/study-guide.md), then take the [diagnostic](interviews/diagnostic.md).
2. Start with [F01: programs and problem solving](lessons/01-foundations/F01-programs.md). Follow the numbered [master curriculum](curriculum/README.md); prerequisites determine what to study next.
3. Predict outputs before running examples. Attempt practice before opening [solutions](practice/solutions.md).
4. Build the [projects](projects/README.md), explain one decision aloud, and record evidence in the [revision tracker](revision/README.md).

Experienced learners may skip only skills they can demonstrate independently. Angular work experience does not replace JavaScript, HTTP, and TypeScript prerequisites.

## Run the learning system

Use Node.js 22.20+ on the 22 line, or Node.js 24 LTS, and npm. Root examples use TypeScript 5.9.3. These are reproducible teaching baselines, not claims about the newest release.

```sh
npm ci
npm run check
npm run lab
npm run build
npm run start:api
```

Open `http://127.0.0.1:3000` after starting the API to use the local issue board. See its [run guide and limitations](projects/issue-board/README.md). `npm run check` checks navigation, curriculum structure, annotated JavaScript examples, Mermaid syntax, TypeScript, and behavior tests. It does not run an Angular browser application or check external URLs.

Angular 16 has a separate pinned toolchain and [run guide](projects/angular16-feature/README.md). It is an unsupported maintenance target; its historical Node compatibility differs from the root runtime. See [version policy](references/versions.md).

## Find material

| Study area | Entry point |
| --- | --- |
| Programming, browsers, HTTP | [Foundations](lessons/01-foundations/README.md) |
| Values, scope, objects, collections, modules | [JavaScript](lessons/02-javascript/README.md) |
| Event loop, promises, cancellation, concurrency | [Asynchronous JavaScript](lessons/03-async/README.md) |
| Functional programming and module design | [Functional programming](lessons/04-functional/README.md) |
| Useful types, validation, generics, configuration | [TypeScript](lessons/05-typescript/README.md) |
| OOP, SOLID, refactoring | [Software design](lessons/06-design/README.md) |
| Pattern selection and implementations | [Design patterns](lessons/07-patterns/README.md) |
| Angular 16, change detection, RxJS | [Angular](lessons/08-angular/README.md) |
| Enterprise frontend and system design | [Frontend architecture](lessons/09-frontend/README.md) |
| Node runtime, APIs, streams, persistence | [Node.js](lessons/10-node/README.md) |
| Security, reliability, testing, observability | [Production engineering](lessons/11-production/README.md) |
| Complexity, algorithms, coding practice | [Algorithms](lessons/12-algorithms/README.md) and [problem set](practice/README.md) |
| Communication, behavioral answers, AI review | [Interview communication](lessons/13-communication/README.md) |
| Role tracks, questions, mock interviews | [Interview system](interviews/README.md) |
| Recall cards, comparisons, assessments | [Revision](revision/README.md) |
| Executable examples and projects | [Labs](labs/README.md) and [projects](projects/README.md) |
| Research and version boundaries | [Sources](references/README.md) |

## Changes and contributions

The [audit](docs/audit/original-audit.md), [migration map](docs/audit/migration.md), and [implementation report](docs/implementation-report.md) explain changes and remaining gaps. Original material lives in the [archive](archive/README.md), with corrections and notices; it is supplementary reading.

Use the [lesson template](docs/lesson-template.md) and [contribution guide](CONTRIBUTING.md). Update `curriculum/manifest.json` when adding lessons; run `npm run indexes` followed by `npm run check`. Preserve IDs, cite version-sensitive claims, and test the behavior your example teaches.
