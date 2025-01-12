# Advanced JavaScript Concepts

This document provides a comprehensive exploration of advanced JavaScript concepts, covering modules, scope and closures, advanced functions, the event loop and concurrency model, closures and advanced scope, and functional programming concepts.

---

## Table of Contents

1. [Modules](#1-modules)

   - [Export and Import Statements](#export-and-import-statements)
   - [Default and Named Exports](#default-and-named-exports)

2. [Scope and Closures](#2-scope-and-closures)

   - [Lexical Scoping](#lexical-scoping)
   - [Closures and Practical Examples](#closures-and-practical-examples)
   - [Block Scope vs. Function Scope](#block-scope-vs-function-scope)

3. [Advanced Functions](#3-advanced-functions)

   - [Currying and Partial Application](#currying-and-partial-application)
   - [Higher-order Functions and Composition](#higher-order-functions-and-composition)
   - [Memoization and Optimization](#memoization-and-optimization)
   - [Function Binding (`bind`, `call`, `apply`)](#function-binding-bind-call-apply)

4. [Event Loop and Concurrency Model](#4-event-loop-and-concurrency-model)

   - [Stack, Heap, Event Queue, and Web APIs](#stack-heap-event-queue-and-web-apis)
   - [Microtasks vs. Macrotasks](#microtasks-vs-macrotasks)
   - [Callbacks, Promises, and the Event Loop](#callbacks-promises-and-the-event-loop)
   - [Understanding Asynchronous Execution](#understanding-asynchronous-execution)

5. [Closures and Advanced Scope](#5-closures-and-advanced-scope)

   - [IIFE (Immediately Invoked Function Expressions)](#iife-immediately-invoked-function-expressions)
   - [Module Patterns](#module-patterns)

6. [Functional Programming Concepts](#6-functional-programming-concepts)
   - [Pure Functions](#pure-functions)
   - [Immutability](#immutability)
   - [Higher-order Functions](#higher-order-functions)
   - [First-class Functions](#first-class-functions)
   - [Function Composition](#function-composition)

---

## 1. Introduction to Modules

Modules were introduced in ES6 (ES2015) to simplify JavaScript's approach to code organization. A module is just a JavaScript file that can export and import code. Modules in JavaScript are a way to break down code into smaller, reusable, and self-contained pieces. They help in organizing code for better maintainability and scalability.

- **Why Use Modules?**
  - Reusability: Write code once and reuse it in different places.
  - Maintainability: Smaller files are easier to debug and manage.
  - Scope Isolation: Variables and functions in a module are scoped to the module by default.

---

## 2. Exporting and Importing

The `export` and `import` statements are used to share and use code across modules.

### Example: Exporting and Importing

**File: mathUtils.js**

```javascript
// Exporting a function
export function add(a, b) {
  return a + b;
}
```

**File: app.js**

```javascript
// Importing the function
import { add } from "./mathUtils.js";

console.log(add(2, 3)); // Output: 5
```

### When to Use

- Use `export` to expose functions, variables, or classes from a module.
- Use `import` to use those exports in another module.

---

## 3. Default and Named Exports

### Named Exports

Allows exporting multiple items from a module. The importing module must use the same names.

#### Example:

**File: mathUtils.js**

```javascript
export const pi = 3.14;
export function multiply(a, b) {
  return a * b;
}
```

**File: app.js**

```javascript
import { pi, multiply } from "./mathUtils.js";

console.log(pi); // Output: 3.14
console.log(multiply(2, 3)); // Output: 6
```

### Default Exports

Each module can have one default export. The importing module can name it anything.

#### Example:

**File: mathUtils.js**

```javascript
export default function divide(a, b) {
  return a / b;
}
```

**File: app.js**

```javascript
import divide from "./mathUtils.js";

console.log(divide(6, 3)); // Output: 2
```

### Combining Named and Default Exports

A module can have both named and default exports.

#### Example:

**File: mathUtils.js**

```javascript
export const pi = 3.14;
export default function add(a, b) {
  return a + b;
}
```

**File: app.js**

```javascript
import add, { pi } from "./mathUtils.js";

console.log(pi); // Output: 3.14
console.log(add(2, 3)); // Output: 5
```

---

## 4. Dynamic Imports

Dynamic imports allow loading modules at runtime instead of at the start.

### Example:

```javascript
// app.js
const loadMathUtils = async () => {
  const mathUtils = await import("./mathUtils.js");
  console.log(mathUtils.add(2, 3)); // Output: 5
};

loadMathUtils();
```

### When to Use

- Load modules only when needed, improving performance.
- Useful for lazy loading and code splitting in web applications.

---

## Key Points to Remember

1. Use `export` to expose code and `import` to use it.
2. Use named exports for multiple items and default exports for a single primary item.
3. Dynamic imports provide flexibility for runtime loading.
4. Modules make JavaScript applications more scalable and maintainable.

# 2. Scope and Closures in JavaScript

## 1. Lexical Scoping

Lexical scoping means that the scope of a variable is determined by its placement in the source code. Inner functions can access variables defined in their outer scope, regardless of where the function is called.

### Example:

```javascript
function outer() {
  let outerVar = "I'm from the outer scope";
  function inner() {
    console.log(outerVar); // Accessing outerVar
  }
  inner(); // Calling the inner function
}
outer(); // Output: I'm from the outer scope
```

---

## 2. Closures

A closure is a function that retains access to its outer scope, even after the outer function has executed. Closures are created every time a function is defined.

### Practical Example 1: Data Privacy

```javascript
function createCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // Output: 1
console.log(counter()); // Output: 2
```

In the example above, the returned function forms a closure by retaining access to the `count` variable, even after `createCounter` has finished execution.

### Practical Example 2: Function Factories

Closures are often used to create functions with pre-configured settings.

```javascript
function createMultiplier(multiplier) {
  return function (value) {
    return value * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // Output: 10
console.log(triple(5)); // Output: 15
```

---

## 3. Block Scope vs. Function Scope

JavaScript has two main types of scopes: block scope and function scope.

### Block Scope

Variables declared with `let` and `const` are block-scoped, meaning they are only accessible within the enclosing `{}`.

```javascript
{
  let x = 10;
  const y = 20;
  console.log(x, y); // Output: 10 20
}
// console.log(x, y); // Error: x and y are not defined
```

### Function Scope

Variables declared with `var` are function-scoped, meaning they are accessible throughout the entire function.

```javascript
function test() {
  if (true) {
    var x = 10;
  }
  console.log(x); // Output: 10
}
test();
```

---

## Summary

- **Lexical Scoping**: Determines variable scope based on its position in the source code.
- **Closures**: Functions that retain access to their outer scope, even after the outer function has finished execution.
- **Block Scope**: `let` and `const` are block-scoped.
- **Function Scope**: `var` is function-scoped.

Closures and scoping are fundamental concepts in JavaScript, powering features like private variables, callback functions, and higher-order functions.

## 3. Advanced Functions

### 1. Currying and Partial Application

**Currying** is a technique in functional programming where a function with multiple arguments is transformed into a series of functions, each taking one argument.

#### Example:

```javascript
function curryAdd(a) {
  return function (b) {
    return a + b;
  };
}
console.log(curryAdd(5)(3)); // Output: 8
```

### 2. Higher-order Functions and Composition

A **higher-order function** is a function that either takes another function as an argument or returns a function as a result.

#### Example: Higher-order Function

```javascript
function applyOperation(arr, operation) {
  return arr.map(operation);
}

const numbers = [1, 2, 3, 4];
const square = (x) => x * x;
console.log(applyOperation(numbers, square)); // Output: [1, 4, 9, 16]
```

#### Example: Function Composition

Function composition combines multiple functions to create a new function.

```javascript
function compose(f, g) {
  return function (x) {
    return f(g(x));
  };
}

const multiplyBy2 = (x) => x * 2;
const add3 = (x) => x + 3;

const composedFunction = compose(multiplyBy2, add3);
console.log(composedFunction(5)); // Output: 16
```

### 3. Memoization and Optimization

**Memoization** is an optimization technique that caches the results of function calls so that subsequent calls with the same arguments return the cached result.

#### Example:

```javascript
function memoize(fn) {
  const cache = {};
  return function (arg) {
    if (cache[arg] !== undefined) {
      return cache[arg];
    }
    const result = fn(arg);
    cache[arg] = result;
    return result;
  };
}

const factorial = memoize((n) => (n <= 1 ? 1 : n * factorial(n - 1)));

console.log(factorial(5)); // Output: 120
console.log(factorial(5)); // Output: 120 (retrieved from cache)
```

---

## 4. Event Loop and Concurrency Model

### 1. Stack, Heap, Event Queue, and Web APIs

JavaScript is single-threaded but uses a concurrency model to handle asynchronous operations efficiently.

- **Call Stack**: Executes synchronous functions in order.
- **Heap**: Allocates memory for objects and variables.
- **Event Queue**: Manages asynchronous callbacks.
- **Web APIs**: Handles browser-provided features like `setTimeout`, `fetch`, and DOM events.

#### Example:

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout Callback");
}, 1000);

console.log("End");
```

**Output:**

```
Start
End
Timeout Callback
```

---

## 5. Closures and Advanced Scope

### 1. IIFE (Immediately Invoked Function Expressions)

An **IIFE** is a function that executes immediately after being defined. It is useful for creating private scopes.

#### Example:

```javascript
(function () {
  let privateVar = "I'm private";
  console.log(privateVar);
})();

// privateVar is not accessible here.
```

---

## 6. Functional Programming Concepts

### 1. Pure Functions

A **pure function** is a function that:

- Has no side effects (does not modify external variables or state).
- Always produces the same output for the same input.

#### Example:

```javascript
function pureAdd(a, b) {
  return a + b;
}
console.log(pureAdd(3, 5)); // Output: 8
```

### 2. Immutability

In functional programming, immutability ensures that data is not modified but instead creates a new copy.

#### Example:

```javascript
const arr = [1, 2, 3];
const newArr = [...arr, 4];

console.log(arr); // Output: [1, 2, 3]
console.log(newArr); // Output: [1, 2, 3, 4]
```

---

## Summary

- **Currying**: Breaking a function into multiple functions with one argument.
- **Higher-order Functions**: Functions that accept or return other functions.
- **Memoization**: Caching function results for performance optimization.
- **Event Loop**: JavaScript's mechanism to handle asynchronous operations.
- **IIFE**: Functions that execute immediately upon definition.
- **Functional Programming**: Emphasizes immutability, pure functions, and declarative programming.

---
