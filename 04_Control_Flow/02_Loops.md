# Loops in JavaScript

## for Loop

### Traditional for Loop

The `for` loop is used for iterating over a block of code a known number of times.

```javascript
for (let i = 0; i < 5; i++) {
  console.log(`Iteration ${i}`);
}
```

### Loop Control with `continue` and `break`

- `break`: Terminates the loop.
- `continue`: Skips the current iteration.

```javascript
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // Skip iteration 2
  }
  if (i === 4) {
    break; // Terminate the loop
  }
  console.log(i);
}
```

## while Loop

### Basic Usage

The `while` loop continues as long as the condition evaluates to `true`.

```javascript
let count = 0;

while (count < 5) {
  console.log(`Count is ${count}`);
  count++;
}
```

### Infinite Loops and Termination Conditions

Be cautious to avoid infinite loops by ensuring the condition eventually evaluates to `false`.

```javascript
let value = 10;

while (value > 0) {
  console.log(value);
  value--; // Ensure termination
}
```

## do...while Loop

### Key Differences from `while` Loop

The `do...while` loop executes the code block at least once, even if the condition is false.

```javascript
let number = 10;

do {
  console.log(number);
  number--;
} while (number > 0);
```

### Use Cases and Edge Cases

Useful when the condition depends on the outcome of the initial code execution.

```javascript
let userResponse;

do {
  userResponse = prompt("Enter a number greater than 5:");
} while (parseInt(userResponse) <= 5);
```

## for...in Loop

### Iterating Over Object Properties

The `for...in` loop iterates over the enumerable properties of an object.

```javascript
const user = { name: "Alice", age: 25, city: "Paris" };

for (let key in user) {
  console.log(`${key}: ${user[key]}`);
}
```

### Potential Pitfalls

It can iterate over inherited properties. Use `Object.hasOwnProperty` to avoid this.

```javascript
const person = { name: "John" };
Object.prototype.age = 30; // Adding property to prototype

for (let key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(`${key}: ${person[key]}`);
  }
}
```

## for...of Loop

### Iterating Over Iterable Objects

The `for...of` loop is used for iterables such as arrays, strings, and maps.

```javascript
const fruits = ["Apple", "Banana", "Cherry"];

for (let fruit of fruits) {
  console.log(fruit);
}
```

### Compatibility with Various Data Structures

`for...of` works with arrays, strings, maps, sets, and more.

```javascript
// Iterating over a string
for (let char of "Hello") {
  console.log(char);
}

// Iterating over a map
const map = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);
for (let [key, value] of map) {
  console.log(`${key}: ${value}`);
}
```

## Nested Loops

### Combining Loops

Loops can be nested for multidimensional iterations.

```javascript
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`i = ${i}, j = ${j}`);
  }
}
```

## Performance Considerations

- Use `for` loops for performance-critical tasks where index-based iteration is needed.
- Avoid excessive nesting as it can lead to performance degradation.

## Advanced Use Cases

### Labelled Statements with Break

Labels allow breaking out of nested loops.

```javascript
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === j) {
      break outer;
    }
    console.log(`i = ${i}, j = ${j}`);
  }
}
```

### Iterating with Generators

Generators are a more advanced use case for iteration.

```javascript
function* generateNumbers() {
  yield 1;
  yield 2;
  yield 3;
}

for (let num of generateNumbers()) {
  console.log(num);
}
```
