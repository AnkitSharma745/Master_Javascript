# Conditional Statements in JavaScript

## if Statement

### Basic Usage

The `if` statement executes a block of code only if a specified condition is true.

```javascript
let age = 18;
if (age >= 18) {
  console.log("You are eligible to vote.");
}
```

### Nested if Statements

You can nest `if` statements inside one another to evaluate multiple conditions.

```javascript
let age = 20;
let hasID = true;

if (age >= 18) {
  if (hasID) {
    console.log("Access granted.");
  } else {
    console.log("ID required.");
  }
}
```

## if...else vs if...else if...else

### if...else Statement

Use `if...else` to provide an alternative block of code if the condition is false.

```javascript
let isRaining = false;

if (isRaining) {
  console.log("Take an umbrella.");
} else {
  console.log("Enjoy the sunshine.");
}
```

### if...else if...else Statement

This structure is used when you have multiple conditions to check.

```javascript
let score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 75) {
  console.log("Grade: B");
} else {
  console.log("Grade: C");
}
```

## else if Statement

### Multiple Conditions

Using `else if` helps in evaluating multiple exclusive conditions.

```javascript
let day = "Saturday";

if (day === "Monday") {
  console.log("Start of the work week.");
} else if (day === "Saturday" || day === "Sunday") {
  console.log("It's the weekend!");
} else {
  console.log("Midweek hustle.");
}
```

## Ternary Operator

### Syntax and Shorthand

The ternary operator is a concise way to write an `if...else` statement.

```javascript
let age = 20;
let eligibility = age >= 18 ? "Eligible" : "Not eligible";
console.log(eligibility);
```

### When to Use vs `if` Statements

Use ternary operators for simple conditional assignments or expressions, but prefer `if` statements for complex logic.

```javascript
// Simple
let isMember = true;
let fee = isMember ? "$10" : "$20";

// Complex (use if)
if (isMember && age >= 60) {
  fee = "$5";
} else if (isMember) {
  fee = "$10";
} else {
  fee = "$20";
}
```

## switch Statement

### Syntax and Usage

The `switch` statement evaluates an expression and matches it to case labels.

```javascript
let fruit = "Apple";

switch (fruit) {
  case "Apple":
    console.log("Apples are $2 per pound.");
    break;
  case "Banana":
    console.log("Bananas are $1 per pound.");
    break;
  default:
    console.log("Fruit not available.");
}
```

### Fallthrough Behavior

Without `break`, execution continues to the next case.

```javascript
let number = 2;

switch (number) {
  case 1:
  case 2:
  case 3:
    console.log("Number is 1, 2, or 3.");
    break;
  default:
    console.log("Number is unknown.");
}
```

### Use Cases for `switch` vs `if`

- Use `switch` for multiple discrete values.
- Use `if` for ranges or complex conditions.

## break Statement

### Breaking Out of Loops and Switch Cases

The `break` statement terminates the current loop or `switch` case.

```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    break;
  }
  console.log(i);
}
```

## continue Statement

### Skipping Current Loop Iteration

The `continue` statement skips the current iteration and proceeds to the next.

```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }
  console.log(i);
}
```

## Pattern Matching and Destructuring

### Destructuring with if and switch

You can destructure objects and use their properties in conditions.

```javascript
let person = { name: "John", age: 30 };

if (person.age >= 18) {
  console.log(`${person.name} is an adult.`);
}
```

### switch with Object Destructuring

```javascript
let fruit = { type: "Apple", color: "Red" };

switch (fruit.type) {
  case "Apple":
    console.log(`This is a ${fruit.color} apple.`);
    break;
  default:
    console.log("Unknown fruit.");
}
```

## Pattern Matching (ES2023 Proposal)

### Matching Against Objects and Arrays

Pattern matching simplifies conditional logic by matching object or array structures.

```javascript
let shape = { type: "circle", radius: 5 };

switch (shape) {
  case { type: "circle", radius: 5 }:
    console.log("It's a small circle.");
    break;
  default:
    console.log("Unknown shape.");
}
```
