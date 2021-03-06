var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 1500);
    })
}

asyncAdd(2,'1').then((result) => {
    console.log('Result: ', result);
    return asyncAdd(result, 3);
}).then((result) => {
    console.log('Should be ', result);
}).catch((errorMessage) => {
    console.log(errorMessage);
});

// var somePromise = new Promise ((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Hey. it worked!');
//         reject('Unable to fulfill promise');
//     },2500);
// });

// somePromise.then((message) => {
//     console.log('Success: ', message);
// }, (errorMessage) => {
//     console.log('Error: ', errorMessage);
// });