// basic-oop.js
// What it shows: the four OOP pillars in one small program.
//   - Encapsulation: #private fields, a getter/setter that protects a rule (speed >= 0)
//   - Abstraction: an "abstract" base class that cannot be created directly
//   - Inheritance: Car and Bike extend Vehicle and call super()
//   - Polymorphism: one loop calls start()/describe() and each class answers in its own way
// Related docs: ../01-oop-four-pillars.md, ../02-composition-inheritance-and-mixins.md,
//               ../../02-javascript/09-classes.md
// Run: node basic-oop.js

class Vehicle {
  #speed = 0; // truly private: code outside the class cannot read or change it directly

  constructor(brand, wheels) {
    // Abstraction: JavaScript has no "abstract" keyword, so we block direct creation ourselves
    if (new.target === Vehicle) {
      throw new TypeError('Vehicle is abstract. Create a Car or a Bike instead.');
    }
    this.brand = brand;
    this.wheels = wheels;
  }

  // Encapsulation: the setter protects the rule "speed is never negative"
  get speed() {
    return this.#speed;
  }

  set speed(value) {
    if (!Number.isFinite(value) || value < 0) {
      throw new RangeError(`Speed must be a number >= 0, got ${value}`);
    }
    this.#speed = value;
  }

  // An "abstract" method: every subclass must override it
  start() {
    throw new Error(`${this.constructor.name} must implement start()`);
  }

  // A shared method that subclasses may override (polymorphism)
  describe() {
    return `${this.brand} with ${this.wheels} wheels at ${this.speed} km/h`;
  }

  // A static method belongs to the class, not to one vehicle
  static fastest(vehicles) {
    return vehicles.reduce((best, v) => (v.speed > best.speed ? v : best));
  }
}

class Car extends Vehicle {
  constructor(brand, model) {
    super(brand, 4); // inheritance: let the parent set brand and wheels
    this.model = model;
  }

  start() {
    return `${this.brand} ${this.model}: engine on, quiet start`;
  }

  describe() {
    return `Car: ${super.describe()}`; // reuse the parent's version, then add to it
  }
}

class Bike extends Vehicle {
  constructor(brand, type) {
    super(brand, 2);
    this.type = type;
  }

  start() {
    return `${this.brand} ${this.type} bike: starts with a roar`;
  }
}

// --- 1. Abstraction: the base class cannot be created ---
console.log('1. Creating the abstract Vehicle directly:');
try {
  new Vehicle('Generic', 0);
} catch (error) {
  console.log(`   ${error.name}: ${error.message}`);
}

// --- 2. Encapsulation: the private field and the setter rule ---
console.log('\n2. Encapsulation:');
const tesla = new Car('Tesla', 'Model 3');
const ducati = new Bike('Ducati', 'sports');
tesla.speed = 120;
ducati.speed = 150;
console.log(`   tesla.speed is ${tesla.speed}`);
try {
  tesla.speed = -10;
} catch (error) {
  console.log(`   ${error.name}: ${error.message}`);
}
console.log(`   speed is still ${tesla.speed}`);
console.log(`   Object.keys(tesla): ${JSON.stringify(Object.keys(tesla))} (the #speed field is not visible)`);

// --- 3. Polymorphism: same call, different behavior ---
console.log('\n3. Polymorphism (one loop, different classes):');
const garage = [tesla, ducati];
for (const vehicle of garage) {
  console.log(`   ${vehicle.start()}`);
  console.log(`   ${vehicle.describe()}`);
}

// --- 4. Inheritance checks and a static method ---
console.log('\n4. Inheritance and static methods:');
console.log(`   tesla instanceof Car: ${tesla instanceof Car}`);
console.log(`   tesla instanceof Vehicle: ${tesla instanceof Vehicle}`);
console.log(`   Fastest vehicle: ${Vehicle.fastest(garage).brand}`);

// --- 5. A subclass that forgets to implement start() ---
console.log('\n5. Forgetting to override an abstract method:');
class Scooter extends Vehicle {}
try {
  new Scooter('Vespa', 2).start();
} catch (error) {
  console.log(`   ${error.message}`);
}
