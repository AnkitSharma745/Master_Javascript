let a = 10;
let b = "10";

// Loose equality (==)
// Compares values, allowing type coercion (converts b to a number)
console.log(a == b); // true

// Strict equality (===)
// Compares both value and type, no type coercion
console.log(a === b); // false

// Loose inequality (!=)
// Compares values, allowing type coercion
console.log(a != b); // false

// Strict inequality (!==)
// Compares both value and type, no type coercion
console.log(a !== b); // true
