> Supplementary original notes. Start with [TS01](../../lessons/05-typescript/TS01-contracts.md). Run snippets separately; this archive is not a fully executed lesson suite. See the [audit](../../docs/audit/original-audit.md).

# Generics in TypeScript

Generics provide a way to create reusable components that can work with a variety of data types instead of a single, specific type. They allow developers to build flexible, maintainable, and type-safe code.

---

## Introduction to Generics

Generics enable you to define functions, classes, and interfaces that work with multiple types without sacrificing type safety.

### Example

```typescript
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("Hello")); // Output: Hello
console.log(identity<number>(42)); // Output: 42
```

In this example, `T` is a type parameter that acts as a placeholder for the actual type passed when calling the function.

---

## Generic Functions

Functions can accept generic parameters, making them adaptable to different types.

### Example

```typescript
function mergeArrays<T>(arr1: T[], arr2: T[]): T[] {
  return [...arr1, ...arr2];
}

const numbers = mergeArrays<number>([1, 2], [3, 4]);
console.log(numbers); // Output: [1, 2, 3, 4]
```

---

## Generic Classes

Generic classes allow defining classes that work with multiple types.

### Example

```typescript
class Box<T> {
  private content: T;

  constructor(content: T) {
    this.content = content;
  }

  getContent(): T {
    return this.content;
  }
}

const numberBox = new Box<number>(123);
console.log(numberBox.getContent()); // Output: 123

const stringBox = new Box<string>("TypeScript");
console.log(stringBox.getContent()); // Output: TypeScript
```

---

## Generic Constraints

Sometimes, you need to limit the types that can be used as generic parameters.

### Example: Using `extends`

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength("Hello"); // Output: 5
logLength([1, 2, 3]); // Output: 3
// logLength(42); // Error: Argument of type 'number' does not have a 'length' property
```

---

## Default Generics

You can provide default types for generics to fall back on if no type is explicitly provided.

### Example

```typescript
function createPair<T = string, U = number>(first: T, second: U): [T, U] {
  return [first, second];
}

// createPair(); // Compile error: type defaults do not supply runtime arguments.
console.log(createPair("Hello", 42)); // Output: ["Hello", 42]
```

---

## Using Generics with Interfaces and Types

Generics can be applied to interfaces and type aliases.

### Example: Interface

```typescript
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const pair: KeyValuePair<string, number> = { key: "age", value: 30 };
console.log(pair); // Output: { key: 'age', value: 30 }
```

### Example: Type Alias

```typescript
type Result<T> = { success: boolean; data: T };

const result: Result<string> = { success: true, data: "Operation completed." };
console.log(result);
```

---

## Type Inference in Generics

TypeScript can often infer the type for generics based on the provided arguments.

### Example

```typescript
function wrapValue<T>(value: T): T {
  return value;
}

const inferredString = wrapValue("Hello"); // Type inferred as string
const inferredNumber = wrapValue(42); // Type inferred as number
```

---

## Generic Utility Functions

Generics are commonly used in utility functions to perform type-safe operations.

### Example: Filtering

```typescript
function filterItems<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

const numbers = [1, 2, 3, 4, 5];
const evenNumbers = filterItems(numbers, (num) => num % 2 === 0);
console.log(evenNumbers); // Output: [2, 4]
```

---

## Best Practices for Using Generics

- **Name Type Parameters Meaningfully:** Use `T`, `U`, `K`, or more descriptive names like `Item`, `Key`, or `Value`.
- **Avoid Overcomplicating with Generics:** Use only when type flexibility is required.
- **Combine with Constraints:** Limit the allowed types using `extends` for more predictable code.
- **Provide Default Types:** Offer fallback types when possible.

---

This document provides an in-depth exploration of generics in TypeScript, covering key concepts, examples, and best practices to enhance type safety and reusability in your code.
