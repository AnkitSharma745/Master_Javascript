# Interfaces in TypeScript

Interfaces in TypeScript define the structure of an object, ensuring that an object adheres to a specific shape. They provide type safety without adding extra runtime overhead.

---

## 1. Introduction to Interfaces

An interface is a way to define a contract for an object’s shape. Unlike type aliases, interfaces can be extended and implemented by classes.

### Example:

```ts
interface Person {
  name: string;
  age: number;
}

const user: Person = {
  name: "Alice",
  age: 25,
};
console.log(user);
```

---

## 2. Defining an Interface

Interfaces can define properties and their types.

```ts
interface Car {
  brand: string;
  model: string;
  year: number;
}

const myCar: Car = {
  brand: "Toyota",
  model: "Camry",
  year: 2022,
};
console.log(myCar);
```

---

## 3. Optional and Readonly Properties

- **Optional properties** use `?` and can be omitted.
- **Readonly properties** ensure immutability.

```ts
interface Book {
  title: string;
  author: string;
  readonly isbn: string;
  pages?: number; // Optional property
}

const myBook: Book = {
  title: "TypeScript Handbook",
  author: "Microsoft",
  isbn: "123-456-789",
};

// myBook.isbn = "987-654-321"; // Error: Cannot assign to 'isbn' because it is a read-only property
```

---

## 4. Extending Interfaces

Interfaces can extend other interfaces to reuse properties.

```ts
interface Animal {
  species: string;
}

interface Dog extends Animal {
  breed: string;
}

const myDog: Dog = {
  species: "Canine",
  breed: "Labrador",
};
console.log(myDog);
```

---

## 5. Interface vs Type Aliases

| Feature            | Interface                   | Type Alias         |
| ------------------ | --------------------------- | ------------------ |
| Object Type        | ✅                          | ✅                 |
| Extensibility      | ✅ (extends)                | ✅ (intersections) |
| Implements (Class) | ✅                          | ❌                 |
| Function Types     | ❌ (must define separately) | ✅                 |

**Example of Type Alias:**

```ts
type Point = {
  x: number;
  y: number;
};
const coord: Point = { x: 10, y: 20 };
```

---

## 6. Indexable Types

Interfaces can define objects with dynamic keys.

```ts
interface Dictionary {
  [key: string]: string;
}

const translations: Dictionary = {
  hello: "Hola",
  world: "Mundo",
};
console.log(translations["hello"]);
```

---

## 7. Implementing Interfaces in Classes

Classes can implement interfaces to enforce a structure.

```ts
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log("Log: ", message);
  }
}

const logger = new ConsoleLogger();
logger.log("This is a log message");
```

---

## 8. Hybrid Types (Function + Object)

Interfaces can define both functions and properties.

```ts
interface Counter {
  count: number;
  increment(): void;
}

const myCounter: Counter = {
  count: 0,
  increment() {
    this.count++;
  },
};

myCounter.increment();
console.log(myCounter.count);
```

---

## Summary

- **Interfaces** define object shapes and ensure type safety.
- **Optional and Readonly Properties** provide flexibility and immutability.
- **Extending Interfaces** allows reusability and scalability.
- **Interface vs Type Aliases** comparison helps choose the right tool.
- **Indexable Types** handle dynamic object keys.
- **Implementing Interfaces in Classes** enforces structured OOP practices.
- **Hybrid Types** allow interfaces to define both objects and functions.

Using interfaces effectively improves TypeScript code maintainability and scalability.
