# Variables

Variable is a container which holds some value in it. For example, we store rice in a container as simple as a variable is.

In JavaScript, variables can be defined using four types:

## 1. Using `const`

```javascript
const y = 20; // Declaration and initialization
```

## 2. Using `let`

```javascript
let y = 20; // Declaration and initialization
```

## 3. Using `var`

```javascript
var y = 20; // Declaration and initialization
```

## 4. Using `nothing`

```javascript
 y = 20; // Declaration and initialization
```
## Rules for Naming a Variable in JavaScript

When naming variables in JavaScript, you need to follow certain rules to ensure proper syntax and avoid errors. Here are the rules for naming variables:

1. **Valid Characters:**
   - Variable names can contain letters (a-z, A-Z), digits (0-9), underscores (_), and dollar signs ($).
   - They must begin with a letter, an underscore (_), or a dollar sign ($).
   - Subsequent characters can also be digits.

2. **Case Sensitivity:**
   - JavaScript is case-sensitive, so `myVariable` and `MyVariable` are treated as different variables.

3. **Reserved Keywords:**
   - You cannot use reserved JavaScript keywords as variable names. These keywords have predefined meanings in the language and cannot be used as identifiers. For example, `var`, `let`, `const`, `if`, `else`, `function`, etc.

4. **Meaningful and Descriptive:**
   - Choose variable names that are meaningful and descriptive of their purpose. This makes your code more readable and understandable by others.

5. **Camel Case:**
   - It is a common convention in JavaScript to use camelCase for variable names. This means starting with a lowercase letter and capitalizing the first letter of each subsequent word in the name. For example, `myVariableName`, `firstName`, `totalAmount`, etc.

6. **Avoid Starting with a Digit:**
   - Variable names should not start with a digit (0-9) as it can lead to syntax errors.

7. **Avoid Special Characters:**
   - Avoid using special characters such as !, @, #, %, etc., in variable names as they are not allowed.

8. **Avoid Using Unicode Characters:**
   - While JavaScript allows Unicode characters in variable names, it's generally best to stick to ASCII characters for better compatibility and readability.

Following these rules ensures that your variable names are valid, understandable, and maintainable, making your code easier to work with and debug.


## 1. What is `let` in JavaScript?

`let` is a keyword introduced in ECMAScript 6 (ES6) for declaring variables. Variables declared with `let` are block-scoped, meaning they are accessible only within the block they are declared in.   

**Explanation:**
- Variables declared with `let` have a limited scope, confined to the block in which they are defined. This helps in preventing variable hoisting issues and enhances code clarity.
- Variables declared with `let` can be reassigned a new value within the same block,but can't declare again with same variable name. 

**Example:**
```javascript
{
    let x = 10;
    console.log(x); // Output: 10
}
console.log(x); // Error: x is not defined
```
## 2. What is `var` in JavaScript?

`var` is a keyword used for variable declaration in older versions of JavaScript. Variables declared with var are function-scoped or globally scoped, depending on where they are declared.


**Explanation:**
- Variables declared with var are hoisted to the top of their scope, which means they can be accessed before they are declared, leading to potential issues.
- Variables declared with var have a wider scope compared to let and const, as they are not block-scoped.
- usually we don't use this to declare a variable in modern way.However this can be used in need for some particular things.
**Example:**
```javascript
{
    var y = 20;
    console.log(y); // Output: 20
}
console.log(y); // Output: 20
```

## 3. What is `const` in JavaScript?

`const` is a keyword introduced in ECMAScript 6 (ES6) for declaring constants. Variables declared with `const` are block-scoped like `let`, but their values cannot be reassigned once initialized.

**Explanation:**

- Variables declared with `const` must be initialized with a value at the time of declaration, and this value cannot be changed later.
- While the variable itself is immutable, if it is an object or an array, its properties or elements can still be modified.

**Example:**

```javascript
const PI = 3.14;
console.log(PI); // Output: 3.14

// Trying to reassign a new value to a constant will result in an error
PI = 3.14159; // Error: Assignment to constant variable

// However, modifying properties of an object declared with const is allowed
const person = { name: 'John', age: 30 };
person.age = 31;
console.log(person.age); // Output: 31
```

## Scope of Variables

JavaScript variables have different scopes, depending on where they are declared.

### 1. Global Scope:
Variables declared outside of any function have global scope. They can be accessed from any part of the program.

#### Example:
```javascript
var globalVar = "I am global!";
```
### 2. Local Scope:
Variables declared inside a function have local scope. They can only be accessed within that function.

#### Example:
```javascript
function myFunction() {
    var localVar = "I am local!";
}

```


### 3.  Block Scope (using let and const):
Variables declared with `let` or `const` have block scope. They are only accessible within the block they are declared in (e.g., within curly braces {}).
#### Example:
```javascript
if (true) {
    let blockVar = "I am block-scoped!";
}

```


### 4. Hoisting:
Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their containing scope during the compile phase. However, only the declarations are hoisted, not the initializations.
#### Example:
```javascript
console.log(x); // Output: undefined
var x = 5;

```

