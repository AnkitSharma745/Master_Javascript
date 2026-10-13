let a = 5; // Binary: 0101
let b = 3; // Binary: 0011

// Combining arithmetic, bitwise, and assignment
let result = ((a & b) << 1) + (a ^ b);

// Breaking it down:
// - a & b: Performs bitwise AND => 0101 & 0011 = 0001 (1 in decimal).
// - << 1: Left-shifts the result => 0001 << 1 = 0010 (2 in decimal).
// - a ^ b: Performs bitwise XOR => 0101 ^ 0011 = 0110 (6 in decimal).
// - Adds the results: 2 + 6 = 8.

console.log(result); // Output: 8
