const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function isManager(id) {
  const employee = employees.find((emp) => emp.id === id);
  if (employee.id === '9e7d4524-363c-416a-8759-8aa7e50c0992'
   || employee.id === 'fdb2543b-5662-46a7-badc-93d960fdc0a8'
   || employee.id === '0e7b460e-acf4-4e17-bcb3-ee472265db83') {
    return true;
  } return false;
}

function getRelatedEmployees(managerId) {
  if (isManager(managerId)) {
    return employees.filter((emp) => managerId === emp.managers
     || emp.managers.includes(managerId))
      .map((emp) => `${emp.firstName} ${emp.lastName}`);
  }
  throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
}
module.exports = { isManager, getRelatedEmployees };
