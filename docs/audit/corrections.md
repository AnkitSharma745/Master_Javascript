# Applied archive corrections

Known defects corrected during migration. Entries describe targeted edits, not full validation of every archived fence. TypeScript setup commands were normalized to npx tsc --init. Old mismatched TOCs were removed; canonical indexes supply navigation. Browser external services remain supplementary.

| File | Original issue | Applied correction |
| --- | --- | --- |
| 02_JavaScript Variable and Data types/01_Variable.md | 4. **Implicit (without a keyword)** | Assignment without a declaration is a separate legacy hazard, not a declaration form. |
| 02_JavaScript Variable and Data types/01_Variable.md | **No Hoisting Before Initialization:** Cannot be accessed before declaration due to the **Tempo | **Uninitialized lexical binding:** The binding exists but cannot be read before initialization due to the **Temporal Dea |
| 02_JavaScript Variable and Data types/01_Variable.md | Variables can be declared without any keyword, which automatically makes them **global variable | This is assignment to an unresolved name, not a declaration. In sloppy classic-script code it can create a global proper |
| 02_JavaScript Variable and Data types/01_Variable.md | Hoisting is a JavaScript mechanism where variable and function declarations are moved to the to | Hoisting describes declaration processing before statement execution. Source lines are not physically moved. var binding |
| 02_JavaScript Variable and Data types/Question&Answer.md | Objects are passed by reference, so both variables point to the same object. | Assignment and argument passing copy values. An object-valued reference is copied, so both bindings refer to the same ob |
| 02_JavaScript Variable and Data types/02_Data_Type_in_JavaScript.md | They are directly stored in memory, and accessing them retrieves their actual value. | They are values with language-defined behavior; the specification does not mandate a stack/heap storage layout for every |
| 02_JavaScript Variable and Data types/02_Data_Type_in_JavaScript.md | 9007199254740993n | 9007199254740992n |
| 02_JavaScript Variable and Data types/02_Data_Type_in_JavaScript.md | 18014398509481986n | 18014398509481984n |
| 02_JavaScript Variable and Data types/02_Data_Type_in_JavaScript.md |     if (/* User data not found */) {         return null;     } else {         return userData; |     return null; // Explicit no-data result for this small example. |
| 02_JavaScript Variable and Data types/03_Type_Conversion.md | Empty objects or arrays convert to `NaN`. | Empty objects convert to `NaN`; empty arrays convert to `0`. |
| 02_JavaScript Variable and Data types/03_Type_Conversion.md | [object object] | [object Object] |
| 06_Javascript_Arrays/01_JavascriptArray.md | An array is a collection of items stored at contiguous memory locations. In JavaScript, an arra | A JavaScript array is an object with special index and length semantics and may hold different value types. Contiguous s |
| 06_Javascript_Arrays/01_JavascriptArray.md | A sparse array has gaps between indices, meaning some indices are undefined. | A sparse array has absent index properties (holes). Ordinary reads of holes yield undefined, but an explicit undefined e |
| 05_Functions/01_JavaScript_Functions.md | Unlike declarations, these are not hoisted. | The function value is created when the expression executes. Its variable binding follows var/let/const initialization ru |
| 05_Functions/02_JavaScript_Functions_Examples.md | const cache = {}; | const cache = new Map(); |
| 05_Functions/02_JavaScript_Functions_Examples.md | if (cache[key]) return cache[key]; | if (cache.has(key)) return cache.get(key); |
| 05_Functions/02_JavaScript_Functions_Examples.md | cache[key] = result; | cache.set(key, result); |
| 05_Functions/02_JavaScript_Functions_Examples.md | ## Example 10: Dynamic Function Creation | This toy cache assumes serializable primitive arguments and pure results; it is unbounded. Use the canonical bounded cac |
| 07_Javascript_Objects/01_Javascript_Objects.md | Symbol properties are not enumerable and don’t appear in `Object.keys()` or `for...in` loops. | Symbol properties can be enumerable, but Object.keys and for...in select string keys. Reflect.ownKeys includes own symbo |
| 07_Javascript_Objects/02_Object_Methods.md | Compares two values for strict equality. | Uses SameValue comparison: unlike ===, NaN equals itself and signed zeros differ. |
| 12_OOPs_Javascript_Classes/01_Basic_Classes_and_OOP_Concepts.md | An **object** is an instance of a class. | Objects need not be created from class syntax. Here, each object created with new Car is a class instance. |
| 12_OOPs_Javascript_Classes/Examples/BasicOOPS.js | // Encapsulation with a private property | // Naming convention only: this property is public |
| 12_OOPs_Javascript_Classes/04_Advanced_OOP_Patterns_and_Polymorphism.md | ## 7. The Liskov Substitution Principle (LSP) | ## 7. The Liskov Substitution Principle (LSP)  The following Bird/Penguin example is a **counterexample** if fly promise |
| 12_OOPs_Javascript_Classes/05_Mixins_and_Memory_Management.md | console.log(largeData[0]);       largeData = null; // Free memory | console.log(largeData?.[0] ?? "Released");       largeData = null; // Release this reference; collection timing is not g |
| 12_OOPs_Javascript_Classes/05_Mixins_and_Memory_Management.md | user = null; // Automatically garbage collected | user = null; // May become eligible when no other strong references remain |
| 12_OOPs_Javascript_Classes/Examples/GameEntityManagment.js | player.attack(goblin); // Defeating the goblin | player.attack(goblin); // Goblin health becomes 30 |
| 12_OOPs_Javascript_Classes/Examples/GameEntityManagment.js | player.attack(goblin); // Goblin already defeated | player.attack(goblin); // Goblin health becomes 20; still alive |
| 12_OOPs_Javascript_Classes/Examples/GameEntityManagment.js | enemy.health = 50; | enemy.health = 50;       enemy.position = { x: 0, y: 0 };       enemy.attackPower = 5; |
| 12_OOPs_Javascript_Classes/Examples/E-Commerce.js | // --- Abstract Factory for Product Creation --- | // --- Simple Factory for Product Creation (not a family-level abstract factory) --- |
| 12_OOPs_Javascript_Classes/Examples/E-Commerce.js | this.total *= 1 - discountRate; | this.total = this.products.reduce((sum, product) => sum + product.price, 0) * (1 - discountRate); |
| 14_Typescript/02_Typescript_Basic_Types.md | By default, `strictNullChecks` in `tsconfig.json` ensures strict handling of `null` and `undefi | Enable strictNullChecks explicitly or through strict. It is not an unconditional compiler default. |
| 14_Typescript/05_Interface.md | Unlike type aliases, interfaces can be extended and implemented by classes. | Interfaces support declaration merging and object extension. Classes can also implement suitable object-shaped type alia |
| 14_Typescript/05_Interface.md | / Implements (Class) / ✅                          / ❌                 / | / Implements (Class) / Yes                         / Yes for object shapes / |
| 14_Typescript/05_Interface.md | / Function Types     / ❌ (must define separately) / ✅                 / | / Function Types     / Yes, call signatures        / Yes                / |
| 14_Typescript/03_Advanced_Types.md | / Can be extended            / No         / Yes (via `extends`) / | / Can compose object types   / Yes, intersections / Yes, extends / |
| 14_Typescript/07_Generics_in_Typescript.md | console.log(createPair()); // Output: ["", 0] | // createPair(); // Compile error: type defaults do not supply runtime arguments. |
| 14_Typescript/11_Asynchronous_Programming.md | The `fetch` API allows making network requests, and TypeScript ensures strong type checking. | This original example annotates the expected shape but does NOT validate response bytes. Treat it as an unsafe-boundary  |
| 14_Typescript/11_Asynchronous_Programming.md | `Promise.all` runs multiple asynchronous operations in parallel and waits for all of them to re | Promise.all aggregates input outcomes; the calls creating those inputs start work. It permits overlap but does not guara |
| 14_Typescript/11_Asynchronous_Programming.md | - **Prefer `axios` over `fetch` for better error handling.** | - Choose fetch or a library from actual transport needs; neither a generic nor an annotation validates external data. |
| 03_Expression_And_Operator/complex_exmples/problem1.js | Repeated lexical declarations in one scope | Each standalone expression scenario now has its own block |
| 04_Control_Flow/Examples/condition_based_example/profile.js | Undefined inputs; equality case omitted | Define dimensions and include equality |
| 04_Control_Flow/01_Conditional_Statement.md | Incorrect structural switch example | Use property checks; separate proposals from shipped syntax |
| 12_OOPs_Javascript_Classes/Examples/04_MultiUserBankingSystem.js | if (amount <= 0) | if (!Number.isFinite(amount) // amount <= 0) |
| 12_OOPs_Javascript_Classes/Examples/04_MultiUserBankingSystem.js | if (amount > this._balance) throw new Error("Insufficient funds."); | if (!Number.isFinite(amount) // amount <= 0) throw new Error("Invalid withdrawal.");     if (this._balance - amount < th |
| 12_OOPs_Javascript_Classes/Examples/04_MultiUserBankingSystem.js |   _recordTransaction(detail) { |   _minimumBalance() { return 0; }    _recordTransaction(detail) { |
| 12_OOPs_Javascript_Classes/Examples/04_MultiUserBankingSystem.js |   withdraw(amount) {     if (amount > this._balance + this.overdraftLimit) |   _minimumBalance() { return -this.overdraftLimit; }    withdraw(amount) {     if (amount > this._balance + this.overdra |
| 12_OOPs_Javascript_Classes/Examples/04_MultiUserBankingSystem.js |     this.deposit(interest); |     if (interest > 0) this.deposit(interest); |
| 12_OOPs_Javascript_Classes/Examples/05_BankingSystem2.js | Exact duplicate | Forwarding entry point; no unique code removed |
| 09_DOM_Manipulation/DOM_Examples/contentEditable.html | editableElement.innerHTML | editableElement.textContent |
| 10_Asynchronous_Javascript/Examples/multiApiFetch.html | Untrusted API strings interpolated as markup | Construct nodes and insert textContent |
| 10_Asynchronous_Javascript/Examples/chatApp.html | socket.readyState === WebSocket.OPEN | socket?.readyState === WebSocket.OPEN |
