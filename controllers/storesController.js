const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();
const api = process.env.SERVER_ADDRESS;

/* GET home page. */
router.post("/add", function (req, res, next) {
  var storeObj = req.body;
  var token;
  if (req.cookies.user) {
    token = req.cookies.user;
    axios({
      url: api + "/Admin/AddStore",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        storeName: storeObj.storeName,
        storePercentage: storeObj.storePercentage,
      },
    })
      .then((response) => {
        res.redirect("/admin");
      })
      .catch((error) => {
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
