function bubbleSortLowestToLargest(arr) {
    if (Array.isArray(arr)) {
        for (let x = 1; x < arr.length ; x+= 1) {
            for (let i = 0; i < x; i+= 1 ) {
                if (arr[i] < arr[x]) {
                    let p = arr[i];
                    arr[i] = arr[x];
                    arr[x] = p;
                }
            }
        }
        return arr;
    } else {
        return undefined;
    }
}

function bubbleSortLargestToLowest(arr) {
    if (Array.isArray(arr)) {
        for (let x = 1; x < arr.length ; x+= 1) {
            for (let i = 0; i < x; i+= 1 ) {
                if (arr[i] > arr[x]) {
                    let p = arr[i];
                    arr[i] = arr[x];
                    arr[x] = p;
                }
            }
        }
        return arr;
    } else {
        return undefined;
    }
}

console.log(bubbleSortLowestToLargest([1, 4, 10, 1, 0]));
console.log(bubbleSortLargestToLowest([1, 4, 10, 1, 0]));

function multSeguinte(arr) {
    let newarr = [];
    for (let i = 1; i < arr.length; i+= 1) {
        newarr.push(arr[i - 1] * arr[i]);
    }
    let x = arr.length;
    newarr.push(arr[x-1] * 2);
    return newarr
} 
console.log(multSeguinte([1, 2, 3, 4]))