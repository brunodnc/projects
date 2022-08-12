/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */
// Desafio 11
function generatePhoneNumber(arr) {
  if (arr.length !== 11) {
    return 'Array com tamanho incorreto.';
  }
  let temp = 0;
  for (let num of arr) {
    let repete = 0;
    if (num < 0 || num > 9) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
    for (let i = 0; i < arr.length; i += 1) {
      if (num === arr[i]) {
        repete += 1;
      }
      if (repete > temp) {
        temp = repete;
      }
    }
  }
  if (temp >= 3) {
    return 'não é possível gerar um número de telefone com esses valores';
  }
  let ddd = arr.slice(0, 2).join('');
  let prim = arr.slice(2, 7).join('');
  let fin = arr.slice(7).join('');
  return '(' + ddd + ') ' + prim + '-' + fin;
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  if (lineA > lineB + lineC) {
    return false;
  } if (lineB > lineA + lineC) {
    return false;
  } if (lineC > lineA + lineB) {
    return false;
  } if (lineA < Math.abs(lineB - lineC)) {
    return false;
  } if (lineB < Math.abs(lineA - lineC)) {
    return false;
  } if (lineC < Math.abs(lineA - lineB)) {
    return false;
  }
  return true;
}

// Desafio 13
function hydrate(str) {
  let strarr = str.split(' ');
  let cont = 0;
  for (let i = 0; i < strarr.length; i += 1) {
    let num = Number(strarr[i]);
    if (!Number.isNaN(num)) {
      cont += num;
    }
  }
  if (cont === 1) {
    return cont + ' copo de água';
  }
  return cont + ' copos de água';
}


module.exports = {
  generatePhoneNumber,
  hydrate,
  triangleCheck,
};
