const firstLi = document.getElementById('first-li');
const secondLi = document.getElementById('second-li');
const thirdLi = document.getElementById('third-li');
const input = document.getElementById('input');
const myWebpage = document.getElementById('my-spotrybefy');

function addUniqueTech(event) {
    let techarr = document.getElementsByClassName('tech');
    for (item of techarr) {
        item.classList.remove('tech');
    }
    event.target.classList.add('tech');
    console.log('foi?' , event.target)
}

firstLi.addEventListener('click', addUniqueTech);
secondLi.addEventListener('click', addUniqueTech);
thirdLi.addEventListener('click', addUniqueTech);

function alttext(event) {
    let eleclasstech = document.getElementsByClassName('tech')[0];
    eleclasstech.innerText = event.target.value;
} 

input.addEventListener('keyup', alttext);

function redirect(event) {
window.open('https://brunodnc.github.io/', '_blank');
console.log('foi?' , event.target);
}

myWebpage.addEventListener('dblclick', redirect);

function altColor(event) {
    event.target.style.color = "cyan";
}
function returnColor(event) {
    event.target.style.color = "white";
}
myWebpage.addEventListener('mouseover', altColor);
myWebpage.addEventListener('mouseleave', returnColor);

// Segue abaixo um exemplo do uso de event.target, dado pela Trybe:

function resetText(event) {
  event.target.innerText = 'Opção reiniciada';
}

firstLi.addEventListener('dblclick', resetText);
secondLi.addEventListener('dblclick', resetText);
thirdLi.addEventListener('dblclick', resetText);