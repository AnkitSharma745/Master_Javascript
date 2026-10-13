# JS03 — this, call, apply, bind, and classes

## Learning objective

Derive this from a call site and repair detached methods. JavaScript examples assume the root Node runtime unless labeled browser-only.

## Prerequisites

[JS02](../../lessons/02-javascript/JS02-scope.md)

## Explanation and mechanism

For ordinary functions, this depends primarily on how the function is called. A method call obj.fn() uses obj as the receiver. A detached strict function call has undefined this. call and apply specify a receiver; bind creates a function with bound receiver and leading arguments. A constructor call with new has construction behavior.

An arrow function captures this from its surrounding lexical context. It has no own this or arguments and cannot be used as a constructor. The word “method” does not permanently attach a receiver to a function value.

Think of this as the recipient named on a call invitation. The analogy fails for arrows and bound functions because their receiver is already determined.

## Examples and execution trace

<!-- runnable:node -->
```javascript
"use strict";
const user = {
  name: "Ankit",
  greet(prefix) { return prefix + " " + this.name; }
};
const detached = user.greet;
console.log(user.greet("Hi")); // expect: Hi Ankit
console.log(detached.call({ name: "Ada" }, "Hi")); // expect: Hi Ada
console.log(detached.apply(user, ["Hello"])); // expect: Hello Ankit
const fixed = detached.bind(user, "Welcome");
console.log(fixed.call({ name: "Other" })); // expect: Welcome Ankit
try { detached("Hi"); }
catch (error) { console.log(error.name); } // expect: TypeError
```

The function object is the same after detachment. What changed is the call syntax. bind does not call the function immediately. Calling a bound function with call cannot replace its bound receiver; construction with new is a separate case and ignores the bound receiver.

## Classes and prototypes

```javascript
class Counter {
  #count = 0;
  increment() { return ++this.#count; }
  callback = () => this.increment();
}
```

increment is a prototype method shared by instances; callback is an instance field holding a new arrow function for each instance. This makes callback convenient for event registration but adds a per-instance allocation. Class bodies use strict semantics, and private fields enforce a runtime access boundary. A private-field method cannot simply be borrowed onto an unrelated object that lacks the private brand.

Classes use JavaScript prototypes with additional semantics: constructors require new, declarations have TDZ behavior, methods are non-enumerable, and private fields are not ordinary string keys. Saying “just syntax sugar” can hide these distinctions.

## Alternatives and common mistakes

An arrow as an object-literal method captures outer this instead of the object; use an ordinary method when receiver behavior is required. Do not bind anew in removeEventListener: it creates a different callback reference. Keep a stored bound function or use a listener AbortSignal.

In Angular, template event handling calls component methods through the framework; passing a component method to an external callback is a separate situation. In Node, EventEmitter and timer callbacks have host-defined invocation details; do not project browser behavior onto every API.

## Interview preparation

“I inspect the call site for ordinary functions and the defining scope for arrows. bind fixes a receiver for ordinary calls, while call/apply specify one immediately. Detaching a method changes the call, not the function.” Follow-up: compare a prototype method and arrow field in memory and testability.

## Practice

Repair a detached class callback in two ways and compare allocation/cleanup. Predict a bound function called with call. Show why an arrow on an object literal does not acquire that object's receiver.

## Revision

Ordinary function: call site. Arrow: lexical this. Bound function: stored receiver. Class method: strict, shared on prototype.

## Completion criteria

Explain five unseen call forms and fix a listener without leaking callback registrations.

[Practice hints and solutions](../../practice/solutions.md#js03) · [Question Q06](../../interviews/answers.md#q06)

## References

[Primary sources and verification notes](../../references/README.md#ecma); verified 2026-10-13.

