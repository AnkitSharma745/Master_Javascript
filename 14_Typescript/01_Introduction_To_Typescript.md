# Introduction to TypeScript

## What is TypeScript?

TypeScript is a statically typed superset of JavaScript developed by Microsoft. It extends JavaScript by adding optional static types, interfaces, and modern JavaScript features. TypeScript compiles to plain JavaScript, making it compatible with any environment where JavaScript runs.

**Key Features:**

- Strong Typing
- Object-Oriented Programming Features
- Compilation to JavaScript
- Enhanced IDE Support
- Compatibility with ES6 and beyond

### Example

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("Alice")); // Output: Hello, Alice!
```

---

## Why Use TypeScript Over JavaScript?

### 1. Static Typing

TypeScript allows developers to catch errors at compile time rather than at runtime.

#### Example

```typescript
let count: number = 5;
count = "text"; // Error: Type 'string' is not assignable to type 'number'
```

### 2. Enhanced IDE Support

TypeScript provides better autocomplete, navigation, and refactoring support in modern IDEs.

### 3. Object-Oriented Programming

TypeScript supports classes, interfaces, inheritance, and access modifiers, making it easier to write maintainable and scalable code.

### 4. Improved Maintainability

TypeScript helps enforce coding standards and provides better code documentation, making codebases easier to maintain.

### 5. Compatibility

TypeScript compiles to JavaScript, making it compatible with all JavaScript environments.

---

## Key Features of TypeScript

### 1. Type Annotations

TypeScript allows developers to explicitly define the types of variables and function parameters.

```typescript
let isActive: boolean = true;
```

### 2. Interfaces and Type Aliases

Interfaces and type aliases enable developers to define custom types.

```typescript
interface User {
  id: number;
  name: string;
}
```

### 3. Generics

Generics provide a way to create reusable and type-safe components.

```typescript
function identity<T>(value: T): T {
  return value;
}
```

### 4. Modules and Namespaces

TypeScript supports modular code organization.

```typescript
export function greet() {
  console.log("Hello, World!");
}
```

### 5. Decorators

Decorators are a special type of declaration that can modify classes and class members.

```typescript
function Log(target: any, key: string) {
  console.log(`${key} was called`);
}

class Example {
  @Log
  greet() {
    console.log("Hello!");
  }
}
```

---

## Setting Up TypeScript with Node.js and Frontend Projects

### Step 1: Install TypeScript

```bash
npm install -g typescript
```

### Step 2: Initialize a TypeScript Project

```bash
tsc --init
```

This generates a `tsconfig.json` file.

### Step 3: Create a TypeScript File

Create a file named `index.ts`.

```typescript
const message: string = "Hello, TypeScript!";
console.log(message);
```

### Step 4: Compile the TypeScript File

```bash
tsc index.ts
```

This will generate an `index.js` file.

### Step 5: Run the JavaScript File

```bash
node index.js
```

---

## tsconfig.json File and Its Configurations

The `tsconfig.json` file contains TypeScript configuration options.

### Example Configuration

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Key Options

- **target:** Specifies the ECMAScript target version.
- **module:** Defines the module system.
- **strict:** Enables strict type checking.
- **outDir:** Specifies the output directory for compiled files.
- **rootDir:** Specifies the root directory of TypeScript files.
- **include:** Specifies the files to include.
- **exclude:** Specifies the files to exclude.

---

## Understanding TypeScript Compilation (tsc)

### How TypeScript Compilation Works

TypeScript files (`.ts`) are compiled into JavaScript files (`.js`) using the TypeScript compiler (`tsc`).

### Compilation Command

```bash
tsc
```

This command compiles all files included in the `tsconfig.json`.

### Watch Mode

To automatically recompile TypeScript files on changes, use:

```bash
tsc --watch
```

### Output Example

**TypeScript File (`example.ts`)**

```typescript
const greeting: string = "Hello, TypeScript!";
console.log(greeting);
```

**Compiled JavaScript File (`example.js`)**

```javascript
var greeting = "Hello, TypeScript!";
console.log(greeting);
```

---

This document covers the basics of TypeScript and provides a solid foundation for starting with this powerful superset of JavaScript.
