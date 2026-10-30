# 14 — Low-Level Design (LLD)

Low-level design rounds ask you to design the **classes and code** for a small system in 45–60 minutes. Typical prompts are "design a parking lot" or "design Splitwise". You clarify the requirements, find the entities, draw a class diagram, choose design patterns for good reasons, and write working code. You also handle edge cases such as two people booking the same seat.

High-level design (servers, databases, scaling) is a different round; see [09 — System Design](../09-system-design/README.md).

All solutions are in **TypeScript**, type-checked and run with Node.js. Every design applies the principles from [04 — OOP, SOLID and Design Patterns](../04-oop-solid-design-patterns/README.md) and links back to them.

**Before this:** [OOP four pillars](../04-oop-solid-design-patterns/01-oop-four-pillars.md), [SOLID](../04-oop-solid-design-patterns/03-solid-principles.md) and the [design pattern](../04-oop-solid-design-patterns/06-creational-patterns.md) chapters.

## Study order

| # | Topic | Main ideas |
| --- | --- | --- |
| 1 | [How to approach LLD interviews](01-how-to-approach-lld-interviews.md) | A step-by-step framework, class diagrams, choosing patterns, time plan |
| 2 | [Parking lot](02-parking-lot.md) | Entities, spot allocation strategy, fees, concurrency |
| 3 | [Elevator system](03-elevator-system.md) | State, scheduling strategy, requests |
| 4 | [Vending machine and ATM](04-vending-machine-and-atm.md) | State pattern, money handling, failure cases |
| 5 | [Movie ticket booking](05-movie-ticket-booking.md) | Seat locking, holds and timeouts, payments |
| 6 | [Splitwise (expense sharing)](06-splitwise-expense-sharing.md) | Split strategies, balances, settling debts |
| 7 | [Rate limiter and LRU cache](07-rate-limiter-and-lru-cache.md) | Token bucket and sliding window classes, cache design |
| 8 | [Logger and notification system](08-logger-and-notification-system.md) | Chain of responsibility, observer, channels and retries |
| 9 | [Library and inventory management](09-library-and-inventory-management.md) | Catalog, members, reservations, fines |
| 10 | [Shopping cart, pricing and discounts](10-shopping-cart-pricing-and-discounts.md) | Strategy and decorator for pricing rules, coupons |
| 11 | [Tic-tac-toe and snake and ladder](11-tic-tac-toe-and-snake-and-ladder.md) | Game loop, board, players, win checks |
| 12 | [In-memory file system and key-value store](12-in-memory-file-system-and-key-value-store.md) | Composite pattern, paths, TTL, transactions |
| 13 | [Pub-sub and task scheduler](13-pub-sub-and-task-scheduler.md) | Topics, subscribers, scheduling, retries |

**Interview practice:** every problem ends with its own follow-up questions and a "How to present this in the interview" plan.

**Back to:** [repository home](../README.md)
