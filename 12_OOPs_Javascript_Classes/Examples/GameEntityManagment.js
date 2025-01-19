// Mixin for shared functionality
const MovableMixin = {
  move(x, y) {
    this.position.x += x;
    this.position.y += y;
    console.log(
      `${this.name} moved to (${this.position.x}, ${this.position.y})`
    );
  },
};

const AttackableMixin = {
  attack(target) {
    if (!target.isAlive) {
      console.log(`${target.name} is already defeated!`);
      return;
    }
    console.log(
      `${this.name} attacks ${target.name} for ${this.attackPower} damage!`
    );
    target.takeDamage(this.attackPower);
  },
};

const HealthMixin = {
  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.isAlive = false;
      console.log(`${this.name} has been defeated!`);
    } else {
      console.log(`${this.name}'s health is now ${this.health}`);
    }
  },
};

// Entity class (base class for all game entities)
class Entity {
  constructor(name) {
    this.name = name;
    this.position = { x: 0, y: 0 };
  }
}

// Apply mixins to the prototype of Entity
Object.assign(Entity.prototype, MovableMixin, AttackableMixin, HealthMixin);

// Lazy Loading: Only load inventory when accessed
class Player extends Entity {
  constructor(name) {
    super(name);
    this.health = 100;
    this.attackPower = 10;
    this.isAlive = true;

    let _inventory = null; // Private variable for lazy-loaded inventory
    this.getInventory = () => {
      if (!_inventory) {
        console.log("Loading inventory...");
        _inventory = ["Sword", "Shield", "Potion"];
      }
      return _inventory;
    };
  }
}

// Object Pooling for Enemies
class Enemy extends Entity {
  constructor(name) {
    super(name);
    this.health = 50;
    this.attackPower = 5;
    this.isAlive = true;
  }
}

// Enemy Pool
class EnemyPool {
  constructor() {
    this.pool = [];
  }

  getEnemy(name) {
    if (this.pool.length > 0) {
      const enemy = this.pool.pop();
      console.log(`Reusing enemy: ${enemy.name}`);
      enemy.name = name;
      enemy.health = 50;
      enemy.isAlive = true;
      return enemy;
    } else {
      console.log(`Creating new enemy: ${name}`);
      return new Enemy(name);
    }
  }

  releaseEnemy(enemy) {
    console.log(`Releasing enemy: ${enemy.name}`);
    this.pool.push(enemy);
  }
}

// Memory Optimization: Using WeakMap for private data
const privateData = new WeakMap();

class GameSession {
  constructor(playerName) {
    const player = new Player(playerName);
    privateData.set(this, { player, enemies: [] }); // Store private player and enemy list
  }

  getPlayer() {
    return privateData.get(this).player;
  }

  addEnemy(enemy) {
    privateData.get(this).enemies.push(enemy);
  }

  getEnemies() {
    return privateData.get(this).enemies;
  }
}

// Using all the concepts together
const session = new GameSession("Hero");
const player = session.getPlayer();

// Lazy loading: Inventory loaded only when accessed
console.log(player.getInventory()); // Loading inventory...
console.log(player.getInventory()); // Already loaded

// Object Pooling for enemies
const enemyPool = new EnemyPool();
const goblin = enemyPool.getEnemy("Goblin");
const orc = enemyPool.getEnemy("Orc");

// Interactions
player.move(5, 5);
goblin.move(3, 2);
orc.move(1, 1);

player.attack(goblin);
goblin.attack(player);

player.attack(goblin); // Defeating the goblin
player.attack(goblin); // Goblin already defeated

// Releasing enemies back to the pool
enemyPool.releaseEnemy(goblin);
enemyPool.releaseEnemy(orc);

// Reusing enemies from the pool
const reusedGoblin = enemyPool.getEnemy("Goblin King");
console.log(reusedGoblin.name); // Goblin King
