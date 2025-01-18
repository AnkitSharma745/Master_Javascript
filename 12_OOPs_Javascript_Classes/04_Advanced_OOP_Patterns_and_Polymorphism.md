
# Advanced OOP Patterns and Polymorphism in JavaScript

## 1. What is Polymorphism?
**Polymorphism** is a core concept in Object-Oriented Programming that allows objects of different classes to be treated as objects of a common super class. It enables a single interface to represent different underlying forms (data types).

In JavaScript, polymorphism can be achieved using:
- Method Overriding (inherited classes redefine base class methods).
- Method Overloading (emulating multiple function signatures).

---

## 2. Method Overriding
When a subclass provides a specific implementation of a method already defined in its parent class, it is known as **method overriding**. The subclass version of the method takes precedence.

### Example:
```javascript
class Animal {
    speak() {
        return "This animal makes a sound.";
    }
}

class Dog extends Animal {
    speak() {
        return "The dog barks.";
    }
}

class Cat extends Animal {
    speak() {
        return "The cat meows.";
    }
}

const animals = [new Dog(), new Cat(), new Animal()];

animals.forEach(animal => {
    console.log(animal.speak());
});
// Output:
// The dog barks.
// The cat meows.
// This animal makes a sound.
```

### Key Points:
- Polymorphism allows the same method name (`speak`) to behave differently for `Dog` and `Cat`.
- This is dynamic, i.e., resolved at runtime.

---

## 3. Polymorphism with Interfaces (Using Abstract Classes)
Although JavaScript doesn't have native abstract classes like other languages, you can simulate this concept.

### Example:
```javascript
class Shape {
    constructor(name) {
        if (this.constructor === Shape) {
            throw new Error("Abstract class 'Shape' cannot be instantiated directly.");
        }
        this.name = name;
    }

    calculateArea() {
        throw new Error("Method 'calculateArea()' must be implemented.");
    }
}

class Circle extends Shape {
    constructor(radius) {
        super("Circle");
        this.radius = radius;
    }

    calculateArea() {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super("Rectangle");
        this.width = width;
        this.height = height;
    }

    calculateArea() {
        return this.width * this.height;
    }
}

const shapes = [new Circle(5), new Rectangle(10, 20)];

shapes.forEach(shape => {
    console.log(`${shape.name} Area: ${shape.calculateArea()}`);
});
// Output:
// Circle Area: 78.53981633974483
// Rectangle Area: 200
```

---

## 4. Method Overloading in JavaScript
JavaScript does not natively support method overloading like other languages. However, you can simulate overloading by using default parameters or handling arguments dynamically.

### Example: Dynamic Arguments
```javascript
class Calculator {
    add(...args) {
        if (args.length === 2) {
            return args[0] + args[1];
        } else if (args.length === 3) {
            return args[0] + args[1] + args[2];
        } else {
            return "Invalid number of arguments";
        }
    }
}

const calc = new Calculator();
console.log(calc.add(5, 10));        // 15
console.log(calc.add(1, 2, 3));      // 6
console.log(calc.add(1));            // Invalid number of arguments
```

### Key Points:
- Overloading is achieved by inspecting the number and types of arguments dynamically.
- This makes JavaScript flexible in dealing with polymorphism.

---

## 5. Strategy Pattern
The **Strategy Pattern** defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows the behavior of a class to be changed at runtime.

### Example:
```javascript
class Payment {
    constructor(strategy) {
        this.strategy = strategy;
    }

    execute(amount) {
        return this.strategy.pay(amount);
    }
}

class CreditCardPayment {
    pay(amount) {
        return `Paid $${amount} using Credit Card.`;
    }
}

class PayPalPayment {
    pay(amount) {
        return `Paid $${amount} using PayPal.`;
    }
}

const creditCardPayment = new Payment(new CreditCardPayment());
console.log(creditCardPayment.execute(100)); // Paid $100 using Credit Card.

const payPalPayment = new Payment(new PayPalPayment());
console.log(payPalPayment.execute(200)); // Paid $200 using PayPal.
```

---

## 6. Factory Pattern
The **Factory Pattern** creates objects without specifying the exact class to instantiate.

### Example:
```javascript
class ShapeFactory {
    static createShape(type) {
        switch (type) {
            case "circle":
                return new Circle(10);
            case "rectangle":
                return new Rectangle(5, 10);
            default:
                throw new Error("Invalid shape type");
        }
    }
}

const circle = ShapeFactory.createShape("circle");
console.log(circle.calculateArea()); // 314.1592653589793

const rectangle = ShapeFactory.createShape("rectangle");
console.log(rectangle.calculateArea()); // 50
```

---

## 7. The Liskov Substitution Principle (LSP)
The **Liskov Substitution Principle** states that objects of a superclass should be replaceable with objects of a subclass without altering the correctness of the program.

### Example:
```javascript
class Bird {
    fly() {
        return "This bird can fly.";
    }
}

class Penguin extends Bird {
    fly() {
        return "Penguins cannot fly.";
    }
}

function makeBirdFly(bird) {
    console.log(bird.fly());
}

const sparrow = new Bird();
const penguin = new Penguin();

makeBirdFly(sparrow); // This bird can fly.
makeBirdFly(penguin); // Penguins cannot fly.
```

---

## 8. Open/Closed Principle
The **Open/Closed Principle** states that a class should be open for extension but closed for modification.

### Example:
```javascript
class Logger {
    log(message) {
        console.log(message);
    }
}

class FileLogger extends Logger {
    log(message) {
        console.log(`[File]: ${message}`);
    }
}

class ConsoleLogger extends Logger {
    log(message) {
        console.log(`[Console]: ${message}`);
    }
}

const loggers = [new FileLogger(), new ConsoleLogger()];
loggers.forEach(logger => logger.log("Hello, world!"));
```

---

## Summary
- Polymorphism is a powerful feature that makes classes flexible and reusable.
- Patterns like Strategy and Factory enable better class management and behavior customization.
- Following OOP principles like Liskov Substitution and Open/Closed Principle ensures robust, scalable, and maintainable code.

---

## Practice Questions
1. Implement a `Shape` class and subclasses `Square` and `Triangle`, each with an `area` method.
2. Create a payment system using the Strategy Pattern for handling different payment methods.
3. Use the Factory Pattern to instantiate different types of `Vehicles` (e.g., `Car`, `Bike`).
4. Write an abstract `Appliance` class and implement subclasses `WashingMachine` and `Refrigerator`.

