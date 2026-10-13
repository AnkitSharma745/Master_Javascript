> Supplementary original notes. Start with [TS01](../../lessons/05-typescript/TS01-contracts.md). Run snippets separately; this archive is not a fully executed lesson suite. See the [audit](../../docs/audit/original-audit.md).

# Asynchronous Programming in TypeScript

Asynchronous programming allows applications to execute non-blocking operations, such as network requests, file system operations, or database queries. TypeScript provides strong type safety for asynchronous operations using `Promises` and `async/await` syntax.

---

## 1. Understanding Promises

A `Promise` represents an operation that may complete in the future, returning a resolved value or an error.

### Creating a Promise:

```ts
const fetchData = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched successfully");
    }, 2000);
  });
};

fetchData().then((data) => console.log(data));
```

### Handling Errors:

```ts
const fetchWithError = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Failed to fetch data");
    }, 2000);
  });
};

fetchWithError()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

---

## 2. `async/await` Syntax

`async/await` provides a cleaner way to handle asynchronous operations compared to chaining `.then()` calls.

### Example:

```ts
const fetchAsyncData = async (): Promise<void> => {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

fetchAsyncData();
```

---

## 3. Handling Errors with `try/catch`

Using `try/catch` within `async` functions ensures proper error handling.

```ts
const fetchWithHandling = async (): Promise<void> => {
  try {
    const data = await fetchWithError();
    console.log(data);
  } catch (error) {
    console.error("Error caught:", error);
  }
};

fetchWithHandling();
```

---

## 4. Using TypeScript with `fetch` API

This original example annotates the expected shape but does NOT validate response bytes. Treat it as an unsafe-boundary counterexample; parse unknown at runtime as in TS01.

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};

fetchUser(1)
  .then((user) => console.log(user))
  .catch((error) => console.error(error));
```

---

## 5. Working with `axios` in TypeScript

`axios` is a popular library for making HTTP requests, offering better error handling and response transformations.

### Installing axios:

```sh
npm install axios
```

### Using axios with TypeScript:

```ts
import axios from "axios";

const fetchUserWithAxios = async (id: number): Promise<User> => {
  const response = await axios.get<User>(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
};

fetchUserWithAxios(1)
  .then((user) => console.log(user))
  .catch((error) => console.error(error));
```

---

## 6. `Promise.all` for Parallel Execution

Promise.all aggregates input outcomes; the calls creating those inputs start work. It permits overlap but does not guarantee CPU parallelism or cancel remaining work on failure.

```ts
const fetchMultipleUsers = async (): Promise<void> => {
  try {
    const [user1, user2] = await Promise.all([fetchUser(1), fetchUser(2)]);
    console.log(user1, user2);
  } catch (error) {
    console.error("Error fetching multiple users", error);
  }
};

fetchMultipleUsers();
```

---

## 7. TypeScript with `setTimeout` and `setInterval`

### Using `setTimeout`:

```ts
const delayedMessage = (message: string, delay: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(message);
      resolve();
    }, delay);
  });
};

delayedMessage("Hello after 2 seconds", 2000);
```

### Using `setInterval`:

```ts
const intervalId = setInterval(() => {
  console.log("This message appears every 3 seconds");
}, 3000);

setTimeout(() => clearInterval(intervalId), 10000); // Stops after 10 seconds
```

---

## 8. Best Practices for Asynchronous Code in TypeScript

- **Use `async/await` over `.then()` chaining for readability.**
- **Always handle errors using `try/catch` or `.catch()`.**
- **Use `Promise.all` for concurrent async tasks.**
- **Type async function return values explicitly.**
- Choose fetch or a library from actual transport needs; neither a generic nor an annotation validates external data.

---

## Summary

- **Promises** provide a way to handle async operations.
- **`async/await`** simplifies async code.
- **Error handling** should be done using `try/catch`.
- **TypeScript ensures type safety** in network requests.
- **`Promise.all`** helps execute multiple async operations in parallel.
- **`setTimeout` and `setInterval`** can be used for delayed execution.

Mastering asynchronous programming in TypeScript improves efficiency and makes code more robust and maintainable.
