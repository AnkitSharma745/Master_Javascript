// type coercion

let x = "10";
let y = 5;

// Combining arithmetic and type coercion
let result = +x + y * 2 > 20 ? x - y : x + y;

// Breaking it down:
// - +x: Converts the string "10" to a number (10).
// - y * 2: Multiplies y by 2 => 5 * 2 = 10.
// - +x + y * 2: Adds 10 + 10 = 20.
// - 20 > 20: False.
// - As the condition is false, it evaluates x + y => "10" + 5 => "105" (type coercion).

console.log(result); // Output: "105"

//  Combining Unary, Logical, and Bitwise Operators

let x = -5;
let y = 8;

// Combining unary, logical, and bitwise operators
let result = !(x > 0) && ((y >> 2) | 1) === 3;

// Breaking it down:
// - !(x > 0): x is -5, so x > 0 is false. NOT false => true.
// - y >> 2: Right shifts y (8) by 2 => 1000 >> 2 = 0010 (2 in decimal).
// - (y >> 2) | 1: Performs bitwise OR => 0010 | 0001 = 0011 (3 in decimal).
// - true && 3 === 3: Both conditions are true.

console.log(result); // Output: true

// comma operator

let a = 10,
  b = 5,
  c = 2;

// Combining arithmetic, logical, and comma operators
let result = ((a += b), (b -= c), a * b > 20 ? "High" : "Low");

// Breaking it down:
// - a += b: Updates a => 10 + 5 = 15.
// - b -= c: Updates b => 5 - 2 = 3.
// - a * b: Multiplies updated a and b => 15 * 3 = 45.
// - 45 > 20: True, so "High" is returned.

console.log(result); // Output: "High"

let x = 7; // Binary: 0111
let y = 2; // Binary: 0010
let isEven = x % 2 === 0;

// Nested operations
let result = isEven ? ~x & y : (x | y) ^ ((x << 1) & (y << 2));

// Breaking it down:
// - isEven: x is 7 (odd), so false. Evaluates the else branch.
// - (x | y): Performs bitwise OR => 0111 | 0010 = 0111 (7).
// - x << 1: Left-shifts x => 0111 << 1 = 1110 (14).
// - y << 2: Left-shifts y => 0010 << 2 = 1000 (8).
// - (x << 1) & (y << 2): 1110 & 1000 = 1000 (8).
// - (x | y) ^ ((x << 1) & (y << 2)): 0111 ^ 1000 = 1111 (15).

console.log(result); // Output: 15

let num = 10;
let str = "5";
let flag = true;

// Combining arithmetic, logical, and type coercion
let final = flag && num + +str > 15 ? num * str : num / str;

// Breaking it down:
// - flag && num + +str > 15: flag is true, so evaluate num + +str.
// - +str: Converts "5" to 5 (number).
// - num + +str: 10 + 5 = 15. 15 > 15 is false.
// - Since the condition is false, evaluates num / str => 10 / "5" => 2 (type coercion).

console.log(final); // Output: 2
