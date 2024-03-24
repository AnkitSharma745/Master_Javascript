# Data Type in Javascript
#### A data type in programming refers to the classification or categorization of data that determines the kind of values it can hold and the operations that can be performed on it. Data types are essential for ensuring the correctness and efficiency of programs by providing a structure for organizing and manipulating data.

In most programming languages, including JavaScript, data types can be broadly categorized into two main types:
- Primitive Data type.
- Non Primitive data type (complex data type)
## 1. Primitive Data type

Primitive data types are immutable and hold simple values. They are directly stored in memory, and accessing them retrieves their actual value.

#### List of Primitive Data Types:

- **Number**: Represents numeric values, including integers and floating-point numbers.
  
- **String**: Represents sequences of characters, enclosed in single (`''`) or double (`""`) quotes.
- **Boolean**: Represents logical values `true` and `false`.
- **Undefined**: Represents a variable that has been declared but not assigned a value.
- **Null**: Represents the absence of a value or a "null" value.

### 6. Symbol

`Symbol` is a primitive data type introduced in ECMAScript 6 (ES6). It represents a unique and immutable value that may be used as the key of an object property. Symbols are useful for creating unique identifiers and preventing name collisions in objects.

#### Example:
```javascript
// Creating a new symbol
const symbol1 = Symbol('symbol1');
const symbol2 = Symbol('symbol2');

// Symbols are unique
console.log(symbol1 === symbol2); // Output: false

// Using symbols as object properties
const obj = {
    [symbol1]: 'value1',
    [symbol2]: 'value2'
};

console.log(obj[symbol1]); // Output: 'value1'
```


### 7. BigInt

`BigInt` is a primitive data type introduced in ECMAScript 2020 (ES11). It represents arbitrary precision integers, allowing JavaScript to perform operations on integers beyond the range of Number data type, which is limited to -2^53 to 2^53.
#### Example:
```javascript
// Creating a BigInt
const bigIntValue = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);

console.log(bigIntValue); // Output: 9007199254740993n

// Operations with BigInt
const result = bigIntValue * BigInt(2);
console.log(result); // Output: 18014398509481986n
```
## 2. Non-Primitive (Complex) Data Types

Non-primitive data types are mutable and hold references to complex data structures. They are stored by reference, and accessing them retrieves a reference to their location in memory.

## List of Non-Primitive Data Types:

- **Object**: Represents a collection of key-value pairs, also known as properties and methods.
- **Array**: Represents an ordered collection of elements, accessed by index.
- **Function**: Represents a reusable block of code that performs a specific task.
- **Date**: Represents dates and times.
- **RegExp**: Represents regular expressions.

Non-primitive data types can be dynamically modified, allowing for more complex data manipulation and organization in JavaScript programs.
