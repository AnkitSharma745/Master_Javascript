# Version policy

Verified 2026-10-13. Pins are teaching baselines; upgrade only with compatibility review and rerun checks. No “latest” claim is made for the compiler/library pins.

| Boundary | Baseline | Meaning |
| --- | --- | --- |
| Root labs/API/tooling | Node 22.20.0+ on the 22 line, or 24 LTS | Locally checked on Node 22.20.0; root package declares these lines |
| Root TypeScript | 5.9.3 | Strict compiled contracts, utilities, and Node service |
| Angular maintenance fixture | Angular packages 16.2.12, TypeScript 5.1.6, RxJS 7.8.2, Zone.js 0.13.3 | Isolated lockfile/config; no root compiler dependency |
| Angular 16.2 historical official matrix | Node ^16.14.0 or ^18.10.0; TS >=4.9.3 <5.2; RxJS ^6.5.3 or ^7.4.0 | Historical compatibility, not current security support |
| Diagram verification | Mermaid 11.12.0 and jsdom 26.1.0 | Syntax parsing; not rendered layout validation |

Angular 16 is unsupported, and its historical Node lines are end-of-life. The fixture supports learning about an existing application; a production upgrade requires an explicit migration plan. CI's isolated Node 18.20.8 job reproduces the historical matrix as a maintenance exercise, with no deployment or secrets. Root CI stays on Node 22. The local Angular compiler/operator check was run on Node 22.20.0; passing it is **not** a claim of official Angular 16 compatibility with Node 22. A supported-historical-runtime local run was not performed.

Signals, hydration, and takeUntilDestroyed had developer-preview status in Angular 16. Standalone composition was already available. Use *ngIf/*ngFor examples for 16; later built-in control flow, deferrable views, and modern signal-based framework APIs belong to separate version-specific material. Hydration in 16 requires matching server/client DOM, Zone.js considerations, and has documented i18n limitations. The fixture does not implement SSR/hydration.

satisfies requires TS 4.9+. Legacy experimentalDecorators and TS 5 standard decorators have different contracts. Angular 16 examples use its compatible legacy configuration. Root .ts emits CommonJS under NodeNext because the root package has no type: module; .mjs labs are explicitly ESM. The Angular fixture emits ESM into its own package.

Use official [Angular compatibility](https://angular.dev/reference/versions), [versioned hydration](https://raw.githubusercontent.com/angular/angular/16.2.12/aio/content/guide/hydration.md), [decorator release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html), and [Node release schedule](https://github.com/nodejs/Release) to reevaluate changing details. Runtime-specific ordering claims need a reproducible example and explicit execution context.
