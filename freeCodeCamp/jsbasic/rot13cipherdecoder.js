function rot13(str) {
    let arr = []
    // porque o vs code permite fazer o chamado do for of sem o let?? tipo for (letra of str) ??
    for (let letra of str) {
        arr.push(letra.toUpperCase());
    };
    return arr.map(function (char) {
        switch (char) {
          case "A":
            return "N";
            // LEMBRAR QUE SE CASE TEM RETURN NÃO PRECISA DE BREAK!!
          case "N":
            return "A";
          case "B":
            return "O";
          case "O":
            return "B";
          case "C":
            return "P";
          case "P":
            return "C";
          case "D":
            return "Q";
          case "Q":
            return "D";
          case "E":
            return "R";
          case "R":
            return "E";
          case "F":
            return "S";
          case "S":
            return "F";
          case "G":
            return "T";
          case "T":
            return "G";
          case "H":
            return "U";
          case "U":
            return "H";
          case "I":
            return "V";
          case "V":
            return "I";
          case "J":
            return "W";
          case "W":
            return "J";
          case "X":
            return "K";
          case "K":
            return "X";
          case "L":
            return "Y";
          case "Y":
            return "L";
          case "M":
            return "Z";
          case "Z":
            return "M";
            default:
                return char;
        }
      }).join("");
}

console.log(rot13("N333ONPNKV-QH-ZNGB"));
console.log(rot13("SERR PBQR PNZC BOEVTNQB"));
