# ADR template and worked decision

## ADR-001: bounded in-memory store for the first vertical slice

**Context:** the learning objective is to expose HTTP, parsing, async ownership, and repeated intent with minimal setup. The slice has one local user, no durability requirement, and at most 500 issues.

**Options:** in-memory collection; SQLite-backed store; hosted database service.

**Decision:** use a capped in-memory collection and explicitly document loss on restart. Share a runtime parser and test through real HTTP. Add durable transactions in ND03 rather than simulate database guarantees with an interface.

**Consequences:** fast setup and deterministic tests; no durable identity, multi-process consistency, or production idempotency. This is appropriate only for the teaching boundary.

**Revisit trigger:** a requirement for persistence, authenticated users, multi-process operation, or reliable writes across restart.

For your own ADR, keep the same fields and supply concrete constraints, competing options, why one meets them, costs, and the event that should cause reconsideration.
