
let rgbarr = []
let rgbstr = '';
let score = 0;

let rgbcolor = document.getElementById('rgb-color');
let ballsarr = document.getElementsByClassName('ball');
let answer = document.getElementById('answer');
let scorehtml = document.getElementById('score')
let resetbtn = document.getElementById('reset-game');

function generateRandomRGB() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    rgbarr = [r, g, b];
    rgbstr = '(' + rgbarr.join(', ') + ')';
    answer.innerText = 'Escolha uma cor';
    scorehtml.innerText = score;
    rgbcolor.innerText = rgbstr;
}

function generateRandomBalls() {
    for (let ball of ballsarr) {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let rgbarr2 = [r, g, b];
        let rgbstr2 = '(' + rgbarr2.join(', ') + ')';
        ball.style.backgroundColor = rgbstr2;
        ball.style.color = rgbstr2;
    }
    let randomball = Math.floor(Math.random() * ballsarr.length);
    ballsarr[randomball].style.backgroundColor = rgbstr;
    ballsarr[randomball].style.color = rgbstr;
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

window.onload = generateRandomRGB, generateRandomBalls;
rgbcolor.innerText = rgbstr;


