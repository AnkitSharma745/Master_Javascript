let isAdmin = false;
let isLoggedIn = true;
let userName = "John";

// Short-circuit evaluation with logical AND and OR
let greeting =
  isAdmin && isLoggedIn
    ? `Welcome Admin, ${userName}`
    : isLoggedIn || isAdmin
    ? `Welcome back, ${userName}`
    : "Please log in.";

console.log(greeting);
// Output: "Welcome back, John"
// Explanation:
// - isAdmin && isLoggedIn: false (isAdmin is false).
// - isLoggedIn || isAdmin: true (isLoggedIn is true).
// - Returns `Welcome back, John`.
