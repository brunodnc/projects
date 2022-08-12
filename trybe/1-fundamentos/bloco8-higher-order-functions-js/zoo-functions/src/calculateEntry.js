const data = require('../data/zoo_data');

function calculateQuantity(entrants) {
  let child = 0;
  let adult = 0;
  let senior = 0;
  entrants.forEach((person) => {
    if (person.age < 18) {
      child += 1;
    } else if (person.age >= 50) {
      senior += 1;
    } else {
      adult += 1;
    }
  });
  return { child, adult, senior };
}

function countEntrants(entrants) {
  if (entrants === undefined || Object.entries(entrants).length === 0) {
    return 0;
  }
  return calculateQuantity(entrants);
}

function calculateEntry(entrants) {
  const obj = countEntrants(entrants);
  if (obj === 0) {
    return 0;
  }
  return Number(parseFloat(obj.child * 20.99 + obj.adult * 49.99 + obj.senior * 24.99).toFixed(2));
}

module.exports = { calculateEntry, countEntrants };
