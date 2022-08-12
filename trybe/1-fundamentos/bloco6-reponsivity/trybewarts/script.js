const submitbtn = document.getElementById('submit-btn');
const agreement = document.getElementById('agreement');
const counter = document.getElementById('counter');
const textarea = document.getElementById('textarea');
const getEmail = document.querySelector('#email');
const getSenha = document.querySelector('#senha');
const submeterLogin = document.querySelector('#login');
const form = document.getElementById('evaluation-form');
const inputName = document.getElementById('input-name');
const lastName = document.getElementById('input-lastname');
const email = document.getElementById('input-email');
const house = document.getElementById('house');
const family = document.getElementsByName('family');
const learn = document.getElementsByName('learn');
const rate = document.getElementsByName('rate');

let count = 0;

function alertaLogin() {
  const eMail = 'tryber@teste.com';
  const senha = '123456';

  if (getEmail.value === eMail && getSenha.value === senha) {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

function getFam() {
  let fam = '';
  for (let i = 0; i < family.length; i += 1) {
    if (family[i].checked) {
      fam = family[i].value;
    }
  }
  return fam;
}

function getMat() {
  const mat = [];
  for (let i = 0; i < learn.length; i += 1) {
    if (learn[i].checked) {
      mat.push(learn[i].value);
    }
  }
  return mat.join(', ');
}

function getRate() {
  let rat = '';
  for (let i = 0; i < rate.length; i += 1) {
    if (rate[i].checked) {
      rat = rate[i].value;
    }
  }
  return rat;
}
function createObj() {
  const obj = {
    Nome: `${inputName.value} ${lastName.value}`,
    Email: email.value,
    Casa: house.value,
    Família: getFam(),
    Matérias: getMat(),
    Avaliação: getRate(),
    Observações: textarea.value,
  };
  return obj;
}

function fillForm(event) {
  event.preventDefault();
  const objarr = Object.entries(createObj());
  form.innerHTML = '';
  objarr.forEach((item) => {
    const p = document.createElement('p');
    p.innerText = `${item[0]}: ${item[1]}`;
    form.appendChild(p);
  });
}

submeterLogin.addEventListener('click', alertaLogin);
submitbtn.addEventListener('click', fillForm);

agreement.addEventListener('click', () => {
  if (submitbtn.disabled === false) {
    submitbtn.disabled = true;
  } else {
    submitbtn.disabled = false;
  }
});

textarea.addEventListener('keyup', () => {
  count = textarea.value.length;
  counter.innerText = 500 - count;
});
