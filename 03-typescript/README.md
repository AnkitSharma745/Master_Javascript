# 03 — TypeScript

TypeScript adds a type system on top of JavaScript. This section explains the type system from basic annotations to generics, conditional types and utility types. It also covers the most important practical lesson: **types exist only at compile time**. Data that comes from outside your program, like API responses or user input, must still be checked at runtime.

Examples target **TypeScript 5.x** and are type-checked with the TypeScript compiler.

**Before this:** [02 — JavaScript](../02-javascript/README.md), especially functions, objects, classes and modules.

## Study order

| # | Topic | What you will learn |
| --- | --- | --- |
| 1 | [Basics and types](01-typescript-basics-and-types.md) | Why TypeScript, type erasure, inference, `any` vs `unknown` vs `never`, enums, `as const`, `satisfies` |
| 2 | [Interfaces and type aliases](02-interfaces-and-type-aliases.md) | Object types, interface vs type, structural typing, excess property checks |
| 3 | [Unions, narrowing and type guards](03-unions-narrowing-and-type-guards.md) | Narrowing, type predicates, discriminated unions, exhaustive checks |
| 4 | [Functions and classes](04-functions-and-classes.md) | Function types, overloads, access modifiers, abstract classes |
| 5 | [Generics](05-generics.md) | Generic functions and classes, constraints, defaults, real API examples |
| 6 | [keyof, typeof, indexed and mapped types](06-keyof-typeof-indexed-and-mapped-types.md) | Type operators, mapped types, key remapping, template literal types |
| 7 | [Conditional types and infer](07-conditional-types-and-infer.md) | Conditional and distributive types, `infer`, recursive types |
| 8 | [Utility types](08-utility-types.md) | Every built-in utility type, how to build them yourself |
| 9 | [Modules, declaration files and tsconfig](09-modules-declaration-files-and-tsconfig.md) | Module settings, `.d.ts` files, module augmentation, every important compiler flag |
| 10 | [Decorators](10-decorators.md) | Legacy vs standard decorators, how Angular and NestJS use them |
| 11 | [Runtime validation and type-safe APIs](11-runtime-validation-and-type-safe-apis.md) | Validating unknown data, Zod, shared contracts, branded types |
| 12 | [TypeScript in real projects](12-typescript-in-real-projects.md) | TypeScript with Angular, Node.js and React, migration from JS, best practices |

**Interview practice:** every topic ends with its own interview questions. For mixed questions across the whole subject, see [interview-questions.md](interview-questions.md).

**Next subject:** [04 — OOP, SOLID and Design Patterns](../04-oop-solid-design-patterns/README.md)
