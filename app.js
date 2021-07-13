//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const root = require("./routes/root");
const login = require("./routes/login");
const compose = require("./routes/compose");
const post = require("./routes/post");
const deletePost = require("./routes/delete");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use("/", root);
app.use("/login", login);
app.use("/compose", compose);
app.use("/posts", post);
app.use("/delete", deletePost);

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started successfully");
});
