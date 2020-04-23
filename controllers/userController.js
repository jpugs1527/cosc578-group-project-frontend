const express = require("express");
const axios = require("axios");
const router = express.Router();
require('dotenv').config();
const api = process.env.SERVER_ADDRESS;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("Hello user");
});

router.get('/register', function (req, res, next) {
  res.render('user/register');
});

router.post('/register', function (req, res, next) {
  var usrObj = req.body;

  axios.post(api + '/Account/Registration', { usrObj })
    .then(function (response) {
      console.log(response.data);
      req.flash('success', '')
      res.redirect('/user/login');
    })
    .catch(function (error) {
      console.log(error);
      res.redirect('/user/register');
    });
});

router.get('/login', function (req, res, next) {
  res.render('user/login');
});

module.exports = router;