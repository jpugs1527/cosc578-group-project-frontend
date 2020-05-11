const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();
const api = process.env.SERVER_ADDRESS;

/* GET home page. */
router.get("/", function (req, res, next) {
  axios.all([
    axios.get(api + '/Account/GetAccounts', { headers: {"Content-Type": "application/json"}}),
    // axios.get(api + '/Inventory/GetStores', { headers: {"Content-Type": "application/json"}})
  ])
  .then(axios.spread((usersRes) => {
    console.log(usersRes.data)
    res.render("admin/index", {users: usersRes.data});
  }))
  .catch(err => {
    console.log(err);
  });
});

module.exports = router;
