function isPalindrome(str) {
    let regex = /_|\W/;
    let palavra = str.toLowerCase().split(regex).join("");
    let inverso = [];
    for (let letra of palavra) {
        let resto = inverso.unshift(letra);
    }
    console.log(inverso.join(""))
    if (palavra === inverso.join("")) {
        return true
       } else {
           return false
       }
}

console.log(isPalindrome("A man, a plan, a canal. Panama"));