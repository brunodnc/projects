const { hours, species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function generateSchedule() {
  const hoursArr = Object.entries(hours);
  const schedule = hoursArr.map((hour) => [
    hour[0], {
      officeHour: `Open from ${hour[1].open}am until ${hour[1].close}pm`,
      exhibition: species.filter((specie) => specie.availability.includes(hour[0]))
        .map((specie) => specie.name),
    }]);
  schedule[schedule.length - 1][1].officeHour = 'CLOSED';
  schedule[schedule.length - 1][1].exhibition = 'The zoo will be closed!';
  return Object.fromEntries(schedule);
}

function getSchedule(scheduleTarget) {
  const obj = generateSchedule();
  if (scheduleTarget === undefined) {
    return obj;
  }
  if (scheduleTarget in obj) {
    console.log({ scheduleTarget: obj[scheduleTarget] });
    return { [scheduleTarget]: obj[scheduleTarget] };
  }
  if (species.some((specie) => specie.name === scheduleTarget)) {
    return species.find((specie) => specie.name === scheduleTarget).availability;
  }
  return obj;
}

module.exports = getSchedule;
