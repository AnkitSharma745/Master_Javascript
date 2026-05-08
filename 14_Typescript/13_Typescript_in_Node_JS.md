# TypeScript with Node.js

TypeScript enhances Node.js applications by providing static typing, better tooling, and improved maintainability. This guide covers setting up and effectively using TypeScript in a Node.js environment.

---

## 1. Setting Up TypeScript in a Node.js Project

### Initializing a Node.js Project with TypeScript

```sh
mkdir my-node-project && cd my-node-project
npm init -y
npm install typescript ts-node @types/node --save-dev
```

### Creating a `tsconfig.json` File

Run the following command to generate a `tsconfig.json` file:

```sh
tsconfig --init
```

Modify the file for a Node.js project:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
  }
}
```

---

## 2. Using ts-node for Running TypeScript Files

Instead of compiling TypeScript files every time, use `ts-node` for execution:

```sh
ts-node src/index.ts
```

---

## 3. Typing Express.js Applications

### Installing Express with TypeScript Support

```sh
npm install express
npm install @types/express --save-dev
```

### Creating an Express Server in TypeScript

```ts
import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Node.js!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

---

## 4. Typing Middleware in Express

### Defining Middleware Function

```ts
import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
```

### Using Middleware

```ts
app.use(logger);
```

---

## 5. Working with Databases in TypeScript

### Using TypeORM for Database Interaction

Install TypeORM and a database driver:

```sh
npm install typeorm reflect-metadata sqlite3
```

Define an Entity:

```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
```

---

## 6. Writing TypeScript APIs and Controllers

### Defining a Controller

```ts
import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  res.json([{ id: 1, name: "John Doe" }]);
};
```

### Registering a Route

```ts
import express from "express";
import { getUsers } from "./controllers/userController";

const router = express.Router();
router.get("/users", getUsers);
export default router;
```

---

## 7. Unit Testing in TypeScript (Using Jest)

### Installing Jest and TypeScript Support

```sh
npm install --save-dev jest ts-jest @types/jest
```

### Configuring Jest

Create a `jest.config.js` file:

```js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};
```

### Writing a Test Case

```ts
test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});
```

Run tests with:

```sh
npm test
```

---

## 8. Best Practices for TypeScript with Node.js

- **Use `strict` mode** in `tsconfig.json`.
- **Avoid using `any`**, prefer specific types.
- **Leverage TypeScript utility types** like `Partial<T>`.
- **Organize code with modules and controllers**.
- **Use environment variables** (`dotenv`) for configuration.

By following these guidelines, you can build scalable and maintainable Node.js applications with TypeScript.
