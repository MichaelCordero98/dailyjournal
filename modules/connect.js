const mysql = require("mysql");

var db_config = {
  host: 'us-cdbr-east-04.cleardb.com',
  user: 'b4d4919ca1f241',
  password: '4253516d',
  database: 'heroku_ca0de1e45d368cf'
};

var con = { connection: null };

function handleDisconnect() {
  con.connection = mysql.createConnection(db_config);


  con.connection.connect(function(err) {
    if(err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log("Connected!");
    }
  });

  con.connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = con;
