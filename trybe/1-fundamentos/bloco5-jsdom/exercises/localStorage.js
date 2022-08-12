// naming input. button and textarea elements

let bgcinput = document.getElementById('bgcinput');
let cinput = document.getElementById('cinput');
let fsinput = document.getElementById('fsinput');
let lhinput = document.getElementById('lhinput');
let ffinput = document.getElementById('ffinput');
let lsinput = document.getElementById('lsinput');
let clearbtn = document.getElementsByTagName('button')[0];
let tarea = document.getElementsByTagName('textarea')[0];
// naming customizable text area
let textart = document.getElementById('textart');

// creating save obj
let artobj = {
    'background-color':textart.style.backgroundColor,
    'color':textart.style.color,
    'font-size':textart.style.fontSize,
    'line-height':textart.style.lineHeight,
    'font-family':textart.style.fontFamily,
    'letter-spacing':textart.style.letterSpacing,
}

// função que da update no textarea toda vez que o localStorage muda
function localStorageUpdate() {
    tarea.innerHTML = localStorage.getItem('saveObj').replaceAll(',', ',\n');
}

// função para, se não tiver nada no localStorage, criar lá um objeto padrão, e se tiver já algo salvo, carregar para página e atualizar os campos do input com esss valores
function load() {
    if (localStorage.getItem('saveObj') === null) {
        localStorage.setItem('saveObj', JSON.stringify(artobj));
    } else {
        let artobj = JSON.parse(localStorage.getItem('saveObj'));
        
        textart.style.backgroundColor = artobj['background-color'];
        bgcinput.value = artobj['background-color'];
        
        textart.style.color = artobj['color'];
        cinput.value = artobj['color'];
        
        textart.style.fontSize = artobj['font-size'];
        fsinput.value = artobj['font-size'];
        
        textart.style.lineHeight = artobj['line-height'];
        lhinput.value = artobj['line-height'];
        
        textart.style.fontFamily = artobj['font-family'];
        ffinput.value = artobj['font-family'];

        textart.style.letterSpacing = artobj['letter-spacing'];
        lsinput.value = artobj['letter-spacing'];
    }
    localStorageUpdate();
}
window.onload = load();

// função que salva na medida que se modifica os campos
function save() {
    localStorage.setItem('saveObj', JSON.stringify(artobj));
    localStorageUpdate();

}

// function that clear local Storage and inputs;
function clear(event) {
    localStorage.clear();
    let arrinp = document.getElementsByTagName('input');
    for (let inp of arrinp) {
        inp.value =''
    }
    textart.style.backgroundColor = "inherit";
    textart.style.color = "inherit";
    textart.style.fontSize = "inherit";
    textart.style.lineHeight = "inherit";
    textart.style.fontFamily = "inherit";
    textart.style.letterSpacing = "inherit";
    
    // precisa das próximas linhas para resetar a textarea com o obj inicial
    for (key in artobj) {
        artobj[key] = '';
    }
    tarea.innerHTML = JSON.stringify(artobj).replaceAll(',', ',\n'); 
}

clearbtn.addEventListener('click', clear);

// functions that get the input and cusomize text.

function getBgcInput(event) {
    let bgc = event.target.value;
    textart.style.backgroundColor = bgc;
    artobj['background-color'] = bgc;
    save();
}


function getCInput(event) {
    let c = event.target.value;
    textart.style.color = c;
    artobj['color'] = c;
    save();
}

function getFsInput(event) {
    let fs = event.target.value;
    textart.style.fontSize = fs;
    artobj['font-size'] = fs;
    save();
}

function getLhInput(event) {
    let lh = event.target.value;
    textart.style.lineHeight = lh;
    artobj['line-height'] = lh;
    save();
}

function getFfInput(event) {
    let ff = event.target.value;
    textart.style.fontFamily = ff;
    artobj['font-family'] = ff;
    save();
}

function getLsInput(event) {
    let ls = event.target.value;
    textart.style.letterSpacing = ls;
    artobj['letter-spacing'] = ls;
    save();
}

// text customization events

bgcinput.addEventListener('keyup', getBgcInput);
cinput.addEventListener('keyup', getCInput);
fsinput.addEventListener('keyup', getFsInput);
lhinput.addEventListener('keyup', getLhInput);
ffinput.addEventListener('keyup', getFfInput);
lsinput.addEventListener('keyup', getLsInput);



