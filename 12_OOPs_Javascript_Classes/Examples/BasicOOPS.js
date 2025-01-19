// Abstract Base Class: Vehicle
class Vehicle {
  constructor(brand, wheels) {
    if (new.target === Vehicle) {
      throw new Error(
        "Vehicle is an abstract class and cannot be instantiated directly."
      );
    }
    this.brand = brand;
    this.wheels = wheels;
    this._speed = 0; // Encapsulation with a private property
  }

  // Encapsulation: Getter for speed
  get speed() {
    return this._speed;
  }

  // Encapsulation: Setter for speed
  set speed(value) {
    if (value < 0) {
      console.log("Speed cannot be negative!");
    } else {
      this._speed = value;
    }
  }

  // Abstraction: Abstract method to be implemented by subclasses
  start() {
    throw new Error("start() method must be implemented in a subclass.");
  }

  // Polymorphism: Shared method that can be overridden
  drive() {
    console.log(`${this.brand} is driving at ${this.speed} km/h.`);
  }

  // Static Method: Utility function shared across all vehicles
  static compareSpeeds(vehicle1, vehicle2) {
    if (vehicle1.speed > vehicle2.speed) {
      return `${vehicle1.brand} is faster than ${vehicle2.brand}.`;
    } else if (vehicle1.speed < vehicle2.speed) {
      return `${vehicle2.brand} is faster than ${vehicle1.brand}.`;
    } else {
      return `${vehicle1.brand} and ${vehicle2.brand} have the same speed.`;
    }
  }
}

// Subclass: Car
class Car extends Vehicle {
  constructor(brand, model) {
    super(brand, 4); // Inheritance: Using the parent class constructor
    this.model = model;
  }

  // Overriding the abstract method
  start() {
    console.log(`${this.brand} ${this.model} car is starting...`);
  }

  // Overriding the parent class method
  drive() {
    console.log(
      `${this.brand} ${this.model} is cruising on the road at ${this.speed} km/h.`
    );
  }
}

// Subclass: Bike
class Bike extends Vehicle {
  constructor(brand, type) {
    super(brand, 2); // Inheritance: Using the parent class constructor
    this.type = type;
  }

  // Overriding the abstract method
  start() {
    console.log(`${this.brand} bike is starting with a roar...`);
  }

  // Overriding the parent class method
  drive() {
    console.log(`${this.brand} bike is zooming past at ${this.speed} km/h.`);
  }
}

// Using the classes
try {
  const genericVehicle = new Vehicle("Generic", 0); // This will throw an error
} catch (error) {
  console.error(error.message);
}

// Creating instances
const tesla = new Car("Tesla", "Model S");
const ducati = new Bike("Ducati", "Sports");

// Using encapsulation with getter and setter
tesla.speed = 120; // Setting the speed
ducati.speed = 150;

// Starting the vehicles
tesla.start(); // Tesla Model S car is starting...
ducati.start(); // Ducati bike is starting with a roar...

// Driving the vehicles
tesla.drive(); // Tesla Model S is cruising on the road at 120 km/h.
ducati.drive(); // Ducati bike is zooming past at 150 km/h.

// Using static method to compare speeds
console.log(Vehicle.compareSpeeds(tesla, ducati)); // Ducati is faster than Tesla.

// Vehicle is an abstract class and cannot be instantiated directly.
// Tesla Model S car is starting...
// Ducati bike is starting with a roar...
// Tesla Model S is cruising on the road at 120 km/h.
// Ducati bike is zooming past at 150 km/h.
// Ducati is faster than Tesla.
