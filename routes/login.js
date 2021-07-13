const express = require("express");
const myUser = require("../modules/user.js");
const database = require("../modules/database.js");
const postArray = require("../modules/postArray.js");
var router = express.Router();

router.get("/", function(req, res) {
  if (myUser.getLogin()) {
    myUser.logout();
    postArray.length = 0;
    res.redirect("/");
    return;
  }
  res.render("login", {
    login: myUser.getLoginText()
  });
});

router.post("/", function(req, res) {
  myUser.login(req.body.username);
  postArray.length = 0;
  database.getTable();
  setTimeout(() => { database.populatePostArray(); }, 250);
  setTimeout(() => { res.redirect("/"); }, 500);
})

module.exports = router;
