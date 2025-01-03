
# JavaScript Expressions

## 1. Literal Expressions

Literal expressions represent fixed values in JavaScript.

### Examples:
```javascript
// Numeric Literals
42
3.14

// String Literals
"Hello, World!"
'JavaScript'

// Boolean Literals
true
false

// Null Literal
null
```

## 2. Variable Expressions

Variable expressions use variables to represent values.

### Examples:
```javascript
let x = 10; // Variable declaration
x;          // Variable expression

const name = "Ankit";
name;       // Variable expression
```

## 3. Object and Array Expressions

These expressions create objects and arrays.

### Examples:

#### Object Expressions:
```javascript
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 25
};
person; // Object expression
```

#### Array Expressions:
```javascript
const numbers = [1, 2, 3, 4, 5];
numbers; // Array expression
```

## 4. Function Call Expressions

Function call expressions invoke a function.

### Examples:
```javascript
function greet(name) {
    return `Hello, ${name}!`;
}
greet("Ankit"); // Function call expression
```

## 5. Unary, Binary, and Ternary Expressions

### Unary Expressions

Operate on a single operand.

#### Examples:
```javascript
const x = 5;
const y = -x; // Unary negation
typeof x;     // Unary typeof
```

### Binary Expressions

Involve two operands.

#### Examples:
```javascript
const sum = 10 + 20; // Addition (binary operator)
const isEqual = 10 === 20; // Equality check
```

### Ternary Expressions

Use three operands to evaluate a condition.

#### Example:
```javascript
const age = 18;
const canVote = age >= 18 ? "Yes" : "No"; // Ternary operator
```

## Summary

JavaScript expressions are powerful and versatile, enabling developers to create, evaluate, and manipulate values in different forms. Mastering these expressions is crucial for effective JavaScript programming.
