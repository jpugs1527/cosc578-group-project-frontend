require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const flash = require('connect-flash');

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

app.use(flash());
app.use(function(req, res, next){
    res.locals.success = req.flash('success');
    res.locals.errors = req.flash('error');
    next();
});

app.use('/', indexController);
app.use('/user', userController);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running at localhost:${ PORT }`);
});