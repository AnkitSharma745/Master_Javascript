# Issue board: a complete small browser/API slice

## Requirements and implementation

List/search titles, create an open issue, provide loading/empty/error feedback, preserve input on failure, and render malicious-looking titles as text. Creation accepts only a nonblank trimmed title of at most 120 UTF-16 code units. Data stays in one process's memory, capped at 500 issues. Search returns at most 50 matches; it is not million-row pagination.

```sh
npm ci
npm run build
npm run start:api
```

Run from the repository root. Open `http://127.0.0.1:3000`. Stop with Ctrl+C. Tests start independent local servers on ephemeral ports; they do not depend on external APIs. The source is [server.ts](server.ts); the client is [client.js](public/client.js).

## Structure and data flow

```text
projects/issue-board/
  server.ts             HTTP adaptation, limits, in-memory operations, shutdown
  public/index.html     Semantic form/list/status markup
  public/client.js      User intent, request ownership, runtime shape checks, DOM updates
  public/styles.css     Responsive presentation and focus styling
labs/contracts.ts       Shared TypeScript/runtime contract
tests/api.test.mjs       Real HTTP behavior
tests/client.test.mjs    Headless DOM behavior
```

Search starts a generation, aborts the prior request, and commits results/errors only if still current. Creation disables repeated submit while active and retains an idempotency key for identical intent after an uncertain failure. The server parses limited JSON, checks the title contract, and returns an issue or a structured code/message/request ID. Unexpected exceptions do not leak stack traces. The client creates list elements with textContent.

## Decisions, failure cases, and security

node:http exposes mechanics without introducing framework version behavior. Domain parsing is separate and shared with Angular's adapter. Bodies are limited to 1024 bytes; content type, query length, and limits are checked. Host/origin policy restricts the local browser use case; it is not authentication. The process binds to loopback and static assets are allowlisted. No request body or credential is included in structured request logs.

Idempotency records expire after 60 seconds and are capped at 100, so eviction/restart ends the deduplication guarantee. A reused retained key with a different normalized title returns 409; identical intent returns the original 201 representation. The check/create sequence has no await, which is a one-process property, not a distributed transaction. A production key must be scoped to authenticated caller/operation and enforced atomically in durable storage.

Memory resets at restart. No user identity, tenant model, persistence, rate limiter, queue, upload support, or deployment is implemented. Do not expose this demo as a production service. The next phase requires server authorization, durable constraints/transactions, update conflict rules, observability targets, and secret/dependency policy.

## Testing and performance

Root checks compile the actual service and test real HTTP creation/search/errors, key conflicts/expiry/capacity, safe assets, media/body limits, and host/origin failures. Headless DOM tests check malicious title rendering and reordered request commitment. They do not verify visual layout, real browser CSP, keyboard focus order, load capacity, or full deployment. See [the final report](../../docs/implementation-report.md) for checks actually run.

Search is O(n) over the bounded demo collection. Production pagination/filtering belongs in indexed queries; do not advertise this implementation as a scalable search system. Long requests have HTTP timeouts; shutdown stops new acceptance and forcibly closes remaining connections after a deadline.

## Interview discussion and improvements

Explain a happy path and a malformed request, a late read, and a duplicate write. Then defend one-process memory for a learning slice and describe exactly how transactions, tenant scope, and idempotency would change in production. Review [Q24](../../interviews/answers.md#q24), [Q25](../../interviews/answers.md#q25), and [Q26](../../interviews/answers.md#q26). Try implementing an authenticated persistent version as ND03–ND05 progress, using a concrete schema rather than a generic repository promise.
