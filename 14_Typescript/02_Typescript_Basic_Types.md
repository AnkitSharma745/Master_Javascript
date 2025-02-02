# Basic Types in TypeScript

TypeScript provides several built-in types to add type safety and better readability to your JavaScript code. Understanding these basic types is crucial for writing reliable and maintainable TypeScript programs.

---

## 1. Primitive Types

### 1.1 `string`

The `string` type represents textual data.

#### Example:

```ts
let message: string = "Hello, TypeScript!";
console.log(message); // Output: Hello, TypeScript!
```

A `string` can be enclosed in single quotes (`'`), double quotes (`"`), or backticks (`` ` ``) for template literals.

#### Example (Template Literal):

```ts
let name: string = "Alice";
let greeting: string = `Hello, ${name}!`;
console.log(greeting); // Output: Hello, Alice!
```

---

### 1.2 `number`

The `number` type represents both integers and floating-point numbers.

#### Example:

```ts
let age: number = 25;
let price: number = 9.99;
console.log(`Age: ${age}, Price: ${price}`);
```

#### Special Numeric Values:

```ts
let infinityValue: number = Infinity;
let negativeInfinity: number = -Infinity;
let notANumber: number = NaN;
```

---

### 1.3 `boolean`

The `boolean` type represents `true` or `false` values.

#### Example:

```ts
let isCompleted: boolean = true;
console.log(`Task completed: ${isCompleted}`);
```

---

### 1.4 `null` and `undefined`

`null` and `undefined` are two distinct types in TypeScript but are often used together.

#### Example:

```ts
let nullValue: null = null;
let undefinedValue: undefined = undefined;
console.log(nullValue, undefinedValue);
```

By default, `strictNullChecks` in `tsconfig.json` ensures strict handling of `null` and `undefined`.

---

## 2. `any` and `unknown` Types

### 2.1 `any`

The `any` type allows a variable to hold values of any type, bypassing type checking.

#### Example:

```ts
let randomValue: any = 42;
randomValue = "Now it's a string";
randomValue = { key: "value" };
console.log(randomValue);
```

Using `any` too frequently can reduce the benefits of TypeScript, so it's generally discouraged.

---

### 2.2 `unknown`

The `unknown` type is safer than `any` because TypeScript enforces type checking before using it.

#### Example:

```ts
let unknownValue: unknown = "Hello";

// Type checking required
if (typeof unknownValue === "string") {
  console.log(unknownValue.toUpperCase());
}
```

---

## 3. `void` and `never` Types

### 3.1 `void`

`void` is used for functions that do not return a value.

#### Example:

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

---

### 3.2 `never`

`never` represents values that never occur, often used for functions that throw errors or never return.

#### Example:

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

---

## 4. Type Inference

TypeScript can infer types automatically without explicit type annotations.

#### Example:

```ts
let inferredString = "This is inferred as a string";
let inferredNumber = 100;
```

---

## 5. Explicit Type Annotations vs Inferred Types

| Concept                      | Example                                        |
| ---------------------------- | ---------------------------------------------- |
| **Explicit Type Annotation** | `let age: number = 30;`                        |
| **Type Inference**           | `let age = 30; // TypeScript infers as number` |

Explicit types make the code more readable and maintainable, while inferred types reduce redundancy.

---

## 6. Type Assertions

Type assertions help the compiler understand the expected type of a value.

### Syntax:

```ts
let someValue: any = "This is a string";
let strLength: number = (someValue as string).length;
console.log(strLength);
```

OR using angle-bracket syntax:

```ts
let strLength2: number = (<string>someValue).length;
```

---

## Summary

- **Primitive Types:** `string`, `number`, `boolean`, `null`, `undefined`
- **Flexible Types:** `any`, `unknown`
- **Function Return Types:** `void`, `never`
- **Type Inference:** Implicit typing
- **Type Assertions:** Used to explicitly tell TypeScript about a variable's type

Understanding these basic types ensures a strong foundation in TypeScript. Moving forward, we will explore more advanced types and features!
