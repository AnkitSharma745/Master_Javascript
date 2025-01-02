# Type Conversion in Javascript

**In JavaScript, type conversion refers to the process of converting values from one data type to another. JavaScript automatically performs type conversion when operators or functions expect operands of a different type. Understanding type conversion is crucial for writing robust and predictable code in JavaScript.**

## Implicit Type Conversion (Coercion)

JavaScript performs implicit type conversion, also known as coercion, when operators expect operands of different types. This can lead to unexpected results if not handled carefully.

```javascript
const num = 10;
const str = "20";

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

const str = "20";
const num = Number(str);
console.log(num); // Output: 20

// 3. Boolean Conversion

const val = "Hello";
const bool = Boolean(val);
console.log(bool); // Output: true (non-empty strings are truthy)
```

# Type Conversion Table

### Number Conversion ---------

<table style="font-size: 19px;">
  <tr>
    <th style="font-family: Arial, sans-serif; font-size: 18px;">Variable (x)</th>
    <th style="font-family: Arial, sans-serif; font-size: 18px;">typeOf(x)</th>
    <th style="font-family: Arial, sans-serif; font-size: 18px;">Conversion</th>
    <th style="font-family: Arial, sans-serif; font-size: 18px;">typeOf(y)</th>
    <th style="font-family: Arial, sans-serif; font-size: 18px;">console.log(y)</th>
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

### Number Conversion Summary

#### Expected Conversions:

- Numerical strings and booleans convert to numbers as expected.
- Null converts to `0`, and undefined converts to `NaN`.

#### Unexpected Results:

- Strings with non-numeric characters return `NaN`.
- Empty objects or arrays convert to `NaN`.
- Single-element arrays return the element's value (`2` for `[2]`).
- Arrays with non-numeric elements or mixed data types return `NaN`.

### String Conversion ------------

<table style="font-size: 19px;">
  <tr>
    <th style="font-family: Arial, sans-serif; font-size: 18px;">Variable (x)</th>
    <th style="font-family: Arial, sans-serif; font-size: 18px;">typeOf(x)</th>
    <th style="font-family: Arial, sans-serif; font-size: 18px;">Conversion</th>
    <th style="font-family: Arial, sans-serif; font-size: 18px;">typeOf(y)</th>
    <th style="font-family: Arial, sans-serif; font-size: 18px;">console.log(y)</th>
  </tr>
  <tr>
     <td>x = "a"</td>
     <td>string</td>
     <td>y= String(x)</td>
     <td>string</td>
     <td>a</td>
   </tr>
   <tr>
     <td>x = 35</td>
     <td>number</td>
     <td>y= String(x)</td>
     <td>string</td>
     <td>35(in string)</td>
   </tr>
   <tr>
     <td>x = true</td>
     <td>Boolean</td>
     <td>y= String(x)</td>
     <td>string</td>
     <td>true</td>
   </tr>
   <tr>
     <td>x = false</td>
     <td>Boolean</td>
     <td>y= String(x)</td>
     <td>string</td>
     <td>false</td>
   </tr>
   <tr>
     <td>x = undefined</td>
     <td>undefined</td>
     <td>y= String(x)</td>
     <td>string</td>
     <td>undefined</td>
   </tr>
   <tr>
     <td>x= null</td>
     <td>object</td>
     <td>y= String(x)</td>
     <td>string</td>
     <td>null</td>
   </tr>
   <tr>
     <td>x = {}</td>
     <td>object</td>
     <td>y= String(x)</td>
     <td>string</td>
     <td>[object object]</td>
   </tr>
   <tr>
     <td>x = []</td>
     <td>object</td>
     <td>y= String(x)</td>
     <td>string</td>
     <td>_____</td>
   </tr>
   <tr>
     <td>x = [3]</td>
     <td>object</td>
     <td>y= String(x)</td>
     <td>string</td>
     <td>3</td>
   </tr>
   <tr>
     <td>x = [3,6,5,1]</td>
     <td>object</td>
     <td>y= String(x)</td>
     <td>string</td>
     <td>3,6,5,1</td>
   </tr>
</table>

#### String Conversion Summary

- Converting `"a"` to a string results in `"a"`.
- Converting `35` to a string results in `"35"`.
- Converting `true` to a string results in `"true"`.
- Converting `false` to a string results in `"false"`.
- Converting `undefined` to a string results in `"undefined"`.
- Converting `null` to a string results in `"null"`.
- Converting an empty object `{}` to a string results in `"[object Object]"`.
- Converting an empty array `[]` to a string results in an empty string `""`.
- Converting an array with a single element `[3]` to a string results in `"3"`.
- Converting an array with multiple elements `[3,6,5,1]` to a string results in `"3,6,5,1"`.

### Boolean Conversion--------

<table style="font-size: 19px;">
  <tr>
    <th style="font-family: Arial, sans-serif; font-size: 18px;">Variable (x)</th>
    <th style="font-family: Arial, sans-serif; font-size: 18px;">typeOf(x)</th>
    <th style="font-family: Arial, sans-serif; font-size: 18px;">Conversion</th>
    <th style="font-family: Arial, sans-serif; font-size: 18px;">typeOf(y)</th>
    <th style="font-family: Arial, sans-serif; font-size: 18px;">console.log(y)</th>
  </tr>
  <tr>
     <td>x = 13</td>
     <td>number</td>
     <td>y= Boolean(x)</td>
     <td>Boolean</td>
     <td>true</td>
   </tr>
   <tr>
     <td>x= 0</td>
     <td>number</td>
     <td>y= Boolean(x)</td>
     <td>boolean</td>
     <td>false</td>
   </tr>
   <tr>
     <td>x= "a"</td>
     <td>string</td>
     <td>y= Boolean(x)</td>
     <td>boolean</td>
     <td>true</td>
   </tr>
   <tr>
     <td>x= "" </td>
     <td>string</td>
     <td>y= Boolean(x)</td>
     <td>boolean</td>
     <td>false</td>
   </tr>
   <tr>
     <td>x=[] </td>
     <td>object</td>
     <td>y= Boolean(x)</td>
     <td>boolean</td>
     <td>true</td>
   </tr>
   <tr>
     <td>x=[2] </td>
     <td>object</td>
     <td>y= Boolean(x)</td>
     <td>boolean</td>
     <td>true</td>
   </tr>
   <tr>
     <td>x= {}</td>
     <td>object</td>
     <td>y= Boolean(x)</td>
     <td>boolean</td>
     <td>true</td>
   </tr>
   <tr>
     <td>x={} </td>
     <td>object</td>
     <td>y= Boolean(x)</td>
     <td>boolean</td>
     <td>true</td>
   </tr>
   <tr>
     <td>x= null</td>
     <td>object</td>
     <td>y= Boolean(x)</td>
     <td>boolean</td>
     <td>false</td>
   </tr>
   <tr>
     <td>x= undefined</td>
     <td>undefined</td>
     <td>y= Boolean(x)</td>
     <td>boolean</td>
     <td>false</td>
   </tr>

</table>

### Boolean Conversion Summary

- Converting `13` to boolean results in `true`.
- Converting `0` to boolean results in `false`.
- Converting `"a"` to boolean results in `true`.
- Converting `""` to boolean results in `false`.
- Converting `[]` to boolean results in `true`.
- Converting `[2]` to boolean results in `true`.
- Converting `{}` to boolean results in `true`.
- Converting `null` to boolean results in `false`.
- Converting `undefined` to boolean results in `false`.

#### Unexpected Conversions:

- Empty arrays, arrays with elements, empty objects, and any other object all convert to `true`.
- `null` and `undefined` both convert to `false`.
