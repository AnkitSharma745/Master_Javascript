# OOP and design pattern examples

Small, runnable Node.js programs that put the ideas from this folder's documents together. Each file starts with a comment that explains what it shows and which documents it relates to. They need only Node.js (version 22 or newer); there is nothing to install.

| File | What it shows | Related documents | How to run |
| --- | --- | --- | --- |
| [basic-oop.js](basic-oop.js) | The four OOP pillars: `#private` fields and a validating setter, an abstract base class, `extends` and `super`, polymorphism in one loop, a static method | [OOP four pillars](../01-oop-four-pillars.md) | `node basic-oop.js` |
| [ecommerce-cart.js](ecommerce-cart.js) | A shopping cart with a product factory (registry), discount strategies, cart events (Observer with `EventEmitter`), a logging decorator around a payment gateway, and dependency injection. Money in cents | [Creational](../06-creational-patterns.md), [structural](../07-structural-patterns.md) and [behavioral](../08-behavioral-patterns.md) patterns | `node ecommerce-cart.js` |
| [game-entity-mixins.js](game-entity-mixins.js) | Game entities built from class-expression mixins (`Movable`, `HasHealth`, `CanAttack`) so each type gets only the abilities it needs, a composed `Inventory` with lazy loading, and an enemy object pool | [Composition, inheritance and mixins](../02-composition-inheritance-and-mixins.md), [creational patterns](../06-creational-patterns.md#object-pool-and-lazy-initialization) | `node game-entity-mixins.js` |
| [banking-system.js](banking-system.js) | A multi-user bank: encapsulated balances with enforced rules, abstract account plus savings and current (overdraft) subclasses, an account factory, an injected logger and fake clock, and a transfer that refunds on failure | [OOP four pillars](../01-oop-four-pillars.md), [dependency inversion and injection](../05-dependency-inversion-and-injection.md) | `node banking-system.js` |

Run them from this folder, for example:

```bash
cd 04-oop-solid-design-patterns/examples
node banking-system.js
```
