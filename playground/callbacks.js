var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Kirk'
    };
    setTimeout(() => {
        callback(user);
    }, 3000);
};

getUser(11, (userObject) => {
    console.log(userObject);
});

