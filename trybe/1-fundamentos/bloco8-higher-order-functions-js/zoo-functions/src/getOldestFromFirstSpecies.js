const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');
const { species } = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const employee = employees.find((emp) => emp.id === id);
  const animID = employee.responsibleFor[0];
  const anim = species.find((specie) => specie.id === animID);
  const animAge = anim.residents.reduce((acc, animal) => {
    if (animal.age > acc) {
      return animal.age;
    }
    return acc;
  }, 0);
  const animalFinal = anim.residents.find((animal) => animal.age === animAge);
  return [animalFinal.name, animalFinal.sex, animalFinal.age];
}

module.exports = getOldestFromFirstSpecies;
