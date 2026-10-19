// ecommerce-cart.js
// What it shows: a small shopping cart that combines several patterns in a realistic way.
//   - Inheritance + polymorphism: Product subclasses override describe()
//   - Factory with a registry: createProduct(type, data) without a growing switch
//   - Strategy: interchangeable discount rules
//   - Observer: the cart emits 'changed' and 'checkout' events (Node's EventEmitter)
//   - Decorator: a logging wrapper around the payment gateway (same interface)
//   - Dependency injection: the checkout service receives its collaborators
// Money is stored in integer cents to avoid floating-point errors.
// Related docs: ../01-oop-four-pillars.md, ../06-creational-patterns.md,
//               ../07-structural-patterns.md, ../08-behavioral-patterns.md,
//               ../05-dependency-inversion-and-injection.md
// Run: node ecommerce-cart.js

const { EventEmitter } = require('node:events');

const formatMoney = (cents) => `$${(cents / 100).toFixed(2)}`;

// ---------- Products: inheritance and polymorphism ----------
class Product {
  constructor({ sku, name, priceInCents }) {
    if (new.target === Product) throw new TypeError('Product is abstract');
    if (!Number.isInteger(priceInCents) || priceInCents < 0) {
      throw new RangeError(`Invalid price for ${name}: ${priceInCents}`);
    }
    this.sku = sku;
    this.name = name;
    this.priceInCents = priceInCents;
  }

  describe() {
    return `${this.name} (${formatMoney(this.priceInCents)})`;
  }
}

class Electronics extends Product {
  constructor({ warrantyYears, ...base }) {
    super(base);
    this.warrantyYears = warrantyYears;
  }
  describe() {
    return `${super.describe()}, ${this.warrantyYears}-year warranty`;
  }
}

class Clothing extends Product {
  constructor({ size, ...base }) {
    super(base);
    this.size = size;
  }
  describe() {
    return `${super.describe()}, size ${this.size}`;
  }
}

// ---------- Factory with a registry (open for new product types) ----------
const productTypes = new Map();
const registerProductType = (type, create) => productTypes.set(type, create);

function createProduct(type, data) {
  const create = productTypes.get(type);
  if (!create) throw new Error(`Unknown product type: ${type}`);
  return create(data);
}

registerProductType('electronics', (data) => new Electronics(data));
registerProductType('clothing', (data) => new Clothing(data));

// ---------- Discount strategies ----------
const discountStrategies = {
  none: () => 0,
  percentage: (percent) => (subtotal) => Math.round((subtotal * percent) / 100),
  threshold: (minimum, amount) => (subtotal) => (subtotal >= minimum ? amount : 0),
};

// ---------- Cart: encapsulated state + Observer ----------
class Cart extends EventEmitter {
  #lines = new Map(); // sku -> { product, quantity }

  add(product, quantity = 1) {
    if (!Number.isInteger(quantity) || quantity <= 0) throw new RangeError('Quantity must be a positive integer');
    const line = this.#lines.get(product.sku) ?? { product, quantity: 0 };
    line.quantity += quantity;
    this.#lines.set(product.sku, line);
    this.emit('changed', this.summary());
    return this; // allows chaining
  }

  remove(sku) {
    this.#lines.delete(sku);
    this.emit('changed', this.summary());
    return this;
  }

  get lines() {
    // return copies so callers cannot change the cart's internal state
    return [...this.#lines.values()].map((line) => ({ ...line }));
  }

  subtotal() {
    return this.lines.reduce((sum, line) => sum + line.product.priceInCents * line.quantity, 0);
  }

  summary() {
    const itemCount = this.lines.reduce((sum, line) => sum + line.quantity, 0);
    return { itemCount, subtotalInCents: this.subtotal() };
  }

  clear() {
    this.#lines.clear();
    this.emit('changed', this.summary());
  }
}

// ---------- Payment gateway + logging decorator ----------
class FakePaymentGateway {
  #nextId = 1;
  async charge(customerId, amountInCents) {
    if (amountInCents > 500_000) throw new Error('Card limit exceeded');
    return { transactionId: `txn_${this.#nextId++}`, amountInCents };
  }
}

// Decorator: same interface (charge), adds logging, does not change the real gateway
function withPaymentLogging(gateway, log) {
  return {
    async charge(customerId, amountInCents) {
      log(`payment: charging ${formatMoney(amountInCents)} to ${customerId}`);
      try {
        const result = await gateway.charge(customerId, amountInCents);
        log(`payment: success ${result.transactionId}`);
        return result;
      } catch (error) {
        log(`payment: FAILED (${error.message})`);
        throw error;
      }
    },
  };
}

// ---------- Checkout service: receives its dependencies (DI) ----------
class CheckoutService {
  constructor({ paymentGateway, discountStrategy }) {
    this.paymentGateway = paymentGateway;
    this.discountStrategy = discountStrategy;
  }

  async checkout(cart, customerId) {
    const subtotal = cart.subtotal();
    if (subtotal === 0) throw new Error('Cart is empty');
    // Calculate from the original subtotal every time, so calling checkout twice never discounts twice
    const discount = Math.min(this.discountStrategy(subtotal), subtotal);
    const total = subtotal - discount;
    const payment = await this.paymentGateway.charge(customerId, total);
    const order = { customerId, subtotal, discount, total, transactionId: payment.transactionId };
    cart.emit('checkout', order);
    cart.clear();
    return order;
  }
}

// ---------- Composition root: create and connect everything ----------
async function main() {
  console.log('--- Products from the factory ---');
  const phone = createProduct('electronics', { sku: 'PH-1', name: 'Smartphone', priceInCents: 99_900, warrantyYears: 2 });
  const shirt = createProduct('clothing', { sku: 'TS-1', name: 'T-Shirt', priceInCents: 2_500, size: 'M' });
  for (const product of [phone, shirt]) console.log(product.describe()); // polymorphism
  try {
    createProduct('furniture', { sku: 'CH-1', name: 'Chair', priceInCents: 5_000 });
  } catch (error) {
    console.log(`Factory error: ${error.message}`);
  }

  console.log('\n--- Cart with observers ---');
  const cart = new Cart();
  cart.on('changed', ({ itemCount, subtotalInCents }) => {
    console.log(`[badge] ${itemCount} item(s), subtotal ${formatMoney(subtotalInCents)}`);
  });
  cart.on('checkout', (order) => {
    console.log(`[email] order paid: ${formatMoney(order.total)} (${order.transactionId})`);
  });

  cart.add(phone).add(shirt, 2);

  console.log('\n--- Checkout with a 10% discount strategy ---');
  const log = (message) => console.log(`  ${message}`);
  const gateway = withPaymentLogging(new FakePaymentGateway(), log);
  const checkout = new CheckoutService({
    paymentGateway: gateway,
    discountStrategy: discountStrategies.percentage(10),
  });
  const order = await checkout.checkout(cart, 'alice');
  console.log(`Subtotal ${formatMoney(order.subtotal)}, discount ${formatMoney(order.discount)}, total ${formatMoney(order.total)}`);

  console.log('\n--- Same cart flow, different strategy (threshold) ---');
  cart.add(shirt, 3);
  const thresholdCheckout = new CheckoutService({
    paymentGateway: gateway,
    discountStrategy: discountStrategies.threshold(5_000, 1_000), // $10 off orders over $50
  });
  const order2 = await thresholdCheckout.checkout(cart, 'bob');
  console.log(`Subtotal ${formatMoney(order2.subtotal)}, discount ${formatMoney(order2.discount)}, total ${formatMoney(order2.total)}`);

  console.log('\n--- Failure handling ---');
  try {
    await checkout.checkout(cart, 'bob');
  } catch (error) {
    console.log(`Checkout error: ${error.message}`);
  }
  cart.add(phone, 6);
  try {
    await checkout.checkout(cart, 'carol');
  } catch (error) {
    console.log(`Checkout error: ${error.message}; cart still has ${cart.summary().itemCount} item(s)`);
  }
}

main();
