// --- Dependency Injection Container ---
class Container {
  constructor() {
    this.services = new Map();
  }

  register(name, service) {
    this.services.set(name, service);
  }

  resolve(name) {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not found.`);
    }
    return service;
  }
}

// --- Mixin for Event-Driven Behavior ---
const EventEmitterMixin = {
  on(event, listener) {
    if (!this.listeners) this.listeners = {};
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(listener);
  },

  emit(event, ...args) {
    if (this.listeners && this.listeners[event]) {
      this.listeners[event].forEach((listener) => listener(...args));
    }
  },
};

// --- Abstract Factory for Product Creation ---
class ProductFactory {
  static createProduct(type, options) {
    switch (type) {
      case "Electronics":
        return new Electronics(options);
      case "Clothing":
        return new Clothing(options);
      default:
        throw new Error("Invalid product type");
    }
  }
}

// --- Product Base Class (Abstract Class) ---
class Product {
  constructor({ name, price }) {
    if (new.target === Product) {
      throw new Error("Cannot instantiate an abstract class.");
    }
    this.name = name;
    this.price = price;
  }

  // Template Method: Common behavior with variations
  displayDetails() {
    console.log(`Product: ${this.name} - $${this.price}`);
  }
}

// --- Specific Product Classes ---
class Electronics extends Product {
  constructor({ name, price, warranty }) {
    super({ name, price });
    this.warranty = warranty;
  }

  displayDetails() {
    super.displayDetails();
    console.log(`Warranty: ${this.warranty} years`);
  }
}

class Clothing extends Product {
  constructor({ name, price, size }) {
    super({ name, price });
    this.size = size;
  }

  displayDetails() {
    super.displayDetails();
    console.log(`Size: ${this.size}`);
  }
}

// --- Singleton: User Service ---
class UserService {
  constructor() {
    if (UserService.instance) {
      return UserService.instance; // Return existing instance (Singleton)
    }
    this.users = [];
    UserService.instance = this;
  }

  addUser(user) {
    this.users.push(user);
    console.log(`User added: ${user.name}`);
  }

  listUsers() {
    return this.users;
  }
}

// --- User Class ---
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

// --- Order Class ---
class Order {
  constructor(user) {
    this.user = user;
    this.products = [];
    this.total = 0;
  }

  addProduct(product) {
    this.products.push(product);
    this.total += product.price;
    console.log(`Added product: ${product.name}`);
    return this; // Method chaining
  }

  checkout() {
    console.log(`Order for ${this.user.name} completed! Total: $${this.total}`);
    console.log("Products:", this.products.map((p) => p.name).join(", "));
  }
}

// --- Decorator for Discounts ---
function DiscountDecorator(order, discountRate) {
  const originalCheckout = order.checkout.bind(order);
  order.checkout = function () {
    this.total *= 1 - discountRate;
    console.log(`Discount applied: ${discountRate * 100}%`);
    originalCheckout();
  };
  return order;
}

// --- Reflection Example: Dynamic Property Setting ---
function setDynamicProperties(object, properties) {
  for (const [key, value] of Object.entries(properties)) {
    object[key] = value;
  }
}

// --- Using Everything Together ---
// Dependency Injection Setup
const container = new Container();
container.register("UserService", new UserService());

// Mixin Usage for Event-Driven Order Notifications
Object.assign(Order.prototype, EventEmitterMixin);

// Example Execution
const userService = container.resolve("UserService");
const user1 = new User("Alice", "alice@example.com");
const user2 = new User("Bob", "bob@example.com");

userService.addUser(user1);
userService.addUser(user2);

const phone = ProductFactory.createProduct("Electronics", {
  name: "Smartphone",
  price: 999,
  warranty: 2,
});

const shirt = ProductFactory.createProduct("Clothing", {
  name: "T-Shirt",
  price: 25,
  size: "M",
});

const aliceOrder = new Order(user1);
aliceOrder.addProduct(phone).addProduct(shirt);

// Event-Driven: Order Notification
aliceOrder.on("checkout", (total) => {
  console.log(
    `Order Notification: Your order of $${total} has been processed.`
  );
});

const decoratedOrder = DiscountDecorator(aliceOrder, 0.1); // Applying a 10% discount
decoratedOrder.checkout(); // Discount applied and order completed
aliceOrder.emit("checkout", aliceOrder.total); // Trigger event

// Reflection: Dynamically Add Properties
setDynamicProperties(phone, { brand: "TechCorp", color: "Black" });
console.log(`Dynamic Properties Added: ${phone.brand}, ${phone.color}`);
