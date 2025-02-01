# Behavioral Design Patterns

## Introduction

Behavioral design patterns focus on defining how objects communicate with each other. They help in organizing interactions between objects while ensuring loose coupling, flexibility, and better maintainability of code.

These patterns are particularly useful when multiple objects need to work together, but their interactions should be easy to change without modifying individual components.

## Key Behavioral Design Patterns

### 1. Observer Pattern

**Purpose:**

- Establishes a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

**Use Cases:**

- Event-driven programming
- Implementing reactive UI updates

**Example:** JavaScript implementation using `EventEmitter`.

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }
  subscribe(observer) {
    this.observers.push(observer);
  }
  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log("Observer received data:", data);
  }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify("New Event!");
```

---

### 2. Mediator Pattern

**Purpose:**

- Defines an intermediary (mediator) that encapsulates communication between objects to reduce direct dependencies.

**Use Cases:**

- Chat applications
- Decoupling communication between UI components

**Example:**

```javascript
class Mediator {
  constructor() {
    this.participants = [];
  }
  register(participant) {
    this.participants.push(participant);
    participant.mediator = this;
  }
  send(message, sender) {
    this.participants.forEach((participant) => {
      if (participant !== sender) {
        participant.receive(message);
      }
    });
  }
}

class Participant {
  constructor(name) {
    this.name = name;
  }
  send(message) {
    this.mediator.send(message, this);
  }
  receive(message) {
    console.log(`${this.name} received: ${message}`);
  }
}

const mediator = new Mediator();
const user1 = new Participant("User1");
const user2 = new Participant("User2");

mediator.register(user1);
mediator.register(user2);

user1.send("Hello from User1!");
```

---

### 3. Strategy Pattern

**Purpose:**

- Allows selecting an algorithm at runtime from a family of algorithms, promoting flexibility and reusability.

**Use Cases:**

- Payment processing systems
- Sorting algorithms

**Example:**

```javascript
class PaymentStrategy {
  pay(amount) {
    throw new Error("This method should be overridden!");
  }
}

class CreditCardPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid ${amount} using Credit Card.`);
  }
}

class PayPalPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid ${amount} using PayPal.`);
  }
}

class PaymentContext {
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  executePayment(amount) {
    this.strategy.pay(amount);
  }
}

const payment = new PaymentContext();
payment.setStrategy(new CreditCardPayment());
payment.executePayment(100);
```

---

### 4. State Pattern

**Purpose:**

- Allows an object to change its behavior when its internal state changes.

**Use Cases:**

- Managing UI component states
- Finite state machines (FSM)

**Example:**

```javascript
class TrafficLight {
  constructor() {
    this.states = [
      new RedLight(this),
      new GreenLight(this),
      new YellowLight(this),
    ];
    this.currentState = this.states[0];
  }
  changeState(state) {
    this.currentState = this.states[state];
  }
  signal() {
    this.currentState.action();
  }
}

class RedLight {
  constructor(light) {
    this.light = light;
  }
  action() {
    console.log("Red Light - Stop");
    this.light.changeState(1);
  }
}

class GreenLight {
  constructor(light) {
    this.light = light;
  }
  action() {
    console.log("Green Light - Go");
    this.light.changeState(2);
  }
}

class YellowLight {
  constructor(light) {
    this.light = light;
  }
  action() {
    console.log("Yellow Light - Slow Down");
    this.light.changeState(0);
  }
}

const trafficLight = new TrafficLight();
trafficLight.signal(); // Red Light - Stop
trafficLight.signal(); // Green Light - Go
trafficLight.signal(); // Yellow Light - Slow Down
```

---

### 5. Command Pattern

**Purpose:**

- Encapsulates requests as objects, allowing parameterization of requests and enabling undo/redo functionality.

**Use Cases:**

- Undo/Redo operations in text editors
- Transactional operations

**Example:**

```javascript
class Command {
  execute() {}
  undo() {}
}

class Light {
  turnOn() {
    console.log("Light is ON");
  }
  turnOff() {
    console.log("Light is OFF");
  }
}

class LightOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  execute() {
    this.light.turnOn();
  }
  undo() {
    this.light.turnOff();
  }
}

const light = new Light();
const lightOn = new LightOnCommand(light);

lightOn.execute(); // Light is ON
lightOn.undo(); // Light is OFF
```

---

## Conclusion

Behavioral design patterns are crucial for managing interactions between objects in an application. Implementing these patterns ensures better modularity, reusability, and maintainability. By leveraging these patterns in JavaScript applications, developers can create scalable and flexible software solutions.

Next, we will explore **Real-World Applications of Design Patterns** to see how these concepts are applied in production-ready applications.
