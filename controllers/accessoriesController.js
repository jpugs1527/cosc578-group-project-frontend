const express = require("express");
const axios = require("axios");
const router = express.Router();
const api = process.env.SERVER_ADDRESS;

/* GET index page. */
router.get("/", function (req, res, next) {
  var token;
  if (req.cookies.user || res.locals.user) {
    token = req.cookies.user;
    axios.all([
      axios.get(api + '/Inventory/GetAccessories', { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }}),
      axios.get(api + '/Inventory/GetItemManufacturer', { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }}),
      axios.get(api + '/Inventory/GetStores', { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }})
    ])
    .then(axios.spread((accessoriesRes, manufacturersRes, storesRes) => {
      res.render("accessories/index", {data: accessoriesRes.data, manufacturers: manufacturersRes.data, stores: storesRes.data});
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
        storeId: req.body.store ? req.body.store : ""
      },
    })
      .then((response) => {
        res.redirect("/accessories");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 401) {
          res.send("Unauthorized");
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
          res.send("Unauthorized");
        }
      });
  } else {
    res.render("user/login");
  }
});

// Filter results by store
router.post("/filter", function (req, res, next) {
  var token;
  var storeInventory;
  if (req.cookies.user) {
    token = req.cookies.user;
    axios.all([
      axios.get(api + '/Inventory/GetStores', { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }}),
      axios.get(api + '/Inventory/GetItemManufacturer', { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }}),
      axios.get(api + '/Inventory/GetStoreInventory', 
        { headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" 
          },
          params: {
            storeId: req.body.storeId 
          }
        })
    ])
    .then(axios.spread((storesRes, manufacturersRes, inventoryRes) => {
      if (inventoryRes.data.Items) {
        storeInventory = inventoryRes.data.Items.Accessories
      } else {
        storeInventory = [];
      }
      console.log(storesRes.data);
      res.render("accessories/index", {stores: storesRes.data, manufacturers: manufacturersRes.data, data: storeInventory, currStore: req.body.storeId});
    }))
    .catch(err => {
      console.log(err);
      if (err.response.status == 401) {
        res.redirect("Unauthorized");
      }
    });
  } else {
    res.render("user/login");
  }
});

module.exports = router;
