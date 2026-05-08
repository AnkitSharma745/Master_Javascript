# Classes in TypeScript

TypeScript provides powerful object-oriented programming features, allowing developers to define classes with properties, methods, inheritance, and access control modifiers. Understanding these features is essential for writing clean, maintainable, and scalable applications.

---

## Defining Classes

Classes in TypeScript are defined using the `class` keyword. A class can contain properties, methods, and constructors.

### Example

```typescript
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(): void {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const person = new Person("Alice");
person.greet(); // Output: Hello, my name is Alice
```

---

## Constructors and the `super()` Method

The constructor is a special method used to initialize class properties. The `super()` method is used when extending a parent class to call its constructor.

### Example with Inheritance

```typescript
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): void {
    console.log("Generic animal sound");
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  makeSound(): void {
    console.log("Woof!");
  }
}

const dog = new Dog("Buddy");
dog.makeSound(); // Output: Woof!
```

---

## Public, Private, and Protected Members

TypeScript provides access control modifiers to encapsulate class properties and methods.

### 1. **Public** (default)

Accessible from anywhere.

```typescript
class Example {
  public message: string = "Hello!";
}

const example = new Example();
console.log(example.message); // Output: Hello!
```

### 2. **Private**

Accessible only within the class.

```typescript
class Example {
  private secret: string = "This is private!";

  showSecret(): void {
    console.log(this.secret);
  }
}

const example = new Example();
example.showSecret(); // Output: This is private!
// console.log(example.secret); // Error: Property 'secret' is private
```

### 3. **Protected**

Accessible within the class and its subclasses.

```typescript
class Parent {
  protected message: string = "Protected message";
}

class Child extends Parent {
  displayMessage(): void {
    console.log(this.message);
  }
}

const child = new Child();
child.displayMessage(); // Output: Protected message
```

---

## Getters and Setters

Getters and setters allow controlled access to class properties.

### Example

```typescript
class Employee {
  private _salary: number = 0;

  get salary(): number {
    return this._salary;
  }

  set salary(value: number) {
    if (value < 0) {
      throw new Error("Salary cannot be negative.");
    }
    this._salary = value;
  }
}

const employee = new Employee();
employee.salary = 5000;
console.log(employee.salary); // Output: 5000
```

---

## Method Overloading

TypeScript supports method overloading, where multiple method signatures are defined for a single method name.

### Example

```typescript
class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: any, b: any): any {
    return a + b;
  }
}

const calc = new Calculator();
console.log(calc.add(1, 2)); // Output: 3
console.log(calc.add("Hello, ", "World!")); // Output: Hello, World!
```

---

## Inheritance and Method Overriding

Classes can extend other classes, inheriting their properties and methods. Method overriding allows subclasses to provide a specific implementation of a method.

### Example

```typescript
class Vehicle {
  drive(): void {
    console.log("Driving a vehicle");
  }
}

class Car extends Vehicle {
  drive(): void {
    console.log("Driving a car");
  }
}

const car = new Car();
car.drive(); // Output: Driving a car
```

---

## Static Members

Static members belong to the class rather than instances of the class. They are accessed using the class name.

### Example

```typescript
class Utility {
  static calculateArea(radius: number): number {
    return Math.PI * radius * radius;
  }
}

console.log(Utility.calculateArea(5)); // Output: 78.53981633974483
```

---

## Abstract Classes and Methods

Abstract classes cannot be instantiated directly and may contain abstract methods that must be implemented by subclasses.

### Example

```typescript
abstract class Shape {
  abstract calculateArea(): number;
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

const circle = new Circle(5);
console.log(circle.calculateArea()); // Output: 78.53981633974483
```

---

## Interface Implementations in Classes

Classes can implement interfaces to ensure they adhere to a specific structure.

### Example

```typescript
interface Printable {
  print(): void;
}

class Document implements Printable {
  print(): void {
    console.log("Printing document...");
  }
}

const doc = new Document();
doc.print(); // Output: Printing document...
```

---

This document provides a comprehensive overview of classes in TypeScript, covering key concepts, access modifiers, inheritance, and advanced features with practical examples.
