# Type Conversion in Javascript 
**In JavaScript, type conversion refers to the process of converting values from one data type to another. JavaScript automatically performs type conversion when operators or functions expect operands of a different type. Understanding type conversion is crucial for writing robust and predictable code in JavaScript.**


## Implicit Type Conversion (Coercion)
JavaScript performs implicit type conversion, also known as coercion, when operators expect operands of different types. This can lead to unexpected results if not handled carefully.
```javascript

const num = 10;
const str = '20';

console.log(num + str); // Output: '1020' (implicit conversion of num to string)


```
## Explicit Type Conversion
Developers can explicitly convert values from one type to another using various methods provided by JavaScript.

```javascript
//1.String Conversion 
const num = 10;
const str = String(num);
console.log(str); // Output: '10'

// 2. Number Conversion 

const str = '20';
const num = Number(str);
console.log(num); // Output: 20

// 3. Boolean Conversion 

const val = 'Hello';
const bool = Boolean(val);
console.log(bool); // Output: true (non-empty strings are truthy)

```

#                                 Type Conversion Table 

| Variable (x) |```typeOf(x)```| y= Number(x)| typeOf(y)    |console.log(y)|
|--------------|--------------|--------------|--------------|--------------|
| Row 1, Cell 1| Row 1, Cell 2| Row 1, Cell 3| Row 1, Cell 4| Row 1, Cell 5|

