const express = require("express");
const axios = require("axios");
const router = express.Router();
require('dotenv').config();
const api = process.env.SERVER_ADDRESS;

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
  axios({
      url: api + '/Account/Registration',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: usrObj
    })
    .then(response => {
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
  axios({
      url: api + '/Account/Login',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      data: usrObj
    })
    .then(response => {
      res.cookie('user', response.data, {
        maxAge: 1800000
      });
      res.redirect('/');
    })
    .catch(error => {
      console.log(error);
      req.flash('error', 'Username or password incorrect.  Try again.');
      res.render('user/login');
    });
});

router.get("/logout", function (req, res, next) {
  res.cookie('user', {
    expires: Date.now(),
    expired: true
  });
  res.redirect('/user/login');
});

module.exports = router;