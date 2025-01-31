# Creational Design Patterns (Object Creation Mechanisms)

Creational design patterns focus on how objects are created and managed. They provide solutions to instantiate objects efficiently while improving code organization, performance, and maintainability.

These patterns abstract the instantiation process and help manage object creation in a systematic way.

## Why Use Creational Design Patterns?

- **Encapsulation of Object Creation**: Simplifies complex object creation logic.
- **Improved Code Maintainability**: Reduces code duplication and improves readability.
- **Better Resource Management**: Helps optimize memory usage and object instantiation.
- **Scalability**: Ensures a flexible approach to object creation for large applications.

---

## 1. Singleton Pattern

### What is the Singleton Pattern?

The Singleton Pattern ensures that a class has only **one instance** and provides a global point of access to that instance.

### When to Use?

- Managing global configurations (e.g., database connections, logging services).
- Implementing caching mechanisms.
- Handling shared resources across an application.

### Implementation

#### Using ES6 Classes:

```javascript
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
  getConfig() {
    return "Global Configuration";
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2); // true
console.log(instance1.getConfig()); // "Global Configuration"
```

#### Using Closures:

```javascript
const Singleton = (function () {
  let instance;
  function createInstance() {
    return { message: "I am a singleton instance" };
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // true
```

---

## 2. Factory Pattern

### What is the Factory Pattern?

The Factory Pattern provides an interface for creating objects **without specifying their exact class**.

### When to Use?

- When object creation logic is complex and needs to be centralized.
- When multiple related object types share common behavior.

### Implementation

```javascript
class Car {
  constructor(model) {
    this.model = model;
  }
}

class Bike {
  constructor(model) {
    this.model = model;
  }
}

class VehicleFactory {
  static createVehicle(type, model) {
    switch (type) {
      case "car":
        return new Car(model);
      case "bike":
        return new Bike(model);
      default:
        throw new Error("Unknown vehicle type");
    }
  }
}

const myCar = VehicleFactory.createVehicle("car", "Tesla Model 3");
console.log(myCar); // Car { model: 'Tesla Model 3' }
```

---

## 3. Abstract Factory Pattern

### What is the Abstract Factory Pattern?

The Abstract Factory Pattern provides an **interface** for creating families of related objects **without specifying their concrete classes**.

### When to Use?

- When there are multiple families of related products that need to be created dynamically.
- When enforcing a consistent object structure is necessary.

### Implementation

```javascript
class ElectricCar {
  constructor() {
    this.type = "Electric Car";
  }
}

class PetrolCar {
  constructor() {
    this.type = "Petrol Car";
  }
}

class ElectricCarFactory {
  createCar() {
    return new ElectricCar();
  }
}

class PetrolCarFactory {
  createCar() {
    return new PetrolCar();
  }
}

function getCarFactory(type) {
  switch (type) {
    case "electric":
      return new ElectricCarFactory();
    case "petrol":
      return new PetrolCarFactory();
    default:
      throw new Error("Unknown factory type");
  }
}

const factory = getCarFactory("electric");
const car = factory.createCar();
console.log(car.type); // "Electric Car"
```

---

## 4. Builder Pattern

### What is the Builder Pattern?

The Builder Pattern allows for step-by-step **construction of complex objects** by separating object creation from its representation.

### When to Use?

- When an object has multiple optional fields or complex initialization logic.
- When reducing the complexity of object instantiation.

### Implementation

```javascript
class Car {
  constructor() {
    this.model = "";
    this.color = "";
    this.engine = "";
  }
}

class CarBuilder {
  constructor() {
    this.car = new Car();
  }
  setModel(model) {
    this.car.model = model;
    return this;
  }
  setColor(color) {
    this.car.color = color;
    return this;
  }
  setEngine(engine) {
    this.car.engine = engine;
    return this;
  }
  build() {
    return this.car;
  }
}

const car = new CarBuilder()
  .setModel("BMW")
  .setColor("Black")
  .setEngine("V8")
  .build();
console.log(car);
```

---

## 5. Prototype Pattern

### What is the Prototype Pattern?

The Prototype Pattern allows creating **new objects by cloning existing ones**, improving performance by avoiding repetitive instantiation.

### When to Use?

- When object creation is expensive and cloning is more efficient.
- When implementing **object pooling**.

### Implementation

```javascript
const carPrototype = {
  init(model) {
    this.model = model;
    return this;
  },
  clone() {
    return Object.create(this);
  },
};

const car1 = Object.create(carPrototype).init("Audi A6");
const car2 = car1.clone();
car2.init("BMW M3");
console.log(car1.model); // "Audi A6"
console.log(car2.model); // "BMW M3"
```

---

## Conclusion

Creational design patterns simplify and optimize the object creation process. By using patterns such as **Singleton, Factory, Abstract Factory, Builder, and Prototype**, developers can create flexible, maintainable, and scalable applications.

Next, we will explore **Structural Design Patterns**, which focus on organizing and structuring code efficiently.
