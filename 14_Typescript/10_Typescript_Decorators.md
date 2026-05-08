# TypeScript Decorators

Decorators are a special feature in TypeScript that allows developers to modify or enhance classes, methods, properties, or parameters. They are essentially functions that can be attached to these elements and execute at runtime.

---

## What are Decorators?

A decorator is a function that is applied to a class or class member at design time. They provide a way to add annotations or meta-programming logic to classes, methods, and properties.

### Use Cases

- **Logging:** Automatically log method calls.
- **Validation:** Validate input parameters for methods.
- **Access Control:** Restrict access to certain methods.
- **Dependency Injection:** Automatically inject dependencies.

---

## Enabling Experimental Decorators in `tsconfig.json`

To use decorators in TypeScript, you need to enable the experimental decorators feature.

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

---

## Types of Decorators

### 1. Class Decorators

A class decorator is applied to the constructor of a class.

#### Example

```typescript
function Logger(target: Function) {
  console.log(`Logging class: ${target.name}`);
}

@Logger
class Person {
  constructor(public name: string) {}
}
```

### 2. Method Decorators

A method decorator is applied to a method definition.

#### Example

```typescript
function Log(
  target: Object,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Method called: ${propertyName} with args: ${args}`);
    return originalMethod.apply(this, args);
  };
}

class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3); // Logs: Method called: add with args: 2,3
```

### 3. Property Decorators

A property decorator is applied to a property definition.

#### Example

```typescript
function ReadOnly(target: Object, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false,
  });
}

class Vehicle {
  @ReadOnly
  brand: string = "Toyota";
}
```

### 4. Parameter Decorators

A parameter decorator is applied to a specific parameter in a method.

#### Example

```typescript
function LogParameter(
  target: Object,
  propertyKey: string,
  parameterIndex: number
) {
  console.log(
    `Parameter in ${propertyKey} at position ${parameterIndex} is being logged.`
  );
}

class UserService {
  greet(@LogParameter message: string) {
    console.log(message);
  }
}
```

---

## Decorator Factories

A decorator factory is a function that returns a decorator function.

#### Example

```typescript
function LoggerFactory(logMessage: string) {
  return function (target: Function) {
    console.log(logMessage);
  };
}

@LoggerFactory("Logging User class")
class User {}
```

---

## Common Use Cases for Decorators

### 1. Logging

```typescript
function LogMethod(
  target: Object,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Called ${propertyName} with args:`, args);
    return originalMethod.apply(this, args);
  };
}

class OrderService {
  @LogMethod
  placeOrder(orderId: number) {
    console.log(`Order ${orderId} placed successfully.`);
  }
}
```

### 2. Validation

```typescript
function Required(target: Object, propertyKey: string, parameterIndex: number) {
  const metadataKey = `__required_${propertyKey}_parameters`;
  const existingRequiredParameters: number[] =
    Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(
    metadataKey,
    existingRequiredParameters,
    target,
    propertyKey
  );
}

class ProductService {
  createProduct(@Required name: string) {
    console.log(`Product created: ${name}`);
  }
}
```

### 3. Access Control

```typescript
function AdminOnly(
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    if (!this.isAdmin) {
      throw new Error("Access denied: Admins only");
    }
    return originalMethod.apply(this, args);
  };
}

class UserService {
  isAdmin = false;

  @AdminOnly
  deleteUser(userId: number) {
    console.log(`User ${userId} deleted.`);
  }
}

const userService = new UserService();
try {
  userService.deleteUser(123);
} catch (error) {
  console.error(error.message); // Access denied: Admins only
}
```

---

## Best Practices for Decorators

- **Use Intentionally:** Decorators can add complexity, so use them judiciously.
- **Combine Decorators:** Stack multiple decorators for cleaner code.
- **Maintain Readability:** Ensure that decorated code remains readable and maintainable.
- **Error Handling:** Handle errors gracefully in decorator logic.
- **Documentation:** Document custom decorators for better understanding.

---

This document now covers the Decorators topic in TypeScript with in-depth explanations, practical examples, and best practices.
