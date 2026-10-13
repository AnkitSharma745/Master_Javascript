# TS02 — Generics and useful type transformations

## Learning objective

Preserve input/output relationships with constrained types. Use the root runtime/compiler unless a framework-specific example says otherwise.

## Prerequisites

[TS01](../../lessons/05-typescript/TS01-contracts.md)

## Explanation and mechanism

A generic relates types across an operation. It is useful when output depends on input type; adding T to an operation that never uses that relationship may only complicate the interface.

A constraint states which operations are valid on T. keyof selects known keys of a type; indexed access T[K] selects a property's type; typeof in a type position describes a value's inferred type. These operators manipulate types at compile time, not runtime objects.

## Examples and execution trace

Compiled in [contracts.ts](../../labs/contracts.ts):
```typescript
function get<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}
const issue = { id: "i1", retries: 2 };
const retries = get(issue, "retries"); // number
// get(issue, "missing"); // Compile error: not a key.
```

T is inferred from the object. K is constrained by its keys. The result depends on the chosen key, so it retains number rather than string | number. Returning any would discard that relationship.

Mapped types iterate over keys:
```typescript
type OptionalFields<T> = { [K in keyof T]?: T[K] };
type Labels<T> = { [K in keyof T]: string };
type Result<T> = { ok: true; value: T } | { ok: false; error: string };
```

Conditional types choose by assignability. A conditional with a naked type parameter distributes over unions:
```typescript
type ArrayOf<T> = T extends unknown ? T[] : never;
type Distributed = ArrayOf<string | number>; // string[] | number[]
type WholeArray<T> = [T] extends [unknown] ? T[] : never;
type Together = WholeArray<string | number>; // (string | number)[]
```

Template literal types create constrained string forms, such as a finite set of event names from property keys. They are appropriate for contract design, but runtime strings still need validation.

## as const, satisfies, and utility types

as const preserves literal information and readonly type positions; it does not freeze runtime data. satisfies (TypeScript 4.9+) checks compatibility while retaining useful inferred information:
```typescript
const routes = {
  issues: "/issues",
  settings: "/settings"
} as const satisfies Record<string, string>;
```

Partial, Pick, Omit, Record, Readonly, Parameters, ReturnType, and Awaited express common transformations. A Partial domain object is not automatically a valid update DTO: it may permit fields callers must never change. Define writable fields first.

## Alternatives and common mistakes

Generic parameter defaults supply type arguments, not missing runtime values. createPair<T = string>(value: T) still requires value. Constrain a repository by real capabilities rather than promising that every entity has identical CRUD/transaction behavior.

Assignability and variance matter for function contracts: a callback accepting only one narrower subtype cannot safely process every broader input. strictFunctionTypes checks many such cases, with historical exceptions for methods. This is a primer; the deeper variance lesson is planned.

## Interview preparation

“Generics preserve a useful relationship. I constrain only what the implementation needs, infer where possible, and use transformations that communicate the API. I reject clever types if callers cannot understand the error messages.” Follow-up: distinguish a generic return relationship from unknown or a union.

## Practice

Write a typed pluck function. Define an update DTO excluding id. Predict distributed and non-distributed conditional results. Explain why a generic default cannot produce a runtime default argument.

## Revision

T is a relationship; extends is a constraint; keyof names keys; T[K] selects type; satisfies checks; as const preserves literals.

## Completion criteria

Compile two valid calls and one intentionally invalid call with @ts-expect-error, preserve inferred result types, and explain a constraint without reading the implementation.

[Hints and solutions](../../practice/solutions.md#ts02) · [Question Q15](../../interviews/answers.md#q15)

## References

[Primary sources and version notes](../../references/README.md#tsgenerics); verified 2026-10-13.

