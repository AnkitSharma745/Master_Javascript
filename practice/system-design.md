# System-design workbook

Use a consistent 35-minute process: requirements/constraints (5), contracts and boundaries (8), state/data/cache design (8), failures/security/accessibility (8), trade-offs/testing/measurement (6). Draw ownership and trust boundaries, not only component names. Ask which assumptions would change your decision.

## Case 1: enterprise admin portal

Support staff search a million tenant-scoped issues and edit permitted records. Set a 50-row page and a 500ms p95 search goal as exercise assumptions. Design feature routes, URL filters, server pagination, versioned writes, scoped cache invalidation, and permission changes. Handle expired sessions, failed search, stale results, and edit conflict. Measure latency/error rate and test cross-tenant IDs. [FE01](../lessons/09-frontend/FE01-system-design.md) is the worked case; [ADR-001](../projects/adr-template.md) is a different small-slice decision.

## Case 2: e-commerce frontend

A catalog can be cached, but checkout prices/inventory need server authority. Separate browsing, cart intent, and order creation; define guest versus signed-in ownership. An uncertain checkout timeout must not create duplicate orders. Explain catalog TTL, mutation invalidation, price changes, accessibility of checkout errors, and integration tests for duplicate intent. Compare optimistic cart updates with pessimistic payment confirmation.

## Case 3: analytics dashboard

Assume several charts share filtered datasets and queries can take seconds. Give one filter/query owner, normalized request keys, bounded in-flight deduplication, cancellable reads, stale-state labeling, and partial widget failures. Avoid refetch storms on every control change. Define chart accessibility alternatives and measure query/render cost independently. Test a filter switch while old requests complete.

## Case 4: real-time notifications

Define event IDs, ordering scope, reconnect backoff, duplicate delivery, resync, and unread-state authority. A WebSocket is a delivery path, not durable history. Compare polling/SSE/WebSockets by directionality and infrastructure constraints. Treat reconnect as potentially missing events and use cursor/version resync. Test duplicates, offline intervals, permission loss, and notification floods; cap retained items and rendering work.

## Case 5: searchable large table

Separate server sort/filter/pagination from local selection and editing. Decide whether selection persists across pages and define stable keys. Compare cursor and offset under concurrent insertion. Only virtualize when visible row volume justifies its focus/screen-reader complexity. Test empty pages, deleted cursors, sort changes, slow readers, and stale edits; profile long tasks and response size.

## Case 6: authentication and permission UX

Define session lifecycle, login redirect allowlist, refresh/expiry, route visibility, action-level feedback, and server resource/tenant checks. A changed permission can invalidate previously visible data. Compare cookie/CSRF and token/XSS boundaries from a threat model. Test login loops, denied actions, expired sessions, and cross-tenant ID changes. Never derive trusted permissions solely from localStorage.

## Case 7: multi-tenant SaaS frontend

Specify tenant switching, shared versus scoped preferences, cache/request ownership, subdomain/origin strategy, and data isolation. A previous request must not restore old tenant data after switch. Frontend scope is UX; server identity/policy enforces access. Discuss monorepo sharing and why a small team may reject micro-frontends. Test two tabs, concurrent switches, stale errors, and redirected sessions.

## Case 8: reusable component library

Start with supported controls and behavior contracts, not a wrapper for every HTML tag. Define tokens/themes, keyboard/focus rules, labels, error states, localization, unique IDs, versioning, and documented integration. Use accessible native semantics where possible. Test controlled/uncontrolled ownership, keyboard interaction, visual regression, and assistive technology behavior. Compare shared package release coupling with copied components.

## Case 9: frontend logging and monitoring

Define operational questions before collecting events: slow navigation, API failures, rendering freezes, and failed business flows. Connect request IDs and route/build versions, redact secrets/content, sample intentionally, buffer with a capacity limit, and degrade when telemetry fails. Test offline flush, duplicated events, unavailable sink, and privacy policy. Logging failure must not turn a successful user operation into a reported failure.

For every case, produce an API sketch, state diagram, cache policy, three failure tests, a measurement plan, and one rejected alternative. These are assessed design exercises, not implemented production systems.
