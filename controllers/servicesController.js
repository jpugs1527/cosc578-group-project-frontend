const express = require("express");
const axios = require("axios");
const router = express.Router();
const api = process.env.SERVER_ADDRESS;

/* GET index page. */
router.get('/', function (req, res, next) {
  axios({
    url: api + '/Inventory/GetDevices',
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }, 
  })
  .then(response => {
    res.render('services/index', { data: response.data });
  })
  .catch(error => {
    console.log(error);
  });
});

module.exports = router;