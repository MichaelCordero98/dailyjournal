const mysql = require("mysql");

var connection = mysql.createConnection({
  host:     "us-cdbr-east-04.cleardb.com",
  user:     "b4d4919ca1f241",
  password: "4253516d",
  database: "heroku_ca0de1e45d368cf",
});

connection.connect((err) => {
  if (!err) {
    console.log("Connected!");
  }
  else {
    console.log("Cannot connect");
  }
});

module.exports = connection;
