const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.static('../frontend'));
app.use(express.json());
app.use(cookieParser());

let accounts = [
    { 
        username: 'Ada',
        email: 'ada@ada.com',
        password: 'pwd123'
    }
];

app.post('/api/signup', (request, response) => {
    const credentials = request.body;
    // { username: 'Alice', email:'alice@wonderland.com', password: 'pwd123' }
    const resObj = {
        success: true,
        usernameExists: false,
        emailExists: false
    }

    accounts.forEach((account) => {
        if (account.username == credentials.username) {
            resObj.usernameExists = true;
        } else if (account.email == credentials.email) {
            resObj.emailExists = true;
        }
    });

    if(resObj.usernameExists == true || resObj.emailExists == true) {
        resObj.success = false;
    } else {
        accounts.push(credentials);
    }

    response.json(resObj);
});

app.post('/api/login', (request, response) => {
    const credentials = request.body;
    // { username: 'Ada', password: 'pwd123' }

    const resObj = {
        success: false
    }

    accounts.forEach((account) => {
        if (account.username == credentials.username &&
            account.password == credentials.password ) {
                resObj.success = true;

                const cookieId = Math.round(Math.random() * 10000);

                account.cookie = cookieId;

                response.cookie('loggedIn', cookieId);
        }
    });

    response.json(resObj);
});

app.get('/api/loggedin', (request, response) => {
    const cookie = request.cookies.loggedIn;

    let resObj = {
        loggedIn: false
    }

    accounts.forEach((account) => {
        if (account.cookie == cookie) {
            resObj.loggedIn = true;
        }
    });

    response.json(resObj);
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});