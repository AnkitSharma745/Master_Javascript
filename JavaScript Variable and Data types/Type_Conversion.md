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

### Number Conversion ---------
<table style="font-size: 16px;">
  <tr>
    <th>Variable (x)</th>
    <th>typeOf(x)</th>
    <th>Conversion</th>
    <th>typeOf(y)</th>
    <th>console.log(y)</th>
  </tr>
  <tr>
    <td>x = 20</td>
    <td>number</td>
    <td>y = Number(x)</td>
    <td>number</td>
    <td>20</td>
  </tr> 
  <tr>
     <td>x="20"</td>
     <td>string</td>
     <td>y = Number(x)</td>
     <td>number</td>
     <td>20</td>
  </tr>
  <tr>
     <td>x = "20a"</td>
     <td>string</td>
     <td>y = Number(x)</td>
     <td>Number</td>
     <td>NaN</td>
  </tr>
  <tr>
     <td>x = 20a</td>
     <td>Syntax Error</td>
     <td>Syntax Error</td>
     <td>Syntax Error</td>
     <td>Syntax Error</td>
  </tr>
  <tr>
     <td>x = true</td>
     <td>Boolean</td>
     <td>y = Number(x)</td>
     <td>Number</td>
     <td>1</td>
  </tr>
  <tr>
     <td>x = false</td>
     <td>Boolean</td>
     <td>y = Number(x)</td>
     <td>Number</td>
     <td>0</td>
  </tr>
  <tr>
     <td>x = {}</td>
     <td>object</td>
     <td>y = Number(x)</td>
     <td>Number</td>
     <td>NaN</td>
  </tr>
  <tr>
     <td>x = []</td>
     <td>object</td>
     <td>y = Number(x)</td>
     <td>Number</td>
     <td>0</td>
  </tr>
  <tr>
     <td>x= [2]</td>
     <td>object</td>
     <td>y = Number(x)</td>
     <td>Number</td>
     <td>2</td>
  </tr>
  <tr>
     <td>x = [2,5]</td>
     <td>object</td>
     <td>y = Number(x)</td>
     <td>Number</td>
     <td>NaN</td>
  </tr>
  <tr>
     <td>x = null</td>
     <td>object</td>
     <td>y = Number(x)</td>
     <td>Number</td>
     <td>0</td>
  </tr>
  <tr>
     <td>x= undefined</td>
     <td>undefined</td>
     <td>y = Number(x)</td>
     <td>Number</td>
     <td>NaN</td>
  </tr>
</table>
