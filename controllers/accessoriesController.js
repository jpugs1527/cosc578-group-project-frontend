const express = require("express");
const axios = require("axios");
const router = express.Router();

/* GET index page. */
router.get('/', function (req, res, next) {
  res.render("accessories/index");
});

module.exports = router;