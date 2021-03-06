const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();
const api = process.env.SERVER_ADDRESS;

/* GET home page. */
router.get("/", function (req, res, next) {
  var token;
  if (req.cookies.user) {
    token = req.cookies.user;
    axios.all([
      axios.get(api + '/Account/GetAccounts', { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }}),
      axios.get(api + '/Inventory/GetStores', { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }}),
      axios.get(api + '/Admin/GetAllEndpoints', { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }})
    ])
    .then(axios.spread((usersRes, storesRes, endpointsRes) => {
      res.render("admin/index", {users: usersRes.data, stores: storesRes.data, endpoints: endpointsRes.data});
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

module.exports = router;
