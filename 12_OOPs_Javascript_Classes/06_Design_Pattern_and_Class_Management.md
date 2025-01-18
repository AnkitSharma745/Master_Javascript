# Advanced Design Patterns and Class Management

## 1. Singleton Pattern

### 1.1 Definition

The Singleton Pattern ensures that a class has only one instance and provides a global point of access to it. It is often used to manage shared resources such as configurations or database connections.

### 1.2 Implementation

**Example:**

```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
    this.state = "Initialized";
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();
instance1.setState("Updated");

console.log(instance1 === instance2); // true
console.log(instance2.getState()); // "Updated"
```

### 1.3 Use Cases

- Managing a single configuration object.
- Centralized logging systems.
- Managing shared states in applications.

---

## 2. Factory Pattern

### 2.1 Definition

The Factory Pattern provides a way to create objects without specifying the exact class of the object that will be created. It abstracts the instantiation logic.

### 2.2 Implementation

**Example:**

```javascript
class ShapeFactory {
  static createShape(type) {
    switch (type) {
      case "circle":
        return new Circle();
      case "square":
        return new Square();
      default:
        throw new Error("Unknown shape type");
    }
  }
}

class Circle {
  draw() {
    console.log("Drawing a circle.");
  }
}

class Square {
  draw() {
    console.log("Drawing a square.");
  }
}

const shape1 = ShapeFactory.createShape("circle");
shape1.draw(); // Drawing a circle.

const shape2 = ShapeFactory.createShape("square");
shape2.draw(); // Drawing a square.
```

### 2.3 Use Cases

- Creating objects with different configurations.
- Decoupling object creation from its usage.

---

## 3. Observer Pattern

### 3.1 Definition

The Observer Pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified.

### 3.2 Implementation

**Example:**

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log(`Observer received data: ${data}`);
  }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.addObserver(observer1);
subject.addObserver(observer2);
subject.notifyObservers("Event Triggered");
// Observer received data: Event Triggered
// Observer received data: Event Triggered
```

### 3.3 Use Cases

- Event-driven programming (e.g., UI updates).
- Real-time data streaming applications.

---

## 4. Module Pattern

### 4.1 Definition

The Module Pattern encapsulates code within a module to provide a public interface while keeping certain variables and functions private.

### 4.2 Implementation

**Example:**

```javascript
const CounterModule = (() => {
  let count = 0;

  return {
    increment() {
      count += 1;
      return count;
    },

    decrement() {
      count -= 1;
      return count;
    },

    getCount() {
      return count;
    },
  };
})();

console.log(CounterModule.increment()); // 1
console.log(CounterModule.getCount()); // 1
console.log(CounterModule.decrement()); // 0
```

### 4.3 Use Cases

- Encapsulating functionality.
- Avoiding global variable pollution.

---

## 5. Prototype Pattern

### 5.1 Definition

The Prototype Pattern creates new objects by cloning an existing object, serving as a prototype.

### 5.2 Implementation

**Example:**

```javascript
const carPrototype = {
  drive() {
    console.log(`${this.make} is driving.`);
  },
};

const car1 = Object.create(carPrototype, {
  make: { value: "Toyota" },
});

const car2 = Object.create(carPrototype, {
  make: { value: "Honda" },
});

car1.drive(); // Toyota is driving.
car2.drive(); // Honda is driving.
```

### 5.3 Use Cases

- Cloning objects with a shared prototype.
- Creating objects with minimal overhead.

---

## 6. Dependency Injection

### 6.1 Definition

Dependency Injection (DI) is a design pattern where dependencies are passed into an object rather than the object creating them itself.

### 6.2 Implementation

**Example:**

```javascript
class Logger {
  log(message) {
    console.log(`Log: ${message}`);
  }
}

class Service {
  constructor(logger) {
    this.logger = logger;
  }

  execute() {
    this.logger.log("Service executed.");
  }
}

const logger = new Logger();
const service = new Service(logger);
service.execute(); // Log: Service executed.
```

### 6.3 Use Cases

- Making code more testable.
- Decoupling components.

---

## 7. Class Management Best Practices

### 7.1 Encapsulation

Encapsulate class details to reduce coupling and increase maintainability.

### 7.2 Separation of Concerns

Ensure each class handles a single responsibility or domain.

### 7.3 Favor Composition Over Inheritance

Use composition to build flexible systems.

### 7.4 Use Dependency Injection

Pass dependencies to classes rather than hardcoding them.

### 7.5 Document Classes

Provide clear documentation for class methods and properties for better readability and maintainability.
