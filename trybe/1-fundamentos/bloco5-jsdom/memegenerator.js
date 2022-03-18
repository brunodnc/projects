let fileup = document.getElementById('meme-insert');
let textup = document.getElementById('text-input');
let textbot = document.getElementById('text-input-bot');
let image = document.getElementById('meme-image');
let memetext = document.getElementById('meme-text');
let uptext = document.getElementById('uptext');
let bottext = document.getElementById('bottext')
let fire = document.getElementById('fire');
let water = document.getElementById('water');
let earth = document.getElementById('earth');
let cont = document.getElementById('meme-image-container');
let dl = document.getElementById('dl');


function upImage(event) {
    let img1 = document.createElement('img');
    img1.onload = draw(img1);
    img1.src = URL.createObjectURL(this.files[0]);
    img1.width = 350;
    img1.height = 350;
}

function draw(a) {
    cont.appendChild(a);
}

// draw text on canvas > w3schools.com/graphics/canvas_text.asp

function upText(event) {
    let text = event.target.value;
    memetext.innerText = text;   
}

function botText(event) {
    let text = event.target.value;
    bottext.innerText= text;
}

function addFireBorder(event) {
    if (cont.classList.contains('water')) {
        cont.classList.remove('water');
    }
    if (cont.classList.contains('earth')) {
        cont.classList.remove('earth');
    }
    cont.classList.add('fire');
    console.log('foi');
}

function addWaterBorder(event) {
    if (cont.classList.contains('fire')) {
        cont.classList.remove('fire');
    }
    if (cont.classList.contains('earth')) {
        cont.classList.remove('earth');
    }
    cont.classList.add('water');
}

function addEarthBorder(event) {
    if (cont.classList.contains('water')) {
        cont.classList.remove('water');
    }
    if (cont.classList.contains('fire')) {
        cont.classList.remove('fire');
    }
    cont.classList.add('earth');
}

function alertDev(event) {
    alert('Print > Paste in Paint > Crop > Save');
}

fileup.addEventListener('change', upImage);
textup.addEventListener('keyup', upText);
textbot.addEventListener('keyup', botText);
fire.addEventListener('click', addFireBorder);
water.addEventListener('click', addWaterBorder);
earth.addEventListener('click', addEarthBorder);
dl.addEventListener('click', alertDev);

