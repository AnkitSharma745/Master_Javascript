This document provides an in-depth exploration of JavaScript objects. Each section covers a concept or sub-topic related to objects, accompanied by examples and explanations.

## Table of Contents

1. [Introduction to Objects](#1-introduction-to-objects)
2. [Creating Objects](#2-creating-objects)
3. [Accessing Properties](#3-accessing-properties)
4. [Adding and Modifying Properties](#4-adding-and-modifying-properties)
5. [Deleting Properties](#5-deleting-properties)
6. [Nested Objects](#6-nested-objects)
7. [Iterating Over Properties](#7-iterating-over-properties)
8. [Methods in Objects](#8-methods-in-objects)
9. [Object Destructuring](#9-object-destructuring)
10. [Object Spread Operator](#10-object-spread-operator)
    (#11-objectkeys-objectvalues-objectentries)
11. [Prototype and Inheritance](#12-prototype-and-inheritance)
12. [Object.freeze and Object.seal](#13-objectfreeze-and-objectseal)
13. [this Keyword](#14-this-keyword)
14. [Classes and Objects](#15-classes-and-objects)
15. [Object.create()](#1-objectcreate)
16. [Property Attributes](#2-property-attributes)
17. [Object.getOwnPropertyDescriptor()](#3-objectgetownpropertydescriptor)
18. [Object.defineProperty()](#4-objectdefineproperty)
19. [Object.hasOwn()](#5-objecthasown)
20. [Symbol Properties](#6-symbol-properties)
21. [Private Properties in Classes](#7-private-properties-in-classes)
22. [Shallow vs Deep Copy](#8-shallow-vs-deep-copy)

---

## 1. Introduction to Objects

Objects in JavaScript are used to store collections of key-value pairs. They are one of the fundamental building blocks of the language.

```javascript
const person = {
  name: "Alice",
  age: 25,
  isStudent: true,
};
console.log(person);
```

---

## 2. Creating Objects

### Using Object Literals

```javascript
const car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
};
```

### Using the `new Object()` Constructor

```javascript
const car = new Object();
car.brand = "Toyota";
car.model = "Corolla";
car.year = 2020;
```

### Explanation

- Object literals are concise and preferred.
- The `new Object()` syntax is less commonly used but still valid.

---

## 3. Accessing Properties

### Dot Notation

```javascript
console.log(person.name); // Alice
```

### Bracket Notation

```javascript
console.log(person["age"]); // 25
```

### Explanation

- Use dot notation for static property names.
- Use bracket notation for dynamic or special property names (e.g., containing spaces).

---

## 4. Adding and Modifying Properties

```javascript
const person = { name: "Alice" };
person.age = 25; // Adding a new property
person.name = "Bob"; // Modifying an existing property
console.log(person);
```

---

## 5. Deleting Properties

```javascript
const person = { name: "Alice", age: 25 };
delete person.age;
console.log(person); // { name: "Alice" }
```

---

## 6. Nested Objects

```javascript
const person = {
  name: "Alice",
  address: {
    city: "New York",
    zip: 10001,
  },
};
console.log(person.address.city); // New York
```

---

## 7. Iterating Over Properties

### Using `for...in`

```javascript
for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}
```

### Using `Object.keys`

```javascript
Object.keys(person).forEach((key) => {
  console.log(`${key}: ${person[key]}`);
});
```

---

## 8. Methods in Objects

### Defining Methods

```javascript
const calculator = {
  add: function (a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b; // Shorthand
  },
};
console.log(calculator.add(5, 3));
console.log(calculator.subtract(5, 3));
```

---

## 9. Object Destructuring

```javascript
const person = { name: "Alice", age: 25 };
const { name, age } = person;
console.log(name, age);
```

### Nested Destructuring

```javascript
const person = { name: "Alice", address: { city: "New York", zip: 10001 } };
const {
  address: { city },
} = person;
console.log(city);
```

---

## 10. Object Spread Operator

### Merging Objects

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 3, c: 4 }
```

---

## 11. Object.keys, Object.values, Object.entries

```javascript
const person = { name: "Alice", age: 25 };
console.log(Object.keys(person)); // ["name", "age"]
console.log(Object.values(person)); // ["Alice", 25]
console.log(Object.entries(person)); // [["name", "Alice"], ["age", 25]]
```

---

## 12. Prototype and Inheritance

### Prototype Chain

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}`);
};
const alice = new Person("Alice");
alice.greet();
```

---

## 13. Object.freeze and Object.seal

### `Object.freeze`

```javascript
const obj = { a: 1 };
Object.freeze(obj);
obj.a = 2; // Error in strict mode
console.log(obj.a); // 1
```

### `Object.seal`

```javascript
const obj = { a: 1 };
Object.seal(obj);
obj.a = 2; // Allowed
obj.b = 3; // Not allowed
console.log(obj);
```

---

## 14. this Keyword

### Context in Methods

```javascript
const person = {
  name: "Alice",
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};
person.greet();
```

---

## 15. Classes and Objects

### Defining a Class

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}
const alice = new Person("Alice", 25);
alice.greet();
```

## 1. Object.create()

### Description

The `Object.create()` method is used to create a new object with a specified prototype object.

### Example

```javascript
const parent = {
  greet() {
    console.log("Hello!");
  },
};

const child = Object.create(parent);
child.name = "Child";

console.log(child.name); // Child
child.greet(); // Hello!
```

### Explanation

- `child` inherits from `parent`.
- Methods or properties on the prototype are accessible to the object created.

---

## 2. Property Attributes

### Description

Object properties have attributes that define their behavior:

- `writable`: If the value can be changed.
- `enumerable`: If the property shows up in loops.
- `configurable`: If the property can be deleted or modified.

### Example

```javascript
const obj = { a: 1 };

Object.defineProperty(obj, "a", {
  writable: false,
  enumerable: false,
  configurable: false,
});

console.log(obj.a); // 1
obj.a = 2; // Fails silently in non-strict mode
console.log(Object.keys(obj)); // []
```

---

## 3. Object.getOwnPropertyDescriptor()

### Description

Retrieves the property descriptor for a specific property of an object.

### Example

```javascript
const obj = { a: 1 };
const descriptor = Object.getOwnPropertyDescriptor(obj, "a");
console.log(descriptor);
```

### Output

```javascript
{
  value: 1,
  writable: true,
  enumerable: true,
  configurable: true
}
```

---

## 4. Object.defineProperty()

### Description

Allows precise addition or modification of a property.

### Example

```javascript
const obj = {};
Object.defineProperty(obj, "a", {
  value: 42,
  writable: false,
});

console.log(obj.a); // 42
obj.a = 50; // Fails silently in non-strict mode
```

---

## 5. Object.hasOwn()

### Description

Checks whether an object has a direct (own) property.

### Example

```javascript
const obj = { a: 1 };
console.log(Object.hasOwn(obj, "a")); // true
console.log(Object.hasOwn(obj, "b")); // false
```

### Explanation

- Unlike `obj.hasOwnProperty()`, this method is safer as it avoids issues with overridden `hasOwnProperty` methods.

---

## 6. Symbol Properties

### Description

Symbols can be used as unique property keys.

### Example

```javascript
const sym = Symbol("id");
const obj = {
  [sym]: 123,
};

console.log(obj[sym]); // 123
console.log(Object.keys(obj)); // []
```

### Explanation

- Symbol properties are not enumerable and don’t appear in `Object.keys()` or `for...in` loops.

---

## 7. Private Properties in Classes

### Description

Private class properties are declared using `#` and are accessible only within the class.

### Example

```javascript
class Person {
  #age;

  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }

  getAge() {
    return this.#age;
  }
}

const alice = new Person("Alice", 30);
console.log(alice.getAge()); // 30
console.log(alice.#age); // SyntaxError
```

---

## 8. Shallow vs Deep Copy

### Description

- A **shallow copy** copies only the first level of properties.
- A **deep copy** copies all levels, including nested objects.

### Shallow Copy Example

```javascript
const obj = { a: 1, b: { c: 2 } };
const shallowCopy = { ...obj };
shallowCopy.b.c = 42;
console.log(obj.b.c); // 42
```

### Deep Copy Example

```javascript
const obj = { a: 1, b: { c: 2 } };
const deepCopy = JSON.parse(JSON.stringify(obj));
deepCopy.b.c = 42;
console.log(obj.b.c); // 2
```

---

### Explanation

- Shallow copy creates references for nested objects.
- Deep copy creates entirely new objects, ensuring changes don’t affect the original.
