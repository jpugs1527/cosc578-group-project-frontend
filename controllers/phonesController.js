const express = require("express");
const axios = require("axios");
const router = express.Router();
const api = process.env.SERVER_ADDRESS;
const jwtDecode = require("jwt-decode");

/* GET index page. */
router.get('/', function (req, res, next) {
  var token;
  if (req.cookies.user) {
    token = req.cookies.user;
    axios.all([
      axios.get(api + '/Inventory/GetDevices', { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }}),
      axios.get(api + '/Inventory/GetItemManufacturer', { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }})
    ])
    .then(axios.spread((devicesRes, manufacturersRes) => {
      res.render("phones/index", {data: devicesRes.data, manufacturers: manufacturersRes.data});
    }))
    .catch(err => {
      console.log(err);
      if (err.response.status == 401) {
        res.send("Unauthorized");
      }
    });
  } else {
    res.render("/user/login");
  }
});

// Add a new device
router.post('/add', function (req, res, next) {
  var token;
  if (req.cookies.user) {
    token = req.cookies.user;
    axios({
      url: api + '/Admin/AddDevice',
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
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
      if (error.response.status == 401) {
        res.send("Unauthorized");
      }
    });
  } else {
    res.redirect("/user/login");
  }
});

// Delete an accessory
router.post('/delete', function (req, res, next) {
  var token;
  if (req.cookies.user) {
    token = req.cookies.user;
    axios({
      url: api + '/Admin/DeleteDevice',
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }, 
      params: {
        id: req.body.id
      }
    })
    .then(response => {
      res.redirect('/phones');
    })
    .catch(error => {
      console.log(error);
      if (error.response.status == 401) {
        res.send("Unauthorized");
      }
    });
  } else {
    res.redirect("/user/login");
  }  
});

module.exports = router;