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
      // axios.get(api + '/Inventory/GetStores', { headers: {  "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }})
    ])
    .then(axios.spread((usersRes) => {
      usersRes.data.forEach(user => {
        if (user.IsActive && user.Roles[0]) {
          console.log(user.Roles[0].RoleName);
        }
      });
      res.render("admin/index", {users: usersRes.data});
    }))
    .catch(err => {
      console.log(err);
      if (err.response.status == 401) {
        res.redirect("user/login");
      }
    });
  } else {
    res.render("user/login");
  }
});

module.exports = router;
