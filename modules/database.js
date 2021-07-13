const express = require("express");
const myUser = require("../modules/user.js");
const connection = require("../modules/connect.js");
const postArray = require("../modules/postArray.js");

class DailyJournal {
  constructor(connection) {
    this.connection = connection;
  }

  getTable() {
    var tableExist = false;
    var sql = "SHOW TABLES FROM `heroku_ca0de1e45d368cf` LIKE " + `"${myUser.getUser()}"`;
    connection.query(sql, (err, data, fields) => {
      if (err) throw err;
      if (Object.keys(data).length == 1) tableExist = true;

      if (!tableExist) {
        var create = `CREATE TABLE ${myUser.getUser()} (title VARCHAR(255), content MEDIUMTEXT)`;
        connection.query(create, (err, data, fields) => {
          if (err) throw err;
          console.log("table created!");
        });
      }

    });
  }

  populatePostArray() {
    connection.query(`SELECT * from ${myUser.getUser()}`, (err, data, fields) => {
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
    console.log(query);
    connection.query(query, (err, data, fields) => {
      if (err) throw err;
      console.log("1 record inserted");
    });
  }

  updatePost(title, content, oldTitle) {
    if (!myUser.getLogin()) {
      return;
    }

    var sql = `UPDATE ${myUser.getUser()} SET title = \"${title}\", content = \"${content}\" WHERE title = \"${oldTitle}\"`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  }

  deletePost(title) {
    if (!myUser.getLogin()) {
      return;
    }

    var sql = `DELETE FROM ${myUser.getUser()} WHERE title = \"${title}\"`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
  }
}

const database = new DailyJournal(connection);
module.exports = database;
