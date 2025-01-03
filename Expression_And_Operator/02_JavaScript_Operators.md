
# JavaScript Operators: An In-Depth Guide

JavaScript operators are special symbols or keywords that perform operations on values (operands). Below is a comprehensive guide covering various types of operators, along with numerous examples.

---

## 1. Arithmetic Operators

Arithmetic operators are used for mathematical calculations.

| **Operator** | **Description**      | **Example**   | **Result**                 |
|--------------|----------------------|---------------|----------------------------|
| `+`          | Addition             | `5 + 2`       | `7`                        |
| `-`          | Subtraction          | `5 - 2`       | `3`                        |
| `*`          | Multiplication       | `5 * 2`       | `10`                       |
| `/`          | Division             | `5 / 2`       | `2.5`                      |
| `%`          | Modulus (Remainder)  | `5 % 2`       | `1`                        |
| `**`         | Exponentiation       | `5 ** 2`      | `25`                       |

### Examples:

```javascript
let x = 10, y = 3;
console.log(x + y); // 13
console.log(x - y); // 7
console.log(x * y); // 30
console.log(x / y); // 3.3333
console.log(x % y); // 1
console.log(x ** y); // 1000 (10^3)
```

---

## 2. Assignment Operators

Assignment operators are used to assign values to variables.

| **Operator** | **Description**       | **Example**   | **Equivalent To** |
|--------------|-----------------------|---------------|--------------------|
| `=`          | Simple Assignment     | `x = 5`       | N/A                |
| `+=`         | Add and Assign        | `x += 3`      | `x = x + 3`        |
| `-=`         | Subtract and Assign   | `x -= 3`      | `x = x - 3`        |
| `*=`         | Multiply and Assign   | `x *= 3`      | `x = x * 3`        |
| `/=`         | Divide and Assign     | `x /= 3`      | `x = x / 3`        |
| `%=`         | Modulus and Assign    | `x %= 3`      | `x = x % 3`        |

### Examples:

```javascript
let num = 10;
num += 5; // num is now 15
num *= 2; // num is now 30
console.log(num); // Output: 30
```

---

## 3. Comparison Operators

Comparison operators compare two values and return a Boolean result.

| **Operator** | **Description**          | **Example**     | **Result** |
|--------------|--------------------------|-----------------|------------|
| `==`         | Equal to                 | `5 == '5'`      | `true`     |
| `===`        | Strictly Equal to        | `5 === '5'`     | `false`    |
| `!=`         | Not Equal to             | `5 != '5'`      | `false`    |
| `!==`        | Strictly Not Equal to    | `5 !== '5'`     | `true`     |
| `>`          | Greater Than             | `5 > 3`         | `true`     |
| `<`          | Less Than                | `5 < 3`         | `false`    |
| `>=`         | Greater Than or Equal To | `5 >= 3`        | `true`     |
| `<=`         | Less Than or Equal To    | `5 <= 3`        | `false`    |

### Examples:

```javascript
let a = 10, b = '10';

console.log(a == b);  // true
console.log(a === b); // false
console.log(a > 5);   // true
console.log(a <= 15); // true
```

---

## 4. Logical Operators

Logical operators are used to combine Boolean values.

| **Operator** | **Description** | **Example**       | **Result**  |
|--------------|-----------------|-------------------|-------------|
| `&&`         | Logical AND     | `true && false`   | `false`     |
| `||`         | Logical OR      | `true || false`   | `true`      |
| `!`          | Logical NOT     | `!true`           | `false`     |

### Examples:

```javascript
let isAdult = true;
let hasID = false;

console.log(isAdult && hasID); // false
console.log(isAdult || hasID); // true
console.log(!isAdult);         // false
```

---

## 5. Unary Operators

Unary operators work with a single operand.

| **Operator** | **Description**                  | **Example** | **Result** |
|--------------|----------------------------------|-------------|------------|
| `+`          | Converts to a number            | `+"5"`      | `5`        |
| `-`          | Negates a number                | `-5`        | `-5`       |
| `++`         | Increment by 1 (prefix/postfix) | `++x`       | `x + 1`    |
| `--`         | Decrement by 1 (prefix/postfix) | `--x`       | `x - 1`    |

### Examples:

```javascript
let count = 0;
console.log(++count); // 1
console.log(count++); // 1
console.log(count);   // 2
```

---

## 6. Ternary (Conditional) Operator

The ternary operator is a shorthand for `if-else` conditions.

### Syntax:
```javascript
condition ? valueIfTrue : valueIfFalse;
```

### Example:

```javascript
let age = 20;
let canVote = age >= 18 ? "Yes" : "No";
console.log(canVote); // Yes
```

---

## 7. Bitwise Operators

Bitwise operators work at the binary level.

| **Operator** | **Description**  | **Example** | **Result** |
|--------------|------------------|-------------|------------|
| `&`          | AND              | `5 & 1`     | `1`        |
| `|`          | OR               | `5 | 1`     | `5`        |
| `^`          | XOR              | `5 ^ 1`     | `4`        |
| `~`          | NOT              | `~5`        | `-6`       |
| `<<`         | Left Shift       | `5 << 1`    | `10`       |
| `>>`         | Right Shift      | `5 >> 1`    | `2`        |

### Example:

```javascript
console.log(5 & 1); // 1
console.log(5 | 1); // 5
console.log(5 ^ 1); // 4
```

---

## 8. String Operators

String operators work specifically with strings.

| **Operator** | **Description**           | **Example**         | **Result**    |
|--------------|---------------------------|---------------------|---------------|
| `+`          | Concatenation             | `'Hello' + 'World'` | `'HelloWorld'`|
| `+=`         | Concatenate and assign    | `str += 'World'`    | Updated String|

### Example:

```javascript
let str = "Hello ";
str += "World!";
console.log(str); // Hello World!
```

---

## 9. Spread and Rest Operators

Spread (`...`) allows an iterable to expand, while Rest collects items into an array.

### Examples:

```javascript
// Spread
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];
console.log(arr2); // [1, 2, 3, 4, 5]

// Rest
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b);
}
console.log(sum(1, 2, 3, 4)); // 10
```

---

## 10. Destructuring Assignment

Destructuring extracts values from arrays or properties from objects.

### Examples:

```javascript
// Array destructuring
let [a, b] = [1, 2];
console.log(a, b); // 1, 2

// Object destructuring
let {name, age} = {name: "Alice", age: 25};
console.log(name, age); // Alice, 25
```

---

This file provides detailed insights into JavaScript operators. Modify or enhance it as needed!
