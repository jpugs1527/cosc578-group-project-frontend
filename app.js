const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Tell app.js where to get the user routes
const indexController = require('./controllers/indexController');
const userController = require('./controllers/userController');

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', indexController);
app.use('/user', userController);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
console.log("App is running at localhost:3000");