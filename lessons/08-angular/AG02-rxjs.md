# AG02 — RxJS streams, operator choice, and cleanup

## Learning objective

Choose flattening behavior and make failure and teardown explicit. Angular snippets target 16.2; standalone TypeScript labs use the root compiler.

## Prerequisites

[AG01](../../lessons/08-angular/AG01-architecture.md), [AS03](../../lessons/03-async/AS03-concurrency.md)

## Explanation and mechanism

An Observable defines a source of zero or more notifications over time. Subscribing starts or attaches to a producer depending on its design. It may emit synchronously. A Promise has one eventual outcome; an Observable can emit many values and expose teardown. Hot/cold describe producer sharing behavior, not “async versus sync.”

A Subject multicasts to subscribers. BehaviorSubject stores a current value and supplies it to new subscribers. Keep write access with the state owner; exposing a Subject invites unrelated code to mutate state.

Flattening operators handle an outer event producing inner work:

| Operator | New outer event while inner work is active | Useful example |
| --- | --- | --- |
| switchMap | Unsubscribe prior inner; use latest | Search results |
| mergeMap | Allow overlap, optional concurrency bound | Independent uploads |
| concatMap | Queue and process in order | Ordered saves |
| exhaustMap | Ignore new events until active inner completes | Ignore repeated submit clicks |

## Examples and execution trace

The Angular feature uses this kind of pipeline; the pure pipeline is tested with virtual time:
```typescript
const results$ = terms$.pipe(
  debounceTime(200),
  distinctUntilChanged(),
  switchMap(term => api.search(term).pipe(
    map(rows => ({ kind: "success" as const, rows })),
    catchError(() => of({ kind: "error" as const, message: "Search failed" })),
    startWith({ kind: "loading" as const })
  ))
);
```

Debounce waits for a quiet period. distinctUntilChanged suppresses the same successive term. switchMap creates the new inner stream and unsubscribes the old one. Inner catchError converts one failed search to a view state so future terms still work. Placing catchError outside may complete the entire search workflow after an error, depending on the replacement stream.

```text
outer:      a---b--------
inner a:    ----A
inner b:        --B
switchMap:      --B      (A is discarded)
concatMap:      A---B    (B starts after a completes)
```

This conceptual timing illustration is not a runnable marble assertion; precise expectations are in the fixture tests.

## Cleanup and sharing

AsyncPipe owns its subscription with view lifetime. For imperative subscriptions, Angular 16 supports takeUntilDestroyed through rxjs-interop as a developer-preview API; pass DestroyRef explicitly when used outside an injection context. The conventional Subject plus takeUntil pattern also works, provided ngOnDestroy emits and completes. HttpClient streams normally complete, but interval, route streams, and subjects may not.

Unsubscription stops observation and requests teardown. HttpClient can abort an underlying request, but a server write may already have committed. A Promise wrapped with from is not automatically transport-cancelled by unsubscribe.

shareReplay can deduplicate and replay work but changes lifetime. Configure sharing deliberately, consider refCount and finite-source completion behavior, and specify cache invalidation. It is not a general TTL cache or automatic tenant-isolation layer.

## Alternatives and common mistakes

Nested subscriptions hide ordering, cancellation, and error ownership. Flatten with an operator whose semantics match the requirement. A synchronous of source may complete before another outer event arrives; switchMap does not “always drop all but the last input.”

Use concatMap for order only if an unbounded queue is acceptable or separately controlled. mergeMap's concurrency limit does not necessarily bound pending outer input memory. exhaustMap drops intent; tell the user when a submission is in progress.

## Interview preparation

“I choose an operator from the meaning of new intent: replace, overlap, queue, or ignore. Then I define error recovery, producer sharing, and teardown.” Follow-up: why can a search stop responding after one HTTP error?

## Practice

Implement all four mappings with a controlled inner Observable and record subscriptions. Repair an outer catchError that kills search. Show that unsubscribe from a Promise wrapper does not roll back server work.

## Revision

Replace/overlap/queue/ignore; cold/hot concerns sharing; subscription owns cleanup; cancellation is producer-specific.

## Completion criteria

Pass the virtual-time scenarios, explain inner versus outer error handling, and demonstrate teardown after feature destruction.

[Hints and solutions](../../practice/solutions.md#ag02) · [Question Q20](../../interviews/answers.md#q20)

## References

[Primary sources and version notes](../../references/README.md#rxjs); verified 2026-10-13.

