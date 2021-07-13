const express = require("express");
const myUser = require("../modules/user.js");
const database = require("../modules/database.js");
const postArray = require("../modules/postArray.js");
var router = express.Router();

router.post("/", function(req, res) {
  title = req.body.postTitle;
  index = req.body.index;

  postArray.splice(index, 1);
  database.deletePost(title);
  res.redirect("/");
});

module.exports = router;
