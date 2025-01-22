// Utility Module - Handles logging and notifications (Singleton Pattern)
class Logger {
  static instance;
  constructor() {
    if (!Logger.instance) {
      Logger.instance = this;
      this.logs = [];
    }
    return Logger.instance;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    this.logs.push(`[${timestamp}] ${message}`);
    console.log(`[LOG]: ${message}`);
  }

  getLogs() {
    return this.logs;
  }
}

const logger = new Logger();

// Abstract Class for Bank Users
class User {
  constructor(name, email) {
    if (new.target === User) {
      throw new Error("Cannot instantiate an abstract class.");
    }
    this.name = name;
    this.email = email;
  }

  getUserDetails() {
    return `Name: ${this.name}, Email: ${this.email}`;
  }
}

// Concrete User Class
class Customer extends User {
  constructor(name, email, customerId) {
    super(name, email);
    this.customerId = customerId;
    this.accounts = [];
  }

  addAccount(account) {
    this.accounts.push(account);
  }

  listAccounts() {
    return this.accounts.map((acc) => acc.getAccountDetails());
  }
}

// Abstract Bank Account Class
class BankAccount {
  constructor(accountNumber, balance) {
    if (new.target === BankAccount) {
      throw new Error("Cannot instantiate an abstract class.");
    }
    this.accountNumber = accountNumber;
    this._balance = balance;
    this.transactionHistory = [];
  }

  deposit(amount) {
    if (amount <= 0)
      throw new Error("Deposit amount must be greater than zero.");
    this._balance += amount;
    this._recordTransaction(`Deposited ${amount}`);
    logger.log(`Deposit of ${amount} made to account ${this.accountNumber}`);
  }

  withdraw(amount) {
    if (amount > this._balance) throw new Error("Insufficient funds.");
    this._balance -= amount;
    this._recordTransaction(`Withdrew ${amount}`);
    logger.log(`Withdrawal of ${amount} from account ${this.accountNumber}`);
  }

  _recordTransaction(detail) {
    this.transactionHistory.push({ date: new Date(), detail });
  }

  getBalance() {
    return this._balance;
  }

  getAccountDetails() {
    return `Account: ${this.accountNumber}, Balance: ${this.getBalance()}`;
  }
}

// Savings Account (Inheritance & Polymorphism)
class SavingsAccount extends BankAccount {
  constructor(accountNumber, balance, interestRate) {
    super(accountNumber, balance);
    this.interestRate = interestRate;
  }

  applyInterest() {
    const interest = (this._balance * this.interestRate) / 100;
    this.deposit(interest);
    logger.log(
      `Interest of ${interest} applied to savings account ${this.accountNumber}`
    );
  }
}

// Current Account (Inheritance & Polymorphism)
class CurrentAccount extends BankAccount {
  constructor(accountNumber, balance, overdraftLimit) {
    super(accountNumber, balance);
    this.overdraftLimit = overdraftLimit;
  }

  withdraw(amount) {
    if (amount > this._balance + this.overdraftLimit) {
      throw new Error("Overdraft limit exceeded.");
    }
    super.withdraw(amount);
  }
}

// Transaction Service (Composition Pattern)
class TransactionService {
  static transfer(fromAccount, toAccount, amount) {
    fromAccount.withdraw(amount);
    toAccount.deposit(amount);
    logger.log(
      `Transferred ${amount} from ${fromAccount.accountNumber} to ${toAccount.accountNumber}`
    );
  }
}

// Bank Factory for account creation (Factory Pattern)
class BankFactory {
  static createAccount(type, ...args) {
    switch (type) {
      case "savings":
        return new SavingsAccount(...args);
      case "current":
        return new CurrentAccount(...args);
      default:
        throw new Error("Invalid account type.");
    }
  }
}

// Example Usage
try {
  const customer1 = new Customer(
    "Alice Johnson",
    "alice@example.com",
    "CUST123"
  );
  const savingsAcc = BankFactory.createAccount("savings", "SA123", 5000, 2.5);
  const currentAcc = BankFactory.createAccount("current", "CA456", 10000, 2000);

  customer1.addAccount(savingsAcc);
  customer1.addAccount(currentAcc);

  savingsAcc.deposit(2000);
  savingsAcc.applyInterest();
  currentAcc.withdraw(500);

  TransactionService.transfer(savingsAcc, currentAcc, 1000);

  console.log(customer1.listAccounts());
  console.log(logger.getLogs());
} catch (error) {
  console.error(error.message);
}
