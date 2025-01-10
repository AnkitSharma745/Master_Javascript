# Introduction to Asynchronous JavaScript

Asynchronous programming is essential in JavaScript for tasks that involve waiting for a process to complete (e.g., fetching data from a server) without blocking the execution of other code. This document provides an in-depth exploration of asynchronous JavaScript, covering concepts like `setTimeout`, `setInterval`, callbacks, promises, and `async/await`.

---

## Table of Contents

1. [setTimeout and setInterval](#1-settimeout-and-setinterval)

   - [What are `setTimeout` and `setInterval`](#what-are-settimeout-and-setinterval)
   - [Examples](#examples)
   - [Use Cases](#use-cases)
   - [Common Pitfalls](#common-pitfalls)

2. [Callbacks and Callback Hell](#2-callbacks-and-callback-hell)

   - [What are Callbacks](#what-are-callbacks)
   - [Understanding Callback Hell](#understanding-callback-hell)
   - [Examples](#examples-1)
   - [Avoiding Callback Hell](#avoiding-callback-hell)

3. [Promises](#3-promises)

   - [What are Promises](#what-are-promises)
   - [States of a Promise](#states-of-a-promise)
   - [Methods: `then()`, `catch()`, `finally()`](#methods-then-catch-finally)
   - [Examples](#examples-2)
   - [Chaining Promises](#chaining-promises)
   - [Error Handling](#error-handling)

4. [async and await](#4-async-and-await)
   - [What is `async/await`](#what-is-asyncawait)
   - [Examples](#examples-3)
   - [Error Handling](#error-handling-1)
   - [Best Practices](#best-practices)

---

## 1. setTimeout and setInterval

### What are `setTimeout` and `setInterval`

- `setTimeout`: Executes a function after a specified delay (in milliseconds).
- `setInterval`: Repeatedly executes a function at specified intervals (in milliseconds).

### Examples

#### Example 1: Using `setTimeout`

```javascript
console.log("Before Timeout");
setTimeout(() => {
  console.log("Executed after 2 seconds");
}, 2000);
console.log("After Timeout");
```

#### Example 2: Using `setInterval`

```javascript
let counter = 0;
const interval = setInterval(() => {
  console.log(`Count: ${++counter}`);
  if (counter === 5) clearInterval(interval); // Stops after 5 iterations
}, 1000);
```

### Use Cases

- **`setTimeout`**: Use for tasks that need to be delayed, like animations or showing alerts.
- **`setInterval`**: Use for repetitive tasks like updating a clock.

### Common Pitfalls

- **Memory Leaks**: Ensure intervals are cleared to avoid memory leaks.
- **Accuracy**: `setInterval` may drift over time due to execution delays.

---

## 2. Callbacks and Callback Hell

### What are Callbacks

- A **callback** is a function passed as an argument to another function and executed after the completion of that function.

#### Example 1: Basic Callback

```javascript
function greet(name, callback) {
  console.log(`Hello, ${name}`);
  callback();
}

greet("John", () => {
  console.log("Callback executed!");
});
```

### Understanding Callback Hell

- **Callback Hell** occurs when multiple nested callbacks make code difficult to read and maintain.

#### Example 2: Nested Callbacks

```javascript
setTimeout(() => {
  console.log("Step 1");
  setTimeout(() => {
    console.log("Step 2");
    setTimeout(() => {
      console.log("Step 3");
    }, 1000);
  }, 1000);
}, 1000);
```

### Avoiding Callback Hell

- **Use Promises**: Promises provide a cleaner way to handle asynchronous operations.
- **Use `async/await`**: Makes asynchronous code look synchronous and improves readability.

---

## 3. Promises

### What are Promises

- A **Promise** is an object representing the eventual completion or failure of an asynchronous operation.

### States of a Promise

- `pending`: Initial state
- `fulfilled`: Operation completed successfully
- `rejected`: Operation failed

### Methods: `then()`, `catch()`, `finally()`

- **`then()`**: Executes after the promise is resolved.
- **`catch()`**: Executes after the promise is rejected.
- **`finally()`**: Executes after the promise is settled (either resolved or rejected).

#### Example 1: Basic Promise

```javascript
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Promise Resolved!");
  } else {
    reject("Promise Rejected!");
  }
});

myPromise
  .then((message) => console.log(message))
  .catch((error) => console.error(error))
  .finally(() => console.log("Promise settled"));
```

### Chaining Promises

#### Example 2: Chaining Promises

```javascript
const fetchData = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(data), 1000);
  });
};

fetchData("Step 1")
  .then((result) => {
    console.log(result);
    return fetchData("Step 2");
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.error(error));
```

### Error Handling

- Use `.catch()` to handle errors in promise chains.
- Use `.finally()` for cleanup actions regardless of the promise outcome.

---

## 4. async and await

### What is `async/await`

- **`async`**: Declares a function as asynchronous, which always returns a Promise.
- **`await`**: Pauses the execution of the function until the Promise is resolved.

### Examples

#### Example 1: Basic `async/await`

```javascript
async function fetchData() {
  const data = await new Promise((resolve) => {
    setTimeout(() => resolve("Data fetched"), 2000);
  });
  console.log(data);
}

fetchData();
```

### Error Handling

- Use `try-catch` blocks to handle errors in `async/await` functions.

#### Example 2: Error Handling with `async/await`

```javascript
async function fetchWithError() {
  try {
    const data = await new Promise((resolve, reject) => {
      setTimeout(() => reject("Error occurred!"), 2000);
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

fetchWithError();
```

### Best Practices

- **Avoid Blocking Code**: Ensure asynchronous functions do not block the main thread.
- **Graceful Error Handling**: Always handle errors using `try-catch` or `.catch()`.
- **Use `finally` for Cleanup**: Perform cleanup actions in `finally` blocks.

---

## Summary

- **`setTimeout` and `setInterval`** are used for delaying and repeating tasks.
- **Callbacks** are functions executed after another function completes but can lead to nested code (callback hell).
- **Promises** provide a better way to handle asynchronous operations with `then()`, `catch()`, and `finally()`.
- **`async/await`** makes asynchronous code look synchronous and improves readability.

Mastering these concepts is crucial for writing efficient, non-blocking JavaScript code.

# Asynchronous JavaScript

Asynchronous programming is essential in JavaScript for tasks that involve waiting for a process to complete (e.g., fetching data from a server) without blocking the execution of other code. This document provides an in-depth exploration of asynchronous JavaScript, covering concepts like `setTimeout`, `setInterval`, callbacks, promises, and `async/await`.

---

## Table of Contents

1. [setTimeout and setInterval](#1-settimeout-and-setinterval)

   - [What are `setTimeout` and `setInterval`](#what-are-settimeout-and-setinterval)
   - [Examples](#examples)

2. [Callbacks and Callback Hell](#2-callbacks-and-callback-hell)

   - [What are Callbacks](#what-are-callbacks)
   - [Understanding Callback Hell](#understanding-callback-hell)
   - [Examples](#examples-1)

3. [Promises](#3-promises)

   - [What are Promises](#what-are-promises)
   - [Methods: `then()`, `catch()`](#methods-then-catch)
   - [Examples](#examples-2)

4. [async and await](#4-async-and-await)
   - [What is `async/await`](#what-is-asyncawait)
   - [Error Handling](#error-handling)
   - [Examples](#examples-3)

---

## 1. setTimeout and setInterval

### What are `setTimeout` and `setInterval`

- `setTimeout`: Executes a function after a specified delay (in milliseconds).
- `setInterval`: Repeatedly executes a function at specified intervals (in milliseconds).

### Examples

#### Example 1: Using `setTimeout`

```javascript
console.log("Before Timeout");
setTimeout(() => {
  console.log("Executed after 2 seconds");
}, 2000);
console.log("After Timeout");
```

- **When to Use**: Use `setTimeout` for tasks that need to be delayed, like animations or showing alerts.

#### Example 2: Using `setInterval`

```javascript
let counter = 0;
const interval = setInterval(() => {
  console.log(`Count: ${++counter}`);
  if (counter === 5) clearInterval(interval); // Stops after 5 iterations
}, 1000);
```

- **When to Use**: Use `setInterval` for repetitive tasks like updating a clock.

---

## 2. Callbacks and Callback Hell

### What are Callbacks

- A **callback** is a function passed as an argument to another function and executed after the completion of that function.

#### Example 1: Basic Callback

```javascript
function greet(name, callback) {
  console.log(`Hello, ${name}`);
  callback();
}

greet("John", () => {
  console.log("Callback executed!");
});
```

### Understanding Callback Hell

- **Callback Hell** occurs when multiple nested callbacks make code difficult to read and maintain.

#### Example 2: Nested Callbacks

```javascript
setTimeout(() => {
  console.log("Step 1");
  setTimeout(() => {
    console.log("Step 2");
    setTimeout(() => {
      console.log("Step 3");
    }, 1000);
  }, 1000);
}, 1000);
```

**Solution**: Use Promises or `async/await` to avoid callback hell.

---

## 3. Promises

### What are Promises

- A **Promise** is an object representing the eventual completion or failure of an asynchronous operation.

#### States of a Promise:

- `pending`: Initial state
- `fulfilled`: Operation completed successfully
- `rejected`: Operation failed

### Methods: `then()`, `catch()`

- **`then()`**: Executes after the promise is resolved.
- **`catch()`**: Executes after the promise is rejected.

#### Example 1: Basic Promise

```javascript
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Promise Resolved!");
  } else {
    reject("Promise Rejected!");
  }
});

myPromise
  .then((message) => console.log(message))
  .catch((error) => console.error(error));
```

#### Example 2: Chaining Promises

```javascript
const fetchData = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(data), 1000);
  });
};

fetchData("Step 1")
  .then((result) => {
    console.log(result);
    return fetchData("Step 2");
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.error(error));
```

---

## 4. async and await

### What is `async/await`

- **`async`**: Declares a function as asynchronous, which always returns a Promise.
- **`await`**: Pauses the execution of the function until the Promise is resolved.

#### Example 1: Basic `async/await`

```javascript
async function fetchData() {
  const data = await new Promise((resolve) => {
    setTimeout(() => resolve("Data fetched"), 2000);
  });
  console.log(data);
}

fetchData();
```

### Error Handling

- Use `try-catch` blocks to handle errors in `async/await` functions.

#### Example 2: Error Handling with `async/await`

```javascript
async function fetchWithError() {
  try {
    const data = await new Promise((resolve, reject) => {
      setTimeout(() => reject("Error occurred!"), 2000);
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

fetchWithError();
```

---

## Summary

- **`setTimeout` and `setInterval`** are used for delaying and repeating tasks.
- **Callbacks** are functions executed after another function completes but can lead to nested code (callback hell).
- **Promises** provide a better way to handle asynchronous operations with `then()` and `catch()`.
- **`async/await`** makes asynchronous code look synchronous and improves readability.
