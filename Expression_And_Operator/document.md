# **Expressions and Operators in JavaScript**

## **Expression**

An expression is any valid unit of code that resolves to a value. For example:

```javascript
let a = 5 + 3; // The expression `5 + 3` evaluates to 8.
```

Even a single literal or variable is an expression:

```javascript
const number = 42; // The number `42` is an expression.
```

---

## **Types of Operators in JavaScript**

JavaScript operators are categorized based on their purpose and behavior. Here's an in-depth look:

---

### **1. Arithmetic Operators**

Arithmetic operators perform mathematical operations.  
| **Operator** | **Description** | **Example** | **Result** |
|--------------|--------------------|-------------|----------------------------------|
| `+` | Addition | `x + y` | Sum of `x` and `y` |
| `-` | Subtraction | `x - y` | Difference of `x` and `y` |
| `*` | Multiplication | `x * y` | Product of `x` and `y` |
| `/` | Division | `x / y` | Quotient of `x` divided by `y` |
| `%` | Modulus | `x % y` | Remainder when `x` is divided by `y` |
| `**` | Exponentiation | `x ** y` | `x` raised to the power of `y` |

#### Examples:

```javascript
let a = 10;
let b = 3;

console.log(a + b); // Output: 13
console.log(a % b); // Output: 1
console.log(a ** b); // Output: 1000 (10^3)
```

---

### **2. Assignment Operators**

Assignment operators assign values to variables.  
| **Operator** | **Description** | **Example** | **Equivalent To** |
|--------------|------------------------|-------------|--------------------|
| `=` | Simple assignment | `x = 5` | N/A |
| `+=` | Add and assign | `x += 3` | `x = x + 3` |
| `-=` | Subtract and assign | `x -= 3` | `x = x - 3` |
| `*=` | Multiply and assign | `x *= 3` | `x = x * 3` |
| `/=` | Divide and assign | `x /= 3` | `x = x / 3` |
| `%=` | Modulus and assign | `x %= 3` | `x = x % 3` |

#### Examples:

```javascript
let x = 10;
x += 5; // x is now 15
x *= 2; // x is now 30
console.log(x); // Output: 30
```

---

### **3. Increment and Decrement Operators**

- **Increment (`++`)**: Increases a variable's value by 1.
- **Decrement (`--`)**: Decreases a variable's value by 1.

#### Examples:

```javascript
let count = 0;
console.log(++count); // Pre-increment: Output is 1
console.log(count++); // Post-increment: Output is 1 (then increments to 2)
console.log(count); // Output: 2
```

---

### **4. Comparison Operators**

Comparison operators compare two values and return a Boolean (`true` or `false`).

| **Operator** | **Description**          | **Example** | **Result** |
| ------------ | ------------------------ | ----------- | ---------- |
| `==`         | Equal to                 | `5 == '5'`  | `true`     |
| `===`        | Strictly equal to        | `5 === '5'` | `false`    |
| `!=`         | Not equal to             | `5 != '5'`  | `false`    |
| `!==`        | Strictly not equal to    | `5 !== '5'` | `true`     |
| `>`          | Greater than             | `5 > 3`     | `true`     |
| `<`          | Less than                | `5 < 3`     | `false`    |
| `>=`         | Greater than or equal to | `5 >= 3`    | `true`     |
| `<=`         | Less than or equal to    | `5 <= 3`    | `false`    |

#### Examples:

```javascript
let a = 10,
  b = "10";

console.log(a == b); // true (type coercion happens)
console.log(a === b); // false (no type coercion)
```

---

### **5. Logical Operators**

Logical operators are used to combine Boolean values.

| **Operator** | **Description** | **Example**     | **Result** |
| ------------ | --------------- | --------------- | ---------- | ----- | --- | ------ | ------ |
| `&&`         | Logical AND     | `true && false` | `false`    |
| `            |                 | `               | Logical OR | `true |     | false` | `true` |
| `!`          | Logical NOT     | `!true`         | `false`    |

#### Examples:

```javascript
let isAdult = true;
let hasID = false;

console.log(isAdult && hasID); // Output: false
console.log(isAdult || hasID); // Output: true
console.log(!isAdult); // Output: false
```

---

### **6. Ternary Operator**

A shorthand for `if-else` conditions:  
`condition ? valueIfTrue : valueIfFalse`

#### Example:

```javascript
let age = 20;
let canVote = age >= 18 ? "Yes" : "No";
console.log(canVote); // Output: Yes
```

---

### **7. Nullish Coalescing Operator (`??`)**

The `??` operator returns the right-hand operand if the left-hand operand is `null` or `undefined`.

#### Example:

```javascript
let name = null;
let defaultName = name ?? "Anonymous";
console.log(defaultName); // Output: Anonymous
```

---

### **8. Optional Chaining Operator (`?.`)**

The `?.` operator allows you to safely access properties of an object that may be `undefined` or `null`.

#### Example:

```javascript
let user = { profile: { name: "John" } };
console.log(user.profile?.name); // Output: John
console.log(user.address?.city); // Output: undefined (No error)
```

---

### **9. TypeOf Operator**

The `typeof` operator returns the type of a value.

#### Example:

```javascript
console.log(typeof 42); // Output: "number"
console.log(typeof "hello"); // Output: "string"
console.log(typeof undefined); // Output: "undefined"
console.log(typeof null); // Output: "object" (quirk of JavaScript)
```

---

### **10. Bitwise Operators**

Bitwise operators perform operations at the binary level.

| **Operator** | **Description** | **Example** |
| ------------ | --------------- | ----------- | --- | --- |
| `&`          | AND             | `5 & 1`     |
| `            | `               | OR          | `5  | 1`  |
| `^`          | XOR             | `5 ^ 1`     |
| `~`          | NOT             | `~5`        |
| `<<`         | Left Shift      | `5 << 1`    |
| `>>`         | Right Shift     | `5 >> 1`    |

#### Example:

```javascript
console.log(5 & 1); // Output: 1
```

---

### **11. Comma Operator**

The comma operator evaluates multiple expressions and returns the result of the last expression.

#### Example:

```javascript
let a = (1, 2, 3);
console.log(a); // Output: 3
```

---

### **12. Summary of Operators**

| **Category**       | **Operators**                                  |
| ------------------ | ---------------------------------------------- | ----------------------- | ------ |
| Arithmetic         | `+`, `-`, `*`, `/`, `%`, `**`                  |
| Assignment         | `=`, `+=`, `-=`, `*=`, `/=`                    |
| Comparison         | `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=` |
| Logical            | `&&`, `                                        |                         | `, `!` |
| Ternary            | `? :`                                          |
| Nullish Coalescing | `??`                                           |
| Optional Chaining  | `?.`                                           |
| Bitwise            | `&`, `                                         | `, `^`, `~`, `<<`, `>>` |
| TypeOf             | `typeof`                                       |

This expanded explanation covers all operator-related topics in-depth. Let me know if additional examples are needed, or we can move to another topic!
