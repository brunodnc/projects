/* eslint-disable complexity */
// Desafio 1
function compareTrue(a, b) {
  return a && b;
}

// Desafio 2
function calcArea(base, height) {
  return (base * height) / 2;
}

// Desafio 3
function splitSentence(str) {
  return str.split(' ');
}

// Desafio 4
function concatName(arr) {
  return `${arr[arr.length - 1]}, ${arr[0]}`;
}

// Desafio 5
function footballPoints(wins, ties) {
  let points = wins * 3 + ties;
  return points;
}

// Desafio 6
function highestCount(arr) {
  let highest = -1000000000000000000000000000000000000000000000000000000000; // surely there is an opmization for this lol
  for (let i = 0; i < arr.length - 1; i += 1) {
    if (arr[i] > arr[i + 1]) {
      highest = arr[i];
    } else if (arr[i + 1] > highest) {
      highest = arr[i + 1];
    }
  }
  console.log(highest);
  return arr.filter((num) => num === highest).length;
}

// entendi errado a highestCount e a função aqui de baixo retorna a maior quantidade repetida, e não quanto o maior número repete
// let count = 0;
// for (let num of arr) {
//   let temp = 0;
//   for (let i = 0; i < arr.length; i += 1) {
//     if (num === arr[i]) {
//       temp += 1;
//     }
//   }
//   if (temp > count) {
//     count = temp;
//   }
// }
// return count;

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  let dist1 = 0;
  let dist2 = 0;
  if (mouse > cat1) {
    dist1 = mouse - cat1;
  } else if (mouse < cat1) {
    dist1 = cat1 - mouse;
  }
  if (mouse > cat2) {
    dist2 = mouse - cat2;
  } else if (mouse < cat2) {
    dist2 = cat2 - mouse;
  }
  if (dist1 > dist2) {
    return 'cat2';
  }
  if (dist2 > dist1) {
    return 'cat1';
  }
  return 'os gatos trombam e o rato foge';
}

// Desafio 8
function fizzBuzz(arr) {
  let fizzarr = [];
  for (let num of arr) {
    if (num % 3 !== 0 && num % 5 !== 0) {
      fizzarr.push('bug!');
    } else if (num % 3 === 0 && num % 5 === 0) {
      fizzarr.push('fizzBuzz');
    } else if (num % 3 === 0 && num % 5 !== 0) {
      fizzarr.push('fizz');
    } else if (num % 5 === 0 && num % 3 !== 0) {
      fizzarr.push('buzz');
    }
  }
  return fizzarr;
}

// Desafio 9
function encode(str) {
  for (let char of str) {
    if (char === 'a') {
      return encode(str.replace('a', '1'));
    }
    if (char === 'e') {
      return encode(str.replace('e', '2'));
    }
    if (char === 'i') {
      return encode(str.replace('i', '3'));
    }
    if (char === 'o') {
      return encode(str.replace('o', '4'));
    }
    if (char === 'u') {
      return encode(str.replace('u', '5'));
    }
  }
  return str;
}

function decode(str) {
  for (let char of str) {
    if (char === '1') {
      return decode(str.replace('1', 'a'));
    }
    if (char === '2') {
      return decode(str.replace('2', 'e'));
    }
    if (char === '3') {
      return decode(str.replace('3', 'i'));
    }
    if (char === '4') {
      return decode(str.replace('4', 'o'));
    }
    if (char === '5') {
      return decode(str.replace('5', 'u'));
    }
  }
  return str;
}

// Desafio 10
function techList(arr, name) {
  let techobj = {};
  let objarr = [];
  for (let tech of arr.sort()) {
    techobj = {
      tech,
      name,
    };
    objarr.push(techobj);
  }
  if (arr.length < 1) {
    return 'Vazio!';
  }
  return objarr;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,
};
