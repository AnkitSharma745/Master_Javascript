# 06 — Angular 16

This section teaches Angular from fundamentals to enterprise architecture. All examples are written for **Angular 16**. When newer Angular versions changed something (for example `@if`/`@for` control flow, `@defer`, signal inputs or zoneless change detection), the document says so in a clearly marked note. The last chapter compares Angular 16 with newer versions so you can handle questions about both.

**Before this:** [02 — JavaScript](../02-javascript/README.md), [03 — TypeScript](../03-typescript/README.md) (classes, generics, decorators), and [dependency injection basics](../04-oop-solid-design-patterns/05-dependency-inversion-and-injection.md).

## Study order

### Part 1 — Building blocks

| # | Topic | What you will learn |
| --- | --- | --- |
| 1 | [Angular fundamentals](01-angular-fundamentals.md) | Architecture, CLI, bootstrapping, NgModules vs standalone, data binding |
| 2 | [Components and templates](02-components-and-templates.md) | Inputs/outputs, ViewChild, content projection, ng-template, component communication |
| 3 | [Directives and pipes](03-directives-and-pipes.md) | Built-in and custom directives, structural directives, pure vs impure pipes |
| 4 | [Lifecycle hooks](04-lifecycle-hooks.md) | Every hook in order, what to do in each, ExpressionChanged error |
| 5 | [Dependency injection](05-dependency-injection.md) | Injector hierarchy, providers, tokens, resolution modifiers, `inject()` |

### Part 2 — Application features

| # | Topic | What you will learn |
| --- | --- | --- |
| 6 | [Routing, guards and lazy loading](06-routing-guards-and-lazy-loading.md) | Routes, params, lazy loading, preloading, guards, resolvers |
| 7 | [Forms](07-forms.md) | Template-driven vs reactive forms, typed forms, validators, ControlValueAccessor |
| 8 | [HttpClient and interceptors](08-httpclient-and-interceptors.md) | Typed requests, error handling, interceptors, token refresh |
| 9 | [RxJS](09-rxjs.md) | Observables, subjects, operators, switchMap vs mergeMap vs concatMap vs exhaustMap, unsubscribing |
| 10 | [Change detection and signals](10-change-detection-and-signals.md) | Zone.js, Default vs OnPush, ChangeDetectorRef, signals in v16 |

### Part 3 — Large applications

| # | Topic | What you will learn |
| --- | --- | --- |
| 11 | [State management and NgRx](11-state-management-and-ngrx.md) | Service-based state, facades, NgRx store, effects, selectors, when not to use NgRx |
| 12 | [Performance](12-performance.md) | OnPush, trackBy, lazy loading, virtual scrolling, bundle size, profiling |
| 13 | [Enterprise architecture](13-enterprise-architecture.md) | Folder structure, layers, Nx monorepos, micro-frontends, error handling, auth |
| 14 | [Testing](14-testing.md) | TestBed, component and service tests, HttpTestingController, harnesses, async tests |
| 15 | [Security](15-security.md) | Built-in sanitization, DomSanitizer, CSP, XSRF, guards vs server authorization |
| 16 | [Angular 16 vs newer versions](16-angular-16-vs-newer-versions.md) | What changed in every version after 16 and how to migrate |

**Interview practice:** every topic ends with its own interview questions. For mixed questions across the whole subject, see [interview-questions.md](interview-questions.md).

**Next subject:** [07 — Node.js and Backend Engineering](../07-nodejs-backend/README.md)
