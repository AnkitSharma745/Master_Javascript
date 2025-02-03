# Advanced Types in TypeScript

## 1. Union Types

A Union Type allows a variable to have multiple types. It is denoted using the `|` (pipe) operator.

### Syntax:

```ts
let value: string | number;
value = "Hello"; // valid
value = 42; // valid
value = true; // Error: Type 'boolean' is not assignable to type 'string | number'
```

### Example:

```ts
function printId(id: string | number) {
  console.log(`Your ID is: ${id}`);
}
printId(101); // Valid
printId("A123"); // Valid
```

---

## 2. Intersection Types

Intersection Types combine multiple types into one. It is denoted using the `&` (ampersand) operator.

### Syntax:

```ts
type Employee = { name: string; age: number };
type Manager = { role: string; department: string };

type TeamLead = Employee & Manager;

const teamLead: TeamLead = {
  name: "Alice",
  age: 30,
  role: "Lead Developer",
  department: "IT",
};
```

---

## 3. Literal Types

Literal Types allow you to specify exact string, number, or boolean values a variable can hold.

### Syntax:

```ts
let status: "active" | "inactive" | "pending";
status = "active"; // Valid
status = "inactive"; // Valid
status = "completed"; // Error
```

### Example:

```ts
type ResponseType = "success" | "failure";
function handleResponse(status: ResponseType) {
  if (status === "success") {
    console.log("Operation was successful!");
  } else {
    console.log("Operation failed.");
  }
}
handleResponse("success");
handleResponse("failure");
```

---

## 4. Tuple Types

Tuples allow specifying an array with fixed types and order of elements.

### Syntax:

```ts
let user: [string, number];
user = ["Alice", 25]; // Valid
user = [25, "Alice"]; // Error: Type 'number' is not assignable to type 'string'
```

### Example:

```ts
type Coordinate = [number, number];
const point: Coordinate = [10, 20];
console.log(point[0]); // 10
console.log(point[1]); // 20
```

---

## 5. Enum Types

Enums define a set of named constants.

### Numeric Enums:

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
console.log(Direction.Up); // 1
console.log(Direction.Down); // 2
```

### String Enums:

```ts
enum Status {
  Success = "SUCCESS",
  Failure = "FAILURE",
  Pending = "PENDING",
}
console.log(Status.Success); // "SUCCESS"
```

---

## 6. Type Aliases vs Interfaces

Type aliases and interfaces are both used to define object types, but they have some differences.

### Type Aliases:

```ts
type Person = {
  name: string;
  age: number;
};
let user: Person = { name: "John", age: 30 };
```

### Interfaces:

```ts
interface Person {
  name: string;
  age: number;
}
let user: Person = { name: "John", age: 30 };
```

### Differences:

| Feature                    | Type Alias | Interface           |
| -------------------------- | ---------- | ------------------- |
| Can be extended            | No         | Yes (via `extends`) |
| Can define functions       | Yes        | Yes                 |
| Can define primitive types | Yes        | No                  |

---

## 7. Nullable Types

TypeScript allows a variable to be nullable explicitly.

### Syntax:

```ts
let userName: string | null;
userName = "Alice"; // Valid
userName = null; // Valid
userName = undefined; // Error unless `undefined` is explicitly included
```

### Example:

```ts
function getUserName(name: string | null) {
  return name ? `Hello, ${name}!` : "Hello, guest!";
}
console.log(getUserName("Alice")); // "Hello, Alice!"
console.log(getUserName(null)); // "Hello, guest!"
```
