# Examples of JavaScript Array Methods

## Table of Contents

1. [forEach](#1-foreach)
2. [map](#2-map)
3. [filter](#3-filter)
4. [reduce](#4-reduce)
5. [find](#5-find)
6. [findIndex](#6-findindex)
7. [some](#7-some)
8. [every](#8-every)
9. [sort](#9-sort)
10. [concat](#10-concat)
11. [slice](#11-slice)
12. [splice](#12-splice)
13. [includes](#13-includes)
14. [indexOf](#14-indexof)
15. [flat](#15-flat)
16. [flatMap](#16-flatmap)
17. [reverse](#17-reverse)
18. [push, pop, shift, unshift](#18-push-pop-shift-unshift)

---

## 1. forEach

### Problem Statement

Print each element of the array along with its index.

```javascript
const array = ["apple", "banana", "cherry"];

array.forEach((element, index) => {
  console.log(`${index}: ${element}`);
});
```

### Explanation

The `forEach` method iterates over each element in the array and executes the provided callback function for each element. Here, we use template literals to print the index and value.

---

## 2. map

### Problem Statement

Create a new array by multiplying each number in the array by 2.

```javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((num) => num * 2);
console.log(doubled);
```

### Explanation

The `map` method creates a new array by applying the callback function to each element of the original array. Here, we multiply each element by 2.

---

## 3. filter

### Problem Statement

Filter out all numbers greater than 5.

```javascript
const numbers = [1, 3, 7, 10, 4];
const filtered = numbers.filter((num) => num <= 5);
console.log(filtered);
```

### Explanation

The `filter` method creates a new array containing elements that satisfy the condition specified in the callback function. Here, we keep numbers less than or equal to 5.

---

## 4. reduce

### Problem Statement

Find the sum of all elements in the array.

```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
console.log(sum);
```

### Explanation

The `reduce` method applies a callback function to reduce the array to a single value. The `accumulator` holds the result of the previous operation, and `currentValue` is the current element being processed.

---

## 5. find

### Problem Statement

Find the first number greater than 5.

```javascript
const numbers = [3, 4, 7, 1, 9];
const found = numbers.find((num) => num > 5);
console.log(found);
```

### Explanation

The `find` method returns the first element that satisfies the condition specified in the callback function.

---

## 6. findIndex

### Problem Statement

Find the index of the first number greater than 5.

```javascript
const numbers = [3, 4, 7, 1, 9];
const index = numbers.findIndex((num) => num > 5);
console.log(index);
```

### Explanation

The `findIndex` method returns the index of the first element that satisfies the condition.

---

## 7. some

### Problem Statement

Check if there is any number greater than 10 in the array.

```javascript
const numbers = [5, 8, 10, 2];
const result = numbers.some((num) => num > 10);
console.log(result);
```

### Explanation

The `some` method checks if at least one element satisfies the condition and returns `true` or `false`.

---

## 8. every

### Problem Statement

Check if all numbers in the array are positive.

```javascript
const numbers = [1, 2, 3, 4];
const result = numbers.every((num) => num > 0);
console.log(result);
```

### Explanation

The `every` method checks if all elements satisfy the condition and returns `true` or `false`.

---

## 9. sort

### Problem Statement

Sort the array of numbers in descending order.

```javascript
const numbers = [3, 1, 4, 2];
numbers.sort((a, b) => b - a);
console.log(numbers);
```

### Explanation

The `sort` method sorts the array based on the comparator function. Here, `b - a` sorts in descending order.

---

## 10. concat

### Problem Statement

Combine two arrays into one.

```javascript
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combined = array1.concat(array2);
console.log(combined);
```

### Explanation

The `concat` method merges two or more arrays and returns a new array.

---

## 11. slice

### Problem Statement

Extract a portion of the array.

```javascript
const array = ["a", "b", "c", "d"];
const sliced = array.slice(1, 3);
console.log(sliced);
```

### Explanation

The `slice` method returns a shallow copy of a portion of the array from the start index to (but not including) the end index.

---

## 12. splice

### Problem Statement

Remove two elements starting from index 1.

```javascript
const array = ["a", "b", "c", "d"];
const removed = array.splice(1, 2);
console.log(array);
console.log(removed);
```

### Explanation

The `splice` method modifies the original array by removing or adding elements and returns the removed elements.

---

## 13. includes

### Problem Statement

Check if the array includes the value "banana".

```javascript
const fruits = ["apple", "banana", "cherry"];
const result = fruits.includes("banana");
console.log(result);
```

### Explanation

The `includes` method checks if an array contains a certain value.

---

## 14. indexOf

### Problem Statement

Find the index of the value "cherry".

```javascript
const fruits = ["apple", "banana", "cherry"];
const index = fruits.indexOf("cherry");
console.log(index);
```

### Explanation

The `indexOf` method returns the first index at which a given element is found.

---

## 15. flat

### Problem Statement

Flatten a nested array to a single level.

```javascript
const nested = [1, [2, 3], [4, [5]]];
const flattened = nested.flat(2);
console.log(flattened);
```

### Explanation

The `flat` method creates a new array by flattening the nested arrays up to the specified depth.

---

## 16. flatMap

### Problem Statement

Map each element to a sub-array and flatten the result.

```javascript
const numbers = [1, 2, 3];
const result = numbers.flatMap((num) => [num, num * 2]);
console.log(result);
```

### Explanation

The `flatMap` method maps each element using a function and then flattens the result by one level.

---

## 17. reverse

### Problem Statement

Reverse the elements of the array.

```javascript
const array = [1, 2, 3, 4];
array.reverse();
console.log(array);
```

### Explanation

The `reverse` method reverses the array in place.

---

## 18. push, pop, shift, unshift

### Problem Statement

Demonstrate adding and removing elements using push, pop, shift, and unshift.

```javascript
const array = [1, 2, 3];
array.push(4); // Adds 4 to the end
array.pop(); // Removes the last element
array.shift(); // Removes the first element
array.unshift(0); // Adds 0 to the start
console.log(array);
```

### Explanation

- `push`: Adds an element to the end.
- `pop`: Removes the last element.
- `shift`: Removes the first element.
- `unshift`: Adds an element to the beginning.

---
