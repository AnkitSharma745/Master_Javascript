# Real-World Applications of Design Patterns

## 1. Implementing a State Management System using the State Pattern

### Problem:

In a web application, managing component states such as "loading," "success," and "error" can become complex and unmanageable if handled with simple boolean flags.

### Solution:

Using the **State Pattern**, we encapsulate each state in separate objects, making state transitions explicit and easier to manage.

### Implementation:

```javascript
class State {
  constructor(context) {
    this.context = context;
  }
}

class LoadingState extends State {
  handle() {
    console.log("Loading data...");
    this.context.setState(new SuccessState(this.context));
  }
}

class SuccessState extends State {
  handle() {
    console.log("Data loaded successfully!");
  }
}

class ErrorState extends State {
  handle() {
    console.log("Error loading data!");
  }
}

class Context {
  constructor() {
    this.state = new LoadingState(this);
  }
  setState(state) {
    this.state = state;
  }
  execute() {
    this.state.handle();
  }
}

const app = new Context();
app.execute(); // Output: Loading data...
app.execute(); // Output: Data loaded successfully!
```

## 2. Using Observer Pattern in Event-Driven Applications

### Problem:

In applications like chat applications or real-time dashboards, multiple components need to react to changes in data.

### Solution:

The **Observer Pattern** allows multiple subscribers to listen for and react to state changes dynamically.

### Implementation:

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
    console.log(`Observer received: ${data}`);
  }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify("New Message");
// Output: Observer received: New Message
// Output: Observer received: New Message
```

## 3. Applying Factory Pattern in Dependency Injection

### Problem:

Manually instantiating objects across an application can make it difficult to manage dependencies.

### Solution:

Using the **Factory Pattern**, we centralize object creation and improve maintainability.

### Implementation:

```javascript
class DatabaseConnection {
  constructor(type) {
    this.type = type;
  }
  connect() {
    console.log(`Connected to ${this.type} database`);
  }
}

class DatabaseFactory {
  static createDatabase(type) {
    return new DatabaseConnection(type);
  }
}

const mysqlDB = DatabaseFactory.createDatabase("MySQL");
mysqlDB.connect(); // Output: Connected to MySQL database
```

## 4. Proxy Pattern for API Request Caching and Security

### Problem:

Repeated API calls slow down performance and increase server load.

### Solution:

A **Proxy Pattern** caches API responses to reduce redundant requests.

### Implementation:

```javascript
class APIService {
  fetchData(url) {
    console.log(`Fetching data from ${url}`);
    return `Data from ${url}`;
  }
}

class APIProxy {
  constructor() {
    this.cache = {};
    this.apiService = new APIService();
  }
  fetchData(url) {
    if (!this.cache[url]) {
      this.cache[url] = this.apiService.fetchData(url);
    }
    return this.cache[url];
  }
}

const proxy = new APIProxy();
console.log(proxy.fetchData("https://api.example.com")); // Fetches from API
console.log(proxy.fetchData("https://api.example.com")); // Returns cached result
```

## 5. Singleton Pattern for Global Configurations

### Problem:

Configuration settings need to be shared across the entire application.

### Solution:

A **Singleton Pattern** ensures a single instance of the configuration class.

### Implementation:

```javascript
class Config {
  constructor() {
    if (!Config.instance) {
      this.settings = { theme: "dark", language: "en" };
      Config.instance = this;
    }
    return Config.instance;
  }
  getSetting(key) {
    return this.settings[key];
  }
}

const config1 = new Config();
const config2 = new Config();
console.log(config1 === config2); // Output: true
```

## 6. Decorator Pattern in Middleware Functions (Express.js)

### Problem:

Middleware functions in Node.js need to be modular and reusable.

### Solution:

The **Decorator Pattern** allows dynamic addition of functionalities to middleware.

### Implementation:

```javascript
const express = require("express");
const app = express();

const logger = (req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next();
};

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send("Unauthorized");
  }
  next();
};

app.use(logger);
app.use(auth);

app.get("/data", (req, res) => {
  res.send("Protected Data");
});

app.listen(3000, () => console.log("Server running"));
```

## 7. Applying Strategy Pattern in Authentication Mechanisms

### Problem:

Different authentication mechanisms (OAuth, JWT, API Key) need to be interchangeable.

### Solution:

The **Strategy Pattern** allows dynamic selection of authentication mechanisms.

### Implementation:

```javascript
class AuthStrategy {
  authenticate() {}
}

class OAuthStrategy extends AuthStrategy {
  authenticate() {
    console.log("Authenticated via OAuth");
  }
}

class JWTStrategy extends AuthStrategy {
  authenticate() {
    console.log("Authenticated via JWT");
  }
}

class Authenticator {
  constructor(strategy) {
    this.strategy = strategy;
  }
  authenticateUser() {
    this.strategy.authenticate();
  }
}

const auth = new Authenticator(new JWTStrategy());
auth.authenticateUser(); // Output: Authenticated via JWT
```

---

These real-world applications showcase how design patterns solve practical software problems, improving maintainability, scalability, and efficiency.
