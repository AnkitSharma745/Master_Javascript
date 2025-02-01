# Structural Design Patterns (Organizing Code for Better Scalability)

## Introduction

Structural design patterns help organize code by defining relationships between objects, improving code scalability, flexibility, and maintainability. These patterns facilitate object composition, ensuring that different parts of an application interact seamlessly while keeping the architecture modular.

## Key Structural Design Patterns

### 1. **Module Pattern**

#### What is it?

The **Module Pattern** helps encapsulate code by using closures or ES6 modules, preventing global namespace pollution and promoting maintainability.

#### Implementation

```javascript
const Module = (function () {
  let privateVar = "I am private";
  function privateMethod() {
    console.log("Accessing private method");
  }
  return {
    publicMethod: function () {
      console.log("Accessing public method");
      privateMethod();
    },
  };
})();

Module.publicMethod();
```

**Use Cases:**

- Encapsulating functionality in JavaScript applications
- Avoiding global scope pollution
- Implementing reusable and maintainable code

---

### 2. **Decorator Pattern**

#### What is it?

The **Decorator Pattern** allows dynamically adding behavior to objects without modifying their structure.

#### Implementation

```javascript
function Coffee() {
  this.cost = function () {
    return 5;
  };
}

function MilkDecorator(coffee) {
  let cost = coffee.cost();
  coffee.cost = function () {
    return cost + 2;
  };
}

let myCoffee = new Coffee();
MilkDecorator(myCoffee);
console.log(myCoffee.cost()); // Output: 7
```

**Use Cases:**

- Adding features dynamically (e.g., middleware in Express.js)
- UI enhancements without modifying existing components

---

### 3. **Adapter Pattern**

#### What is it?

The **Adapter Pattern** allows incompatible interfaces to work together by providing a translation layer.

#### Implementation

```javascript
class OldAPI {
  request() {
    return "Data from Old API";
  }
}

class NewAPI {
  fetch() {
    return "Data from New API";
  }
}

class APIAdapter {
  constructor(newAPI) {
    this.newAPI = newAPI;
  }
  request() {
    return this.newAPI.fetch();
  }
}

const adapter = new APIAdapter(new NewAPI());
console.log(adapter.request()); // Output: Data from New API
```

**Use Cases:**

- Migrating legacy systems to new implementations
- Ensuring compatibility between different APIs

---

### 4. **Proxy Pattern**

#### What is it?

The **Proxy Pattern** acts as a middleman for controlling access to an object, useful for caching, logging, and security.

#### Implementation

```javascript
class APIService {
  fetchData() {
    console.log("Fetching data from API...");
    return "API Data";
  }
}

class APIProxy {
  constructor() {
    this.apiService = new APIService();
    this.cache = null;
  }
  fetchData() {
    if (!this.cache) {
      this.cache = this.apiService.fetchData();
    }
    return this.cache;
  }
}

const proxy = new APIProxy();
console.log(proxy.fetchData()); // Fetches from API
console.log(proxy.fetchData()); // Returns cached data
```

**Use Cases:**

- Caching API responses
- Access control and logging

---

### 5. **Facade Pattern**

#### What is it?

The **Facade Pattern** provides a simplified interface to a complex subsystem, making it easier to interact with.

#### Implementation

```javascript
class SubsystemA {
  operationA() {
    return "Subsystem A operation";
  }
}
class SubsystemB {
  operationB() {
    return "Subsystem B operation";
  }
}
class Facade {
  constructor() {
    this.subA = new SubsystemA();
    this.subB = new SubsystemB();
  }
  simpleOperation() {
    return `${this.subA.operationA()} + ${this.subB.operationB()}`;
  }
}

const facade = new Facade();
console.log(facade.simpleOperation());
```

**Use Cases:**

- Simplifying complex APIs
- Creating user-friendly interfaces for subsystems

---

### 6. **Composite Pattern**

#### What is it?

The **Composite Pattern** treats a group of objects as a single object, useful for hierarchical structures.

#### Implementation

```javascript
class Leaf {
  operation() {
    console.log("Leaf operation");
  }
}
class Composite {
  constructor() {
    this.children = [];
  }
  add(child) {
    this.children.push(child);
  }
  operation() {
    this.children.forEach((child) => child.operation());
  }
}

const leaf1 = new Leaf();
const leaf2 = new Leaf();
const composite = new Composite();
composite.add(leaf1);
composite.add(leaf2);
composite.operation();
```

**Use Cases:**

- Building UI components (React component trees)
- Managing hierarchical structures (file systems, DOM trees)

---

### 7. **Bridge Pattern**

#### What is it?

The **Bridge Pattern** separates abstraction from implementation, promoting flexibility.

#### Implementation

```javascript
class Device {
  turnOn() {}
  turnOff() {}
}
class TV extends Device {
  turnOn() {
    console.log("TV is ON");
  }
  turnOff() {
    console.log("TV is OFF");
  }
}
class Remote {
  constructor(device) {
    this.device = device;
  }
  power() {
    this.device.turnOn();
  }
}

const myTV = new TV();
const remote = new Remote(myTV);
remote.power();
```

**Use Cases:**

- Decoupling UI logic from backend logic
- Supporting multiple platforms with different implementations

## Conclusion

Structural design patterns are crucial for building scalable, maintainable applications. By organizing code effectively, these patterns enhance readability, flexibility, and reusability. Understanding these patterns helps developers build better software architectures for modern applications.

Next, we will explore **Behavioral Design Patterns**, which focus on object interactions and responsibilities.
