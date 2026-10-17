let a = 5; // Binary: 0101
let b = 3; // Binary: 0011

// Bitwise AND (&)
// Performs AND operation on each bit
console.log(a & b); // 1 (Binary: 0001)

// Bitwise OR (|)
// Performs OR operation on each bit
console.log(a | b); // 7 (Binary: 0111)

// Bitwise XOR (^)
// Performs XOR operation on each bit (1 if bits differ)
console.log(a ^ b); // 6 (Binary: 0110)

// Bitwise NOT (~)
// Inverts all bits of a (Two's complement representation)
console.log(~a); // -6: ~0101 = 1010 (In binary, this is -6)

// Left Shift (<<)
// Shifts bits to the left, fills with 0 from the right
console.log(a << 1); // 10 (Binary: 1010)

// Right Shift (>>)
// Shifts bits to the right, fills with the sign bit from the left
console.log(a >> 1); // 2 (Binary: 0010)
