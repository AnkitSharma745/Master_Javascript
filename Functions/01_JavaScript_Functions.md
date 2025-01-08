
# JavaScript Functions

## What is a Function?
A **function** is a reusable block of code designed to perform a specific task. Functions allow developers to organize code into manageable sections, enabling modular and maintainable programming.

Functions can:
- Take inputs (parameters)
- Perform specific operations
- Return an output (or perform an action without returning)

---

## Types of Functions

### 1. Function Declaration
A **function declaration** defines a named function that can be called anywhere in the code due to **hoisting**.

**Syntax**:
```javascript
function functionName(parameters) {
  // Function body
}
```

**Example**:
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Ankit")); // Output: Hello, Ankit!
```

---

### 2. Function Expression
A **function expression** defines a function and assigns it to a variable. Unlike declarations, these are not hoisted.

**Syntax**:
```javascript
const functionName = function(parameters) {
  // Function body
};
```

**Example**:
```javascript
const multiply = function(a, b) {
  return a * b;
};

console.log(multiply(5, 4)); // Output: 20
```

---

### 3. Arrow Functions
**Arrow functions** provide a shorter syntax for writing functions and do not bind their own `this`.

**Syntax**:
```javascript
const functionName = (parameters) => {
  // Function body
};
```

**Example**:
```javascript
const add = (x, y) => x + y;
console.log(add(10, 15)); // Output: 25
```

**Key Features**:
- Implicit return for single-line expressions (no `return` keyword needed).
- Lexical `this` binding (inherits `this` from surrounding scope).

---

## Parameters and Arguments

### **Parameters**:
Placeholders defined in the function declaration.

### **Arguments**:
Actual values passed when calling the function.

**Example**:
```javascript
function greet(message, name) {
  console.log(`${message}, ${name}`);
}

greet("Hello", "Ankit"); // Output: Hello, Ankit
```

### Default Parameters
Allow you to set default values for parameters.

**Example**:
```javascript
function calculateTotal(price, tax = 0.05) {
  return price + price * tax;
}

console.log(calculateTotal(100)); // Output: 105
```

### Rest Parameters
Collect all remaining arguments into an array.

**Example**:
```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // Output: 10
```

### Spread Operator
Expands an array into individual arguments.

**Example**:
```javascript
const numbers = [1, 2, 3];
console.log(Math.max(...numbers)); // Output: 3
```

---

## Return Values
Functions can return values using the `return` keyword. If `return` is omitted, the function implicitly returns `undefined`.

**Example**:
```javascript
function square(num) {
  return num * num;
}

console.log(square(5)); // Output: 25
```

---

## Higher-Order Functions
Functions that take other functions as arguments or return a function.

**Example**:
```javascript
function higherOrderFunction(callback) {
  const message = "Hello from higher-order function!";
  callback(message);
}

higherOrderFunction((msg) => console.log(msg)); // Output: Hello from higher-order function!
```

---

## Closures
A **closure** is a function that retains access to its parent scope, even after the parent function has executed.

**Example**:
```javascript
function outerFunction(outerVar) {
  return function innerFunction(innerVar) {
    console.log(`Outer: ${outerVar}, Inner: ${innerVar}`);
  };
}

const closureFunc = outerFunction("outside");
closureFunc("inside"); // Output: Outer: outside, Inner: inside
```

---

## Immediately Invoked Function Expressions (IIFE)
Functions that execute immediately after being defined.

**Syntax**:
```javascript
(function() {
  console.log("This is an IIFE!");
})();
```

**Example**:
```javascript
(() => {
  console.log("Arrow IIFE example!");
})(); // Output: Arrow IIFE example!
```

---

## Callback Functions
Functions passed as arguments to other functions.

**Example**:
```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback("Data fetched successfully!");
  }, 1000);
}

fetchData((data) => console.log(data)); // Output: Data fetched successfully!
```

---

## Best Practices for Functions
1. **Use meaningful names**: Describe the function's purpose.
2. **Keep functions small**: Focus on a single task.
3. **Avoid side effects**: Ensure functions do not alter external variables.
4. **Document functionality**: Use comments or JSDoc.

---

## Summary
JavaScript functions are versatile tools for structuring your code. By understanding and utilizing concepts like parameters, closures, higher-order functions, and arrow functions, you can write cleaner and more efficient code.
