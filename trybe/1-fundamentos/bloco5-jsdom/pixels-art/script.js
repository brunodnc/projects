/* eslint-disable no-restricted-syntax */
const pixelboard = document.getElementById('pixel-board');
const black = document.querySelector('.black');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const blue = document.querySelector('.blue');
const clearboard = document.getElementById('clear-board');
const boardsize = document.getElementById('board-size');
const generateboard = document.getElementById('generate-board');

// random color palette
function randomRGB(cor) {
  const rgb = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)];
  cor.style.backgroundColor = `rgb(${rgb})`;
}
// por algum motivo sem a linha abaixo não reconhecia o background como black
black.style.backgroundColor = 'black';

randomRGB(red);
randomRGB(green);
randomRGB(blue);

function colorEvent() {
  for (const pixel of document.querySelectorAll('.pixel')) {
    pixel.addEventListener('click', colorPixel);
  }
}

function generateBoard(x, y) {
  while (pixelboard.childElementCount > 0) {
    pixelboard.removeChild(document.getElementsByClassName('row')[0]);
  }
  for (let i = x; i > 0; i -= 1) {
    const row = document.createElement('div');
    row.classList.add('row');
    pixelboard.appendChild(row);
    for (let j = y; j > 0; j -= 1) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      row.appendChild(pixel);
    }
  }
  colorEvent();
}
// eslint-disable-next-line complexity
function boardCheck(x, y) {
  if (Number(x) === 0 || Number(y) === 0) {
    alert('Board inválido!');
  } else if (x > 0 && x < 5 && y > 0 && y < 5) {
    generateBoard(5, 5);
  } else if (x > 50 && y > 50) {
    generateBoard(50, 50);
  } else {
    generateBoard(x, y);
  }
}

// generate initial pixel board
generateBoard(5, 5);

// event functions to select color, paint pixel, and clear board(paint all white)
function selectColor(event) {
  document.querySelector('.selected').classList.remove('selected');
  event.target.classList.add('selected');
}

function colorPixel() {
  this.style.backgroundColor = document.querySelector('.selected').style.backgroundColor;
  console.log(`o selected é o ${document.querySelector('.selected')}`);
}

function clearBoard() {
  for (const pixel of document.querySelectorAll('.pixel')) {
    pixel.style.backgroundColor = 'white';
  }
}

function newBoard() {
  boardCheck(boardsize.value, boardsize.value);
}

black.addEventListener('click', selectColor);
red.addEventListener('click', selectColor);
green.addEventListener('click', selectColor);
blue.addEventListener('click', selectColor);
clearboard.addEventListener('click', clearBoard);
generateboard.addEventListener('click', newBoard);
