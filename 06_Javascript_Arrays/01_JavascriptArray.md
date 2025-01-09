## Introduction

Arrays are one of the fundamental data structures in JavaScript. They allow developers to store multiple values in a single variable and manipulate them efficiently. This document dives deep into arrays, excluding inbuilt methods, to build a solid foundation.

---

## What is an Array?

An array is a collection of items stored at contiguous memory locations. In JavaScript, an array is an object that can hold multiple values of different data types.

### Key Characteristics:

1. **Indexed Access**: Elements are accessed using their index (starting at `0`).
2. **Dynamic Typing**: Arrays can store values of mixed data types.
3. **Mutable**: The contents of an array can be modified after its creation.

---

## Declaring Arrays

### Syntax:

```javascript
// Empty array
let arr = [];

// Array with initial values
let numbers = [1, 2, 3, 4, 5];
```

### Example 1: Storing Mixed Data Types

```javascript
const mixedArray = [42, "hello", true, null, { key: "value" }];
console.log(mixedArray[1]); // Output: hello
```

---

## Accessing Array Elements

Each element in an array can be accessed using its index.

### Example 2: Indexed Access

```javascript
const fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]); // Output: apple
console.log(fruits[2]); // Output: cherry
```

---

## Updating Array Elements

Arrays are mutable, so their contents can be updated.

### Example 3: Updating Elements

```javascript
let colors = ["red", "green", "blue"];
colors[1] = "yellow";
console.log(colors); // Output: ["red", "yellow", "blue"]
```

---

## Array Traversal

### Example 4: Using a `for` Loop

```javascript
const scores = [10, 20, 30, 40];
for (let i = 0; i < scores.length; i++) {
  console.log(`Score ${i + 1}: ${scores[i]}`);
}
// Output:
// Score 1: 10
// Score 2: 20
// Score 3: 30
// Score 4: 40
```

### Example 5: Using `for...of`

```javascript
const names = ["Alice", "Bob", "Charlie"];
for (const name of names) {
  console.log(name);
}
// Output:
// Alice
// Bob
// Charlie
```

---

## Multidimensional Arrays

Arrays can contain other arrays, enabling the creation of multidimensional arrays.

### Example 6: 2D Arrays

```javascript
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(matrix[1][2]); // Output: 6 (row 1, column 2)
```

---

## Real-World Use Cases

### Example 7: Storing Coordinates

```javascript
const coordinates = [
  [10, 20],
  [15, 25],
  [30, 50],
];

console.log(`Point 1: x=${coordinates[0][0]}, y=${coordinates[0][1]}`);
// Output: Point 1: x=10, y=20
```

### Example 8: Representing a Queue

```javascript
let queue = [];

// Enqueue
queue.push("Task 1");
queue.push("Task 2");
queue.push("Task 3");

// Dequeue
while (queue.length > 0) {
  console.log(`Processing: ${queue.shift()}`);
}
// Output:
// Processing: Task 1
// Processing: Task 2
// Processing: Task 3
```

### Example 9: Tracking Attendance

```javascript
const attendance = [true, false, true, true, false];

let presentCount = 0;
for (const status of attendance) {
  if (status) presentCount++;
}

console.log(`Total Present: ${presentCount}`); // Output: Total Present: 3
```

---

## Sparse Arrays

A sparse array has gaps between indices, meaning some indices are undefined.

### Example 10: Creating a Sparse Array

```javascript
const sparseArray = [];
sparseArray[5] = "hello";

console.log(sparseArray[5]); // Output: hello
console.log(sparseArray[2]); // Output: undefined
console.log(sparseArray.length); // Output: 6
```

---

## Array Performance Considerations

- Accessing an element by index is **O(1)**.
- Adding or removing elements, especially at the start or middle, can be **O(n)** due to shifting of indices.

---

## Conclusion

Arrays are versatile and foundational in JavaScript. By mastering their structure and usage, you can solve a wide range of problems effectively.

---

## Practice Exercises

1. Create a function to find the sum of all elements in an array.
2. Write a function to rotate an array by `k` positions.
3. Implement a program to find the largest and smallest numbers in an array without using inbuilt methods.
