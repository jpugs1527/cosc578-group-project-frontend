const express = require("express");
const axios = require("axios");
const router = express.Router();
const api = process.env.SERVER_ADDRESS;

/* GET index page. */
router.get("/", function (req, res, next) {
  var token;
  if (req.cookies.user) {
    token = req.cookies.user;
    axios({
      url: api + "/Inventory/GetAccessories",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        res.render("accessories/index", { data: response.data });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 401) {
          res.redirect("/user/login");
        }
      });
  } else {
    res.redirect("/user/login");
  }
});

// Add a new accessory
router.post("/add", function (req, res, next) {
  var token;
  if (req.cookies.user) {
    token = req.cookies.user;
    axios({
      url: api + "/Admin/AddAccessory",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        name: req.body.name,
        description: req.body.description,
        serialNumber: req.body.serialNumber,
        retailPrice: req.body.retailPrice,
        itemManufacturerId: req.body.itemManufacturerId,
      },
    })
      .then((response) => {
        res.redirect("/accessories");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 401) {
          res.redirect("/user/login");
        }
      });
  } else {
    res.render("user/login");
  }
});

// Edit an accessory

// Delete an accessory
router.post("/delete", function (req, res, next) {
  var token;
  if (req.cookies.user) {
    token = req.cookies.user;
    axios({
      url: api + "/Admin/DeleteAccessory",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        id: req.body.id,
      },
    })
      .then((response) => {
        res.redirect("/accessories");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 401) {
          res.redirect("/user/login");
        }
      });
  } else {
    res.render("user/login");
  }
});

module.exports = router;
