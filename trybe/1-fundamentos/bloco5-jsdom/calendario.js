function createDaysOfTheWeek() {
  const weekDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  const weekDaysList = document.querySelector(".week-days");

  for (let index = 0; index < weekDays.length; index += 1) {
    const days = weekDays[index];
    const dayListItem = document.createElement("li");
    dayListItem.innerHTML = days;

    weekDaysList.appendChild(dayListItem);
  }
}

createDaysOfTheWeek();

const decDaysList = [
  29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];

//   função que adiciona os dias do mês, e ainda separa os feriados e as sextas feiras
function MonthDays() {
  for (let day of decDaysList) {
    let liitem = document.createElement("li");
    liitem.innerText = day;
    liitem.classList.add("day");
    if (day === 24 || day === 25 || day === 31) {
      liitem.classList.add("holiday");
    } else if (day === 4 || day === 11 || day === 18 || day === 25) {
      liitem.classList.add("friday");
    }
    document.getElementById("days").appendChild(liitem);
  }
}

MonthDays();

function inputToButton(string) {
  let inputToButton = document.createElement("button");
  inputToButton.innerText = string;
  inputToButton.classList.add("btn-holiday");
  document.querySelector(".buttons-container").appendChild(inputToButton);
}

inputToButton("Feriados");
let on = false;

function bgcchange(event) {
  arrholi = document.querySelectorAll(".holiday");
  if (on === false) {
    for (let day of arrholi) {
      day.style.backgroundColor = "cyan";
    }
    on = true;
  } else if (on === true) {
    for (let day of arrholi) {
      day.style.backgroundColor = "rgb(238,238,238)";
    }
    on = false;
  }
}

document
  .getElementsByClassName("btn-holiday")[0]
  .addEventListener("click", bgcchange);

  function inputToButton2(string) {
    let inputToButton2 = document.createElement("button");
    inputToButton2.innerText = string;
    inputToButton2.classList.add("btn-friday");
    document.querySelector(".buttons-container").appendChild(inputToButton2);
  }

inputToButton2("Sexta-feira");

let on2 = false;
function bgcchange2(event) {
    let arrfri = document.querySelectorAll(".friday");
    if (on2 === false) {
      for (let day2 of arrfri) {
        day2.style.backgroundColor = "red";
      }
      on2 = true;
    } else if (on2 === true) {
      for (let day2 of arrfri) {
        day2.style.backgroundColor = "rgb(238,238,238)";
      }
      on2 = false;
    }
  }

document
  .getElementsByClassName("btn-friday")[0]
  .addEventListener("click", bgcchange2);
