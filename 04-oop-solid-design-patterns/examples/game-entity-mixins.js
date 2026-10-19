// game-entity-mixins.js
// What it shows: building game entities from small abilities instead of one deep class tree.
//   - Class-expression mixins: const Movable = (Base) => class extends Base { ... }
//     Each entity gets ONLY the abilities it needs (the original version gave every entity
//     every ability by copying all mixins onto one shared base prototype).
//   - Composition alternative: an Inventory object that a Player HAS (has-a)
//   - Lazy initialization: the inventory is created the first time it is used
//   - Object pool: enemies are reused instead of created again, and their state is reset
// Related docs: ../02-composition-inheritance-and-mixins.md, ../06-creational-patterns.md
// Run: node game-entity-mixins.js

// ---------- Base class ----------
class Entity {
  constructor(name) {
    this.name = name;
  }
  toString() {
    return this.name;
  }
}

// ---------- Mixins: functions that take a class and return an extended class ----------
const Movable = (Base) =>
  class extends Base {
    position = { x: 0, y: 0 };
    moveBy(dx, dy) {
      this.position = { x: this.position.x + dx, y: this.position.y + dy };
      console.log(`${this.name} moved to (${this.position.x}, ${this.position.y})`);
    }
  };

const HasHealth = (Base) =>
  class extends Base {
    #health = 100;
    maxHealth = 100;
    get health() {
      return this.#health;
    }
    get isAlive() {
      return this.#health > 0;
    }
    setHealth(value) {
      this.#health = Math.max(0, Math.min(value, this.maxHealth));
    }
    takeDamage(amount) {
      if (!this.isAlive) return;
      this.setHealth(this.#health - amount);
      console.log(this.isAlive ? `${this.name} has ${this.#health} health left` : `${this.name} has been defeated!`);
    }
  };

// CanAttack needs a target that can take damage; it checks this at runtime
const CanAttack = (Base) =>
  class extends Base {
    attackPower = 10;
    attack(target) {
      if (typeof target.takeDamage !== 'function') {
        console.log(`${this.name} cannot attack ${target.name}: it has no health`);
        return;
      }
      if (!target.isAlive) {
        console.log(`${target.name} is already defeated`);
        return;
      }
      console.log(`${this.name} attacks ${target.name} for ${this.attackPower} damage`);
      target.takeDamage(this.attackPower);
    }
  };

// ---------- Composition: an inventory the player HAS ----------
class Inventory {
  #items = [];
  constructor(startingItems) {
    console.log('  (loading inventory...)');
    this.#items.push(...startingItems);
  }
  add(item) {
    this.#items.push(item);
  }
  list() {
    return [...this.#items];
  }
}

// ---------- Concrete entities: pick only the abilities each one needs ----------
class Player extends CanAttack(HasHealth(Movable(Entity))) {
  #inventory = null; // lazy: created on first use

  constructor(name) {
    super(name);
    this.attackPower = 15;
  }

  get inventory() {
    if (!this.#inventory) this.#inventory = new Inventory(['Sword', 'Shield']);
    return this.#inventory;
  }
}

class Enemy extends CanAttack(HasHealth(Movable(Entity))) {
  constructor(name) {
    super(name);
    this.reset(name);
  }
  // Used by the pool: put the object back into a clean starting state
  reset(name) {
    this.name = name;
    this.maxHealth = 40;
    this.setHealth(40);
    this.attackPower = 5;
    this.position = { x: 0, y: 0 };
  }
}

class Villager extends Movable(Entity) {} // can move, cannot fight, has no health

class TreasureChest extends Entity {} // cannot move, cannot fight

// ---------- Object pool for enemies ----------
class EnemyPool {
  #free = [];
  created = 0;

  acquire(name) {
    const enemy = this.#free.pop();
    if (enemy) {
      enemy.reset(name); // ALWAYS reset reused objects
      console.log(`pool: reusing an enemy object as ${name}`);
      return enemy;
    }
    this.created += 1;
    console.log(`pool: creating a new enemy ${name}`);
    return new Enemy(name);
  }

  release(enemy) {
    console.log(`pool: releasing ${enemy.name}`);
    this.#free.push(enemy);
  }
}

// ---------- Run the demo ----------
console.log('--- Abilities per entity type ---');
const hero = new Player('Hero');
const villager = new Villager('Villager');
const chest = new TreasureChest('Chest');
for (const entity of [hero, villager, chest]) {
  const abilities = ['moveBy', 'takeDamage', 'attack'].filter((m) => typeof entity[m] === 'function');
  console.log(`${entity}: ${abilities.join(', ') || 'no abilities'}`);
}

console.log('\n--- Lazy inventory (composition) ---');
console.log('Hero created; inventory not loaded yet');
console.log(`Inventory: ${hero.inventory.list().join(', ')}`);
hero.inventory.add('Potion');
console.log(`Inventory: ${hero.inventory.list().join(', ')}`);

console.log('\n--- Battle with pooled enemies ---');
const pool = new EnemyPool();
const goblin = pool.acquire('Goblin');
const orc = pool.acquire('Orc');
hero.moveBy(5, 5);
goblin.moveBy(4, 5);
hero.attack(goblin);
goblin.attack(hero);
hero.attack(goblin);
hero.attack(goblin);
hero.attack(goblin);
hero.attack(chest);

console.log('\n--- Releasing and reusing enemies ---');
pool.release(goblin);
pool.release(orc);
const goblinKing = pool.acquire('Goblin King');
console.log(`${goblinKing.name}: health ${goblinKing.health}, alive ${goblinKing.isAlive}, position (${goblinKing.position.x}, ${goblinKing.position.y})`);
// The pool hands out the most recently released object (the old Orc), fully reset
console.log(`Reused the old Orc object? ${goblinKing === orc}. Enemy objects created in total: ${pool.created}`);

console.log('\n--- instanceof with mixins ---');
console.log(`hero instanceof Player: ${hero instanceof Player}`);
console.log(`hero instanceof Entity: ${hero instanceof Entity}`);
// Each call to a mixin creates a NEW class, so there is no single "Movable" class to check against.
// Check for the ability instead (duck typing):
console.log(`villager can move: ${typeof villager.moveBy === 'function'}`);
