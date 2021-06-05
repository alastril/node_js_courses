const express = require('express');
const application = express();

global.users = [];
application.listen(8000);
application.use(express.json());

application.route('/user')
    .post(function (req, res, next) {
        let user = JSON.parse(JSON.stringify(req.body));
        let duplicate = false;
        users.forEach(elem => {
            if (elem.id === user.id) {
                duplicate = true;
            }
        });
        users.push(user);
        if (duplicate) {
            res.send('User already created');
        } else {
            res.send('User was created!');
        }
    });

application.param('id', function (req, res, next, id) {
    users.forEach(elem => {
        if (elem.id === id && !elem.isDeleted) req.user = elem;
    });
    next();
});

//Put
application.route('/user/:id')
    .put(function (req, res) {
        let userReq = JSON.parse(JSON.stringify(req.body));
        let localUser = req.user;
        if (localUser && userReq) {
            localUser.login = userReq.login;
            localUser.password = userReq.password;
            localUser.age = userReq.age;
            localUser.isDeleted = userReq.isDeleted;
            res.send("Updated!");
        } else {
            res.send("Wrong user for update!");
        }
    }).delete(function (req, res) {//Delete
    if (req.user) {
        req.user.isDeleted = true;
        res.send("User is deleted!");
    } else {
        res.send("NO user with such Id!");
    }
}).get(function (req, res) {//Get by Id
    let result = req.user ? JSON.stringify(req.user) : "Empty";
    console.log("Get => " + result);
    res.send(req.user);
});

application.get('/user/:sub_log/:limit', function (req, res) {
    let usersResult = [];
    let count = 0;
    users.forEach(user => {
        if (user.login.includes(req.params.sub_log) && req.params.limit > count && !user.isDeleted) {
            usersResult.push(user);
            count++;
        }
    })
    console.log("/user/:sub_log/:limit =>" + JSON.stringify(usersResult));
    res.send(usersResult);
});

//log
application.route('/user_all')
    .get(function (req, res, next) {
        console.log(users);
        res.send();
    });