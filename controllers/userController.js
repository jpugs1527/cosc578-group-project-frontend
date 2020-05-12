const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();
const api = process.env.SERVER_ADDRESS;
const jwtDecode = require("jwt-decode");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Hello user");
});

// Return registration form
router.get("/register", function (req, res, next) {
  res.render("user/register");
});

// Handle creating new account
router.post("/register", function (req, res, next) {
  var usrObj = req.body;
  axios({
    url: api + "/Account/Registration",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: usrObj,
  })
    .then((response) => {
      req.flash("success", "Account created.  Please login to continue.");
      res.redirect("/user/login");
    })
    .catch((error) => {
      console.log(error);
      req.flash("error", "Oops something went wrong... Try again later");
      res.redirect("/user/register");
    });
});

// Return login form
router.get("/login", function (req, res, next) {
  res.render("user/login");
});

// Handle user login
router.post("/login", function (req, res, next) {
  var usrObj = req.body;
  axios({
    url: api + "/Account/Login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: usrObj,
  })
    .then((response) => {
      res.cookie("user", response.data, {
        maxAge: 1800000,
      });
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
      req.flash("error", "Username or password incorrect.  Try again.");
      res.render("user/login");
    });
});

// Route to force expire user cookie
router.get("/logout", function (req, res, next) {
  res.cookie("user", {
    expires: Date.now(),
    expired: true,
  });
  res.redirect("/user/login");
});

// Route to edit a users role
router.post("/editRole", function (req, res, next) {
  var usrObj = req.body;
  var token;
  if (req.cookies.user) {
    token = req.cookies.user;
    axios({
      url: api + "/Admin/SetAccountRolesByUsername",
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      data: usrObj,
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
    res.render("user/login");
  }
});

module.exports = router;
