> Supplementary original notes. Start with [TS01](../../lessons/05-typescript/TS01-contracts.md). Run snippets separately; this archive is not a fully executed lesson suite. See the [audit](../../docs/audit/original-audit.md).

# Advanced TypeScript Patterns

## 1. Conditional Types

Conditional types allow defining types based on a condition.

```ts
type IsString<T> = T extends string ? "Yes" : "No";
type Test1 = IsString<string>; // "Yes"
type Test2 = IsString<number>; // "No"
```

### Nested Conditional Types

```ts
type TypeCheck<T> = T extends string
  ? "String"
  : T extends number
    ? "Number"
    : "Other";
type Check1 = TypeCheck<string>; // "String"
type Check2 = TypeCheck<boolean>; // "Other"
```

---

## 2. Mapped Types

Mapped types allow transforming an existing type into another type.

```ts
type Optional<T> = {
  [K in keyof T]?: T[K];
};
type User = { name: string; age: number };
type OptionalUser = Optional<User>;
```

### Readonly Mapped Type

```ts
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};
type ReadonlyUser = Readonly<User>;
```

---

## 3. Utility Types

### Partial

Makes all properties optional.

```ts
type PartialUser = Partial<User>;
```

### Pick

Selects a subset of properties.

```ts
type PickedUser = Pick<User, "name">;
```

### Record

Creates a new type with specified keys.

```ts
type UserRoles = Record<"admin" | "editor", User>;
```

### Readonly

Marks properties as readonly.

```ts
type ImmutableUser = Readonly<User>;
```

---

## 4. Infer Keyword in Conditional Types

The `infer` keyword extracts types.

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
function example(): number {
  return 42;
}
type ExampleReturnType = ReturnType<typeof example>; // number
```

---

## 5. Recursive Types

Useful for structures like trees or JSON.

```ts
type NestedArray<T> = T | NestedArray<T>[];
let numbers: NestedArray<number> = [1, [2, [3, 4]], 5];
```

---

## 6. keyof and typeof for Type Mapping

### keyof Operator

Extracts keys of an object type.

```ts
type Keys = keyof User; // "name" | "age"
```

### typeof Operator

Infers the type from an existing value.

```ts
const user = { name: "John", age: 30 };
type UserType = typeof user;
```

---

## 7. Type Manipulation and Transformation

### Removing Properties with Exclude

```ts
type WithoutAge = Exclude<keyof User, "age">;
```

### Combining Types with Intersection

```ts
type Employee = { role: string };
type Person = User & Employee;
```

These advanced TypeScript patterns help in building scalable, maintainable, and type-safe applications.
