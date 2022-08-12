/* eslint-disable no-restricted-syntax */
const criartarefa = document.getElementById('criar-tarefa');
const input = document.getElementById('texto-tarefa');
const tasklist = document.getElementById('lista-tarefas');
const clearbtn = document.getElementById('apaga-tudo');
const cleardonebtn = document.getElementById('remover-finalizados');
const savebtn = document.getElementById('salvar-tarefas');
const btnup = document.getElementById('mover-cima');
const btndown = document.getElementById('mover-baixo');
const removebtn = document.getElementById('remover-selecionado');

function selectListItem(event) {
  if (document.querySelector('.selected')) {
    document.querySelector('.selected').classList.remove('selected');
  }
  event.target.classList.add('selected');
}

function completeItem(e) {
  if (e.target.classList.contains('completed')) {
    e.target.classList.remove('completed');
    console.log('desriscou');
  } else {
    e.target.classList.add('completed');
    console.log('riscou');
  }
}

function createTask() {
  if (input.value === '') {
    return alert('Write Task');
  }
  const li = document.createElement('li');
  li.innerText = input.value;
  li.classList.add('listitem');
  input.value = '';
  tasklist.appendChild(li);
  li.addEventListener('click', selectListItem);
  li.addEventListener('dblclick', completeItem);
}

function clearTaskList() {
  // while (tasklist.hasChildNodes) {
  //   tasklist.removeChild(document.getElementsByClassName('listitem')[0]);
  // }
  tasklist.innerHTML = '';
}

function clearDone() {
  while (document.getElementsByClassName('completed').length > 0) {
    tasklist.removeChild(document.getElementsByClassName('completed')[0]);
  }
}

// function classTransfer(start, end) {
//   const startclass = [];
//   const endclass = [];
//   for (const cla of start.classList) {
//     startclass.push(cla);
//   }
//   for (const cla of end.classList) {
//     endclass.push(cla);
//   }
//   for (const cla of startclass) {
//     start.classList.remove(cla);
//   }
//   for (const cla of endclass) {
//     end.classList.remove(cla);
//   }
//   for (const cla of startclass) {
//     end.classList.add(cla);
//   }
//   for (const cla of endclass) {
//     start.classList.add(cla);
//   }
// }

function classTransfer(start, end) {
  const startclass = start.className
  const endclass = end.className;
  start.className = '';
  end.className = '';
  start.className = endclass;
  end.className = startclass;
}

function moveUp() {
  if (document.querySelector('.selected')) {
    const selected = document.getElementsByClassName('selected')[0];
    const arr = [];
    for (const item of document.getElementsByClassName('listitem')) {
      arr.push(item);
    }
    const i = arr.findIndex((item) => item.classList.contains('selected'));
    if (i - 1 >= 0) {
      const textselected = selected.innerHTML;
      const textdown = document.getElementsByClassName('listitem')[i - 1].innerHTML;
      selected.innerHTML = textdown;
      document.getElementsByClassName('listitem')[i - 1].innerHTML = textselected;
      classTransfer(selected, document.getElementsByClassName('listitem')[i - 1]);
    }
  }
}

function moveDown() {
  if (document.querySelector('.selected')) {
    const selected = document.getElementsByClassName('selected')[0];
    const arr = [];
    for (const item of document.getElementsByClassName('listitem')) {
      arr.push(item);
    }
    const i = arr.findIndex((item) => item.classList.contains('selected'));
    if (i + 1 <= arr.length - 1) {
      const textselected = selected.innerHTML;
      const textdown = document.getElementsByClassName('listitem')[i + 1].innerHTML;
      selected.innerHTML = textdown;
      document.getElementsByClassName('listitem')[i + 1].innerHTML = textselected;
      classTransfer(selected, document.getElementsByClassName('listitem')[i + 1]);
    }
  }
}

function removeSelected() {
  if (document.querySelector('.selected')) {
    const selected = document.querySelector('.selected');
    tasklist.removeChild(selected);
  }
}

function saveTaskList() {
  const save = [];
  for (const item of document.getElementsByClassName('listitem')) {
    const obj = {
      [item.classList]: [item.innerHTML],
    };
    save.push(obj);
  }
  localStorage.setItem('list', JSON.stringify(save));
}

function loadList() {
  if (localStorage.getItem('list')) {
    const loadarr = JSON.parse(localStorage.getItem('list'));
    console.log(loadarr);
    console.log(localStorage.getItem('list'));
    for (const obj of loadarr) {
      const li = document.createElement('li');
      for (key in obj) {
        li.innerHTML = obj[key];
        li.className = key;
      }
      tasklist.appendChild(li);
      li.addEventListener('click', selectListItem);
      li.addEventListener('dblclick', completeItem);
    }
  }
}
window.onload = loadList;
criartarefa.addEventListener('click', createTask);
clearbtn.addEventListener('click', clearTaskList);
cleardonebtn.addEventListener('click', clearDone);
savebtn.addEventListener('click', saveTaskList);
btnup.addEventListener('click', moveUp);
btndown.addEventListener('click', moveDown);
removebtn.addEventListener('click', removeSelected);
