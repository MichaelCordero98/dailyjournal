const express = require("express");
const myUser = require("../modules/user.js");
const _ = require("lodash");
const database = require("../modules/database.js");
const postArray = require("../modules/postArray.js");
var router = express.Router();

router.post("/:post", function(req, res) {
  index = req.body.index;
  oldTitle = req.body.oldTitle;
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  postArray[index] = post;

  database.updatePost(post.title, post.content, oldTitle);
  res.redirect("/posts/" + post.title);
});

router.get("/:post", function(req, res) {
  const postUrl = _.lowerCase(req.params.post);

  postArray.forEach((post, index) => {
    const postTitle = _.lowerCase(post.title);
    if (postTitle === postUrl) {
      res.render("post", {
        title: post.title,
        content: post.content,
        login: myUser.getLoginText(),
        index: index
      });
    }
  });
});

module.exports = router;
