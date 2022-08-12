function grafico(n) {if (n > 1) {
    let ast = '*';
    let frase = []
    for (let j = n; j > 0; j -= 1) {
        frase.push(ast);
    }
    for (let i = n; i > 0; i -= 1) {
        
        console.log(frase.join(''));
    }
}
}

function graficotri(n) {if (n > 1) {
    let ast = '*';
    let frase = []
    for (let j = n; j > 0; j -= 1) {
        frase.push(ast);
        console.log(frase.join(''));
    }
}
}

function graficotriinv(n) {if (n > 1) {
    let ast = '*';
    let frase = [];
    let frase2 = [];
    for (let i = 1; i < n; i += 1) {
        frase2.push(' ');
    }
    for (let j = n; j > 0; j -= 1) {
        frase.push(ast);
        console.log(frase2.join('') + frase.join(''));
        frase2.pop();
    }
}   
}

function graficopiramide(n) {
    if (n > 1 && n % 2 !== 0) {
        let ast = '*';
        let space = ' ';
        let frase = [];
        let fraseesq = [];
        let frasedir = [];
        for (let z = 1; z <= n; z += 2) {
            fraseesq.push(space);
            frasedir.push(space);
        }
        for (let i = 1; i <= n; i += 2) {
            frase.push(ast);           
            console.log(fraseesq.join('') + frase.join('') + frasedir.join(''));
            fraseesq.pop();
            frasedir.pop();
            frase.push(ast);
        }
    } else {
        console.log("Por favor insira um número ímpar, ou a pirâmide fica com a base desbalançeada e não consegue subir até seu máximo sem cair")
    }   
}

function graficopiramideinv(n) {
    if (n > 1 && n % 2 !== 0) {
        let ast = '*';
        let space = ' ';
        let frase = [];
        let fraseasterico = ['*'];
        let fraseesq = [];
        let frasedir = [];
        for (let z = 1; z <= n; z += 2) {
            fraseesq.push(space);
            frasedir.push(space);
        }
        for (let y = 1; y < n; y+= 1) {
            fraseasterico.push(ast);
        }
        for (let i = 1; i <= n; i += 2) {
            if (i === 1) {           
            frase.push(ast);
            console.log(fraseesq.join('') + frase.join('') + frasedir.join(''));
            frase.pop();
            fraseesq.pop();
            frasedir.pop();
            fraseesq.push(ast);
            frasedir.unshift(ast);
            } else if (i !== 1 && i !== n) {
                frase.push(space);
                console.log(fraseesq.join('') + frase.join('') + frasedir.join(''));
                // frase.push(space);
                fraseesq.shift();
                frasedir.pop();
                fraseesq.push(space);
                frasedir.pop;
            } else {
                console.log(' ' + fraseasterico.join(''));
            }
        }
    } else {
        console.log("Por favor insira um número ímpar, ou a pirâmide fica com a base desbalançeada e não consegue subir até seu máximo sem cair")
    }   
}

function trianguloperfeito(n) {
    if (n > 1 && n % 2 !== 0) {
        let ast = '*';
        let space = ' ';
        let frase = [];
        let fraseasterico = ['*'];
        let fraseesq = [];
        let frasedir = [];
        for (let z = 1; z <= n; z += 2) {
            fraseesq.push(space);
            frasedir.push(space);
        }
        for (let y = 1; y < n; y+= 2) {
            fraseasterico.push('*');
        }
        for (let i = 1; i <= n; i += 2) {
            if (i === 1) {           
            frase.push(ast);
            console.log(fraseesq.join('') + frase.join('') + frasedir.join(''));
            frase.pop();
            fraseesq.pop();
            frasedir.pop();
            fraseesq.push(ast);
            frasedir.unshift(ast);
            } else if (i !== 1 && i !== n) {
                frase.push(space);
                console.log(fraseesq.join('') + frase.join('') + frasedir.join(''));
                // frase.push(space);
                fraseesq.shift();
                frasedir.pop();
                fraseesq.push(space);
                frasedir.pop;
            } else {
                console.log(' ' + fraseasterico.join(' '));
            }
        }
    } else {
        console.log("Por favor insira um número ímpar, ou o triângulo fica com a base desbalançeada e não consegue ser perfeito")
    }   
}
console.log('base');
grafico(5);
console.log('triângulo');
graficotri(5);
console.log('triângulo invertido');
graficotriinv(5);
console.log('pirâmide');
graficopiramide(5);
console.log('pirâmide invertida');
graficopiramideinv(5);
console.log('triângulo perfeito')
trianguloperfeito(5);