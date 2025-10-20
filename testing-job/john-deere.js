// Get an mixed array and fix it.
function anyName(arr) {
    let newArray = [];

    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            for (let j = 0; j < arr[i].length; j++) {
                newArray = [...newArray, arr[i][j]];
            }
        } else {
            newArray = [...newArray, arr[i]];
        }
    }

    return newArray.sort((a, b) => a - b);
}

console.log(anyName([1, 2, 3, [4, 5], 6, [7, 8]]));

//

function getArrayAndMixTest1(arr) {
    let formatedArray = []

    arr.forEach(element => {
        if (!element.length) {
            return formatedArray.push(element)
        }

        element.forEach(value => {
            formatedArray.push(value)
        })
    })

    return formatedArray;
}

console.log('Test 1 by CristianMB: ', getArrayAndMixTest1([1, 2, 3, [4, 5], 6, [7, 8]]));

//

function getArrayAndMixTest2(arr) {
    let formatedArray = arr.toString().split(',').map(value => value - 0);

    return formatedArray;
}

console.log('Test 2 by CristianMB: ', getArrayAndMixTest2([1, 2, 3, [4, 5], 6, [7, 8]]));

//

function getArrayAndMix1(arr) {
    let formatedArray = [];

    arr.forEach(element => {
        if (!element.length)
            return formatedArray.push(element)

        element.forEach(value => {
            formatedArray.push(value)
        });
    });

    return formatedArray;
}

console.log('Test 3 by CristianMB: ', getArrayAndMix1([1, 2, 3, [4, 5], 6, [7, 8]]));