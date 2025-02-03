# Functions in TypeScript

Functions are the core building blocks of any TypeScript application. They allow modular, reusable, and type-safe logic in applications. TypeScript enhances functions with strong type checking and better code readability.

---

## 1. Function Declarations and Expressions

A function declaration defines a function with a name and an optional return type.

### Example:

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}
console.log(greet("Alice"));
```

A function expression assigns a function to a variable.

### Example:

```ts
const greetExpression = function (name: string): string {
  return `Hello, ${name}!`;
};
console.log(greetExpression("Bob"));
```

---

## 2. Function Signatures

A function signature defines the expected parameters and return type without implementation.

### Example:

```ts
type AddFn = (a: number, b: number) => number;

const add: AddFn = (x, y) => x + y;
console.log(add(5, 10));
```

---

## 3. Optional and Default Parameters

### Optional Parameters:

Use `?` to mark a parameter as optional.

```ts
function greet(name: string, age?: number): string {
  return age ? `Hello ${name}, you are ${age} years old.` : `Hello ${name}!`;
}
console.log(greet("Alice"));
console.log(greet("Bob", 25));
```

### Default Parameters:

Provide default values to parameters.

```ts
function greetWithDefault(name: string = "Guest"): string {
  return `Hello, ${name}!`;
}
console.log(greetWithDefault());
console.log(greetWithDefault("Charlie"));
```

---

## 4. Rest Parameters

Rest parameters allow a function to accept an arbitrary number of arguments.

### Example:

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}
console.log(sum(1, 2, 3, 4, 5));
```

---

## 5. Arrow Functions and Their Types

Arrow functions provide a shorter syntax for writing functions.

### Example:

```ts
const multiply = (a: number, b: number): number => a * b;
console.log(multiply(3, 4));
```

---

## 6. Function Return Types and Type Inference

If a return type is not explicitly specified, TypeScript infers it.

### Example:

```ts
function subtract(a: number, b: number) {
  return a - b; // TypeScript infers `number`
}
console.log(subtract(10, 5));
```

Explicit return types improve readability.

```ts
function divide(a: number, b: number): number {
  return a / b;
}
console.log(divide(10, 2));
```

---

## 7. `this` in Functions

### Issue with `this`:

In JavaScript, `this` can change depending on how a function is called.

### Example:

```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  greet() {
    return `Hello, my name is ${this.name}`;
  }
}

const person = new Person("Alice");
console.log(person.greet());
```

### `this` in Arrow Functions:

Arrow functions do not rebind `this`, making them useful in event handlers.

```ts
class Counter {
  count = 0;
  increment = () => {
    this.count++;
    console.log(this.count);
  };
}
const counter = new Counter();
document.addEventListener("click", counter.increment);
```

---

## Summary

- **Function Declarations and Expressions** provide structure.
- **Function Signatures** define expected inputs and outputs.
- **Optional and Default Parameters** improve flexibility.
- **Rest Parameters** allow handling multiple arguments.
- **Arrow Functions** offer concise syntax and `this` handling.
- **Function Return Types and Type Inference** ensure predictability.
- **Understanding `this`** is crucial for object-oriented programming.

Mastering functions in TypeScript improves code quality, modularity, and maintainability!
