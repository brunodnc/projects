function checkCashRegister(price, cash, cid) { // função que toma o preço da compra, o valor que está sendo pago, e o dinheiro que está na registradora}
  let funds = 0;
  let caixaobj = {}; //basicamente o que está entrando no caixa, não sei se eu acabo usando esses valores, mas servem pra uma futura implementação de uma continuidade na função, já que grava e atualiza o que está dentro da caixa
  let caixaarr = []; // transformado em array
  let trocoobj = {}; //o troco em objeto
  let trocoarr = []; //o troco em array
  let exact = false;
  for (let arr of cid) {
    funds += arr[1]; // calcula o total de dinheiro no caixa
    caixaobj[arr[0]] = arr[1]; // cria as chaves do objeto caixaobj
    trocoobj[arr[0]] = 0; // cria as chavas do trocoobj
  }
  let troco = cash.toPrecision(5) - price.toPrecision(5); // calcula o troco que precisa ser devolvido
  console.log("O caixa é: " + funds.toPrecision(5));
  console.log("O troco é: " + troco);
  funds = funds.toPrecision(5);
  function exactchange(valor) {
    //função que vai realizar a operação de tirar o valor do troco do objeto caixa e botar dinheiro no objeto troco, para então criar um array que contém esse objeto troco que será devolvido ao cliente. Também define exact como true se tiver dinheiro suficiente no caixa pra pagar todo o troco
    if (valor >= 100 && caixaobj["ONE HUNDRED"] >= 100) {
      caixaobj["ONE HUNDRED"] -= 100;
      trocoobj["ONE HUNDRED"] += 100;
      return exactchange(valor - 100.0);
    } else if (valor >= 20 && caixaobj["TWENTY"] >= 20) {
      caixaobj["TWENTY"] -= 20;
      trocoobj["TWENTY"] += 20;
      return exactchange(valor - 20.0);
    } else if (valor >= 10 && caixaobj["TEN"] >= 10) {
      caixaobj["TEN"] -= 10;
      trocoobj["TEN"] += 10;
      return exactchange(valor - 10.0);
    } else if (valor >= 5 && caixaobj["FIVE"] >= 5) {
      caixaobj["FIVE"] -= 5;
      trocoobj["FIVE"] += 5;
      return exactchange(valor - 5.0);
    } else if (valor >= 1 && caixaobj["ONE"] >= 1) {
      caixaobj["ONE"] -= 1;
      trocoobj["ONE"] += 1;
      return exactchange(valor - 1.0);
    } else if (valor >= 0.25 && caixaobj["QUARTER"] >= 0.25) {
      caixaobj["QUARTER"] -= 0.25;
      trocoobj["QUARTER"] += 0.25;
      return exactchange(valor - 0.25);
    } else if (valor >= 0.1 && caixaobj["DIME"] >= 0.1) {
      caixaobj["DIME"] -= 0.1;
      trocoobj["DIME"] += 0.1;
      return exactchange(valor - 0.1);
    } else if (valor >= 0.05 && caixaobj["NICKEL"] >= 0.05) {
      caixaobj["NICKEL"] -= 0.05;
      trocoobj["NICKEL"] += 0.05;
      return exactchange(valor - 0.05);
    } else if (valor > 0 && caixaobj["PENNY"] > 0) {
      caixaobj["PENNY"] -= 0.01;
      trocoobj["PENNY"] += 0.01;
      return exactchange(valor - 0.01);
    } else if (valor === 0) {
      exact = true;
      return true;
    }
    for (let key in caixaobj) {
      // source: https://www.educba.com/convert-object-to-array-javascript/
      caixaarr.push([key, caixaobj[key]]);
    }
    for (let key in trocoobj) {
      trocoarr.push([key, trocoobj[key]]);
    }
  }
  exactchange(troco);
  if (funds == troco) {
    // se o dinheiro for exato para pagar o troco, feixa o caixa
    console.log(1);
    return { status: "CLOSED", change: cid };
  } else if (price > funds && !exact) {
    // se não tem troco suficiente o sistema avisa
    console.log(2);
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else {
    // senão ele continua aberto e devolve  APENAS o troco devido, source: https://masteringjs.io/tutorials/fundamentals/filter-object
    console.log(3);
    let verdadeirotrocoarr = Object.entries(trocoobj);
    let filtrado = verdadeirotrocoarr.filter(([key, value]) => value > 0);
    let verdadeiro = Object.fromEntries(filtrado);
    return { status: "OPEN", change: filtrado.reverse() };
  }
}
console.log(
  checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
);
