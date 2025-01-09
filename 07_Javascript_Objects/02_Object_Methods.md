This document provides a detailed exploration of JavaScript object methods, including examples and explanations for each.

## Table of Contents

1. [Introduction to Object Methods](#1-introduction-to-object-methods)
2. [Object.assign()](#2-objectassign)
3. [Object.create()](#3-objectcreate)
4. [Object.defineProperty() and Object.defineProperties()](#4-objectdefineproperty-and-objectdefineproperties)
5. [Object.entries()](#5-objectentries)
6. [Object.keys()](#6-objectkeys)
7. [Object.values()](#7-objectvalues)
8. [Object.freeze()](#8-objectfreeze)
9. [Object.seal()](#9-objectseal)
10. [Object.is()](#10-objectis)
11. [Object.hasOwn()](#11-objecthasown)
12. [Object.getOwnPropertyNames()](#12-objectgetownpropertynames)
13. [Object.getOwnPropertySymbols()](#13-objectgetownpropertysymbols)
14. [Object.getPrototypeOf()](#14-objectgetprototypeof)
15. [Object.setPrototypeOf()](#15-objectsetprototypeof)

---

## 1. Introduction to Object Methods

Object methods in JavaScript allow manipulation, inspection, and interaction with objects. These methods help developers create dynamic, efficient, and reusable code.

```javascript
const obj = { name: "Alice", age: 25 };
console.log(Object.keys(obj)); // ["name", "age"]
```

---

## 2. Object.assign()

### Description

Copies properties from one or more source objects to a target object.

### Example

```javascript
const target = { a: 1 };
const source = { b: 2, c: 3 };
const result = Object.assign(target, source);
console.log(result); // { a: 1, b: 2, c: 3 }
```

### Explanation

- It performs a shallow copy.
- The target object is mutated.

---

## 3. Object.create()

### Description

Creates a new object with a specified prototype object.

### Example

```javascript
const prototypeObj = {
  greet() {
    console.log("Hello!");
  },
};
const obj = Object.create(prototypeObj);
obj.name = "Alice";
obj.greet(); // Hello!
```

---

## 4. Object.defineProperty() and Object.defineProperties()

### Description

Defines properties with specific attributes.

### Example (Single Property)

```javascript
const obj = {};
Object.defineProperty(obj, "name", {
  value: "Alice",
  writable: false,
  enumerable: true,
  configurable: true,
});
console.log(obj.name); // Alice
obj.name = "Bob"; // Fails silently in non-strict mode
```

### Example (Multiple Properties)

```javascript
const obj = {};
Object.defineProperties(obj, {
  name: {
    value: "Alice",
    writable: true,
  },
  age: {
    value: 25,
    writable: false,
  },
});
console.log(obj); // { name: 'Alice', age: 25 }
```

---

## 5. Object.entries()

### Description

Returns an array of key-value pairs.

### Example

```javascript
const obj = { name: "Alice", age: 25 };
console.log(Object.entries(obj)); // [["name", "Alice"], ["age", 25]]
```

---

## 6. Object.keys()

### Description

Returns an array of an object's own enumerable property names.

### Example

```javascript
const obj = { name: "Alice", age: 25 };
console.log(Object.keys(obj)); // ["name", "age"]
```

---

## 7. Object.values()

### Description

Returns an array of an object's own enumerable property values.

### Example

```javascript
const obj = { name: "Alice", age: 25 };
console.log(Object.values(obj)); // ["Alice", 25]
```

---

## 8. Object.freeze()

### Description

Prevents modification of an object.

### Example

```javascript
const obj = { a: 1 };
Object.freeze(obj);
obj.a = 2; // Fails silently in non-strict mode
console.log(obj.a); // 1
```

---

## 9. Object.seal()

### Description

Prevents adding or removing properties but allows modifying existing properties.

### Example

```javascript
const obj = { a: 1 };
Object.seal(obj);
obj.a = 2; // Allowed
obj.b = 3; // Not allowed
console.log(obj); // { a: 2 }
```

---

## 10. Object.is()

### Description

Compares two values for strict equality.

### Example

```javascript
console.log(Object.is(25, 25)); // true
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(+0, -0)); // false
```

---

## 11. Object.hasOwn()

### Description

Checks if an object has a specific property as its own (not inherited).

### Example

```javascript
const obj = { a: 1 };
console.log(Object.hasOwn(obj, "a")); // true
console.log(Object.hasOwn(obj, "b")); // false
```

---

## 12. Object.getOwnPropertyNames()

### Description

Returns an array of all property names (enumerable and non-enumerable).

### Example

```javascript
const obj = { a: 1 };
Object.defineProperty(obj, "b", {
  value: 2,
  enumerable: false,
});
console.log(Object.getOwnPropertyNames(obj)); // ["a", "b"]
```

---

## 13. Object.getOwnPropertySymbols()

### Description

Returns an array of all symbol properties.

### Example

```javascript
const sym = Symbol("id");
const obj = { [sym]: 123 };
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(id)]
```

---

## 14. Object.getPrototypeOf()

### Description

Returns the prototype of an object.

### Example

```javascript
const obj = {};
console.log(Object.getPrototypeOf(obj)); // {}
```

---

## 15. Object.setPrototypeOf()

### Description

Sets the prototype of an object.

### Example

```javascript
const parent = {
  greet() {
    console.log("Hello!");
  },
};
const obj = {};
Object.setPrototypeOf(obj, parent);
obj.greet(); // Hello!
```
