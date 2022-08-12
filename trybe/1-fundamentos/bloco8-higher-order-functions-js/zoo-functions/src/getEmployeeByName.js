const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  return employeeName === undefined ? {}
    : employees.find((emp) => emp.firstName === employeeName || emp.lastName === employeeName);
}

module.exports = getEmployeeByName;
