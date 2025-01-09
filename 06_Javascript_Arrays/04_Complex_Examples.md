# Complex Examples of JavaScript Array Methods

This document contains advanced examples of JavaScript array methods, along with explanations of each.

## Table of Contents

1. [map()](#1-map)
2. [filter()](#2-filter)
3. [reduce()](#3-reduce)
4. [find() and findIndex()](#4-find-and-findindex)
5. [every() and some()](#5-every-and-some)
6. [flat() and flatMap()](#6-flat-and-flatmap)
7. [sort()](#7-sort)
8. [splice()](#8-splice)
9. [Array.from()](#9-arrayfrom)
10. [Complex Combination of Methods](#10-complex-combination-of-methods)

---

## 1. map()

### Example: Transform an Array of Objects

```javascript
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

const userNames = users.map((user) => user.name.toUpperCase());
console.log(userNames); // ['ALICE', 'BOB', 'CHARLIE']
```

### Explanation

- The `map()` method creates a new array by applying a function to each element.

---

## 2. filter()

### Example: Filter Users by Age

```javascript
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

const youngUsers = users.filter((user) => user.age < 30);
console.log(youngUsers);
// [{ id: 1, name: 'Alice', age: 25 }]
```

### Explanation

- The `filter()` method returns a new array containing elements that satisfy a condition.

---

## 3. reduce()

### Example: Calculate Total Age

```javascript
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

const totalAge = users.reduce((sum, user) => sum + user.age, 0);
console.log(totalAge); // 90
```

### Explanation

- The `reduce()` method accumulates values based on a callback function.
- `sum` starts at `0` (the initial value).

---

## 4. find() and findIndex()

### Example: Find a User by Name

```javascript
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

const user = users.find((user) => user.name === "Bob");
console.log(user); // { id: 2, name: 'Bob', age: 30 }

const index = users.findIndex((user) => user.name === "Bob");
console.log(index); // 1
```

### Explanation

- `find()` returns the first element that matches the condition.
- `findIndex()` returns the index of the first matching element.

---

## 5. every() and some()

### Example: Check User Age Conditions

```javascript
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

const allAdults = users.every((user) => user.age >= 18);
console.log(allAdults); // true

const hasSenior = users.some((user) => user.age >= 60);
console.log(hasSenior); // false
```

### Explanation

- `every()` checks if all elements satisfy a condition.
- `some()` checks if at least one element satisfies a condition.

---

## 6. flat() and flatMap()

### Example: Flatten Nested Arrays

```javascript
const nested = [1, [2, [3, [4]]]];
const flatArray = nested.flat(2);
console.log(flatArray); // [1, 2, 3, [4]]

const arr = ["hello world", "foo bar"];
const words = arr.flatMap((str) => str.split(" "));
console.log(words); // ['hello', 'world', 'foo', 'bar']
```

### Explanation

- `flat()` flattens nested arrays up to the specified depth.
- `flatMap()` applies a function and flattens the result.

---

## 7. sort()

### Example: Sort Users by Age (Descending)

```javascript
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

users.sort((a, b) => b.age - a.age);
console.log(users);
// [
//   { id: 3, name: 'Charlie', age: 35 },
//   { id: 2, name: 'Bob', age: 30 },
//   { id: 1, name: 'Alice', age: 25 }
// ]
```

### Explanation

- The `sort()` method modifies the array in place.
- A comparison function determines the sort order.

---

## 8. splice()

### Example: Remove and Replace Elements

```javascript
const arr = [1, 2, 3, 4, 5];
const removed = arr.splice(1, 2, 8, 9);
console.log(arr); // [1, 8, 9, 4, 5]
console.log(removed); // [2, 3]
```

### Explanation

- `splice()` modifies the array by removing, replacing, or adding elements.

---

## 9. Array.from()

### Example: Create an Array from a String

```javascript
const str = "hello";
const arr = Array.from(str, (char) => char.toUpperCase());
console.log(arr); // ['H', 'E', 'L', 'L', 'O']
```

### Explanation

- `Array.from()` creates an array from iterable objects.
- A map function can be applied during creation.

---

## 10. Complex Combination of Methods

### Example: Data Transformation Pipeline

```javascript
const users = [
  { id: 1, name: "Alice", age: 25, isActive: true },
  { id: 2, name: "Bob", age: 30, isActive: false },
  { id: 3, name: "Charlie", age: 35, isActive: true },
];

const result = users
  .filter((user) => user.isActive)
  .map((user) => ({ ...user, name: user.name.toUpperCase() }))
  .reduce((acc, user) => {
    acc.push(user.name);
    return acc;
  }, []);

console.log(result); // ['ALICE', 'CHARLIE']
```

### Explanation

- `filter()` selects active users.
- `map()` transforms user names to uppercase.
- `reduce()` collects transformed names into an array.
