// naming input elements

let bgcinput = document.getElementById('bgcinput');
let cinput = document.getElementById('cinput');
let fsinput = document.getElementById('fsinput');
let lhinput = document.getElementById('lhinput');
let ffinput = document.getElementById('ffinput');
let lsinput = document.getElementById('lsinput');

// naming customizable text area
let textart = document.getElementById('textart');

// creating save obj
let artobj = {
    'bgc':textart.style.backgroundColor,
    'c':textart.style.color,
    'fs':textart.style.fontSize,
    'lh':textart.style.lineHeight,
    'ff':textart.style.fontFamily,
    'ls':textart.style.letterSpacing,
}

// função para, se não tiver nada no localStorage, criar lá um objeto padrão, e se tiver já algo salvo, carregar para página e atualizar os campos do input com esss valores
function load() {
    if (localStorage.getItem('saveObj') === null) {
        localStorage.Storage.setItem('saveObj', JSON.stringify(artobj));
    } else {
        let artobj = JSON.parse(localStorage.getItem('saveObj'));
        
        textart.style.backgroundColor = artobj.bgc;
        bgcinput.value = artobj.bgc;
        
        textart.style.color = artobj.c;
        cinput.value = artobj.c;
        
        textart.style.fontSize = artobj.fs;
        fsinput.value = artobj.fs;
        
        textart.style.lineHeight = artobj.lh;
        lhinput.value = artobj.lh;
        
        textart.style.fontFamily = artobj.ff;
        ffinput.value = artobj.ff;

        textart.style.letterSpacing = artobj.ls;
        lsinput.value = artobj.js;
    }
}

window.onload = load();

function save() {
    
}

// functions that get the input and cusomize text.

function getBgcInput(event) {
    let bgc = event.target.value;
    textart.style.backgroundColor = bgc;
    artobj.bgc = bgc;
    save();
}


function getCInput(event) {
    let c = event.target.value;
    textart.style.color = c;
    artobj.c = c;
    save();
}

function getFsInput(event) {
    let fs = event.target.value;
    textart.style.fontSize = fs;
    artobj.fs = fs;
    save();
}

function getLhInput(event) {
    let lh = event.target.value;
    textart.style.lineHeight = lh;
    artobj.lh = lh;
    save();
}

function getFfInput(event) {
    let ff = event.target.value;
    textart.style.fontFamily = ff;
    artobj.ff = ff;
    save();
}

function getLsInput(event) {
    let ls = event.target.value;
    textart.style.letterSpacing = ls;
    artobj.ls = ls;
    save();
}

// text customization events

bgcinput.addEventListener('keyup', getBgcInput);
cinput.addEventListener('keyup', getCInput);
fsinput.addEventListener('keyup', getFsInput);
lhinput.addEventListener('keyup', getLhInput);
ffinput.addEventListener('keyup', getFfInput);
lsinput.addEventListener('keyup', getLsInput);



