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
  for (let day of arrdays) {
      day.addEventListener("click", logtype);
      day.addEventListener('mouseenter', zoomin);
      day.addEventListener('mouseleave', zoomout);
    }



//   Exercício 6:
// Exercício 7:
// Implemente uma função que adiciona uma tarefa personalizada ao calendário. A função deve receber como parâmetro a string com o nome da tarefa (ex: "cozinhar") e criar dinamicamente um elemento com a tag <span> contendo a tarefa.
// O elemento criado deverá ser adicionado como filho/filha da tag <div> que possui a classe "my-tasks" .
// Exercício 8:
// Implemente uma função que adiciona uma legenda com cor para a tarefa criada no exercício anterior. Esta função deverá receber como parâmetro uma string ("cor") e criar dinamicamente um elemento de tag <div> com a classe task .
// O parâmetro cor deverá ser utilizado como cor de fundo da <div> criada.
// O elemento criado deverá ser adicionado como filho/filha da tag <div> que possui a classe "my-tasks" .
// Exercício 9:
// Implemente uma função que adiciona um evento que, ao clicar no elemento com a tag <div> referente a cor da sua tarefa, atribua a este elemento a classe task selected , ou seja, quando sua tarefa possuir a classe task selected , ela estará selecionada.
// Ao clicar novamente no elemento, a sua classe deverá voltar a ser somente task , ou seja, esta tarefa está deixando de ser uma tarefa selecionada.
// Exercício 10:
// Implemente uma função que adiciona um evento que, ao clicar em um dia do mês no calendário, atribua a este dia a cor da legenda da sua tarefa selecionada.
// Ao clicar novamente no dia com a cor da legenda, a sua cor deverá voltar à configuração inicial rgb(119,119,119) .
// Bônus:
// Vamos adicionar compromissos ao seu calendário? Implemente uma função que, ao digitar um compromisso na caixa de texto "COMPROMISSOS", adiciona o item à lista "MEUS COMPROMISSOS" ao clicar no botão "ADICIONAR".
// Se nenhum caractere for inserido no campo input , a função deve retornar um alert com uma mensagem de erro ao clicar em "ADICIONAR".
// Ao pressionar a tecla "enter" o evento também deverá ser disparado.
// Dica - Propriedade: key .