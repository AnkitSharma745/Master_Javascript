# Design Patterns in Modern JavaScript Frameworks

## 1. Introduction

Modern JavaScript frameworks like React, Angular, and Vue have embraced design patterns to enhance code maintainability, reusability, and scalability. These frameworks provide built-in mechanisms for managing application state, component interactions, and modularization.

This section explores how key design patterns are implemented in modern JavaScript frameworks.

---

## 2. React.js and Design Patterns

React follows the component-based architecture and employs several design patterns for effective development.

### 2.1 Observer Pattern (Redux & Context API)

**Use Case:** Managing global state changes efficiently.

**Implementation:**

```javascript
import { createStore } from "redux";

const initialState = { count: 0 };

function reducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    default:
      return state;
  }
}

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));
store.dispatch({ type: "INCREMENT" });
```

Redux implements the Observer Pattern where the store notifies all subscribed components when the state changes.

---

### 2.2 Factory Pattern (Component Factories)

**Use Case:** Dynamically creating components based on configuration.

**Implementation:**

```javascript
const ButtonFactory = (type) => {
  switch (type) {
    case "primary":
      return <button className="btn-primary">Primary Button</button>;
    case "secondary":
      return <button className="btn-secondary">Secondary Button</button>;
    default:
      return <button className="btn-default">Default Button</button>;
  }
};

const App = () => (
  <div>
    {ButtonFactory("primary")}
    {ButtonFactory("secondary")}
  </div>
);
```

---

### 2.3 Higher-Order Components (HOCs) as Decorators

**Use Case:** Enhancing component behavior without modifying its structure.

**Implementation:**

```javascript
const withLogging = (Component) => {
  return (props) => {
    console.log("Rendering component:", Component.name);
    return <Component {...props} />;
  };
};

const SimpleComponent = () => <div>Hello World</div>;
const EnhancedComponent = withLogging(SimpleComponent);
```

HOCs follow the **Decorator Pattern**, allowing reusable component enhancements.

---

## 3. Node.js and Design Patterns

Node.js heavily utilizes design patterns for modular and scalable backend development.

### 3.1 Chain of Responsibility Pattern (Middleware in Express.js)

**Use Case:** Processing HTTP requests through multiple middleware functions.

**Implementation:**

```javascript
const express = require("express");
const app = express();

const middleware1 = (req, res, next) => {
  console.log("Middleware 1 executed");
  next();
};

const middleware2 = (req, res, next) => {
  console.log("Middleware 2 executed");
  next();
};

app.use(middleware1);
app.use(middleware2);

app.get("/", (req, res) => res.send("Hello World"));

app.listen(3000, () => console.log("Server running on port 3000"));
```

Each middleware function processes the request before passing it along, following the **Chain of Responsibility Pattern**.

---

### 3.2 Singleton Pattern (Database Connection)

**Use Case:** Ensuring a single instance of a database connection.

**Implementation:**

```javascript
const mongoose = require("mongoose");

class Database {
  constructor() {
    if (!Database.instance) {
      this.connection = mongoose.connect("mongodb://localhost:27017/test");
      Database.instance = this;
    }
    return Database.instance;
  }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true
```

Ensuring a single instance of the database connection improves efficiency and prevents redundant connections.

---

## 4. Conclusion

Modern JavaScript frameworks leverage design patterns to manage state, enhance modularity, and improve scalability. By understanding and applying these patterns, developers can build robust applications efficiently. The next section explores **best practices and performance considerations in design patterns.**
