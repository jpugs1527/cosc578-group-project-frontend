const express = require("express");
const axios = require("axios");
const router = express.Router();
const api = process.env.SERVER_ADDRESS;


/* GET index page. */
router.get('/', function (req, res, next) {
  axios({
    url: api + '/Inventory/GetAccessories',
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }, 
  })
  .then(response => {
    res.render('accessories/index', { data: response.data });
  })
  .catch(error => {
    console.log(error);
  });
});

// Add a new accessory
router.post('/add', function (req, res, next) {
  axios({
    url: api + '/Inventory/AddAccessory',
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }, 
    params: {
      name: req.body.name,
      description: req.body.description,
      serialNumber: req.body.serialNumber,
      retailPrice: req.body.retailPrice,
      itemManufacturerId: req.body.itemManufacturerId
    }
  })
  .then(response => {
    res.redirect('/accessories');
  })
  .catch(error => {
    console.log(error);
  });
});

// Delete an accessory
router.post('/delete', function (req, res, next) {
  axios({
    url: api + '/Inventory/DeleteAccessory',
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }, 
    params: {
      id: req.body.id
    }
  })
  .then(response => {
    console.log(response.data);
    res.redirect('/accessories');
  })
  .catch(error => {
    console.log(error);
  });
});

module.exports = router;