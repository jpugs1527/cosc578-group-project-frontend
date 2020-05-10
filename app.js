require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const jwtDecode = require('jwt-decode');

// Tell app.js where to get the user routes
const indexController = require('./controllers/indexController');
const userController = require('./controllers/userController');
const accessoryController = require('./controllers/accessoriesController');
const phonesController = require('./controllers/phonesController');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

// Express session
app.use(session({
    key: 'user_sid',
    secret: 'secret',
    resave: false, 
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

// Used to deal with cookies from the browser
app.use(cookieParser());

// Make user cookie available on all routes
app.use(function(req,res,next){
    if (req.cookies) {
        if (req.cookies.user && !req.cookies.user.expired) {
            res.locals.user = jwtDecode(req.cookies.user);
        }
    }
    next();
})

// Clear cookie session for logged in user
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid'); 
    }
    next();
});

// Used to parse data from form for requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Used to send app level alerts
app.use(flash());
app.use(function(req, res, next){
    res.locals.success = req.flash('success');
    res.locals.errors = req.flash('error');
    next();
});

app.use('/', indexController);
app.use('/user', userController);
app.use('/accessories', accessoryController);
app.use('/phones', phonesController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running at localhost:${ PORT }`);
});