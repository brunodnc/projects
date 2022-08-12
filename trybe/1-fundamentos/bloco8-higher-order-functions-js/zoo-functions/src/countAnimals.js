const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function emptyCase() {
  let names = '';
  let quant = 0;
  let objarr = [];
  const final = [];
  species.forEach((specie) => {
    names = specie.name;
    quant = specie.residents.length;
    objarr = [names, quant];
    final.push(objarr);
  });
  return Object.fromEntries(final);
}

function genderFind(values) {
  let count = 0;
  species.find((specie) => (specie.name === values[0])).residents.forEach((res) => {
    if (res.sex === values[1]) {
      count += 1;
    }
  });
  return count;
}

function countAnimals(animal) {
  if (typeof animal === 'object') {
    const keys = Object.keys(animal);
    const values = Object.values(animal);
    if (keys.length > 1) {
      return genderFind(values);
    }
    return species.find((specie) => specie.name === values[0]).residents.length;
  }
  return emptyCase();
}

module.exports = countAnimals;
