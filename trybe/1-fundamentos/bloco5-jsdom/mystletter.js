let input = document.getElementById('carta-texto');
let btn = document.getElementById('criar-carta');
let letter = document.getElementById('carta-gerada');
let wordcounter = document.getElementById('carta-contador');
let counter = document.getElementById('counter');

let classarr = [
    ['newspaper', 'magazine1', 'magazine2'], 
    ['medium', 'big', 'reallybig'], 
    ['rotateleft', 'rotateright'], 
    ['skewleft', 'skewright']
    ['random'] // Esse "classe" tá aqui para servir de queryselector para aplicar o addEventListener para a função de re-randomizar as classe de uma palavra
]

let contador = 0;

function randomizeClass(wrd) {
    for (let cl of classarr) {
        wrd.classList.add(
            cl[Math.floor(Math.random() * cl.length)]
            )
    }
}

function setContador() {
    counter.innerHTML = contador;
}

function generateML(event) {
    let text = input.value;
    let textarr = text.split(' ');
    contador = textarr.length;
    setContador();
    if (textarr.length <= 0) {
        letter.innerText = 'Por favor, digite o conteúdo da carta'
    } else {
        for (let word of textarr) {
            let mword = document.createElement('span');
            mword.innerText = word;
            randomizeClass(mword).
            letter.appendChild(mword);
        }
        addReMistify();
    }
}

function reMystify(event) {
    let mwClassList = event.target.classList
    for (let cl of mwClassList) {
        event.target.classList.remove(cl);
    }
    randomizeClass(event.target);
}

function addReMistify() {
    for (let palavra of document.querySelectorAll('.random')) {
        palavra.addEventListener('click', reMystify)
    }
}

btn.addEventListener('click', generateML);

