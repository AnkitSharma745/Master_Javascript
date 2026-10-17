> Supplementary original notes. Start with [TS01](../../lessons/05-typescript/TS01-contracts.md). Run snippets separately; this archive is not a fully executed lesson suite. See the [audit](../../docs/audit/original-audit.md).

# Modules and Namespaces in TypeScript

Modules and namespaces are powerful organizational structures in TypeScript. They help organize code into smaller, reusable components and manage dependencies between different parts of a project.

---

## Understanding Modules in TypeScript

A module in TypeScript is a file that contains TypeScript code. By default, every file is treated as its own module if it has an import or export statement.

### Why Use Modules?

- Code organization and maintainability.
- Avoiding name collisions.
- Better dependency management.
- Improved code reuse.

---

## Exporting and Importing from Modules

Modules can export functions, classes, interfaces, and other members that can be imported and used in other files.

### Example: Named Export

**math.ts**

```typescript
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}
```

**app.ts**

```typescript
import { add, subtract } from "./math";

console.log(add(5, 3)); // Output: 8
console.log(subtract(5, 3)); // Output: 2
```

### Example: Default Export

**logger.ts**

```typescript
export default function log(message: string): void {
  console.log(message);
}
```

**app.ts**

```typescript
import log from "./logger";

log("Hello, TypeScript!"); // Output: Hello, TypeScript!
```

### Best Practices

- Use named exports for better code clarity.
- Limit default exports to one per file.

---

## Module Resolution

Module resolution refers to how TypeScript finds and loads modules based on import paths.

### Types of Module Resolution

1. **Classic:** Used in older projects.
2. **Node:** Default and most widely used.

### Configuring Module Resolution

You can configure module resolution in the `tsconfig.json` file.

```json
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
```

---

## Aliases for Imports

TypeScript allows creating path aliases to simplify complex import paths.

### Example

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

**app.ts**

```typescript
import { helperFunction } from "@utils/helper";
```

---

## Namespaces vs Modules

Namespaces are a legacy feature that allows logical grouping of code within the same file or across files.

### When to Use Namespaces?

- For small projects.
- When backward compatibility is required.

### Example: Namespace

**shapes.ts**

```typescript
namespace Shapes {
  export class Circle {
    constructor(public radius: number) {}
    getArea(): number {
      return Math.PI * this.radius * this.radius;
    }
  }
}

const circle = new Shapes.Circle(5);
console.log(circle.getArea()); // Output: 78.53981633974483
```

### Limitations of Namespaces

- Lack of modern module features.
- Not compatible with ES6 module systems.

---

## Using Third-Party Libraries with TypeScript (@types)

TypeScript provides type definitions for popular third-party libraries via the `@types` package.

### Installing Type Definitions

```bash
npm install lodash @types/lodash
```

### Example Usage

```typescript
import _ from "lodash";

console.log(_.chunk([1, 2, 3, 4], 2)); // Output: [[1, 2], [3, 4]]
```

---

## Using ES6 and CommonJS Modules

TypeScript supports both ES6 and CommonJS module systems.

### Example Configuration

**tsconfig.json**

```json
{
  "compilerOptions": {
    "module": "ES6", // For ES6 modules
    "target": "ES2015"
  }
}
```

---

## Best Practices for Modules and Namespaces

- **Prefer Modules:** Always use modules over namespaces for modern applications.
- **Organize Code:** Structure your modules logically based on functionality.
- **Use Path Aliases:** Simplify imports with path aliases.
- **Minimize Imports:** Only import what you need to reduce bundle size.
- **Consistent Exports:** Choose between default and named exports based on project requirements.

This document provides a detailed exploration of modules and namespaces in TypeScript, highlighting key concepts, examples, and best practices to organize and maintain scalable applications efficiently.
