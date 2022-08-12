let turn = 0;
const mage = {
  healthPoints: 130,
  intelligence: 45,
  mana: 125,
  damage: undefined,
};

const warrior = {
  healthPoints: 200,
  strength: 30,
  weaponDmg: 2,
  damage: undefined,
};

const dragon = {
  healthPoints: 350,
  strength: 50,
  damage: undefined,
};

const battleMembers = { mage, warrior, dragon };

const dragonAtt = () =>
  Math.max(15, Math.floor(Math.random() * dragon.strength));
const warriorAtt = () =>
  Math.max(
    warrior.strength,
    Math.floor(Math.random() * (warrior.strength * warrior.weaponDmg))
  );
function mageAtt() {
  mage.damage = Math.max(
    mage.intelligence,
    Math.floor(Math.random() * (mage.intelligence * 2))
  );
  if (mage.mana < 15) {
    console.log("Not enough mana");
  } else {
    mage.mana -= 15;
  }
}

const gameActions = {
  warriorTurn: () => {
    warrior.damage = warriorAtt();
    dragon.healthPoints -= warrior.damage;
  },

  mageTurn: () => {
    mageAtt();
    if (mage.mana >= 15) {
      dragon.healthPoints -= mage.damage;
    }
  },

  dragonTurn: () => {
    dragon.damage = dragonAtt();
    mage.healthPoints -= dragon.damage;
    warrior.healthPoints -= dragon.damage;
  },

  battleStatus: () => {
    if (warrior.healthPoints < 0) {
      console.log("Warrior is dead");
      delete battleMembers["warrior"];
    }
    if (mage.healthPoints < 0) {
      console.log("Mage is dead");
      delete battleMembers["mage"];
    }
    if (dragon.healthPoints < 0) {
      console.log("Dragon is dead");
      delete battleMembers["dragon"];
    }
    turn += 1;
    console.log(`Turno ${turn}`);
    console.log(battleMembers);
    return battleMembers;
  },
};

const gameTurn = () => {
  if ("warrior" in battleMembers) {
    gameActions.warriorTurn();
  }
  if ("mage" in battleMembers) {
    gameActions.mageTurn();
  }
  if ("dragon" in battleMembers) {
    gameActions.dragonTurn();
  }
  gameActions.battleStatus();
};

function startGame() {
  while (
    ("dragon" in battleMembers &&
      ("warrior" in battleMembers || "mage" in battleMembers)) &&
    turn < 100
  ) {
    gameTurn();
  }
}

startGame();
