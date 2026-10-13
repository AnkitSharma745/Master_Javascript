# TS03 — Compiler, modules, declarations, and debugging

## Learning objective

Choose strict compiler and runtime module settings without mixing toolchains. Use the root runtime/compiler unless a framework-specific example says otherwise.

## Prerequisites

[TS02](../../lessons/05-typescript/TS02-generics.md)

## Explanation and mechanism

tsconfig defines the compiler's model of the project. target controls JavaScript emission; lib describes assumed APIs; neither installs those APIs in the runtime. module and moduleResolution must match how the host loads dependencies. Declaration files (.d.ts) describe types without supplying executable implementations.

Use a project-local compiler and lockfile. npx tsc --init creates configuration; tsconfig --init is not a compiler command. Running tsc with individual input filenames can bypass the intended project configuration; prefer tsc -p tsconfig.json.

## Examples and execution trace

The root [configuration](../../tsconfig.json) uses ES2022, NodeNext modules/resolution, strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes, source maps, declarations, and noEmitOnError. Run:
```sh
npm ci
npm run typecheck
npm run build
```

The root package lacks type: module, so these .ts files emit CommonJS under NodeNext. JavaScript labs use .mjs explicitly. For a native ESM package, use type: module and matching import extensions/package exports. Browser bundlers can use a different resolution model; do not copy a Node config into an Angular app.

strict includes several checks, but noUncheckedIndexedAccess and exactOptionalPropertyTypes are separate opt-ins. The former makes unchecked indexed reads include undefined; the latter distinguishes absence from an explicit undefined assignment. skipLibCheck may help tooling integration but should not hide your own type errors.

## Debugging and declaration boundaries

Source maps map generated positions back to source. The Node debugger must launch emitted JavaScript unless the runner explicitly supports TypeScript; do not point a conventional compiled workflow at an uncompiled .ts file.

Ambient declarations promise APIs exist. Declaring a global service does not create it. TypeScript paths guides type resolution but does not generally rewrite emitted import strings or configure runtime aliases. Align bundler/runner support or prefer resolvable imports.

Namespace syntax can coexist with modules in specialized/legacy uses, but ES modules are the default organization choice for this curriculum. Minimize ambient global names.

## Version-specific decorator distinction

Legacy decorators use experimentalDecorators and signatures involving a target, key, and descriptor. Standard decorator support introduced in TypeScript 5.0 has different signatures/semantics and does not support parameter decorators or emitDecoratorMetadata in the same way. Angular 16 uses its supported legacy framework toolchain. Do not swap those models in a working application. A Decorator design pattern is a separate concept from decorator syntax.

## Alternatives and common mistakes

A global compiler can silently differ across machines. npm ci reproduces the lockfile; package pins do not prove a dependency is secure. Audit upgrades, compatible peer requirements, and support status deliberately.

Angular 16.2's compatible TypeScript range ends before 5.2. The [isolated Angular fixture](../../projects/angular16-feature/README.md) uses 5.1.6; the root uses 5.9.3. Its historical compatible Node lines are unsupported today. The fixture is a maintenance exercise, not a deployment recommendation.

## Interview preparation

“I align compiler assumptions, emitted modules, and the actual runtime. strictness helps checked code; declarations and lib only describe APIs. I use a local pinned compiler and verify framework compatibility separately.” Follow-up: why can a paths import typecheck and still fail when Node loads it?

## Practice

Inspect emitted server.js and explain its module format. Compile an invalid indexed read. Explain a missing runtime API despite a declaration. Design a migration plan that changes one toolchain boundary at a time.

## Revision

target ≠ polyfill; lib ≠ runtime; paths ≠ loader; .d.ts ≠ implementation; decorator models differ.

## Completion criteria

Reproduce a clean build, inspect one source map and declaration, and explain root/Angular toolchain separation.

[Hints and solutions](../../practice/solutions.md#ts03) · [Question Q16](../../interviews/answers.md#q16)

## References

[Primary sources and version notes](../../references/README.md#tsmodules); verified 2026-10-13.

