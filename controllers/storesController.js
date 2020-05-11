const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();
const api = process.env.SERVER_ADDRESS;

/* GET home page. */
router.get("/", function (req, res, next) {
  
});

module.exports = router;
