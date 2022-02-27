const Name = "Bruno";
const birthplace = "BH";
const bdecade = "Década de 90";
console.log(Name + "/" + birthplace + "/" + bdecade);

function redundantfunction(coisa) {
    if (typeof coisa != undefined && typeof coisa != null) {
        return console.log("Tipo de " + coisa + ": " + typeof coisa + ".");
    } else {
        return console.log("Não existe " + coisa + " no banco de dados")
    }
}

redundantfunction(bdecade);
redundantfunction(3);

// Exercise if else and logical operators
const nota = 90;
const cota = true
if (nota > 59 || (nota > 49 && cota)) {
    console.log("Aprovada");
} else if (nota > 39) {
    console.log("Lista de Espera")
} else {
    console.log("Reprovada");
}

// Basic Exercise

function Tabelinha(n) {
    if (typeof n == "number") {
        let soma = n + n;
        let sub = n - n;
        let mult = n * n;
        let div = n / n;
        return {"Soma": soma,
                "Subtração": sub,
                "Multiplicação": mult,
                "Divisão": div,
            }
    } else {
        return undefined
    }
}

console.log(Tabelinha(5));