# AG03 — Angular forms, HTTP, state, and feature testing

## Learning objective

Build a feature with typed forms, validated API data, and testable state. Angular snippets target 16.2; standalone TypeScript labs use the root compiler.

## Prerequisites

[AG02](../../lessons/08-angular/AG02-rxjs.md), [F03](../../lessons/01-foundations/F03-http.md), [TS01](../../lessons/05-typescript/TS01-contracts.md)

## Explanation and mechanism

A feature connects user intent, validated API data, state transitions, and rendered feedback. Keep transport data parsing outside display components. A facade is useful when it hides repeated workflow details; it should not become a second store with duplicated state.

Reactive forms make form state explicit in code. Angular 16 typed forms distinguish nullable controls from nonNullable controls. A nonNullable control resets to its initial value rather than null. Validators provide feedback, while the server validates independently. Template-driven forms suit simpler markup-oriented workflows; choose based on complexity and testability.

## Examples and execution trace

Angular 16 example:
```typescript
readonly title = new FormControl("", {
  nonNullable: true,
  validators: [Validators.required, Validators.maxLength(120)]
});

submit(): void {
  this.title.markAsTouched();
  const value = this.title.value.trim();
  if (this.title.invalid || !value) return;
  // Send a validated DTO through a feature-owned workflow.
}
```

Whitespace still needs a domain rule because required does not express “nonblank after trim.” Disable or otherwise handle repeated submit intent; map returned field errors to controls and preserve the user's input on failure.

The [feature fixture](../../projects/angular16-feature/README.md) implements a read-only search feature with a typed form control, an injectable HttpClient adapter, runtime parsing, OnPush, AsyncPipe, loading/error/empty states, and *ngFor tracking. It is compiler-checked and has pure RxJS tests. A complete routed admin portal, authentication, write forms, component browser tests, and NgRx implementation remain planned.

## HTTP and state architecture

Use HttpClient generics to describe the expected contract only; request unknown when data needs parsing. Interceptors are suitable for transport-wide concerns such as correlation IDs and selected credentials/error policy. Feature-specific error translation belongs closer to the feature. Do not catch every error in an interceptor and turn it into an empty success value.

Separate server state (issues retrieved from the API) from client state (open dialog, form draft, selected filter). Derive filtered views instead of storing duplicate arrays that can diverge. Service/RxJS state is often enough for one feature. NgRx offers explicit actions, pure reducers, selectors, effects for side effects, and entity helpers when shared state and workflows justify those conventions. Its fuller curriculum is AG04, not a claim that this fixture implements NgRx.

## Testing and performance

Test parsing against malformed payloads; test the search pipeline with virtual-time subscription assertions; test the HttpClient adapter with Angular's HTTP testing tools in a real application harness. Component tests should assert rendered behavior and interactions, not private methods. End-to-end tests cover real navigation and backend integration.

Track list items by stable ID, keep expensive computation outside templates, lazily load features where appropriate, and measure bundle/render/network cost. Internationalization requires externalized messages, locale-aware formatting, and layout review; translating strings alone does not handle date/currency rules.

SSR renders initial HTML on the server; hydration reuses matching HTML on the client. Angular 16 hydration is a preview with constraints; direct DOM changes and server/client mismatches need explicit investigation. See version notes before applying current Angular recipes.

## Alternatives and common mistakes

Storing one HTTP error in a root singleton can couple unrelated screens. A facade per trivial request adds no value. Client route guards and hidden buttons improve UX but cannot enforce backend permissions. A BehaviorSubject is not automatically a reliable cache: it lacks invalidation, bounded retention, and tenant scoping unless designed.

## Interview preparation

“I model user intent and view states explicitly, validate data at the API boundary, and keep server state separate from drafts. I choose a store only when ownership and workflow complexity justify it.” Follow-up: which test would catch an invalid response that still typechecks?

## Practice

Compile the fixture. Add a controlled failing response and confirm later search intent works. Specify an edit form with server validation and repeated-submit behavior. Decide whether two views need shared state or independent instances.

## Revision

Typed form ≠ domain-valid input; HttpClient type ≠ parsing; server data ≠ draft; facade ≠ duplicated store.

## Completion criteria

Explain the fixture end to end, pass its compiler/operator checks, and document exactly which browser and integration tests remain.

[Hints and solutions](../../practice/solutions.md#ag03) · [Question Q21](../../interviews/answers.md#q21)

## References

[Primary sources and version notes](../../references/README.md#angular16); verified 2026-10-13.

