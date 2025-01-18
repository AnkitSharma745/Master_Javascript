# Inheritance and Static Features

## 1. Inheritance in JavaScript

### 1.1 What is Inheritance?

Inheritance is a fundamental principle of object-oriented programming where a class (child) derives properties and methods from another class (parent). It promotes code reuse and logical structure.

### 1.2 Creating a Subclass with `extends`

The `extends` keyword is used to create a subclass in JavaScript.

**Example:**

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  makeSound() {
    console.log(`${this.name} barks.`);
  }
}

const dog = new Dog("Buddy");
dog.makeSound(); // Buddy barks.
```

### 1.3 `super` Keyword

The `super` keyword refers to the parent class and is used to:

- Call the parent class constructor.
- Access parent methods within a child class.

**Example:**

```javascript
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  describe() {
    return `${this.make} ${this.model}`;
  }
}

class Car extends Vehicle {
  constructor(make, model, doors) {
    super(make, model); // Call parent constructor
    this.doors = doors;
  }

  describe() {
    return `${super.describe()} with ${this.doors} doors`;
  }
}

const sedan = new Car("Toyota", "Camry", 4);
console.log(sedan.describe()); // Toyota Camry with 4 doors
```

## 2. Method Overriding

Method overriding allows a child class to provide a specific implementation of a method already defined in its parent class.

**Example:**

```javascript
class Shape {
  area() {
    throw new Error("Method not implemented.");
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }

  area() {
    return this.side ** 2;
  }
}

const square = new Square(5);
console.log(square.area()); // 25
```

### Benefits of Overriding

- Customizes inherited behavior.
- Enhances flexibility and reusability.

## 3. Static Properties and Methods

Static members are associated with the class itself rather than any instance.

### 3.1 Defining Static Members

Use the `static` keyword to define static properties or methods.

**Example:**

```javascript
class MathUtils {
  static PI = 3.14159;

  static calculateArea(radius) {
    return this.PI * radius ** 2;
  }
}

console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.calculateArea(10)); // 314.159
```

### 3.2 Accessing Static Members

Static members are accessed directly via the class name, not instances.

**Example:**

```javascript
const mathInstance = new MathUtils();
// console.log(mathInstance.PI); // Error: PI is not a property of the instance
```

### Common Use Cases

- Utility functions (e.g., math libraries).
- Constants shared across the application.

## 4. Multiple Inheritance with Mixins

JavaScript does not support multiple inheritance natively, but it can be simulated using mixins.

### 4.1 What is a Mixin?

A mixin is a class or function that provides reusable methods, allowing multiple classes to share behavior.

**Example:**

```javascript
const CanFly = (Base) =>
  class extends Base {
    fly() {
      console.log(`${this.name} is flying.`);
    }
  };

const CanSwim = (Base) =>
  class extends Base {
    swim() {
      console.log(`${this.name} is swimming.`);
    }
  };

class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Duck extends CanFly(CanSwim(Animal)) {}

const donald = new Duck("Donald");
donald.fly(); // Donald is flying.
donald.swim(); // Donald is swimming.
```

### Benefits of Mixins

- Encourages code reuse.
- Provides a workaround for multiple inheritance.

## 5. Composition vs. Inheritance

While inheritance promotes a hierarchy, composition focuses on assembling objects with specific behaviors.

### 5.1 Composition Example

**Example:**

```javascript
const canWalk = {
  walk() {
    console.log(`${this.name} is walking.`);
  },
};

const canTalk = {
  talk() {
    console.log(`${this.name} is talking.`);
  },
};

function createPerson(name) {
  return Object.assign({ name }, canWalk, canTalk);
}

const person = createPerson("Alice");
person.walk(); // Alice is walking.
person.talk(); // Alice is talking.
```

### Pros and Cons

| Feature     | Inheritance            | Composition     |
| ----------- | ---------------------- | --------------- |
| Code Reuse  | High                   | High            |
| Flexibility | Limited by hierarchy   | Highly flexible |
| Complexity  | Easier in simple cases | Scales better   |

## 6. instanceof and Prototype Chain

The `instanceof` operator checks whether an object is an instance of a specific class.

**Example:**

```javascript
class Animal {}
class Dog extends Animal {}

const myDog = new Dog();
console.log(myDog instanceof Dog); // true
console.log(myDog instanceof Animal); // true
console.log(myDog instanceof Object); // true
```

### How It Works

- It traverses the prototype chain to verify the relationship.

## 7. Polymorphism

Polymorphism allows methods to behave differently based on the object invoking them.

### 7.1 Example with Overriding

```javascript
class Printer {
  print() {
    console.log("Printing a generic document.");
  }
}

class PhotoPrinter extends Printer {
  print() {
    console.log("Printing a photo.");
  }
}

const printers = [new Printer(), new PhotoPrinter()];
printers.forEach((printer) => printer.print());
// Printing a generic document.
// Printing a photo.
```

### Benefits

- Enhances flexibility and scalability.
- Promotes clean and maintainable code.
