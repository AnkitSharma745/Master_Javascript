## Example 1: Function with Multiple Return Paths

```javascript
function calculateGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

console.log(calculateGrade(85)); // Output: B
console.log(calculateGrade(42)); // Output: F
```

---

## Example 2: Function Returning Another Function

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

## Example 3: Recursion - Factorial Calculation

```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // Output: 120
```

---

## Example 4: Closure for Private Variables

```javascript
function counter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const myCounter = counter();
console.log(myCounter.increment()); // Output: 1
console.log(myCounter.increment()); // Output: 2
console.log(myCounter.decrement()); // Output: 1
console.log(myCounter.getCount()); // Output: 1
```

---

## Example 5: Callback with Asynchronous Function

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback("Data loaded");
  }, 2000);
}

fetchData((message) => console.log(message)); // Output: Data loaded (after 2 seconds)
```

---

## Example 6: Using Rest and Spread Operators

```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

const nums = [10, 20, 30];
console.log(sum(...nums)); // Output: 60
console.log(sum(5, 15, 25, 35)); // Output: 80
```

---

## Example 7: Higher-Order Function for Array Transformation

```javascript
function transformArray(array, transformFunction) {
  return array.map(transformFunction);
}

const numbers = [1, 2, 3, 4];
const squares = transformArray(numbers, (num) => num * num);

console.log(squares); // Output: [1, 4, 9, 16]
```

---

## Example 8: Memoization - Caching Results

```javascript
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const slowSquare = (n) => {
  console.log("Computing square...");
  return n * n;
};

const memoizedSquare = memoize(slowSquare);
console.log(memoizedSquare(5)); // Output: Computing square... 25
console.log(memoizedSquare(5)); // Output: 25 (cached result)
```

---

## Example 9: Immediately Invoked Function Expressions (IIFE)

```javascript
const result = (() => {
  const secret = "Hidden message";
  return `The secret is: ${secret}`;
})();

console.log(result); // Output: The secret is: Hidden message
```

---

## Example 10: Dynamic Function Creation

```javascript
const generateFunction = new Function("a", "b", "return a + b;");
console.log(generateFunction(5, 10)); // Output: 15
```

---

## Example 11: Function with Default Parameters

```javascript
function greet(name = "Guest", message = "Welcome") {
  console.log(`${message}, ${name}!`);
}

greet(); // Output: Welcome, Guest!
greet("Ankit", "Hello"); // Output: Hello, Ankit!
```

---

## Example 12: Currying Function

```javascript
function curry(f) {
  return function (a) {
    return function (b) {
      return f(a, b);
    };
  };
}

function add(a, b) {
  return a + b;
}

const curriedAdd = curry(add);
console.log(curriedAdd(2)(3)); // Output: 5
```

---

## Example 13: Combining Closures and Callbacks

```javascript
function createTimer() {
  let startTime = null;

  return {
    start: () => (startTime = Date.now()),
    stop: () => {
      const endTime = Date.now();
      console.log(`Elapsed time: ${endTime - startTime}ms`);
    },
  };
}

const timer = createTimer();
timer.start();
setTimeout(timer.stop, 2000); // Output: Elapsed time: ~2000ms
```

---

## Example 14: Error Handling in Functions

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return a / b;
}

try {
  console.log(divide(10, 2)); // Output: 5
  console.log(divide(10, 0)); // Throws an error
} catch (error) {
  console.error(error.message); // Output: Division by zero is not allowed.
}
```

---

## Example 15: Function Composition

```javascript
function compose(f, g) {
  return (x) => f(g(x));
}

const multiplyBy2 = (x) => x * 2;
const add3 = (x) => x + 3;

const composedFunction = compose(multiplyBy2, add3);
console.log(composedFunction(5)); // Output: 16 (5 + 3 = 8, 8 * 2 = 16)
```

---

## Conclusion

Functions are incredibly versatile in JavaScript. Mastering concepts such as closures, currying, higher-order functions, and memoization will significantly improve your problem-solving skills. Practice these examples to build confidence and understanding.
