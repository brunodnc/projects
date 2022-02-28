function convertToRoman(n) {
  let f = [];
  if (n >= 1000) {
    f.unshift("M");
    return convertToRoman(n - 1000);
  } else if (n >= 900) {
    f.unshift("CM");
    return convertToRoman(n - 900);
  } else if (n >= 500) {
    f.unshift("D");
    return convertToRoman(n - 500);
  } else if (n >= 400) {
    f.unshift("CD");
    return convertToRoman(n - 400);
  } else if (n >= 100) {
    f.unshift("C");
    return convertToRoman(n - 100);
  } else if (n >= 90) {
    f.unshift("XC");
    return convertToRoman(n - 90);
  } else if (n >= 50) {
    f.unshift("L");
    return convertToRoman(n - 50);
  } else if (n >= 40) {
    f.unshift("XL");
    return convertToRoman(n - 40);
  } else if (n >= 10) {
    f.unshift("X");
    return convertToRoman(n - 10);
  } else if (n >= 9) {
    f.unshift("IX");
    return convertToRoman(n - 9);
  } else if (n >= 5) {
    f.unshift("V");
    return convertToRoman(n - 5);
  } else if (n >= 4) {
    f.unshift("IV");
    return convertToRoman(n - 4);
  } else if (n >= 1) {
    f.unshift("I");
    return convertToRoman(n - 1);
  } else if (n === 0) {
    return f.join("");
  }
}
console.log(convertToRoman(2));

// deveria tá printando 'II' mas não ta :'(
