# Complex Examples of JavaScript Object Methods

This document contains advanced examples of JavaScript object methods, demonstrating various use cases and explanations for each.

## Table of Contents

1. [Object.keys()](#1-objectkeys)
2. [Object.values()](#2-objectvalues)
3. [Object.entries()](#3-objectentries)
4. [Object.fromEntries()](#4-objectfromentries)
5. [Object.assign()](#5-objectassign)
6. [Object.freeze() and Object.seal()](#6-objectfreeze-and-objectseal)
7. [Object.getOwnPropertyDescriptors()](#7-objectgetownpropertydescriptors)
8. [Prototype Methods](#8-prototype-methods)
9. [Complex Use Cases](#9-complex-use-cases)

---

## 1. Object.keys()

### Example: Filtering Keys Based on a Condition

```javascript
const obj = { a: 1, b: 2, c: 3, d: 4 };

const keysWithEvenValues = Object.keys(obj).filter((key) => obj[key] % 2 === 0);
console.log(keysWithEvenValues); // ['b', 'd']
```

### Explanation

- `Object.keys()` returns an array of the object's keys.
- The `filter()` method is used to find keys with even values.

---

## 2. Object.values()

### Example: Summing All Values

```javascript
const obj = { a: 10, b: 20, c: 30 };

const sum = Object.values(obj).reduce((total, value) => total + value, 0);
console.log(sum); // 60
```

### Explanation

- `Object.values()` returns an array of the object's values.
- `reduce()` is used to calculate the sum of all values.

---

## 3. Object.entries()

### Example: Transforming an Object

```javascript
const obj = { a: 1, b: 2, c: 3 };

const transformed = Object.entries(obj).map(([key, value]) => [
  key.toUpperCase(),
  value * 2,
]);
console.log(Object.fromEntries(transformed)); // { A: 2, B: 4, C: 6 }
```

### Explanation

- `Object.entries()` returns an array of key-value pairs.
- `map()` transforms the key-value pairs.
- `Object.fromEntries()` converts the transformed array back into an object.

---

## 4. Object.fromEntries()

### Example: Creating an Object from a Filtered Array

```javascript
const entries = [
  ["a", 1],
  ["b", 2],
  ["c", 3],
];

const filteredObject = Object.fromEntries(
  entries.filter(([key, value]) => value > 1)
);
console.log(filteredObject); // { b: 2, c: 3 }
```

### Explanation

- `Object.fromEntries()` converts an array of key-value pairs into an object.
- `filter()` is used to exclude entries based on a condition.

---

## 5. Object.assign()

### Example: Merging Multiple Objects

```javascript
const obj1 = { a: 1 };
const obj2 = { b: 2, c: 3 };
const obj3 = { c: 4, d: 5 };

const merged = Object.assign({}, obj1, obj2, obj3);
console.log(merged); // { a: 1, b: 2, c: 4, d: 5 }
```

### Explanation

- `Object.assign()` copies properties from source objects into a target object.
- Later properties overwrite earlier ones if keys conflict.

---

## 6. Object.freeze() and Object.seal()

### Example: Preventing Modifications

```javascript
const obj = { a: 1, b: 2 };

Object.freeze(obj);
obj.a = 10; // No effect
console.log(obj); // { a: 1, b: 2 }

const sealedObj = { c: 3, d: 4 };
Object.seal(sealedObj);
sealedObj.c = 30; // Allowed
sealedObj.e = 50; // Not allowed
console.log(sealedObj); // { c: 30, d: 4 }
```

### Explanation

- `Object.freeze()` prevents any modifications to the object.
- `Object.seal()` allows modifying existing properties but prevents adding or deleting properties.

---

## 7. Object.getOwnPropertyDescriptors()

### Example: Copying All Property Descriptors

```javascript
const obj = { a: 1, b: 2 };

const descriptors = Object.getOwnPropertyDescriptors(obj);
console.log(descriptors);
/*
{
  a: { value: 1, writable: true, enumerable: true, configurable: true },
  b: { value: 2, writable: true, enumerable: true, configurable: true }
}
*/

const copy = Object.defineProperties({}, descriptors);
console.log(copy); // { a: 1, b: 2 }
```

### Explanation

- `Object.getOwnPropertyDescriptors()` retrieves metadata about each property.
- `Object.defineProperties()` applies these descriptors to a new object.

---

## 8. Prototype Methods

### Example: Extending Object Prototypes

```javascript
Object.prototype.greet = function () {
  console.log(`Hello from ${this.name || "an object"}!`);
};

const obj = { name: "Alice" };
obj.greet(); // Hello from Alice!

const anotherObj = {};
anotherObj.greet(); // Hello from an object!
```

### Explanation

- Adding methods to `Object.prototype` makes them available on all objects.
- Be cautious to avoid unintended side effects.

---

## 9. Complex Use Cases

### Example: Data Transformation and Aggregation

```javascript
const users = [
  { id: 1, name: "Alice", age: 25, isActive: true },
  { id: 2, name: "Bob", age: 30, isActive: false },
  { id: 3, name: "Charlie", age: 35, isActive: true },
];

// Step 1: Filter active users
const activeUsers = users.filter((user) => user.isActive);

// Step 2: Map to key-value pairs
const userMap = activeUsers.map((user) => [user.id, user.name]);

// Step 3: Convert to object
const userObject = Object.fromEntries(userMap);

console.log(userObject); // { '1': 'Alice', '3': 'Charlie' }
```

### Explanation

- `filter()` selects active users.
- `map()` converts each user into a key-value pair.
- `Object.fromEntries()` transforms the key-value pairs into an object.

---

### Example: Deep Cloning with Nested Properties

```javascript
const obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
};

const deepClone = JSON.parse(JSON.stringify(obj));
deepClone.b.c = 42;

console.log(obj.b.c); // 2 (original object remains unchanged)
console.log(deepClone.b.c); // 42
```

### Explanation

- `JSON.parse(JSON.stringify())` is a quick way to deep clone objects.
- Nested objects are copied instead of being referenced.
