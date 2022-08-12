/* eslint-disable no-restricted-syntax */
const input = document.getElementById('carta-texto');
const btn = document.getElementById('criar-carta');
const letter = document.getElementById('carta-gerada');
const counter = document.getElementById('carta-contador');

const classarr = [
  ['newspaper', 'magazine1', 'magazine2'],
  ['medium', 'big', 'reallybig'],
  ['rotateleft', 'rotateright'],
  ['skewleft', 'skewright'],
];

let contador = 0;

function randomizeClass(wrd) {
  for (const cl of classarr) {
    wrd.classList.add(cl[Math.floor(Math.random() * cl.length)]);
  }
}

function setContador() {
  counter.innerHTML = contador;
}

function reMystify(event) {
  event.target.className = '';
  randomizeClass(event.target);
}

function generateML(event) {
  const text = input.value;
  const textarr = text.split(' ').filter((item) => item !== '');
  contador = textarr.length;
  setContador();
  if (textarr.length <= 0) {
    letter.innerText = 'Por favor, digite o conteúdo da carta.';
  } else {
    letter.innerHTML = '';
    for (const word of textarr) {
      const mword = document.createElement('span');
      mword.innerText = word;
      randomizeClass(mword);
      letter.appendChild(mword);
      mword.addEventListener('click', reMystify);
    }
  }
}

btn.addEventListener('click', generateML);