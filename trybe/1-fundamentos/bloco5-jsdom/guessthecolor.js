
let rgbarr = []
let rgbstr = '';

let rgbcolor = document.getElementById('rgb-color');
let ballsarr = document.getElementsByClassName('ball');

function generateRandomRGB() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    rgbarr = [r, g, b];
    rgbstr = '(' + rgbarr.join(', ') + ')';
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
}

window.onload = generateRandomRGB;
rgbcolor.innerText = rgbstr;


