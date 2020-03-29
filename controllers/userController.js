const express = require("express");
// const axios = require("axios");
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("Hello user");
});

router.get('/register', function (req, res, next) {
  res.render('user/register');
});

module.exports = router;