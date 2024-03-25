# Data Type in Javascript
#### A data type in programming refers to the classification or categorization of data that determines the kind of values it can hold and the operations that can be performed on it. Data types are essential for ensuring the correctness and efficiency of programs by providing a structure for organizing and manipulating data.

In most programming languages, including JavaScript, data types can be broadly categorized into two main types:
- Primitive Data type.
- Non Primitive data type (complex data type)


## 1. Primitive Data type

Primitive data types are immutable and hold simple values. They are directly stored in memory, and accessing them retrieves their actual value.

### 1. ```Number``` Data Type
The Number data type in JavaScript represents numeric values, including integers and floating-point numbers. It is used for arithmetic operations, mathematical calculations, and data validation.
- Represents both integer and floating-point numbers.
- Supports basic arithmetic operations like addition, subtraction, multiplication, and division.
- Provides mathematical functions such as `Math.round()`, `Math.floor()`, etc.
- Includes special values like `Infinity`, `-Infinity`, and `NaN`.
#### Example:
```javascript
// Some arithmetic examples 
const sum = 10 + 5; // Addition
const difference = 10 - 5; // Subtraction
const product = 10 * 5; // Multiplication
const quotient = 10 / 5; // Division

console.log(sum); // Output: 15
console.log(difference); // Output: 5
console.log(product); // Output: 50
console.log(quotient); // Output: 2

// Data Validation
const userInput = '123';

// Check if userInput is a valid number
const isValidNumber = !isNaN(userInput) && Number.isInteger(parseFloat(userInput));
console.log(isValidNumber); // Output: true

// Random Number Generation 
const randomNumber = Math.random(); // Generate a random number between 0 and 1
console.log(randomNumber);


```
### 2. ```String``` Data Type
In JavaScript, the `String` data type represents a sequence of characters enclosed within single ('') or double ("") quotes. Strings are widely used for storing and manipulating text-based data in JavaScript applications.
- Represents sequences of characters, including letters, digits, symbols, and whitespace.
- Supports various string manipulation methods for concatenation, extraction, and modification.
- Immutable: Once created, strings cannot be changed. However, new strings can be created based on existing ones.
#### Example:
- ##### Text Processing 
```javascript
     const message = 'Hello, world!';
     console.log(message); // Output: Hello, world!
```
- #### Concatenation
```javascript
    const firstName = 'John';
    const lastName = 'Doe';
    const fullName = firstName + ' ' + lastName; // Using concatenation operator
    console.log(fullName); // Output: John Doe

    // Using template literals
    const fullNameTemplateLiteral = `${firstName} ${lastName}`;
    console.log(fullNameTemplateLiteral); // Output: John Doe
```
- #### Substring Extraction
 ```javascript
    const sentence = 'The quick brown fox jumps over the lazy dog';
    const subString = sentence.substring(4, 9); // Extracts 'quick'
    console.log(subString);
```
- #### String Manipulation
```javascript
    const text = 'JavaScript is awesome!';
    const upperCaseText = text.toUpperCase(); // Converts to uppercase
    console.log(upperCaseText); // Output: JAVASCRIPT IS AWESOME!

    const replacedText = text.replace('awesome', 'amazing'); // Replaces 'awesome' with 'amazing'
    console.log(replacedText); // Output: JavaScript is amazing!

    const words = text.split(' '); // Splits the string into an array of words
    console.log(words); // Output: ['JavaScript', 'is', 'awesome!']
```
### 3. ```Boolean``` Data Type
In JavaScript, the Boolean data type represents a logical value that can be either `true` or `false`. Booleans are primarily used for logical operations, conditional statements, and boolean algebra in JavaScript applications.
- Represents two possible values: `true` or `false`.
- Used for logical comparisons, conditional statements, and controlling program flow.
- Often the result of logical operations and comparisons.
### Examples 
```javascript
// Conditional Statement 
const isRaining = true;

if (isRaining) {
    console.log('Remember to bring an umbrella!');
} else {
    console.log('No need for an umbrella today.');
}
// Loop Control 

let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

// Function return values 
function isValidEmail(email) {
    // Logic to validate email
    return email.includes('@') && email.includes('.');
}

const email = 'example@email.com';
console.log(isValidEmail(email)); // Output: true

//State Representation 
const isLoggedIn = true;
if (isLoggedIn) {
    console.log('User is logged in.');
} else {
    console.log('User is logged out.');
}


```

### 4. ```undefined``` Data Type
In JavaScript, the ```undefined``` data type represents a variable that has been declared but has not been assigned a value. It indicates the absence of a meaningful value.
- Represents the default value assigned to variables that have not been initialized.
- Indicates that a variable exists but does not currently have a value assigned to it.
- Different from null, which is an intentional absence of value.
```javascript
//Variable Declaration
let x;
console.log(x); // Output: undefined

// Function returns values 
function greet() {
    // No return statement
}
console.log(greet()); // Output: undefined

//Property access
const person = {
    name: 'John',
    age: 30
};
console.log(person.address); // Output: undefined

```
### 5. ```null``` Data Type
In JavaScript, the ```null``` data type represents the intentional absence of any value. It is often used to indicate that a variable or object property does not currently have a value assigned to it.
- Represents a deliberate absence of value or a ```null``` value.
- Used to explicitly indicate that a variable or object property has no value.
- Different from undefined, which typically indicates an unintentional absence of value.
#### Example
```javascript
//Variable Declaration 

let x = null;
console.log(x); // Output: null
 
 // Object Property 
 const person = {
    name: 'John',
    age: null
};
console.log(person.age); // Output: null

// Function Return Value 
function getUserData() {
    // Logic to fetch user data
    if (/* User data not found */) {
        return null;
    } else {
        return userData;
    }
}


```



### 6. Symbol

`Symbol` is a primitive data type introduced in ECMAScript 6 (ES6). It represents a unique and immutable value that may be used as the key of an object property. Symbols are useful for creating unique identifiers and preventing name collisions in objects.

#### Example:
```javascript
// Creating a new symbol
const symbol1 = Symbol('symbol1');
const symbol2 = Symbol('symbol2');

// Symbols are unique
console.log(symbol1 === symbol2); // Output: false

// Using symbols as object properties
const obj = {
    [symbol1]: 'value1',
    [symbol2]: 'value2'
};

console.log(obj[symbol1]); // Output: 'value1'
```


### 7. BigInt

`BigInt` is a primitive data type introduced in ECMAScript 2020 (ES11). It represents arbitrary precision integers, allowing JavaScript to perform operations on integers beyond the range of Number data type, which is limited to -2^53 to 2^53.
#### Example:
```javascript
// Creating a BigInt
const bigIntValue = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);

console.log(bigIntValue); // Output: 9007199254740993n

// Operations with BigInt
const result = bigIntValue * BigInt(2);
console.log(result); // Output: 18014398509481986n
```
## 2. Non-Primitive (Complex) Data Types

Non-primitive data types are mutable and hold references to complex data structures. They are stored by reference, and accessing them retrieves a reference to their location in memory.
Non-primitive data types can be dynamically modified, allowing for more complex data manipulation and organization in JavaScript programs.

### 1. Array 
In JavaScript, the ```Array``` data type represents an ordered collection of elements, which can be of any data type, including numbers, strings, objects, or even other arrays. Arrays are widely used for storing and manipulating multiple values in a single variable.

- Represents an ordered list of elements, accessed by index.
- Allows storing elements of different data types in the same array.
- Supports various methods for adding, removing, and manipulating elements.
#### Examples 
```javascript
//Creating Array 

const numbers = [1, 2, 3, 4, 5]; // Array of numbers
const fruits = ['apple', 'banana', 'orange']; // Array of strings
const mixedArray = [1, 'apple', true]; // Array of mixed data types

//Accessing Array Elements 
console.log(numbers[0]); // Output: 1
console.log(fruits[1]); // Output: banana

```

### 2. Object Data Type 

In JavaScript, the `Object` data type represents a collection of key-value pairs, where keys are strings (or symbols) and values can be of any data type, including numbers, strings, arrays, functions, or even other objects. Objects are fundamental to JavaScript and are used to represent complex data structures and entities in JavaScript applications.

- Represents a collection of properties, each consisting of a key-value pair.
- Allows organizing and structuring data in a hierarchical manner.
- Supports various methods for accessing, adding, modifying, and deleting properties.

1. **Data Representation**:
   - Used to represent entities, such as users, products, or any real-world objects, as structured data.

2. **Data Organization**:
   - Enables organizing related data into logical groups using key-value pairs.

3. **Object-Oriented Programming**:
   - Forms the basis of object-oriented programming in JavaScript, allowing for encapsulation, inheritance, and polymorphism.

4. **JSON (JavaScript Object Notation)**:
   - Objects are used to represent data in JSON format, which is widely used for data exchange between web servers and clients.

#### Examples:
```javascript
const person = {
    name: 'John',
    age: 30,
    isEmployed: true,
    hobbies: ['reading', 'gaming', 'traveling'],
    address: {
        city: 'New York',
        country: 'USA'
    },
    sayHello: function() {
        console.log('Hello!');
    }
};
```

### 3. Date Data Type

In JavaScript, the `Date` data type represents dates and times. It allows developers to work with dates, perform date calculations, and format dates for display. The `Date` object provides methods for creating, manipulating, and formatting dates and times.

- Represents dates and times, including year, month, day, hour, minute, second, and millisecond.
- Allows performing various operations on dates, such as addition, subtraction, and comparison.
- Supports parsing and formatting dates in different formats.

### Use Cases:

1. **Current Date and Time**:
   - Used to retrieve the current date and time for displaying timestamps or performing time-sensitive operations.

2. **Date Calculations**:
   - Enables performing date calculations, such as adding or subtracting days, months, or years from a given date.

3. **Date Formatting**:
   - Provides methods for formatting dates into custom or standardized formats for display to users.

#### Examples:


```javascript
// Getting the date 
const currentDate = new Date(); // Current date and time
console.log(currentDate);

const specificDate = new Date('2022-12-31'); // Specific date
console.log(specificDate);

const year = currentDate.getFullYear();
const month = currentDate.getMonth(); // Note: Month starts from 0 (January)
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const milliseconds = currentDate.getMilliseconds();

```

