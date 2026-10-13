# TS01 — Types, narrowing, and runtime contracts

## Learning objective

Parse unknown data and model valid states with discriminated unions. Use the root runtime/compiler unless a framework-specific example says otherwise.

## Prerequisites

[JS06](../../lessons/02-javascript/JS06-modules.md)

## Explanation and mechanism

TypeScript describes permitted operations and relationships before execution. Most type annotations, aliases, and interfaces disappear from emitted JavaScript. They do not inspect bytes from a server. Some constructs, such as enums and decorators, can affect runtime output; do not say all TypeScript syntax erases.

Use inference for obvious local values and annotations for important public boundaries. Structural typing checks shapes rather than requiring a class name. Excess-property checks on fresh literals do not turn object types into exact runtime schemas.

unknown accepts any input but requires narrowing before use. any bypasses useful checking and can spread into callers. never describes an impossible value or a path that does not return. void in a callback contract means its returned value is ignored; such a callback may still return a value.

## Examples and execution trace

This parser is implemented and compiled in [contracts.ts](../../labs/contracts.ts):
```typescript
type Issue = { id: string; title: string; status: "open" | "closed" };

function parseIssue(value: unknown): Issue {
  if (typeof value !== "object" || value === null || Array.isArray(value))
    throw new TypeError("Expected object");
  const row = value as Record<string, unknown>;
  if (typeof row.id !== "string" || typeof row.title !== "string" ||
      (row.status !== "open" && row.status !== "closed"))
    throw new TypeError("Invalid issue");
  return { id: row.id, title: row.title, status: row.status };
}
```

The assertion permits inspecting keys after checking that value is an object; the property checks supply runtime evidence. The lab adds length/nonempty constraints. An assertion such as JSON.parse(text) as Issue supplies no such evidence.

Model UI states with a discriminated union:
```typescript
type LoadState<T> =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; data: T }
  | { kind: "error"; message: string };
```

This prevents “success without data” in checked code. A switch on kind narrows the state. Assign the default branch to never to request exhaustiveness checking when all known alternatives should be handled.

## Alternatives and common mistakes

Interfaces support declaration merging and object extension. Type aliases can describe unions, primitives, mapped types, and object shapes; classes can implement suitable object-shaped aliases too. Interfaces can have call signatures. Choose based on the contract and intended extension, not a false “interface is OOP, type is not” rule.

Intersection means satisfy both contracts. Conflicting property types can produce never; it is not a safe generic merge operator. A union permits one of several shapes and needs narrowing. null/undefined require explicit handling under strictNullChecks.

An unchecked type predicate can lie. Prefer a parser that either returns validated domain data or a structured failure. DTOs describe transport, domain models describe rules, and view models describe display; do not add three copies unless those responsibilities actually differ.

## Interview preparation

“TypeScript catches mistakes in checked code, but untrusted runtime data starts as unknown. I validate it, then use narrow domain types and discriminated unions to make invalid states harder to express.” Follow-up: show a case that compiles with an assertion but fails at runtime.

## Practice

Implement a parser for a list of issues and reject one invalid row. Replace loading/error/data booleans with a union. Compare interface and alias using a callable object and an implementable object shape.

## Revision

Compile-time contract ≠ runtime schema; union means alternatives; intersection means both; unknown requires evidence; assertion asserts rather than checks.

## Completion criteria

Pass the compiled parser tests, deliberately reject malformed external data, and handle every state without any.

[Hints and solutions](../../practice/solutions.md#ts01) · [Question Q14](../../interviews/answers.md#q14)

## References

[Primary sources and version notes](../../references/README.md#tsnarrow); verified 2026-10-13.

