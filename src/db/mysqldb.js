const mysql = require("mysql2")


let connection = mysql.createConnection({
    host: process.env.HOST,
    password: process.env.PASSWORD,
    user: process.env.USERNAME,
    database: process.env.DATABASE,
    charset: 'latin1',
  });
  

  module.exports = {
    connection: connection,
    poolConnection: connection.promise(),
  };
  


