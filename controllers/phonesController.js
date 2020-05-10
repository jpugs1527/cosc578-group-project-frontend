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
    res.render('phones/index', { data: response.data });
  })
  .catch(error => {
    console.log(error);
  });
});

// Add a new device
router.post('/add', function (req, res, next) {
  axios({
    url: api + '/Inventory/AddDevice',
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }, 
    params: {
      name: req.body.name,
      serialNumber: req.body.serialNumber,
      imei: req.body.imei,
      retailPrice: req.body.retailPrice,
      itemManufacturerId: req.body.itemManufacturerId
    }
  })
  .then(response => {
    res.redirect('/phones');
  })
  .catch(error => {
    console.log(error);
  });
});

module.exports = router;