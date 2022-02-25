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