const data = require('../data/zoo_data');
const { species } = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  const res = [];
  if (ids.length > 0) {
    ids.forEach(((id) => res.push(species.find((specie) => specie.id === id))));
    console.log([...ids]);
    console.log(res);
    return res;
  }
  return res;
}

module.exports = getSpeciesByIds;
