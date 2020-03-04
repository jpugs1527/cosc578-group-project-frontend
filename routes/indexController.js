const express = require("express");
// const axios = require("axios");
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("Welcome to Wireless 4 U!");
});

router.get('/register', function (req, res, next) {
  res.send("Register");
});

router.get('/login', function (req, res, next) {
  res.send("Login");
});

module.exports = router;