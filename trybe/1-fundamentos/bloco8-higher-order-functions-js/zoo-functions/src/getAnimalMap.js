const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function noParam() {
  const NE = [];
  const NW = [];
  const SE = [];
  const SW = [];
  species.forEach((specie) => {
    if (specie.location === 'NE') {
      NE.push(specie.name);
    }
    if (specie.location === 'NW') {
      NW.push(specie.name);
    }
    if (specie.location === 'SE') {
      SE.push(specie.name);
    } if (specie.location === 'SW') {
      SW.push(specie.name);
    }
  });
  return { NE, NW, SE, SW };
}

function includeNames(options) {
  const obj = noParam();
  const arr = [obj.NE, obj.NW, obj.SE, obj.SW];
  const n = arr.map((item) => item.map((spec) => {
    const accum = species.find((specie) => specie.name === spec)
      .residents
      .reduce((acc, res) => {
        acc.push(res.name);
        return acc;
      }, []);
    if ('sorted' in options && options.sorted === true) {
      accum.sort();
    }
    return { [spec]: accum };
  }));
  return { NE: n[0], NW: n[1], SE: n[2], SW: n[3] };
}

function includeNamesSex(options) {
  const obj = noParam();
  const arr = [obj.NE, obj.NW, obj.SE, obj.SW];
  const n = arr.map((item) => item.map((spec) => {
    const accum = species.find((specie) => specie.name === spec)
      .residents.filter((resident) => resident.sex === options.sex)
      .reduce((acc, res) => {
        acc.push(res.name);
        return acc;
      }, []);
    if (options.sorted && options.sorted === true) {
      accum.sort();
    }
    return { [spec]: accum };
  }));
  return { NE: n[0], NW: n[1], SE: n[2], SW: n[3] };
}

function getAnimalMap(options) {
  if (options === undefined) {
    return noParam();
  }
  if (options.includeNames === true) {
    if (options.sex) {
      return includeNamesSex(options);
    }
    return includeNames(options);
  }
  return noParam();
}

module.exports = getAnimalMap;
