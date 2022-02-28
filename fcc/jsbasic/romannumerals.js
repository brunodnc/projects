let f = [];
function convertToRoman(n) {
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
  } 
  
//   pode ter bugado nesse debaixo, verificar depois
  
  else if (n >= 10) {
      if (f.join('').endsWith('X') || f.join('').endsWith('L')) {
          f.push('X');
      } else {
    f.unshift("X");}
    return convertToRoman(n - 10);
  } else if (n >= 9) {
      if (f.join('').endsWith('X') || f.join('').endsWith('L')) {
    f.push('IX');
} else {
    f.unshift("IX");}
    return convertToRoman(n - 9);
  } else if (n >= 5) {
    f.push("V");
    return convertToRoman(n - 5);
  } else if (n >= 4) {
    if (f.join('').endsWith('X') || f.join('').endsWith('L')) {
        f.push('IV');
    } else {
    f.unshift("IV");}
    return convertToRoman(n - 4);
  } else if (n >= 1) {
    f.push("I");
    return convertToRoman(n - 1);
  } else if (n === 0) {
    return f.join("");
  }
}
console.log(convertToRoman(53));

// deveria tá printando 'II' mas não ta :'(
