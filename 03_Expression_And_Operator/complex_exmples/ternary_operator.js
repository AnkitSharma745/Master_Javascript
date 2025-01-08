let userAge = 25;
let hasPermission = true;

// Complex condition with logical AND, OR, and ternary operators
let canAccess =
  userAge >= 18 && hasPermission
    ? userAge < 30
      ? "Access granted: Young User"
      : "Access granted: Adult User"
    : "Access denied";

console.log(canAccess);
// Output: "Access granted: Young User"
// Explanation:
// - First condition checks if userAge >= 18 and hasPermission (true && true).
// - Since true, it evaluates the nested ternary: userAge < 30 ? "Young User" : "Adult User".
// - As userAge < 30, it returns "Access granted: Young User".
