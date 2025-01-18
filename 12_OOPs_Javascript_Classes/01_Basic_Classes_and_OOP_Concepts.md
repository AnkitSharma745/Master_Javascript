# Basic Classes and OOP Concepts in JavaScript

## 1. What is a Class?

A **class** in JavaScript is a blueprint for creating objects. Classes encapsulate data (properties) and behaviors (methods) into a single structure. Classes were introduced in ES6 to make object-oriented programming easier and more structured.

### Example:

```javascript
class Car {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  displayInfo() {
    return `${this.brand} ${this.model} (${this.year})`;
  }
}
```

Here, `Car` is a class with properties (`brand`, `model`, `year`) and a method (`displayInfo`).

---

## 2. Objects and Instances

An **object** is an instance of a class. You can create multiple objects using the `new` keyword.

### Example:

```javascript
const car1 = new Car("Tesla", "Model S", 2022);
const car2 = new Car("Toyota", "Corolla", 2020);

console.log(car1.displayInfo()); // Tesla Model S (2022)
console.log(car2.displayInfo()); // Toyota Corolla (2020)
```

---

## 3. The Constructor Method

The `constructor` method is used to initialize the properties of a class. It is called automatically when a new instance of the class is created.

### Example:

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hi, I am ${this.name} and I am ${this.age} years old.`;
  }
}

const person1 = new Person("Alice", 25);
console.log(person1.greet()); // Hi, I am Alice and I am 25 years old.
```

---

## 4. Class Properties and Methods

- **Instance Properties**: Defined inside the constructor using `this` keyword.
- **Instance Methods**: Functions defined inside the class that work on an instance.
- **Static Methods**: Methods defined with the `static` keyword that belong to the class, not instances.

### Example:

```javascript
class Calculator {
  static add(a, b) {
    return a + b;
  }

  static info() {
    return "This is a Calculator class.";
  }
}

console.log(Calculator.add(3, 5)); // 8
console.log(Calculator.info()); // This is a Calculator class.
```

---

## 5. Encapsulation

Encapsulation in JavaScript can be achieved using private fields (introduced in ES2022). Private fields start with `#` and cannot be accessed outside the class.

### Example:

```javascript
class BankAccount {
  #balance;

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// console.log(account.#balance);   // Error: Private field '#balance' must be declared in an enclosing class
```

---

## 6. Inheritance

Inheritance allows a class to inherit properties and methods from another class using the `extends` keyword.

### Example:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a noise.`;
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks.`;
  }
}

const dog = new Dog("Rex");
console.log(dog.speak()); // Rex barks.
```

---

## 7. The `toString` and `valueOf` Methods

- **`toString`**: Defines a string representation of an object.
- **`valueOf`**: Defines a primitive value for an object.

### Example:

```javascript
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  toString() {
    return `${this.title} by ${this.author}`;
  }
}

const book = new Book("1984", "George Orwell");
console.log(book.toString()); // 1984 by George Orwell
```

---

## 8. Summary

- Classes in JavaScript provide a clean way to implement object-oriented programming.
- Use `constructor` to initialize properties.
- Encapsulation can be achieved using private fields (`#`).
- Static methods belong to the class itself and not its instances.
- Inheritance allows for code reuse between related classes.

---

## Practice Questions

1. Create a class `Student` with properties `name`, `rollNo`, and `marks`. Add a method to display details.
2. Write a class `Circle` with a property `radius` and methods to calculate area and circumference.
3. Implement a class `BankAccount` with methods for deposit, withdrawal, and checking balance.
   s
