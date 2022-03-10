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
    if (day === 25) {
        liitem.classList.add("holiday");
        liitem.classList.add("friday");
    } else if (day === 24 || day === 25 || day === 31) {
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
  if (on2 === true) {
      bgcchange2();
  }
}
// evento pra destacar os feriados do mẽs
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

    if (on === true) {
        bgcchange();
    }
  }
// evento pra destacar as sextas do mês
document
  .getElementsByClassName("btn-friday")[0]
  .addEventListener("click", bgcchange2);


let arrdays = document
  .getElementsByClassName('day');


  function logtype(event) {
      console.log(event.target);
  }

  function zoomin(event) {
      event.target.style.fontSize = "2rem";  
    //   COMO MUDAR TAMANHO SEM FAZER A TABELA BALANÇAR TODA????
  }

  function zoomout(event) {
    event.target.style.fontSize = "1rem";
}

function listInput(event) {
    let listinput = document.createElement('span');
    let br = document.createElement('br');
    let br2 = document.createElement('br');
    listinput.innerText = input.value;
    input.value = '';
    document.querySelector('.my-tasks').appendChild(br);
    document.querySelector('.my-tasks').appendChild(listinput);
    document.querySelector('.my-tasks').appendChild(br2);
}
// evento pra escrever algo na lista de tarefas
let input = document.getElementById('task-input');
let btn = document.getElementById('btn-add');
btn.addEventListener('click', listInput);

function addColorLegend(stringcor) {
    let task = document.createElement('div');
    task.classList.add('task');
    task.style.backgroundColor = stringcor;
    document.querySelector('.my-tasks').appendChild(task);
}

addColorLegend('red');
addColorLegend('yellow');
addColorLegend('green');

function select(event) {
    if (event.target.classList.contains('selected')) {
        event.target.classList.remove('selected');
        console.log('removeu');
    } else {
    event.target.classList.add('selected');
    console.log('addeu');
}
}
// evento para selecionar uma cor
let taskarr = document.querySelectorAll('.task');
for (item of taskarr) {
    item.addEventListener('click', select);
}

 function colorize(event) {
    if (event.target.style.backgroundColor === document.querySelector('.selected').style.backgroundColor) {
        event.target.style.backgroundColor = "rgb(238,238,238)";
    } else {
        event.target.style.backgroundColor = document.querySelector('.selected').style.backgroundColor;
    }
}

// eventos quando interage com os dias
for (let day of arrdays) {
    day.addEventListener("click", logtype);
    day.addEventListener('mouseenter', zoomin);
    day.addEventListener('mouseleave', zoomout);
    day.addEventListener('click', colorize);
  }