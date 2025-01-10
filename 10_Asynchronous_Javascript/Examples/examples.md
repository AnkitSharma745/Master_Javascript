# Asynchronous JavaScript: In-Depth Guide

Asynchronous JavaScript enables non-blocking programming, allowing tasks to run in the background while other operations continue. This guide explains key concepts with examples.

---

## 1. `setTimeout` and `setInterval`

### `setTimeout`

Executes a function after a specified delay (in milliseconds).

#### Example:

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Executed after 2 seconds");
}, 2000);

console.log("End");
```

**Output:**

```
Start
End
Executed after 2 seconds
```

### `setInterval`

Repeats execution of a function at specified intervals (in milliseconds).

#### Example:

```javascript
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`Count: ${count}`);
  if (count === 5) {
    clearInterval(intervalId); // Stops the interval after 5 iterations
  }
}, 1000);
```

**Output:**

```
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
```

---

## 2. Callbacks and Callback Hell

### Callbacks

A function passed as an argument to another function, executed after an operation completes.

#### Example:

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback("Data fetched");
  }, 1000);
}

fetchData((data) => {
  console.log(data); // Outputs: Data fetched
});
```

### Callback Hell

Nested callbacks make code harder to read and maintain.

#### Example:

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

**Output:**

```
Step 1
Step 2
Step 3
```

---

## 3. Promises

Promises represent a value that may be available now, or in the future, or never.

### Creating and Using Promises

#### Example:

```javascript
const fetchData = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    if (success) {
      resolve("Data fetched successfully");
    } else {
      reject("Error fetching data");
    }
  }, 1000);
});

fetchData
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
```

**Output:**

```
Data fetched successfully
```

### Chaining Promises

#### Example:

```javascript
const step1 = () => Promise.resolve("Step 1 completed");
const step2 = () => Promise.resolve("Step 2 completed");
const step3 = () => Promise.resolve("Step 3 completed");

step1()
  .then((res) => {
    console.log(res);
    return step2();
  })
  .then((res) => {
    console.log(res);
    return step3();
  })
  .then((res) => {
    console.log(res);
  });
```

**Output:**

```
Step 1 completed
Step 2 completed
Step 3 completed
```

---

## 4. `async` and `await`

### Simplifies Promises

`async` functions return a Promise, and `await` pauses execution until the Promise resolves.

#### Example:

```javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched successfully");
    }, 1000);
  });
};

async function fetchDataAsync() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

fetchDataAsync();
```

**Output:**

```
Data fetched successfully
```

### Sequential `await`

#### Example:

```javascript
const step1 = () => Promise.resolve("Step 1 completed");
const step2 = () => Promise.resolve("Step 2 completed");
const step3 = () => Promise.resolve("Step 3 completed");

async function runSteps() {
  const res1 = await step1();
  console.log(res1);
  const res2 = await step2();
  console.log(res2);
  const res3 = await step3();
  console.log(res3);
}

runSteps();
```

**Output:**

```
Step 1 completed
Step 2 completed
Step 3 completed
```

---

## Comparison of Techniques

| Feature           | Callbacks           | Promises          | `async`/`await`   |
| ----------------- | ------------------- | ----------------- | ----------------- |
| Syntax Complexity | High (nested calls) | Medium (chaining) | Low (linear flow) |
| Readability       | Poor                | Moderate          | Excellent         |
| Error Handling    | Difficult           | `.catch()`        | `try/catch`       |
| Debugging         | Difficult           | Moderate          | Easy              |

---

By understanding these asynchronous concepts and examples, you can handle tasks like API calls, timers, and background processes effectively in JavaScript.
