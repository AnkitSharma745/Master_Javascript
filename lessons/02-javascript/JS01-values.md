# JS01 — Values, identity, coercion, and equality

## Learning objective

Predict conversions and distinguish mutation from rebinding. JavaScript examples assume the root Node runtime unless labeled browser-only.

## Prerequisites

[F01](../../lessons/01-foundations/F01-programs.md)

## Explanation and mechanism

JavaScript values have types; a variable can be rebound to a value of another type. Primitive types are undefined, null, boolean, number, bigint, string, and symbol. Objects include arrays and functions. typeof is a useful operator, not a complete validator: typeof null is "object", typeof NaN is "number", and arrays need Array.isArray.

Assignment copies a value. When the value refers to an object, the copied value refers to the same object. Function arguments work this way too: mutation can be observed by the caller, while rebinding the parameter cannot rebind the caller's variable. Do not call this pass-by-reference.

Think of an object reference as a copied address card. Two cards can locate the same house; replacing one card does not move or rename the other. This describes identity, not the engine's actual memory representation.

## Examples and execution trace

<!-- runnable:node -->
```javascript
const original = { count: 1 };
function change(value) {
  value.count += 1;
  value = { count: 99 };
}
change(original);
console.log(original.count); // expect: 2
console.log(original === { count: 2 }); // expect: false
console.log(Number([]), Number(""), Number(undefined)); // expect: 0 0 NaN
console.log(Boolean("false"), Boolean([])); // expect: true true
console.log(0 || 10, 0 ?? 10); // expect: 10 0
```

First, original binds to an object. change receives the same object-valued reference. The property changes to 2. A new object is assigned only to the local parameter. Object equality compares identity, not matching property contents.

Coercion is conversion required by an operation. With primitives, + can concatenate when either resulting operand is a string; numeric operators such as subtraction require numeric conversion. Objects can run conversion hooks, so conversion can have side effects. Logical && and || return an operand, not necessarily a Boolean. Nullish ?? replaces only null or undefined.

## Equality and edge cases

| Operation | NaN with itself | +0 versus -0 | Different object identities |
| --- | --- | --- | --- |
| === | false | true | false |
| Object.is | true | false | false |
| SameValueZero (Map/Set, includes) | true | true | false |

Loose equality is a specified algorithm, not “convert everything to a number.” null == undefined is true, but null == 0 is false. Prefer explicit conversion and strict equality for domain logic. Use Number.isNaN to test NaN without coercion.

## Alternatives and common mistakes

const protects the binding, not nested properties. Spread makes a shallow copy; it does not isolate a nested address object. JSON round-tripping is a serialization technique with limits, including dates, undefined, BigInt, cycles, and prototypes. structuredClone supports many structured values and cycles, but not functions or arbitrary class semantics. Choose copying based on the data contract.

## Interview preparation

“JavaScript passes values. Copying an object-valued reference shares object identity, so mutation is visible across aliases; local reassignment is not. Equality and conversion depend on the operation.” Follow-up: why is an empty array truthy but Number([]) zero? These are different conversion operations.

## Practice

Predict the output for null == 0, [] == false, NaN === NaN, and Object.is(-0, 0); explain rules rather than memorizing results. Write a mutation/rebinding counterexample. Repair a default limit that uses || and accidentally replaces zero.

## Revision

Binding ≠ object; copy ≠ deep copy; truthiness ≠ numeric conversion; equality ≠ structural comparison.

## Completion criteria

Trace aliases on paper, correctly predict six unseen comparisons, and demonstrate a shallow-copy failure with a corrected targeted immutable update.

[Practice hints and solutions](../../practice/solutions.md#js01) · [Question Q04](../../interviews/answers.md#q04)

## References

[Primary sources and verification notes](../../references/README.md#ecma); verified 2026-10-13.

