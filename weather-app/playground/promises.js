// var somePromise = new Promise((resolve, reject) =>{
//     resolve(2+2);
// });

// somePromise.then((message) => {
//     console.log('Message: ', message )
// }, (errorMessage) => console.log(errorMessage));

var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers.')
            }
        }, 400);
    });
};

asyncAdd(11, 2)
    .then((result) => {
        console.log(result)
        return asyncAdd(result, "33");
    }).then((result) => {
        console.log(result)
        return asyncAdd(result, 11)
    }).then((result) => console.log(result))
    .catch((errorMessage) => console.log(errorMessage));