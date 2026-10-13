# SD01 — Contracts, composition, SOLID, and refactoring

## Learning objective

Refactor actual contract violations and justify abstraction costs. Angular snippets target 16.2; standalone TypeScript labs use the root compiler.

## Prerequisites

[JS04](../../lessons/02-javascript/JS04-objects.md), [TS01](../../lessons/05-typescript/TS01-contracts.md)

## Explanation and mechanism

OOP groups state and operations behind a contract. Encapsulation protects invariants; abstraction exposes useful operations; polymorphism permits different implementations behind a compatible contract. Inheritance shares a subtype relationship; composition delegates to collaborators. JavaScript prototypes support both class syntax and object delegation.

A contract describes more than method names: accepted inputs, outputs, errors, side effects, and invariants. A subtype that strengthens input restrictions or weakens guarantees can break callers even if TypeScript accepts its shape.

Use SOLID to investigate changes and failures, not to memorize five slogans. Coupling describes how much a module knows about others; cohesion describes how closely its responsibilities belong together.

## Refactoring the five principles

### Single responsibility

```typescript
// Before: tax-rule changes and delivery-provider changes edit one function.
function invoice(order: Order) {
  const total = order.cents * 1.18;
  smtp.send(order.email, String(total));
}
// After: deterministic rule separated from delivery effect.
const totalWithTax = (cents: number, rate: number) => Math.round(cents * (1 + rate));
interface Sender { send(to: string, text: string): Promise<void>; }
```

The issue is independent reasons to change, not a maximum line count. One small function can still orchestrate collaborators. The names Order/smtp here are illustrative; compiled collaborators live in the lab.

### Open/closed

```typescript
// Before: every new shipping policy edits a central conditional.
const fee = (kind: string) => kind === "express" ? 500 : 100;
// After: inject the policy where variation is expected.
type ShippingPolicy = (weightKg: number) => number;
const checkoutFee = (weight: number, policy: ShippingPolicy) => policy(weight);
```

This creates an extension seam. A two-case stable conditional is often simpler; do not build a plugin system for imaginary future policies.

### Liskov substitution

```typescript
// Before: a read-only repository inherits save but throws for valid writes.
interface Writer { save(title: string): Promise<void>; }
// After: readers and writers promise only supported capabilities.
interface Reader { list(): Promise<readonly string[]>; }
```

A Penguin with a fly method returning “cannot fly” is not a valid implementation of a contract promising flight. Model FlyingAnimal separately, or compose a flying capability. Subtyping is about behavior, not names. A banking overdraft override that calls a base method rejecting any negative balance has the same contract problem.

### Interface segregation

```typescript
// Before: a reporting client depends on export, edit, delete, and admin settings.
interface ReportReader { readReport(id: string): Promise<string>; }
// After: a reader receives only its needed interface.
const reportLength = async (reader: ReportReader, id: string) =>
  (await reader.readReport(id)).length;
```

Smaller capability contracts reduce unrelated coupling. Too many one-method interfaces can make navigation worse; align them with real clients.

### Dependency inversion

```typescript
// Before: business policy constructs a concrete mail client internally.
// After: policy receives an abstraction; the composition root selects implementation.
interface Notify { send(message: string): Promise<void>; }
const announce = (notify: Notify, message: string) => notify.send(message);
```

Dependency injection is a construction technique; dependency inversion is the direction of policy dependencies. Passing a concrete service still injects it but may not invert the architectural dependency.

## Alternatives and common mistakes

Use classes for coherent identity/lifecycle and stateful invariants. Plain functions and records work well for transformations. TypeScript private/protected primarily restrict checked access; JavaScript # fields enforce runtime privacy. An underscore is only a convention. readonly does not freeze data.

DRY means avoid duplicated knowledge, not every repeated line. KISS favors understandable designs; YAGNI delays speculative capabilities. Extract an abstraction after recognizing a stable repeated policy. Refactor in small steps with behavior tests; an inheritance hierarchy can hide rules more effectively than it organizes them.

## Interview preparation

“I start with the caller's contract and the actual change pressure. I isolate policy from effects, use composition where behavior varies independently, and test substitutability. Each abstraction must buy something.” Follow-up: give an example where applying an interface makes code less clear.

## Practice

Refactor an invoice service with injected notification and tested pure total. Identify an inheritance contract violation in the archived banking example. For each SOLID rule, write a failing scenario, a refactor, and one cost introduced by the refactor.

## Revision

Contract before hierarchy; policy before provider; capability before giant interface; repeated knowledge before abstraction.

## Completion criteria

Demonstrate five before/after scenarios with behavioral evidence, explain DI versus DIP, and defend one decision to keep a simple conditional.

[Hints and solutions](../../practice/solutions.md#sd01) · [Question Q17](../../interviews/answers.md#q17)

## References

[Primary sources and version notes](../../references/README.md#tsgenerics); verified 2026-10-13.

