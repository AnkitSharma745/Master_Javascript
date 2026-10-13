// Loose equality (==) allows type coercion
console.log(0 == false); // true: false is coerced to 0
console.log("" == false); // true: '' is coerced to 0, then compared

// Strict equality (===) prevents type coercion
console.log(0 === false); // false: different types (number and boolean)
console.log("" === false); // false: different types (string and boolean)
