const express = require("express");
const myUser = require("../modules/user.js");
const con = require("../modules/connect.js");
const postArray = require("../modules/postArray.js");

class DailyJournal {
  constructor(con) {
    this.connection = con
  }

  getTable() {
    var tableExist = false;
    var sql = "SHOW TABLES FROM `YOUR_DATABASE` LIKE " + `"${myUser.getUser()}"`;
    con.connection.query(sql, (err, data, fields) => {
      if (err) throw err;
      if (Object.keys(data).length == 1) tableExist = true;

      if (!tableExist) {
        var create = `CREATE TABLE ${myUser.getUser()} (title VARCHAR(255), content MEDIUMTEXT)`;
        con.connection.query(create, (err, data, fields) => {
          if (err) throw err;
          console.log("table created!");
        });
      }
    });
  }

  populatePostArray() {
    con.connection.query(`SELECT * from ${myUser.getUser()}`, (err, data, fields) => {
      data.forEach(post => {
        postArray.push(post);
      });
    });
  }

  createPost(title, content) {
    if (!myUser.getLogin()) {
      return;
    }

    var query = `INSERT INTO ${myUser.getUser()} VALUES ("${title}", "${content}")`;
    con.connection.query(query, (err, data, fields) => {
      if (err) throw err;
      console.log("1 record inserted");
    });
  }

  updatePost(title, content, oldTitle) {
    if (!myUser.getLogin()) {
      return;
    }

    var sql = `UPDATE ${myUser.getUser()} SET title = "${title}", content = "${content}" WHERE title = "${oldTitle}"`;
    con.connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  }

  deletePost(title) {
    if (!myUser.getLogin()) {
      return;
    }

    var sql = `DELETE FROM ${myUser.getUser()} WHERE title = "${title}"`;
    con.connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
  }
}

const database = new DailyJournal(con);
module.exports = database;
