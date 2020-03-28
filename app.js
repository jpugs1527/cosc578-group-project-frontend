const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Tell app.js where to get the user routes
const indexController = require('./controllers/indexController');
const userController = require('./controllers/userController');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', indexController);
app.use('/user', userController);


app.listen(3000);
console.log("App is running at localhost:3000");