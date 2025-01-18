# Class Features and Advanced Methods

## 1. Class Constructors and Initialization

### 1.1 What is a Constructor?

A constructor is a special method used to initialize objects. In JavaScript, the `constructor` method is called automatically when an object of a class is created.

**Example:**

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  describe() {
    return `${this.name} is ${this.age} years old.`;
  }
}

const john = new Person("John", 30);
console.log(john.describe()); // John is 30 years old.
```

### 1.2 Default Parameter Values

Constructors can have default parameter values to simplify object creation.

**Example:**

```javascript
class Product {
  constructor(name, price = 100) {
    this.name = name;
    this.price = price;
  }
}

const item = new Product("Gadget");
console.log(item); // Product { name: 'Gadget', price: 100 }
```

### 1.3 Handling Optional Properties

You can use optional parameters or check conditions to handle properties that might not always be defined.

**Example:**

```javascript
class User {
  constructor(username, email) {
    this.username = username;
    this.email = email || "Not Provided";
  }
}

const user = new User("Alice");
console.log(user); // User { username: 'Alice', email: 'Not Provided' }
```

## 2. Getter and Setter Methods

Getters and setters allow controlled access to class properties, ensuring encapsulation and validation.

**Example:**

```javascript
class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get area() {
    return this._width * this._height;
  }

  set width(value) {
    if (value <= 0) throw new Error("Width must be positive.");
    this._width = value;
  }

  set height(value) {
    if (value <= 0) throw new Error("Height must be positive.");
    this._height = value;
  }
}

const rect = new Rectangle(10, 20);
console.log(rect.area); // 200
rect.width = 15;
console.log(rect.area); // 300
```

### Benefits of Getters and Setters

- **Encapsulation**: Restricts direct access to properties.
- **Validation**: Adds validation logic when setting property values.
- **Computed Properties**: Allows computed values to be accessed like properties.

## 3. Private and Readonly Properties

### 3.1 Private Properties

In modern JavaScript, private fields are prefixed with `#` and are accessible only within the class.

**Example:**

```javascript
class BankAccount {
  #balance;

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Amount must be positive.");
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount(500);
account.deposit(100);
console.log(account.getBalance()); // 600
// console.log(account.#balance); // Error: Private field '#balance' must be accessed within its class
```

### 3.2 Readonly Properties

Read-only properties can be simulated by omitting setters or using `Object.freeze`.

**Example:**

```javascript
class ImmutablePoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    Object.freeze(this);
  }
}

const point = new ImmutablePoint(10, 20);
console.log(point.x, point.y); // 10, 20
// point.x = 15; // Error: Cannot assign to read-only property
```

## 4. Static Methods and Properties

Static members belong to the class itself and are accessed without creating an instance.

**Example:**

```javascript
class MathUtils {
  static PI = 3.14159;

  static calculateCircleArea(radius) {
    return this.PI * radius * radius;
  }
}

console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.calculateCircleArea(10)); // 314.159
```

### Common Use Cases

- Utility functions (e.g., Math libraries)
- Constants shared across all instances

## 5. Method Overloading

While JavaScript doesn’t support method overloading natively, it can be simulated using flexible arguments or condition checks.

**Example:**

```javascript
class Calculator {
  add(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    } else if (typeof a === "string" && typeof b === "string") {
      return a + b;
    } else {
      throw new Error("Invalid types");
    }
  }
}

const calc = new Calculator();
console.log(calc.add(5, 10)); // 15
console.log(calc.add("Hello, ", "World!")); // Hello, World!
```

## 6. Abstract Classes and Methods

JavaScript doesn’t have built-in abstract classes but can achieve similar behavior using base classes and throwing errors for unimplemented methods.

**Example:**

```javascript
class Shape {
  getArea() {
    throw new Error("Method not implemented.");
  }

  describe() {
    return "This is a shape.";
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

const circle = new Circle(5);
console.log(circle.getArea()); // 78.53981633974483
```

## 7. Encapsulation and Access Modifiers

Encapsulation ensures the internal details of a class are hidden. JavaScript uses `private`, `protected` (via closures or conventions), and `public` properties to control visibility.

### 7.1 Public Modifier

Properties and methods are `public` by default and accessible anywhere.

### 7.2 Protected Modifier

Simulate protected members using closures or naming conventions like `_`.

**Example:**

```javascript
class Parent {
  _greet() {
    return "Hello from parent!";
  }
}

class Child extends Parent {
  sayHello() {
    return this._greet();
  }
}

const child = new Child();
console.log(child.sayHello()); // Hello from parent!
```

---

This enhanced file delves deeper into JavaScript-specific implementations of class features and advanced methods, ensuring a strong foundation for object-oriented programming in JavaScript.
