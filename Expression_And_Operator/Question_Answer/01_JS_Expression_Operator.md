# JavaScript Expressions and Operators

## Basic Questions

### 1. What is the difference between an expression and a statement in JavaScript?

An **expression** is a combination of values, variables, and operators that computes a value.  
Example: `5 + 3`, `x * y`  
A **statement** performs an action and doesn't necessarily return a value.  
Example: `let x = 10;`, `if (x > 5) { console.log(x); }`

### 2. What are the different types of operators in JavaScript?

- Arithmetic Operators
- Comparison Operators
- Logical Operators
- Bitwise Operators
- Assignment Operators
- Conditional (Ternary) Operator
- String Operators
- Special Operators (e.g., `typeof`, `instanceof`, `delete`, `in`, `...`)

### 3. How does the assignment operator (`=`) work in JavaScript?

The assignment operator assigns the value on its right to the variable on its left.  
Example: `let x = 10;` assigns `10` to `x`.

### 4. What is the difference between `==` and `===` in JavaScript?

- `==` compares values after type conversion (loose equality).  
  Example: `5 == "5"` evaluates to `true`.
- `===` compares both value and type (strict equality).  
  Example: `5 === "5"` evaluates to `false`.

## Code-Based Questions

### 5. What is the output of the following code?

```javascript
let a = 10,
  b = "10";
console.log(a == b); // true or false?
console.log(a === b); // true or false?
```

**Answer:**

- `a == b` is `true` because `==` performs type conversion.
- `a === b` is `false` because `===` checks both value and type.

### 6. Predict the output:

```javascript
let x = 5;
console.log(x++); // ?
console.log(++x); // ?
```

**Answer:**

- `x++` outputs `5` because it returns the current value before incrementing.
- `++x` outputs `7` because it increments first and then returns the value.

### 7. What does this code print?

```javascript
console.log(5 + "5"); // ?
console.log(5 - "2"); // ?
console.log("5" * "2"); // ?
```

**Answer:**

- `5 + "5"` outputs `"55"` because `+` triggers string concatenation.
- `5 - "2"` outputs `3` because `-` coerces strings to numbers.
- `"5" * "2"` outputs `10` due to implicit type conversion.

## Advanced Questions

### 8. How does the `typeof` operator work?

The `typeof` operator returns a string indicating the type of its operand.  
Example:

```javascript
typeof 10; // "number"
typeof "hello"; // "string"
typeof null; // "object" (historical quirk)
typeof undefined; // "undefined"
```

### 9. What is short-circuit evaluation in logical operators?

Short-circuiting occurs when logical operators (`&&` or `||`) stop evaluating as soon as the result is determined.  
Example:

```javascript
let a = true || console.log("This won't execute");
let b = false && console.log("This won't execute either");
```

### 10. How does the nullish coalescing operator (`??`) work?

It returns the right-hand operand if the left-hand operand is `null` or `undefined`.  
Example:

```javascript
let x = null ?? "default";
console.log(x); // "default"
```

### 11. What is the output of this code snippet?

```javascript
let a = 0 ?? "default";
let b = null ?? "fallback";
console.log(a, b);
```

**Answer:**

- `a` is `0` because `0` is neither `null` nor `undefined`.
- `b` is `"fallback"` because `null` triggers the fallback value.

## Additional Questions

### 12. Write an example using the spread operator (`...`).

```javascript
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];
console.log(arr2); // [1, 2, 3, 4, 5]
```

### 13. What does the following code output?

```javascript
let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1, b: 3, c: 4 };
console.log(obj2);
```

**Answer:**

- `{ a: 1, b: 3, c: 4 }` because `...obj1` copies properties and `b: 3` overrides the value of `b`.

---

These questions and answers cover various aspects of expressions and operators, including practical code-based scenarios.
