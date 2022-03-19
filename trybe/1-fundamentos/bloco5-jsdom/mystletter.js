let input = document.getElementById('carta-texto');
let btn = document.getElementById('criar-carta');
let letter = document.getElementById('carta-gerada');
let classarr = [
    ['newspaper', 'magazine1', 'magazine2'], 
    ['medium', 'big', 'reallybig'], 
    ['rotateleft', 'rotateright'], 
    ['skewleft', 'skewright']
]

function generateML(event) {
    let text = event.target.value;
    let textarr = text.split(' ');
    if (textarr.length <= 0) {
        letter.innerText = 'Por favor, digite o conteúdo da carta'
    }
    for (let word of textarr) {
        let mword = document.createElement('span');
        mword.innerText = word;
        for (let cl of classarr) {
            mword.classList.add(
                cl[Math.floor(Math.random() * cl.length)]
                )
        }
        letter.appendChild(mword);
    }
}

btn.addEventListener('click', generateML);