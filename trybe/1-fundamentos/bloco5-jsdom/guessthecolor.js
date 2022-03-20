// globais
let rgbarr = []
let rgbstr = '';
let score = 0;
let bordergamearr = [];
// html links
let rgbcolor = document.getElementById('rgb-color');
let ballsarr = document.getElementsByClassName('ball');
let answer = document.getElementById('answer');
let scorehtml = document.getElementById('score')
let resetbtn = document.getElementById('reset-game');
let scorebtn = document.getElementById('reset-score');
let main = document.getElementById('main');

// generate target RGB
function generateRandomRGB() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    rgbarr = [r, g, b];
    rgbstr = 'rgb(' + rgbarr.join(', ') + ')';
    answer.innerText = 'Escolha uma cor';
    scorehtml.innerText = score;
    rgbcolor.innerText = rgbstr;
}
// border mini-game, places on screen colors that aren't the target color

// fisherYatesShuffle source: stackoverflow.com/questions/64925666/how-can-i-sort-an-array-randomly-in-javascript
function fisherYaterShuffle (arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
        let j = Math.floor(Math.random() * i)
        let k = arr[i];
        arr[i] = arr[j]
        arr[j] = k;
    }
}

function borderFunction() {
    let brc = main.style.borderRightColor;
    let blc = main.style.borderLeftColor;
    let btc = main.style.borderTopColor;
    let bbc = main.style.borderBottomColor;
    let bc = main.style.backgroundColor;
    let borderarr = [brc, blc, btc, bbc, bc];
    // randomize with fisher yates shuffle both borderarr (main settings) and bordergamearr (non target rgb colors)
    
}

// generate other random rgb
function generateRandomBalls() {
    for (let ball of ballsarr) {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let rgbarr2 = [r, g, b];
        let rgbstr2 = 'rgb(' + rgbarr2.join(', ') + ')';
        ball.style.backgroundColor = rgbstr2;   
        ball.style.color = rgbstr2;
    }
    let randomball = Math.floor(Math.random() * ballsarr.length);
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
    if (event.target.style.color === rgbstr) {
        answer.innerText = 'Acertou';
        score += 3;
        scorehtml.innerText = score;
    } else {
        answer.innerText = 'Errou! Tente novamente!';
    }
}

for (let ball of ballsarr) {
    ball.addEventListener('click', chooseBall);
}

function resetGame() {
    generateRandomRGB();
    generateRandomBalls();
}

resetbtn.addEventListener('click', resetGame);
scorebtn.addEventListener('click', () => {
    score = 0;
    scorehtml.innerText = score
        }
    );
window.onload = resetGame;


