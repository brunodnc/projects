// html links
const rgbcolor = document.getElementById('rgb-color');
const ballsarr = document.getElementsByClassName('ball');
const answer = document.getElementById('answer');
const scorehtml = document.getElementById('score');
const resetbtn = document.getElementById('reset-game');
const scorebtn = document.getElementById('reset-score');
const main = document.getElementById('main');

// globals
let rgbarr = [];
let rgbstr = '';
let score = 0;
let bordergamearr = [];
const borderarr = [
  'borderRightColor',
  'borderLeftColor',
  'borderTopColor',
  'borderBottomColor',
  'backgroundColor',
];
let clicked = false;

// generate target RGB
function generateRandomRGB() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  rgbarr = [r, g, b];
  rgbstr = `rgb(${rgbarr.join(', ')})`;
  answer.innerText = 'Guess the color :)';
  scorehtml.innerText = score;
  rgbcolor.innerText = rgbstr;
}
// border mini-game, places on screen colors that aren't the target color

// fisherYatesShuffle source: stackoverflow.com/questions/64925666/how-can-i-sort-an-array-randomly-in-javascript
function fisherYatesShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    const k = arr[i];
    arr[i] = arr[j];
    arr[j] = k;
  }
}

function borderFunction() {
  // randomize with fisher yates shuffle both borderarr (main settings) and bordergamearr (non target rgb colors)
  fisherYatesShuffle(borderarr);
  fisherYatesShuffle(bordergamearr);
  // now matches the two random arrs (color and css prop)
  for (let i = 0; i < borderarr.length; i += 1) {
    main.style[borderarr[i]] = bordergamearr[i];
  }
  // now resets colors arr
  bordergamearr = [];
}

// generate other random rgb
function generateRandomBalls() {
  for (const ball of ballsarr) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const rgbarr2 = [r, g, b];
    const rgbstr2 = `rgb(${rgbarr2.join(', ')})`;
    ball.style.backgroundColor = rgbstr2;
  }
  const randomball = Math.floor(Math.random() * ballsarr.length);
  ballsarr[randomball].style.backgroundColor = rgbstr;
  ballsarr[randomball].style.color = rgbstr;
  // generate array without target rgb
  for (let i = 0; i < ballsarr.length; i += 1) {
    if (ballsarr[i] !== ballsarr[randomball]) {
      bordergamearr.push(ballsarr[i].style.backgroundColor);
    }
  }
  borderFunction();
}

function chooseBall(event) {
  if (clicked) return
  if (event.target.style.color === rgbstr) {
    answer.innerText = 'Hit!';
    score += 3;
    scorehtml.innerText = score;
  } else {
    answer.innerText = 'Miss! Try Again!!';
    score -= 5;
    scorehtml.innerText = score;
  }
  clicked = true;
}

for (const ball of ballsarr) {
  ball.addEventListener('click', chooseBall);
}

function resetGame() {
  generateRandomRGB();
  generateRandomBalls();
  clicked = false;
}

resetbtn.addEventListener('click', resetGame);
scorebtn.addEventListener('click', () => {
  score = 0;
  scorehtml.innerText = score;
});
window.onload = resetGame;
