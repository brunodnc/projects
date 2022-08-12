/* eslint-disable no-restricted-syntax */
const fileup = document.getElementById('meme-insert');
const textup = document.getElementById('text-input');
const textbot = document.getElementById('text-input-bot');
const image = document.getElementById('meme-image');
const memetext = document.getElementById('meme-text');
const bottext = document.getElementById('bottext');
const fire = document.getElementById('fire');
const water = document.getElementById('water');
const earth = document.getElementById('earth');
const cont = document.getElementById('meme-image-container');
const dl = document.getElementById('dl');
const libimgarr = document.querySelectorAll('.libimg');

function upImage(event) {
  image.src = URL.createObjectURL(event.target.files[0]);
  image.width = 350;
  image.height = 350;
}

function upText(event) {
  const text = event.target.value;
  memetext.innerText = text;
}

function botText(event) {
  const text = event.target.value;
  bottext.innerText = text;
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

function addWaterBorder() {
  if (cont.classList.contains('fire')) {
    cont.classList.remove('fire');
  }
  if (cont.classList.contains('earth')) {
    cont.classList.remove('earth');
  }
  cont.classList.add('water');
}

function addEarthBorder() {
  if (cont.classList.contains('water')) {
    cont.classList.remove('water');
  }
  if (cont.classList.contains('fire')) {
    cont.classList.remove('fire');
  }
  cont.classList.add('earth');
}

function alertDev() {
  alert('Print > Paste in Paint > Crop > Save');
}

function drawLibImg(event) {
  image.src = event.target.src;
  image.width = 350;
  image.height = 350;
}

fileup.addEventListener('change', upImage);
textup.addEventListener('keyup', upText);
textbot.addEventListener('keyup', botText);
fire.addEventListener('click', addFireBorder);
water.addEventListener('click', addWaterBorder);
earth.addEventListener('click', addEarthBorder);
dl.addEventListener('click', alertDev);

for (const libimg of libimgarr) {
  libimg.addEventListener('click', drawLibImg);
}
