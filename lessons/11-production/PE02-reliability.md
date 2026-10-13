# PE02 — Caching, retries, testing, and observability

## Learning objective

Test failure behavior and design bounded caches and safe retries. Examples distinguish implemented labs from design sketches and production extensions.

## Prerequisites

[PE01](../../lessons/11-production/PE01-security.md), [FP01](../../lessons/04-functional/FP01-functions.md), [AS03](../../lessons/03-async/AS03-concurrency.md)

## Explanation and mechanism

Reliability means meeting useful behavior targets despite expected failures. Define what can be stale, duplicated, delayed, or degraded before adding retries and caches. A cache trades freshness and memory for lower repeated work; it becomes part of the data contract.

Cache keys include all inputs affecting results, including tenant/auth scope and schema version where necessary. TTL bounds freshness by time, not by correctness. Mutations, logout, permission changes, and tenant switches may need invalidation sooner. A bounded cache limits retained entries; TTL alone does not bound memory unless expired entries are removed.

## Implemented cache and deduplication

The [async lab](../../labs/async-tools.mjs) separates completed values from in-flight promises. A concurrent caller with the same key joins existing work; successful completion creates a TTL entry; rejection is removed so a later call can retry. Map.has preserves falsy/undefined values. Tests use an injected clock and deferred promises rather than real waiting.

Invalidating a key must also prevent old in-flight work from repopulating it. The lab checks in-flight identity before caching and allows a subsequent request to start fresh. Callers already awaiting the old result still own that promise; invalidation does not magically reject them.

HTTP caching sits at another layer. ETag revalidation, application TTL, and observable replay have different contracts. no-cache requires validation; no-store forbids storage by compliant caches. Avoid public/shared caching for private tenant data without a carefully designed policy.

## Retry and idempotency

Retry only failures that may succeed later, within an attempt/time budget, with backoff and jitter. Honor server guidance such as Retry-After where appropriate. A retry loop needs cancellation and must not retry every validation/auth failure.

```text
Attempt 1 fails transiently
  -> wait bounded backoff plus jitter
Attempt 2 fails transiently
  -> wait larger bounded delay
Attempt 3 succeeds or exhausts budget
```

An idempotent operation has the same intended effect after repeated identical intent. A POST can support an idempotency key: scope key to caller/operation, compare payload, retain outcome for a defined window, and reject conflicting key reuse. The demo implements a bounded in-memory teaching variant; distributed atomic persistence and caller identity are later requirements.

## Testing, measurement, and delivery

Test behavior by layer: pure unit rules, parser/API integration, component interaction, and end-to-end journeys. Do not mock away the boundary the test claims to exercise. Include failure, cancellation, duplicate, conflict, and cleanup cases; code coverage alone cannot prove these are correct.

Structured logs capture event/code/request ID and sanitized context. Metrics aggregate rates/latencies; traces connect work across boundaries. Choose latency percentiles, error budget, cache hit rate, active work, pool wait, and memory growth from user/operational questions. Do not collect everything without a retention/privacy policy.

Profile CPU and allocations under realistic workload. A heap snapshot can show retention paths; one large snapshot does not prove a leak. CI should reproduce pinned checks, build before testing emitted code, and separate secret-bearing deployment stages. Validate environment configuration before serving traffic. Plan rollback and graceful degradation.

## Alternatives and common mistakes

An unbounded memoization object leaks by design when key cardinality grows. Retrying all failures creates load spikes and duplicate writes. A health endpoint returning OK does not prove readiness of dependent services. Stale data can be useful only when communicated and permitted by the domain.

## Interview preparation

“I define failure and freshness contracts, bound work and retention, then test the cases most likely to violate those contracts. Retries require budget and idempotency; observability must answer an operational question.” Follow-up: what if invalidation happens while a request is still running?

## Practice

Implement a TTL cache with an injected clock before reading the lab. Test a cached zero, rejection, invalidation during flight, and capacity. Design a safe retry policy for GET versus order creation. Select three signals for a slow search screen.

## Revision

TTL ≠ capacity; replay ≠ invalidation; retry ≠ safe repeat; logs ≠ metrics ≠ traces; coverage ≠ correctness.

## Completion criteria

Pass failure-focused cache tests and explain one retry policy, one operational target, and one graceful-degradation path.

[Hints and solutions](../../practice/solutions.md#pe02) · [Question Q26](../../interviews/answers.md#q26)

## References

[Primary sources and version notes](../../references/README.md#http); verified 2026-10-13.

