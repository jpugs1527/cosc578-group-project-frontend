const express = require("express");
const axios = require("axios");
const router = express.Router();
require('dotenv').config();
const api = process.env.SERVER_ADDRESS;
const jwtDecode = require('jwt-decode');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("Hello user");
});

// Return registration form
router.get('/register', function (req, res, next) {
  res.render('user/register');
});

// Handle creating new account
router.post('/register', function (req, res, next) {
  var usrObj = req.body;
  console.log(usrObj);
  axios({
      url: api + '/Account/Registration',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: usrObj
    })
    .then(response => {
      console.log(response.data);
      req.flash('success', 'Account created.  Please login to continue.');
      res.redirect('/user/login');
    })
    .catch(error => {
      console.log(error);
      req.flash('error', 'Oops something went wrong... Try again later');
      res.redirect('/user/register');
    });
});

// Return login form
router.get('/login', function (req, res, next) {
  res.render('user/login');
});

// Handle user login
router.post('/login', function (req, res, next) {
  var usrObj = req.body;
  console.log(usrObj);
  axios({
      url: api + '/Account/Login',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      data: usrObj
    })
    .then(response => {
      console.log(response.data);
      res.cookie('user', response.data, {
        maxAge: 60000
      });
      res.render('index', { data: jwtDecode(response.data) });
    })
    .catch(error => {
      console.log(error);
      req.flash('error', 'Username or password incorrect.  Try again.');
      res.render('user/login');
    });
});

module.exports = router;