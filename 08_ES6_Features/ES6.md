# ES6 and Modern JavaScript Features

This document provides an in-depth explanation of ES6 and modern JavaScript features with examples and explanations for each.

## Table of Contents

1. [Template Literals](#1-template-literals)
2. [Destructuring](#2-destructuring)
   - [Array Destructuring](#array-destructuring)
   - [Object Destructuring](#object-destructuring)
3. [Spread and Rest Operators](#3-spread-and-rest-operators)
   - [Spread Operator](#spread-operator)
   - [Rest Operator](#rest-operator)
4. [Default Parameters](#4-default-parameters)
5. [Arrow Functions](#5-arrow-functions)
6. [Let and Const](#6-let-and-const)
7. [Classes](#7-classes)
8. [Promises and Async/Await](#8-promises-and-asyncawait)
9. [Modules](#9-modules)
10. [Other Modern Features](#10-other-modern-features)
    - [Optional Chaining](#optional-chaining)
    - [Nullish Coalescing](#nullish-coalescing)
    - [Dynamic Imports](#dynamic-imports)

---

## 1. Template Literals

### Description

Template literals provide an easier way to create strings with embedded expressions using backticks (`` ` ``).

### Example

```javascript
const name = "Alice";
const greeting = `Hello, ${name}!`;
console.log(greeting); // Hello, Alice!

// Multiline Strings
const message = `This is a multiline
string using template literals.`;
console.log(message);
```

---

## 2. Destructuring

### Description

Destructuring allows unpacking values from arrays or properties from objects into distinct variables.

### Array Destructuring

```javascript
const arr = [1, 2, 3];
const [a, b, c] = arr;
console.log(a, b, c); // 1 2 3

// Skipping values
const [x, , z] = arr;
console.log(x, z); // 1 3

// Default values
const [p, q, r = 10] = [4, 5];
console.log(p, q, r); // 4 5 10
```

### Object Destructuring

```javascript
const person = { name: "Alice", age: 25 };
const { name, age } = person;
console.log(name, age); // Alice 25

// Renaming variables
const { name: fullName, age: years } = person;
console.log(fullName, years); // Alice 25

// Default values
const { gender = "female" } = person;
console.log(gender); // female
```

---

## 3. Spread and Rest Operators

### Spread Operator

The spread operator (`...`) is used to expand arrays or objects.

```javascript
// Array spread
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log(arr2); // [1, 2, 3, 4, 5]

// Object spread
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log(obj2); // { a: 1, b: 2, c: 3 }
```

### Rest Operator

The rest operator (`...`) is used to collect arguments into an array or group remaining properties.

```javascript
// Rest in functions
function sum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Rest in destructuring
const { a, ...rest } = { a: 1, b: 2, c: 3 };
console.log(rest); // { b: 2, c: 3 }
```

---

## 4. Default Parameters

### Description

Default parameters allow functions to have default values for parameters.

### Example

```javascript
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}
console.log(greet()); // Hello, Guest!
console.log(greet("Alice")); // Hello, Alice!
```

---

## 5. Arrow Functions

### Description

Arrow functions provide a shorter syntax for writing functions and do not bind their own `this`.

### Example

```javascript
// Traditional function
const add = function (a, b) {
  return a + b;
};

// Arrow function
const addArrow = (a, b) => a + b;
console.log(addArrow(2, 3)); // 5
```

---

## 6. Let and Const

### Description

`let` and `const` provide block-scoped variable declarations.

### Example

```javascript
let a = 10;
const b = 20;

if (true) {
  let a = 30; // Block scoped
  console.log(a); // 30
}
console.log(a); // 10
```

---

## 7. Classes

### Description

ES6 introduces classes as a syntactic sugar over prototype-based inheritance.

### Example

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

const alice = new Person("Alice", 25);
alice.greet(); // Hello, my name is Alice.
```

---

## 8. Promises and Async/Await

### Promises

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Success!"), 1000);
});

promise.then((result) => console.log(result)); // Success!
```

### Async/Await

```javascript
async function fetchData() {
  const data = await promise;
  console.log(data); // Success!
}
fetchData();
```

---

## 9. Modules

### Description

Modules allow importing and exporting functionality between files.

### Example

```javascript
// export.js
export const greet = (name) => `Hello, ${name}!`;

// import.js
import { greet } from "./export.js";
console.log(greet("Alice"));
```

---

## 10. Other Modern Features

### Optional Chaining

```javascript
const person = { name: "Alice", address: { city: "Wonderland" } };
console.log(person?.address?.city); // Wonderland
console.log(person?.contact?.phone); // undefined
```

### Nullish Coalescing

```javascript
const value = null;
console.log(value ?? "Default"); // Default
```

### Dynamic Imports

```javascript
(async () => {
  const module = await import("./export.js");
  console.log(module.greet("Alice"));
})();
```
