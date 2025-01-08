## Table of Contents

1. [Basic Concepts](#basic-concepts)
2. [Data Types](#data-types)
3. [Advanced Concepts](#advanced-concepts)
4. [Code Examples](#code-examples)
5. [Bonus Challenges](#bonus-challenges)

## Basic Concepts

### Variable Declaration

**Q: What are the three ways to declare a variable in JavaScript?**

A: Variables can be declared using:

- `var`: Function-scoped or globally-scoped
- `let`: Block-scoped
- `const`: Block-scoped, cannot be reassigned

**Q: What is the difference between declaring a variable and defining a variable in JavaScript?**

A:

- Declaration: Introduces the variable name to the scope (`var x;`)
- Definition: Assigns a value to the declared variable (`x = 5;`)

### Scope and Variables

**Q: What is the scope of variables declared with var, let, and const?**

A:

- `var`: Function-scoped or global if declared outside functions
- `let`: Block-scoped (within {} blocks)
- `const`: Block-scoped (within {} blocks)

**Q: Can you reassign a value to a const variable? Why or why not?**

A: No, you cannot reassign a value to a const variable. The `const` declaration creates a read-only reference to a value. However, the properties of a const object can still be modified.

```javascript
const x = 1;
x = 2; // TypeError

const obj = { prop: 1 };
obj.prop = 2; // Works fine
```

### Variable Behavior

**Q: What will the following code output?**

```javascript
var x = 10;
if (true) {
  var x = 20;
}
console.log(x);
```

A: Output: `20`
Because `var` is function-scoped, both declarations reference the same variable, so the second assignment overwrites the first.

**Q: What is the typeof operator used for in JavaScript?**

A: The `typeof` operator returns a string indicating the type of the unevaluated operand. Example:

```javascript
typeof 42; // "number"
typeof "hello"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof {}; // "object"
```

## Data Types

### Primitive Types

**Q: What are the primitive data types in JavaScript?**

A: JavaScript has seven primitive data types:

1. String
2. Number
3. Boolean
4. Undefined
5. Null
6. Symbol
7. BigInt

**Q: What will the following expression return?**

```javascript
typeof NaN;
```

A: Output: `"number"`
Despite representing "Not a Number", NaN is actually of type number in JavaScript.

### Type Comparisons

**Q: What is the difference between a string and a number in JavaScript? Can you perform mathematical operations on a string?**

A:

- Strings are sequences of characters, numbers are numeric values
- Mathematical operations on strings:
  - Addition (+) concatenates strings
  - Other operations attempt to convert strings to numbers

```javascript
"3" + "4"; // "34"
"3" - "4"; // -1
"3" * "4"; // 12
```

**Q: Explain the difference between == (equality) and === (strict equality) operators**

A:

- `==` performs type coercion before comparison
- `===` compares both value and type without coercion

```javascript
5 == "5"; // true
5 === "5"; // false
```

### Null and Undefined

**Q: What are the differences between null and undefined in JavaScript?**

A:

- `undefined`: Variable declared but not assigned a value
- `null`: Intentional absence of any object value

```javascript
let x;
console.log(x); // undefined

let y = null;
console.log(y); // null
```

### Type Conversion

**Q: How do you convert a string to a number in JavaScript?**

A: Multiple methods:

```javascript
parseInt("42"); // 42
parseFloat("42.5"); // 42.5
Number("42"); // 42
+"42"; // 42
```

**Q: How would you check if a variable is an array in JavaScript?**

A: Several methods:

```javascript
Array.isArray([]); // true
[] instanceof Array; // true
Object.prototype.toString.call([]) === "[object Array]"; // true
```

## Advanced Concepts

### Object Operations

**Q: What is an object in JavaScript? How is it different from an array?**

A:

- Objects: Collections of key-value pairs
- Arrays: Ordered collections of values indexed by numbers

```javascript
let obj = { key: "value" };
let arr = ["value"];
```

**Q: How do you use Object.is() to compare two values? How does it differ from ===?**

A:

```javascript
Object.is(NaN, NaN); // true
NaN === NaN; // false

Object.is(0, -0); // false
0 === -0; // true
```

### Type Coercion Examples

**Q: What will the following code output?**

```javascript
let x = "10";
let y = 5;
console.log(x + y);
```

A: Output: `"105"`
The number is coerced to a string and concatenated.

**Q: What is the behavior of the + operator when applied to strings and numbers?**

A:

- With strings: Concatenation
- With numbers: Addition
- Mixed: Converts numbers to strings and concatenates

```javascript
"2" + 2; // "22"
2 + 2; // 4
1 + "2" + 3; // "123"
```

## Bonus Challenges

**Q: What will be the result of the following expression?**

```javascript
[] + {};
```

A: Output: `"[object Object]"`
Empty array is converted to empty string, then concatenated with string representation of empty object.

**Q: What happens when you add a number to undefined or null?**

A:

```javascript
5 + undefined; // NaN
5 + null; // 5 (null is coerced to 0)
```

**Q: What will the following code output?**

```javascript
console.log(typeof typeof 1);
```

A: Output: `"string"`

- `typeof 1` returns `"number"`
- `typeof "number"` returns `"string"`

## Code Examples

### Additional Code Snippets

**Q: What will this output?**

```javascript
let a = "Hello";
let b = "World";
console.log(a + b);
console.log(a - b);
```

A:

```
"HelloWorld"
NaN
```

**Q: What is the result of these comparisons?**

```javascript
let obj1 = { a: 1 };
let obj2 = obj1;
obj2.a = 2;
console.log(obj1.a);
```

A: Output: `2`
Objects are passed by reference, so both variables point to the same object.

**Q: What will be the output?**

```javascript
let myVar;
console.log(myVar == null);
console.log(myVar === null);
```

A:

```
true
false
```
