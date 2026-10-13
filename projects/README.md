# Project portfolio

Four progressively demanding artifacts connect the lessons. An implementation is distinguished from a specification and future extension.

| Project | Lessons | Current artifact | Proof of completion |
| --- | --- | --- | --- |
| P-A: type-safe utility and async library | JS01–JS06, AS01–AS03, FP01, TS01–TS03, AL01–AL02 | [Runnable labs](../labs/README.md), type counterexamples, behavior tests | Reimplement selected utilities; pass unseen boundary tests; explain contracts |
| P-B: browser issue board + Node TypeScript API | F02/F03, ND01/ND02, PE01/PE02 | [Implemented vertical slice](issue-board/README.md) | Demonstrate list/search/create, invalid payload, repeated intent, stale read, safe text |
| P-C: Angular 16 search feature | AG01–AG03 | [Compiled feature and RxJS exercise](angular16-feature/README.md) | Explain DI/templates/parser/operator/lifetime; integrate into a real app as a later task |
| P-D: enterprise portal system design | FE01, PE01/PE02, ND02 | [Worked design lesson](../lessons/09-frontend/FE01-system-design.md), [case workbook](../practice/system-design.md), [ADR template](adr-template.md) | Present requirements, API/state/trust diagrams, failures, trade-offs, and tests |

For every project, preserve your independent attempt, decisions, failure evidence, and tests. Explain exactly which pieces you implemented. A full deployed multi-user application, database/queue integration, production Angular shell, authentication, and browser E2E suite are future phases. Avoid bolting a generic enterprise layer onto the small teaching slice merely to resemble a large system.
