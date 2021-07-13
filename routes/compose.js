const express = require("express");
const myUser = require("../modules/user.js");
const database = require("../modules/database.js");
const postArray = require("../modules/postArray.js");
var router = express.Router();

router.get("/", function(req, res) {
  res.render("compose", {
    login: myUser.getLoginText(),
  });
});

router.post("/", function(req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };

  database.createPost(post.title, post.content, post);
  postArray.push(post);
  res.redirect("/");
});

module.exports = router;
