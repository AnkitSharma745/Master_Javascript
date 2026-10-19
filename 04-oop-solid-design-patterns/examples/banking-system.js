// banking-system.js
// What it shows: a small multi-user banking system with safe, encapsulated accounts.
//   - Encapsulation: #balance can only change through deposit/withdraw, which check the rules
//   - Abstraction + inheritance: an abstract BankAccount, with SavingsAccount and CurrentAccount
//   - Polymorphism: each account type defines its own minimum balance (overdraft rule)
//   - Factory with a registry: openAccount(type, ...) creates the right account type
//   - Dependency injection: the logger and the clock are passed in (no global singleton),
//     so output is predictable and tests could pass fakes
//   - A safe transfer: if the deposit fails after the withdrawal, the money is put back
// Money is stored in integer cents to avoid floating-point errors.
// Related docs: ../01-oop-four-pillars.md, ../06-creational-patterns.md,
//               ../05-dependency-inversion-and-injection.md
// Run: node banking-system.js

const formatMoney = (cents) => `${cents < 0 ? '-' : ''}$${(Math.abs(cents) / 100).toFixed(2)}`;

// ---------- Collaborators that are injected ----------
class MemoryLogger {
  #entries = [];
  constructor(clock) {
    this.clock = clock;
  }
  log(message) {
    const entry = `[${this.clock().toISOString().slice(11, 19)}] ${message}`;
    this.#entries.push(entry);
    console.log(`  log ${entry}`);
  }
  get entries() {
    return [...this.#entries];
  }
}

// A fake clock that moves one second per call, so the output is the same on every run
function createFakeClock(startIso) {
  let time = new Date(startIso).getTime();
  return () => {
    time += 1_000;
    return new Date(time);
  };
}

// ---------- Errors with clear meaning ----------
class InsufficientFundsError extends Error {}
class InvalidAmountError extends Error {}

function assertValidAmount(amountInCents) {
  if (!Number.isInteger(amountInCents) || amountInCents <= 0) {
    throw new InvalidAmountError(`Amount must be a positive whole number of cents, got ${amountInCents}`);
  }
}

// ---------- Accounts ----------
class BankAccount {
  #balance;
  #history = [];

  constructor({ accountNumber, ownerId, openingBalanceInCents = 0, logger }) {
    if (new.target === BankAccount) throw new TypeError('BankAccount is abstract');
    this.accountNumber = accountNumber;
    this.ownerId = ownerId;
    this.logger = logger;
    this.#balance = 0;
    if (openingBalanceInCents > 0) this.deposit(openingBalanceInCents, 'opening deposit');
  }

  get balance() {
    return this.#balance;
  }

  get history() {
    return this.#history.map((entry) => ({ ...entry })); // copies: callers cannot rewrite history
  }

  // Polymorphism: subclasses decide how low the balance may go
  minimumBalance() {
    return 0;
  }

  deposit(amountInCents, note = 'deposit') {
    assertValidAmount(amountInCents);
    this.#balance += amountInCents;
    this.#record(note, amountInCents);
  }

  withdraw(amountInCents, note = 'withdrawal') {
    assertValidAmount(amountInCents);
    if (this.#balance - amountInCents < this.minimumBalance()) {
      throw new InsufficientFundsError(
        `${this.accountNumber}: cannot withdraw ${formatMoney(amountInCents)}, balance is ${formatMoney(this.#balance)}`,
      );
    }
    this.#balance -= amountInCents;
    this.#record(note, -amountInCents);
  }

  #record(note, changeInCents) {
    this.#history.push({ note, changeInCents, balanceAfter: this.#balance });
    this.logger.log(`${this.accountNumber} ${note}: ${formatMoney(changeInCents)} -> ${formatMoney(this.#balance)}`);
  }

  describe() {
    return `${this.constructor.name} ${this.accountNumber}: ${formatMoney(this.#balance)}`;
  }
}

class SavingsAccount extends BankAccount {
  constructor({ annualInterestPercent, ...rest }) {
    super(rest);
    this.annualInterestPercent = annualInterestPercent;
  }

  applyMonthlyInterest() {
    const interest = Math.round((this.balance * this.annualInterestPercent) / 100 / 12);
    if (interest > 0) this.deposit(interest, 'monthly interest');
  }
}

class CurrentAccount extends BankAccount {
  constructor({ overdraftLimitInCents, ...rest }) {
    super(rest);
    this.overdraftLimitInCents = overdraftLimitInCents;
  }

  minimumBalance() {
    return -this.overdraftLimitInCents; // the only difference: it may go below zero
  }
}

// ---------- Factory with a registry ----------
const accountTypes = new Map([
  ['savings', (options) => new SavingsAccount(options)],
  ['current', (options) => new CurrentAccount(options)],
]);

// ---------- Customers and the bank ----------
class Customer {
  #accounts = [];
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  addAccount(account) {
    this.#accounts.push(account);
  }
  get accounts() {
    return [...this.#accounts];
  }
  netWorth() {
    return this.#accounts.reduce((sum, account) => sum + account.balance, 0);
  }
}

class Bank {
  #customers = new Map();
  #accounts = new Map();
  #nextAccountNumber = 1001;

  constructor({ logger }) {
    this.logger = logger;
  }

  addCustomer(id, name) {
    const customer = new Customer(id, name);
    this.#customers.set(id, customer);
    return customer;
  }

  openAccount(type, customerId, options) {
    const create = accountTypes.get(type);
    if (!create) throw new Error(`Unknown account type: ${type}`);
    const customer = this.#customers.get(customerId);
    if (!customer) throw new Error(`Unknown customer: ${customerId}`);
    const account = create({
      ...options,
      accountNumber: `AC-${this.#nextAccountNumber++}`,
      ownerId: customerId,
      logger: this.logger,
    });
    customer.addAccount(account);
    this.#accounts.set(account.accountNumber, account);
    return account;
  }

  // A transfer must never lose money: if the second step fails, undo the first
  transfer(fromNumber, toNumber, amountInCents) {
    const from = this.#accounts.get(fromNumber);
    const to = this.#accounts.get(toNumber);
    if (!from || !to) throw new Error('Unknown account in transfer');
    if (from === to) throw new Error('Cannot transfer to the same account');

    from.withdraw(amountInCents, `transfer to ${toNumber}`);
    try {
      to.deposit(amountInCents, `transfer from ${fromNumber}`);
    } catch (error) {
      from.deposit(amountInCents, `refund of failed transfer to ${toNumber}`);
      throw error;
    }
  }

  customer(id) {
    return this.#customers.get(id);
  }
}

// ---------- Composition root and demo ----------
const clock = createFakeClock('2025-01-15T09:00:00Z');
const logger = new MemoryLogger(clock);
const bank = new Bank({ logger });

console.log('--- Opening accounts ---');
bank.addCustomer('c1', 'Alice');
bank.addCustomer('c2', 'Bob');
const aliceSavings = bank.openAccount('savings', 'c1', { openingBalanceInCents: 500_000, annualInterestPercent: 3 });
const aliceCurrent = bank.openAccount('current', 'c1', { openingBalanceInCents: 100_000, overdraftLimitInCents: 50_000 });
const bobCurrent = bank.openAccount('current', 'c2', { overdraftLimitInCents: 0 });

console.log('\n--- Everyday operations ---');
aliceSavings.deposit(200_000);
aliceSavings.applyMonthlyInterest();
aliceCurrent.withdraw(130_000, 'rent'); // goes into the overdraft, allowed for a current account

console.log('\n--- Rules are enforced (encapsulation) ---');
const attempts = [
  ['withdraw too much from savings', () => aliceSavings.withdraw(9_999_999)],
  ['deposit a negative amount', () => aliceSavings.deposit(-500)],
  ['deposit a fraction of a cent', () => aliceSavings.deposit(10.5)],
  ['go past the overdraft limit', () => aliceCurrent.withdraw(25_000)],
];
for (const [label, action] of attempts) {
  try {
    action();
  } catch (error) {
    console.log(`  ${label}: ${error.constructor.name}: ${error.message}`);
  }
}
aliceSavings.balance = 1; // no setter: this does nothing (and would throw in strict mode / ES modules)
console.log(`  after trying "aliceSavings.balance = 1", balance is still ${formatMoney(aliceSavings.balance)}`);

console.log('\n--- Transfers ---');
bank.transfer(aliceSavings.accountNumber, bobCurrent.accountNumber, 75_000);
try {
  bank.transfer(bobCurrent.accountNumber, aliceCurrent.accountNumber, 999_999);
} catch (error) {
  console.log(`  transfer failed: ${error.message}`);
}

console.log('\n--- Summary ---');
for (const id of ['c1', 'c2']) {
  const customer = bank.customer(id);
  console.log(`${customer.name} (net worth ${formatMoney(customer.netWorth())})`);
  for (const account of customer.accounts) console.log(`  ${account.describe()}`); // polymorphic describe()
}
console.log(`\nHistory of ${bobCurrent.accountNumber}:`);
for (const entry of bobCurrent.history) {
  console.log(`  ${entry.note}: ${formatMoney(entry.changeInCents)} (balance ${formatMoney(entry.balanceAfter)})`);
}
console.log(`\nLog entries recorded: ${logger.entries.length}`);
