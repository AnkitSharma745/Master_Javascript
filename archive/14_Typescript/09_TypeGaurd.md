> Supplementary original notes. Start with [TS01](../../lessons/05-typescript/TS01-contracts.md). Run snippets separately; this archive is not a fully executed lesson suite. See the [audit](../../docs/audit/original-audit.md).

# Type Guards in TypeScript

Type Guards help developers create type-safe code by narrowing down the types of variables at runtime. This is particularly useful when working with union types.

## Why Use Type Guards?

- Ensures type safety by reducing runtime errors.
- Provides more predictable and maintainable code.
- Helps with better type inference by the TypeScript compiler.

---

## Built-in Type Guards

### 1. `typeof` Operator

The `typeof` operator is used to check the primitive type of a variable.

#### Example

```typescript
function printLength(value: string | number) {
  if (typeof value === "string") {
    console.log(`String length: ${value.length}`);
  } else {
    console.log(`Number length: Not applicable`);
  }
}

printLength("Hello"); // String length: 5
printLength(123); // Number length: Not applicable
```

### 2. `instanceof` Operator

The `instanceof` operator checks whether an object is an instance of a specific class.

#### Example

```typescript
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

---

## Custom Type Guards (User-Defined Type Guards)

A custom type guard is a function that returns a type predicate.

### Example

```typescript
interface Bird {
  fly(): void;
  feathers: number;
}

interface Fish {
  swim(): void;
  fins: number;
}

function isBird(animal: Bird | Fish): animal is Bird {
  return (animal as Bird).fly !== undefined;
}

function move(animal: Bird | Fish) {
  if (isBird(animal)) {
    animal.fly();
  } else {
    animal.swim();
  }
}
```

---

## Narrowing Types with Type Guards

TypeScript's control flow analysis allows narrowing types within conditional statements.

### Example

```typescript
function formatInput(input: string | number | boolean) {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else if (typeof input === "number") {
    return input.toFixed(2);
  } else {
    return input ? "True" : "False";
  }
}

console.log(formatInput("hello")); // Output: HELLO
console.log(formatInput(42)); // Output: 42.00
console.log(formatInput(true)); // Output: True
```

---

## `in` Keyword for Property Checks

The `in` keyword checks if a specific property exists in an object.

### Example

```typescript
interface Car {
  brand: string;
  drive(): void;
}

interface Boat {
  brand: string;
  sail(): void;
}

function operate(vehicle: Car | Boat) {
  if ("drive" in vehicle) {
    vehicle.drive();
  } else {
    vehicle.sail();
  }
}
```

---

## `is` Keyword in Type Guards

The `is` keyword is used in custom type guard functions to assert the type of a variable.

### Example

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function printMessage(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  } else {
    console.log("Value is not a string");
  }
}

printMessage("hello world"); // Output: HELLO WORLD
printMessage(123); // Output: Value is not a string
```

---

## Best Practices for Using Type Guards

- **Use Built-in Guards First:** Rely on `typeof` and `instanceof` for simple checks.
- **Define Custom Guards:** For complex type checks, create reusable custom type guards.
- **Combine Guards:** Use multiple type guards for comprehensive type validation.
- **Avoid Type Assertions:** Prefer type guards over type assertions (`as` keyword) to maintain type safety.

This document now covers both modules/namespaces and type guards in TypeScript with detailed explanations and practical examples.
