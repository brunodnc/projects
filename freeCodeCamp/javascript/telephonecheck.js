// no geral ficou bastante gambiarra, parece que eu estava apagando fogos até dar certo, com certeza tem como reduzir isso pra duas linhas rsrs falta-me o conhecimento
let parmax = 0;
function verif(num) {
  if (parmax === 0 && num === "(") {
    parmax += 1;
    return true;
  } else if (parmax === 1 && num === ")") {
    parmax += 1;
    return true;
  } else if (num === "-") {
    return true;
  } else if (isNaN(num)) {
    return false;
  } else {
    return true;
  }
}

function telephoneCheck([...str]) {
  let onlynum = [];

  for (let num of str) {
    if (!isNaN(num)) {
      onlynum.push(num);
    }
  }
  let file1 = str.every(verif);
  let file2 = onlynum.join("").split(" ").join("").length === 10;
  let file3 =
    onlynum.join("").split(" ").join("").length === 11 && onlynum[0] == 1;
  let file4 = function () {
    if (
      str[2] === " " ||
      str[2] === "-" ||
      parmax === 1 ||
      str.join("").endsWith(")")
    ) {
      return false;
    } else {
      return true;
    }
  };

  // testes
  // console.log(str);
  // console.log(onlynum);
  // console.log("file1 = " + file1 + ", file2 = " + file2 + ", file3 = " + file3 + ", file4 = " + file4());
  // console.log("input: " + str.join(''));
  // console.log("teste file1 (só números e parênteses?) " + str.every(verif))
  // console.log("teste fil2 (length = 10?): " + onlynum.join('').split(' ').join('').length)
  // console.log("teste file3 (length = 11 e onlynum[0] = 1?): " + onlynum.join('').split(' ').join('').length + ", " + onlynum[0])
  // console.log("teste file4 (tem espaço ou '-' na posição 2 ou tem só 1 parêntese?): " + file4())
  // console.log("soma booleana dos 4 testes: " + (file1 && (file2 || file3)) && file4())

  // fim dos testes

  return file1 && (file2 || file3) && file4();
}
// file1 verifica cada digito pra ver é numero ou parentese que abre e fecha 1 vez, na verdade o parentese só pode ser entre os 3 primeiros digitos mas não sei fazer então conto com a boa fé do input
// file2 verifica se sem caracteres não numeros tem a length = 10 (padrão)
// file3 complementando verifica se o código do país (estados unidos = 1) é inserido antes, fazendo a length ficar 11
// file4 testa a forma inicial do número, se tem apenas 1 parêntese, ou se o ultimo caractere é um parêntese.
console.log("6054756961 é telefone? " + telephoneCheck("(6054756961)"));
