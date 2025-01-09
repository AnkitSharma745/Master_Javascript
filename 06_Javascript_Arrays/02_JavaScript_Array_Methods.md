## Introduction

JavaScript provides a variety of built-in methods to perform operations on arrays. These methods enable developers to handle data efficiently without manually implementing common algorithms.

---

## 1. `push()` and `pop()`

These methods manipulate the end of an array.

### `push()`

Adds one or more elements to the end of the array.

### Example:

```javascript
let fruits = ["apple", "banana"];
fruits.push("cherry");
console.log(fruits); // Output: ["apple", "banana", "cherry"]
```

### `pop()`

Removes and returns the last element of the array.

### Example:

```javascript
let colors = ["red", "green", "blue"];
let lastColor = colors.pop();
console.log(colors); // Output: ["red", "green"]
console.log(lastColor); // Output: blue
```

---

## 2. `shift()` and `unshift()`

These methods manipulate the beginning of an array.

### `shift()`

Removes and returns the first element of the array.

### Example:

```javascript
let queue = ["task1", "task2", "task3"];
let firstTask = queue.shift();
console.log(queue); // Output: ["task2", "task3"]
console.log(firstTask); // Output: task1
```

### `unshift()`

Adds one or more elements to the beginning of the array.

### Example:

```javascript
let numbers = [2, 3, 4];
numbers.unshift(1);
console.log(numbers); // Output: [1, 2, 3, 4]
```

---

## 3. `slice()`

Extracts a portion of an array without modifying the original.

### Syntax:

```javascript
array.slice(startIndex, endIndex);
```

### Example:

```javascript
let animals = ["dog", "cat", "rabbit", "hamster"];
let slicedAnimals = animals.slice(1, 3);
console.log(slicedAnimals); // Output: ["cat", "rabbit"]
console.log(animals); // Output: ["dog", "cat", "rabbit", "hamster"]
```

---

## 4. `splice()`

Adds, removes, or replaces elements in an array.

### Syntax:

```javascript
array.splice(startIndex, deleteCount, ...itemsToAdd);
```

### Example 1: Removing Elements

```javascript
let items = ["a", "b", "c", "d"];
items.splice(1, 2); // Removes 2 elements starting at index 1
console.log(items); // Output: ["a", "d"]
```

### Example 2: Adding Elements

```javascript
let numbers = [1, 2, 5];
numbers.splice(2, 0, 3, 4); // Adds 3 and 4 at index 2
console.log(numbers); // Output: [1, 2, 3, 4, 5]
```

---

## 5. `concat()`

Merges two or more arrays into a new array.

### Example:

```javascript
let arr1 = [1, 2];
let arr2 = [3, 4];
let merged = arr1.concat(arr2);
console.log(merged); // Output: [1, 2, 3, 4]
```

---

## 6. `forEach()`

Iterates over each element in an array.

### Example:

```javascript
let numbers = [1, 2, 3];
numbers.forEach((num, index) => {
  console.log(`Index: ${index}, Value: ${num}`);
});
// Output:
// Index: 0, Value: 1
// Index: 1, Value: 2
// Index: 2, Value: 3
```

---

## 7. `map()`

Creates a new array by applying a function to each element.

### Example:

```javascript
let numbers = [1, 2, 3];
let squares = numbers.map((num) => num * num);
console.log(squares); // Output: [1, 4, 9]
```

---

## 8. `filter()`

Creates a new array with elements that satisfy a condition.

### Example:

```javascript
let ages = [10, 20, 15, 30];
let adults = ages.filter((age) => age >= 18);
console.log(adults); // Output: [20, 30]
```

---

## 9. `reduce()`

Reduces an array to a single value by applying a function.

### Example:

```javascript
let numbers = [1, 2, 3, 4];
let sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // Output: 10
```

---

## 10. `find()`

Returns the first element that satisfies a condition.

### Example:

```javascript
let numbers = [10, 20, 30];
let found = numbers.find((num) => num > 15);
console.log(found); // Output: 20
```

---

## 11. `findIndex()`

Returns the index of the first element that satisfies a condition.

### Example:

```javascript
let numbers = [5, 12, 8, 130, 44];
let index = numbers.findIndex((num) => num > 10);
console.log(index); // Output: 1
```

---

## 12. `every()` and `some()`

### `every()`

Checks if all elements satisfy a condition.

### Example:

```javascript
let numbers = [2, 4, 6];
let allEven = numbers.every((num) => num % 2 === 0);
console.log(allEven); // Output: true
```

### `some()`

Checks if at least one element satisfies a condition.

### Example:

```javascript
let numbers = [1, 2, 3];
let hasEven = numbers.some((num) => num % 2 === 0);
console.log(hasEven); // Output: true
```

---

## 13. `sort()`

Sorts the elements of an array.

### Example:

```javascript
let fruits = ["banana", "apple", "cherry"];
fruits.sort();
console.log(fruits); // Output: ["apple", "banana", "cherry"]
```

---

## 14. `reverse()`

Reverses the order of elements in an array.

### Example:

```javascript
let numbers = [1, 2, 3];
numbers.reverse();
console.log(numbers); // Output: [3, 2, 1]
```

---

## Conclusion

Mastering array methods is crucial for efficient JavaScript programming. Practice these methods with real-world scenarios to gain confidence.

---

## Practice Exercises

1. Create a function that uses `map()` and `reduce()` to calculate the sum of squares of an array.
2. Write a program that filters out invalid email addresses using `filter()`.
3. Use `find()` and `findIndex()` to locate a product in an inventory based on its ID.
