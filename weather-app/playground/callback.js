var getUser = (id, callback) => {
    var user = {
        id: id,
        name: "Davi"
    }

    setTimeout(function() {
        callback(user);
    }, 3000);
};

getUser(21, (userObjetct) => {
    console.log(userObjetct)
});

