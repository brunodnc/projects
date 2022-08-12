const { employees, species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function allEmployees() {
  return employees.map((emp) => ({
    id: emp.id,
    fullName: `${emp.firstName} ${emp.lastName}`,
    species: emp.responsibleFor.map((resp) => species.find((spec) => spec.id === resp).name),
    locations: emp.responsibleFor.map((resp) => species
      .find((spec) => spec.id === resp).location),
    // .filter((area, i, arr) => arr.indexOf(area) === i),
  }));
}

function getEmployeesCoverage(obj) {
  const emp = allEmployees();
  if (obj === undefined) {
    return emp;
  } if (emp.some((em) => em.id === obj.id)) {
    return emp.find((emplo) => emplo.id === obj.id);
  } if (emp.some((employee) => employee.fullName.includes(obj.name))) {
    return emp.find((emplo) => emplo.fullName.includes(obj.name));
  }
  throw new Error('Informações inválidas');
}

console.log(getEmployeesCoverage({ name: 'Sharonda' }));

module.exports = getEmployeesCoverage;
